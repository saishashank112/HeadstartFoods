import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`relative w-8 h-8 md:w-12 md:h-12 ${light ? "text-primary" : "text-primary"}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M12 2C8.5 2 5.5 5 5.5 9c0 3.5 2.5 6.5 6.5 6.5s6.5-3 6.5-6.5c0-4-3-7-6.5-7z" />
          <path d="M12 15.5c0 1.5-1 3.5-3.5 3.5" />
          <path d="M12 2c0-1 .5-1.5 1.5-1.5" />
        </svg>
      </div>
      <span className={`font-display text-[12px] md:text-xl font-bold transition-colors ${light ? "text-white" : "text-navy"} group-hover:text-primary whitespace-nowrap`}>
        HEADSTART FOODS
      </span>
    </Link>
  );
}
