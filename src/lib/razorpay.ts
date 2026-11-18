/**
 * Opens Razorpay's payment window. Loads Razorpay's script the first time it is needed, so pages
 * that never take a payment do not download it.
 */
interface CheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

type RazorpayCheckout = { open: () => void; on: (event: string, cb: (r: { error?: { description?: string } }) => void) => void };
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayCheckout;

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

function loadScript(): Promise<RazorpayCtor> {
  const existing = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
  if (existing) return Promise.resolve(existing);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      const loaded = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
      loaded ? resolve(loaded) : reject(new Error("The payment window could not be loaded."));
    };
    script.onerror = () => reject(new Error("The payment window could not be loaded. Check your connection and try again."));
    document.body.appendChild(script);
  });
}

export class CheckoutDismissed extends Error {
  constructor() {
    super("Payment window closed.");
  }
}

/**
 * Resolves with Razorpay's response when the payment succeeds. Rejects with CheckoutDismissed when
 * the person closes the window, or with an Error carrying the reason when the payment fails.
 */
/**
 * The development "mock payments" checkout: a plain window that looks like a payment page and moves
 * no money. The server only offers it (order.mock) when PAYMENTS_MODE=mock is switched on.
 */
const MOCK_SIGNATURE = "mock_signature";

function openMockCheckout(order: { orderId: string; amount: number; label: string }): Promise<CheckoutResponse> {
  return new Promise((resolve, reject) => {
    const rupees = (order.amount / 100).toLocaleString("en-IN");
    const overlay = document.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(18,6,10,.65);font-family:system-ui,Segoe UI,sans-serif";
    overlay.innerHTML = `
      <div style="width:100%;max-width:380px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45)">
        <div style="background:#6b1f1f;color:#fff;padding:16px 20px">
          <div style="font-size:12px;letter-spacing:.12em;color:#ffd66b;font-weight:700">SHYAM JAGAT</div>
          <div style="font-size:15px;margin-top:2px">${order.label}</div>
        </div>
        <div style="padding:20px;text-align:center">
          <div style="display:inline-block;background:#fff1d8;color:#9a3412;border:1px dashed #e87722;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700">TEST PAYMENT. NO REAL MONEY</div>
          <div style="font-size:34px;font-weight:800;color:#3e1815;margin:14px 0 4px">₹${rupees}</div>
          <div style="font-size:12px;color:#8a8580;margin-bottom:18px">This is a dummy checkout for testing. Nothing is charged.</div>
          <button data-act="ok" style="width:100%;padding:12px;border:0;border-radius:12px;background:#16a34a;color:#fff;font-weight:700;font-size:15px;cursor:pointer">Pay successfully</button>
          <button data-act="fail" style="width:100%;padding:12px;margin-top:8px;border:1.5px solid #dc2626;border-radius:12px;background:#fff;color:#dc2626;font-weight:700;font-size:14px;cursor:pointer">Simulate a failed payment</button>
          <button data-act="close" style="width:100%;padding:10px;margin-top:8px;border:0;background:transparent;color:#595656;font-size:13px;cursor:pointer">Cancel</button>
        </div>
      </div>`;

    const finish = (action: "ok" | "fail" | "close") => {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
      if (action === "ok") {
        resolve({ razorpay_order_id: order.orderId, razorpay_payment_id: `pay_mock_${Date.now()}`, razorpay_signature: MOCK_SIGNATURE });
      } else if (action === "fail") {
        reject(new Error("The test payment was declined. You can try again."));
      } else {
        reject(new CheckoutDismissed());
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish("close");
    overlay.addEventListener("click", (e) => {
      const act = (e.target as HTMLElement).closest("[data-act]")?.getAttribute("data-act") as "ok" | "fail" | "close" | null;
      if (act) finish(act);
      else if (e.target === overlay) finish("close");
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
  });
}

export async function openRazorpayCheckout(order: {
  /** True when the server is in the development mock mode: show the dummy checkout instead of Razorpay's. */
  mock?: boolean;
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  label: string;
  prefill: { name: string; email: string; contact: string };
}): Promise<CheckoutResponse> {
  if (order.mock) return openMockCheckout(order);
  const Razorpay = await loadScript();
  return new Promise((resolve, reject) => {
    const checkout = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Shyam Jagat",
      description: order.label,
      prefill: order.prefill,
      theme: { color: "#e87722" },
      handler: (response: CheckoutResponse) => resolve(response),
      modal: { ondismiss: () => reject(new CheckoutDismissed()) },
    });
    checkout.on("payment.failed", (r) => reject(new Error(r.error?.description ?? "The payment failed. You can try again.")));
    checkout.open();
  });
}
