import {
  ForkKnife,
  MapPin,
  Mountains,
  Notebook,
  Path,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  framed?: boolean;
};

export function StatCard({ label, value, detail, framed }: StatCardProps) {
  return (
    <div
      className={
        framed
          ? "flex min-h-24 items-center gap-4 rounded-lg border border-border bg-white/95 p-4 shadow-soft"
          : "flex min-h-24 items-center gap-4 py-4"
      }
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/10 bg-primary-soft text-primary">
        <StatIcon label={label} />
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <p className="font-serif text-3xl font-semibold leading-none text-foreground">
            {value}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function StatIcon({ label }: { label: string }) {
  const Icon = statIcons[label] ?? Notebook;

  return <Icon aria-hidden="true" className="size-6" weight="duotone" />;
}

const statIcons: Record<string, Icon> = {
  Food: ForkKnife,
  Hikes: Mountains,
  Map: MapPin,
  Miles: Path,
  Posts: Notebook,
  Rating: Star,
};
