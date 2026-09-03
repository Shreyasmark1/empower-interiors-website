"use client";

import { LoginButton } from "@/components/Login-Button/login-button";
import { CloseIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  onClick?: () => void;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
  categories?: NavItem[];
  pages?: NavItem[];
  className?: string;
};

const defaultCategories: NavItem[] = [
  { label: "Seating" },
  { label: "Tables" },
  { label: "Lighting" },
  { label: "Storage" },
  { label: "Decor" },
];

const defaultPages: NavItem[] = [
  { label: "About Us" },
  { label: "Services" },
  { label: "Contact" },
  { label: "FAQ" },
];

function MobileMenu({
  isOpen,
  onClose,
  onLogin,
  categories = defaultCategories,
  pages = defaultPages,
  className,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50 md:hidden", className)}>
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-background shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <span className="text-base font-semibold text-foreground">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CloseIcon className="size-5 shrink-0" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          
          <nav className="flex flex-col py-2">
            {categories.length > 0 ? (
              <>
                <span className="px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Categories
                </span>
                {categories.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted"
                    onClick={() => {
                      onClose();
                      item.onClick?.();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : null}

            {pages.length > 0 ? (
              <>
                <span className="px-4 pt-6 pb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Pages
                </span>
                {pages.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted"
                    onClick={() => {
                      onClose();
                      item.onClick?.();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : null}
          </nav>

          <div className="border-b border-border p-4">
            <LoginButton
              onLogin={() => {
                onClose();
                onLogin?.();
              }}
            />
          </div>

        </div>
        
      </div>
    </div>
  );
}

export { MobileMenu };
export type { MobileMenuProps, NavItem };
