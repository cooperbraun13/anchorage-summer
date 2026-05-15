import { MapPin } from "@phosphor-icons/react/dist/ssr";

export function SiteLogo() {
  return (
    <span className="flex items-center gap-2 text-foreground">
      <MapPin aria-hidden="true" className="size-5 text-primary" weight="duotone" />
      <span className="text-sm font-semibold leading-none sm:text-base">
        anchorage, ak
      </span>
    </span>
  );
}
