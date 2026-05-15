import type { ReactElement, SVGProps } from "react";

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
  const Icon = statIcons[label] ?? FieldNoteIcon;

  return <Icon aria-hidden="true" className="size-6" />;
}

const statIcons: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => ReactElement
> = {
  Food: FoodIcon,
  Hikes: MountainIcon,
  Map: MapPinIcon,
  Miles: TrailIcon,
  Posts: FieldNoteIcon,
  Rating: StarIcon,
};

function FieldNoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 3.5h7l3 3v14H7v-17Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5v4h4M9.5 11h5M9.5 14.5h5M9.5 18h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m3 19 6.5-11 4 6 2.5-4 5 9H3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m7.5 15 2-2.5 2.4 3.1M14.7 14.1l1.3-1.7 1.9 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 19c3.7-.2 5.4-2 4.8-4.2-.5-1.8.6-3.2 2.8-3.5 3-.4 4.6-2 4.4-5.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17 7.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM12.5 13.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m12 3.8 2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6L7.2 19l.9-5.5-4-3.9 5.5-.8 2.4-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.3a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FoodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 3.5v8M4.7 3.5v8M9.3 3.5v8M4.7 11.5h4.6M7 11.5v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5c2.1 1.9 2.9 5.6 1.2 8.2-.5.8-1.1 1.4-1.7 1.7v7.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
