import { cn } from "@/lib/utils"

function MobileLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mobile-logo-e-gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C026D3" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="8"
        fill="url(#mobile-logo-e-gradient)"
      />
      <path
        d="M11 11h10M11 16h10M11 21h6"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { MobileLogo }
