import { StatCard } from "@/components/StatCard";

type StatsPanelProps = {
  title: string;
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function StatsPanel({ title, stats }: StatsPanelProps) {
  return (
    <aside className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-5 grid gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </aside>
  );
}
