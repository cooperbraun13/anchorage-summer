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
    <aside className="rounded-lg border border-border bg-white/95 p-5 shadow-soft sm:p-6">
      <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-5 divide-y divide-border border-y border-border">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </aside>
  );
}
