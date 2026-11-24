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

const PAY_BLOCK_NAME = { upi: "Pay with UPI", card: "Pay with a card", netbanking: "Pay with net banking", wallet: "Pay with a wallet" } as const;

export class CheckoutDismissed extends Error {
  constructor() {
    super("Payment window closed.");
  }
}

/**
 * Opens Razorpay's payment window for an order the server created. Resolves with Razorpay's response when
 * the payment succeeds. Rejects with CheckoutDismissed when the person closes the window, or with an Error
 * carrying the reason when the payment fails. The server, not the browser, decides the amount.
 */
export async function openRazorpayCheckout(order: {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  label: string;
  prefill: { name: string; email: string; contact: string };
  /** Show only this way of paying (the donor chose it on our page). Left out, Razorpay shows every way. */
  method?: "upi" | "card" | "netbanking" | "wallet";
}): Promise<CheckoutResponse> {
  const Razorpay = await loadScript();
  return new Promise((resolve, reject) => {
    const checkout = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Shyam Jagat",
      description: order.label,
      // The logo shown in the payment window (it must be reachable from the internet, so it only shows on the live site).
      image: `${window.location.origin}/images/brand/logo.svg`,
      prefill: order.prefill,
      theme: { color: "#e87722" },
      ...(order.method
        ? {
            config: {
              display: {
                blocks: { chosen: { name: PAY_BLOCK_NAME[order.method], instruments: [{ method: order.method }] } },
                sequence: ["block.chosen"],
                preferences: { show_default_blocks: false },
              },
            },
          }
        : {}),
      handler: (response: CheckoutResponse) => resolve(response),
      // Closing the window by accident asks first, so a payment in progress is not lost.
      modal: { confirm_close: true, ondismiss: () => reject(new CheckoutDismissed()) },
    });
    checkout.on("payment.failed", (r) => reject(new Error(r.error?.description ?? "The payment failed. You can try again.")));
    checkout.open();
  });
}
