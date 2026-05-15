import { siteConfig } from "@/lib/site-config";

export function SiteLogo() {
  return (
    <span className="flex items-center gap-3 text-primary">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary-soft/85 shadow-sm">
        <svg
          aria-hidden="true"
          className="size-9"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M5 34.5 16.8 14l6 9.2 4.7-7.3L43 34.5H5Z"
            fill="currentColor"
            opacity="0.13"
          />
          <path
            d="M5 34.5 16.8 14l6 9.2 4.7-7.3L43 34.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="m13.7 25.3 3.1-3.8 3.6 4.8M25 24.7l2.5-3.2 3.8 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 36.5h28M36.5 31.5v5M33.8 33.8h5.4M35 29.8h3"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-serif text-2xl font-semibold leading-none sm:text-[1.7rem]">
        {siteConfig.name}
      </span>
    </span>
  );
}
