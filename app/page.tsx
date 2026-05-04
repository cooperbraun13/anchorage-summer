import Image from "next/image";
import Link from "next/link";
import { FeaturedPost } from "@/components/FeaturedPost";
import { MapPreview } from "@/components/MapPreview";
import { RecentPosts } from "@/components/RecentPosts";
import { StatsPanel } from "@/components/StatsPanel";
import { siteConfig } from "@/lib/site-config";

const featuredPost = {
  title: "Flattop Mountain Trail",
  category: "Hike",
  date: "June 15, 2024",
  location: "Chugach State Park, AK",
  elevation: "3,510 ft",
  excerpt:
    "Incredible views of Anchorage, the inlet, and surrounding peaks. A tough climb, but the panorama from the top is worth it.",
  rating: "4.5",
  imageUrl:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
  meta: ["Moderate", "4.3 mi", "2.5-3 hrs"],
};

const stats = [
  { label: "Posts", value: "24", detail: "All adventures" },
  { label: "Hikes", value: "8", detail: "Trails explored" },
  { label: "Miles", value: "41.2", detail: "Total explored" },
];

const recentPosts = [
  {
    title: "Moose's Tooth Pizza",
    category: "Food",
    date: "June 12, 2024",
    location: "Anchorage, AK",
    excerpt: "The holy grail. Worth every bite and every minute of the wait.",
    imageUrl:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tony Knowles Coastal Trail",
    category: "Hike",
    date: "June 8, 2024",
    location: "Anchorage, AK",
    excerpt: "Perfect long walk or bike ride with epic views of the inlet.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Byron Glacier Overlook",
    category: "Hike",
    date: "May 28, 2024",
    location: "Chugach State Park",
    excerpt: "Short hike, big payoff. Wildflowers are popping this time of year.",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <section className="grid items-center gap-8 pt-2 md:grid-cols-[220px_1fr] lg:pt-8">
        <div className="mx-auto flex size-44 items-center justify-center rounded-full border border-border bg-card p-2 shadow-soft md:mx-0">
          <div className="relative size-full overflow-hidden rounded-full">
            <Image
              src={siteConfig.assets.heroBadge}
              alt=""
              fill
              priority
              sizes="176px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="max-w-3xl text-center md:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Summer field notes
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteConfig.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <FeaturedPost post={featuredPost} />
        <StatsPanel title="Summer at a Glance" stats={stats} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_460px]">
        <RecentPosts posts={recentPosts} />
        <MapPreview />
      </section>

      <div className="flex justify-center pb-8">
        <Link
          href="/posts"
          className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          View all posts
        </Link>
      </div>
    </main>
  );
}
