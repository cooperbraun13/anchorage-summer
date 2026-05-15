import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { formatDate } from "@/lib/format";
import { formatStatNumber, getStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const stats = await getStats();
  const statCards = [
    {
      label: "Posts",
      value: formatStatNumber(stats.totalPosts),
      detail: "All adventures",
    },
    {
      label: "Hikes",
      value: formatStatNumber(stats.hikeTrailCount),
      detail: "Hikes and trails",
    },
    {
      label: "Miles",
      value: formatStatNumber(stats.totalDistance, 1),
      detail: "Total distance",
    },
    {
      label: "Rating",
      value:
        stats.averageRating === null
          ? "-"
          : formatStatNumber(stats.averageRating, 1),
      detail: "Average score",
    },
    {
      label: "Map",
      value: formatStatNumber(stats.mappedPosts),
      detail: "Places pinned",
    },
    {
      label: "Food",
      value: formatStatNumber(stats.foodCoffeeCount),
      detail: "Food and coffee",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 lg:px-10">
      <section className="border-b border-border/80 pb-7">
        <p className="mb-3 text-sm font-semibold text-accent">
          Summer dashboard
        </p>
        <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Stats
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          A quick rollup of posts, trails, distance, ratings, and categories.
        </p>
      </section>

      {stats.totalPosts > 0 ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <StatCard key={stat.label} {...stat} framed />
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-white/95 p-6 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Categories
              </h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {Object.entries(stats.categoryCounts).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="text-sm font-semibold text-primary">
                      {category}
                    </span>
                    <span className="font-serif text-2xl font-semibold text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white/95 p-6 shadow-soft">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Highest Rated
              </h2>
              <div className="mt-5 grid gap-3">
                {stats.highestRatedPosts.length > 0 ? (
                  stats.highestRatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      className="rounded-sm border border-border bg-muted/45 px-4 py-3 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {post.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {post.location ?? post.category} •{" "}
                            {formatDate(post.date)}
                          </p>
                        </div>
                        <span className="font-serif text-2xl font-semibold text-primary">
                          {post.rating}/10
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-sm border border-border bg-muted/45 p-4 text-sm leading-6 text-muted-foreground">
                    Add ratings to posts to see favorites here.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-lg border border-border bg-white/95 p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            No stats yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            Add your first post, and this page will start tracking the summer.
          </p>
        </section>
      )}
    </main>
  );
}
