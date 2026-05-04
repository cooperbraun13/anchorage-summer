type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-bold text-primary">
        {label.slice(0, 1)}
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <p className="font-serif text-3xl font-bold leading-none text-foreground">
            {value}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
