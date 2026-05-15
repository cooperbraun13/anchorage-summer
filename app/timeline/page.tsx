import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type TimelinePost = Awaited<ReturnType<typeof getPosts>>[number];

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

function groupPostsByMonth(posts: TimelinePost[]) {
  const groups = new Map<string, TimelinePost[]>();

  for (const post of posts) {
    const label = monthFormatter.format(post.date);
    groups.set(label, [...(groups.get(label) ?? []), post]);
  }

  return Array.from(groups, ([label, groupedPosts]) => ({
    label,
    posts: groupedPosts,
  }));
}

export default async function TimelinePage() {
  const posts = await getPosts({ sort: "oldest" });
  const timelineGroups = groupPostsByMonth(posts);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 lg:px-10">
      <section className="flex flex-col justify-between gap-5 border-b border-border/80 pb-7 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold text-accent">
            Summer journal
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Timeline
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Follow {siteConfig.shortName} in order, from the first arrivals to
            the latest field notes.
          </p>
        </div>
        <span className="w-fit rounded-sm border border-primary/10 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
          {posts.length} {posts.length === 1 ? "entry" : "entries"}
        </span>
      </section>

      {timelineGroups.length > 0 ? (
        <Timeline groups={timelineGroups} />
      ) : (
        <section className="rounded-lg border border-border bg-white/95 p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            No timeline yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            Add the first post, and the summer story will start here.
          </p>
          <Link
            href="/posts/new"
            className="mt-5 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Add Post
          </Link>
        </section>
      )}
    </main>
  );
}
