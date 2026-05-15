import { Mountains } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";

export function SiteLogo() {
  return (
    <span className="flex items-center gap-3 text-primary">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/15 bg-primary-soft/85 shadow-sm">
        <Mountains
          aria-hidden="true"
          className="size-9"
          weight="duotone"
        />
      </span>
      <span className="font-serif text-2xl font-semibold leading-none sm:text-[1.7rem]">
        {siteConfig.name}
      </span>
    </span>
  );
}
