import Link from "next/link";
import { MapView } from "@/components/MapView";
import { getPostsWithCoordinates } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type MapPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

function getCategoryHref(category?: string) {
  if (!category) {
    return "/map";
  }

  return `/map?category=${encodeURIComponent(category)}`;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = (await searchParams) ?? {};
  const selectedCategory = params.category?.trim();
  const allPosts = await getPostsWithCoordinates();
  const categories = Array.from(
    new Set(allPosts.map((post) => post.category)),
  ).sort();
  const posts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 lg:px-10">
      <section className="flex flex-col justify-between gap-5 border-b border-border/80 pb-7 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold text-accent">
            OpenStreetMap
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Map
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Posts with coordinates appear as markers around{" "}
            {siteConfig.shortName}. Add latitude and longitude while editing a
            post to place it here.
          </p>
        </div>
        <span className="w-fit rounded-sm border border-primary/10 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
          {posts.length} mapped
        </span>
      </section>

      {categories.length > 0 ? (
        <nav
          aria-label="Map category filters"
          className="flex flex-wrap gap-2 rounded-lg border border-border bg-white/95 p-3 shadow-soft"
        >
          <Link
            href={getCategoryHref()}
            className={`rounded-sm border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white ${
              selectedCategory
                ? "border-border bg-white text-foreground"
                : "border-primary bg-primary text-white"
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={getCategoryHref(category)}
              className={`rounded-sm border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white ${
                selectedCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-foreground"
              }`}
            >
              {category}
            </Link>
          ))}
        </nav>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-border bg-white/95 p-3 shadow-soft sm:p-4">
        <MapView posts={posts} />
      </section>
    </main>
  );
}
