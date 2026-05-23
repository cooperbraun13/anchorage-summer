import Image from "next/image";
import Link from "next/link";
import { DashboardPostCard } from "@/components/DashboardPostCard";
import { DashboardRecentNotes } from "@/components/DashboardRecentNotes";
import { DashboardStats } from "@/components/DashboardStats";
import { Fireplace } from "@/components/Fireplace";
import { MapPreview } from "@/components/MapPreview";
import { formatDate } from "@/lib/format";
import { getPosts, getPostsWithCoordinates } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { formatStatNumber, getStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [stats, recentPosts, mappedPosts] = await Promise.all([
    getStats(),
    getPosts(),
    getPostsWithCoordinates(),
  ]);

  const homepageStats = [
    {
      label: "Posts",
      value: formatStatNumber(stats.totalPosts),
      detail: "All adventures",
    },
    {
      label: "Hikes",
      value: formatStatNumber(stats.hikeTrailCount),
      detail: "Trails explored",
    },
    {
      label: "Miles",
      value: formatStatNumber(stats.totalDistance, 1),
      detail: "Total explored",
    },
  ];

  const dashboardPosts = recentPosts.slice(0, 2).map((post) => ({
    title: post.title,
    slug: post.slug,
    category: post.category,
    date: formatDate(post.date),
    location: post.location,
    excerpt: post.body,
    imageUrl: post.imageUrl,
  }));
  const dashboardRecentPosts = recentPosts.slice(2, 5).map((post) => ({
    title: post.title,
    slug: post.slug,
    category: post.category,
    date: formatDate(post.date),
    location: post.location,
  }));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 py-8 sm:px-8 lg:px-0 lg:py-10">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="flex min-h-[32rem] flex-col rounded-lg border border-border bg-white/95 p-5 shadow-soft sm:p-6">
          <p className="text-sm font-semibold text-accent">
            summer field notes
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            {siteConfig.hero.subtitle}
          </p>
          <div className="relative mt-5 min-h-64 flex-1 overflow-hidden rounded-sm bg-muted">
            <Image
              src={siteConfig.assets.homepageBoxImage}
              alt=""
              fill
              priority
              quality={100}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <div className="grid h-full grid-rows-[1fr_auto] gap-4">
          <Fireplace />
          <DashboardStats stats={homepageStats} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {dashboardPosts.map((post) => (
          <DashboardPostCard key={post.slug} post={post} />
        ))}
        {dashboardPosts.length === 0 ? (
          <section className="rounded-lg border border-border bg-white/95 p-5 shadow-soft lg:col-span-2">
            <p className="text-sm font-semibold text-accent">latest notes</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
              no posts yet
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              add your first field note, and recent posts will show up here.
            </p>
            <Link
              href="/posts/new"
              className="mt-5 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              add post
            </Link>
          </section>
        ) : null}
        <DashboardRecentNotes posts={dashboardRecentPosts} />
      </section>

      <section>
        <MapPreview posts={mappedPosts} />
      </section>

      <div className="flex justify-center pb-8 pt-1">
        <Link
          href="/posts"
          className="rounded-sm border border-primary/20 bg-card px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
        >
          view all posts
        </Link>
      </div>
    </main>
  );
}
