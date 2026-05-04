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
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
      <section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Summer dashboard
        </p>
        <h1 className="font-serif text-5xl font-bold text-foreground">Stats</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          A quick rollup of posts, trails, distance, ratings, and categories.
        </p>
      </section>

      {stats.totalPosts > 0 ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Categories
              </h2>
              <div className="mt-5 grid gap-3">
                {Object.entries(stats.categoryCounts).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3"
                  >
                    <span className="text-sm font-bold text-primary">
                      {category}
                    </span>
                    <span className="font-serif text-2xl font-bold text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Highest Rated
              </h2>
              <div className="mt-5 grid gap-3">
                {stats.highestRatedPosts.length > 0 ? (
                  stats.highestRatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      className="rounded-xl border border-border bg-background/60 px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-foreground">
                            {post.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {post.location ?? post.category} •{" "}
                            {formatDate(post.date)}
                          </p>
                        </div>
                        <span className="font-serif text-2xl font-bold text-primary">
                          {post.rating}/10
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted-foreground">
                    Add ratings to posts to see favorites here.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
          <h2 className="font-serif text-3xl font-bold text-foreground">
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
