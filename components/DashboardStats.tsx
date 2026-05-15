type DashboardStatsProps = {
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="rounded-lg border border-border bg-white/95 p-4 shadow-soft">
      <h2 className="font-serif text-xl font-semibold text-foreground">
        summer at a glance
      </h2>
      <div className="mt-4 grid gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground/80">{stat.detail}</p>
            </div>
            <p className="font-serif text-xl font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
