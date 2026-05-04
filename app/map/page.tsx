import { MapView } from "@/components/MapView";
import { getPostsWithCoordinates } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const posts = await getPostsWithCoordinates();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 lg:px-10">
      <section className="flex flex-col justify-between gap-5 border-b border-border/80 pb-7 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            OpenStreetMap
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Map
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Posts with coordinates appear as markers around{" "}
            {siteConfig.shortName}. Add latitude and longitude while editing a
            post to place it here.
          </p>
        </div>
        <span className="w-fit rounded-sm border border-primary/10 bg-primary-soft px-4 py-2 text-sm font-bold text-primary">
          {posts.length} mapped
        </span>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-white/95 p-3 shadow-soft sm:p-4">
        <MapView posts={posts} />
      </section>
    </main>
  );
}
