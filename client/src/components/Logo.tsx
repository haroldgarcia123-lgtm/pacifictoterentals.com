export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pacific Tote Co."
    >
      <text
        x="0"
        y="26"
        fontFamily="'Clash Display', 'General Sans', sans-serif"
        fontWeight="700"
        fontSize="24"
        letterSpacing="3"
        fill="currentColor"
      >
        PACIFIC TOTE CO.
      </text>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C62828" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
      </defs>
      <rect x="0" y="33" width="240" height="2" fill="url(#logo-gradient)" rx="1" />
    </svg>
  );
}
