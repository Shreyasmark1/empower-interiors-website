import { LoginButton } from "@/components/Login-Button/login-button";
import {
  CartIcon,
  ContactIcon,
  HugeiconsIcon,
  WishlistIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

type HeaderActionsProps = {
  className?: string;
  onLogin?: () => void;
  onContact?: () => void;
  onWishlist?: () => void;
  onCart?: () => void;
  cartCount?: number;
  wishlistCount?: number;
};

function IconButton({
  label,
  count,
  onClick,
  children,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative inline-flex h-11 items-center justify-center gap-2 rounded-md px-3 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
      {typeof count === "number" && count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white px-1">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function HeaderActions({
  className,
  onLogin,
  onContact,
  onWishlist,
  onCart,
  cartCount,
  wishlistCount,
}: HeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconButton label="Talk to us" onClick={onContact}>
        <HugeiconsIcon
          icon={ContactIcon}
          strokeWidth={2}
          className="size-5 shrink-0"
        />
        <div className="hidden flex-col text-left text-sm font-medium leading-tight sm:flex">
          <span>Talk</span>
          <span className="text-primary">To us</span>
        </div>
      </IconButton>

      <IconButton label="Wishlist" count={wishlistCount} onClick={onWishlist}>
        <HugeiconsIcon
          icon={WishlistIcon}
          strokeWidth={2}
          className="size-5 shrink-0"
        />
      </IconButton>

      <IconButton label="Cart" count={cartCount} onClick={onCart}>
        <CartIcon className="size-5 shrink-0" />
      </IconButton>

      <LoginButton onLogin={() => onLogin?.()}/>
    </div>
  );
}

export { HeaderActions };
