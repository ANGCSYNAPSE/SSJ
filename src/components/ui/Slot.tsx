import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Slot: merges its props onto its single child element.
 * Lets components like <Button asChild> render a <Link> instead.
 */
export function Slot({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) {
  const child = Children.only(children);

  if (!isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
    return null;
  }

  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props.className),
  });
}
