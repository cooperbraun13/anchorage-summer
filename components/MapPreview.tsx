import Link from "next/link";
import { MapView, type MapPost } from "@/components/MapView";

type MapPreviewProps = {
  posts: MapPost[];
};

export function MapPreview({ posts }: MapPreviewProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Places I&apos;ve Been
        </h2>
        <Link
          href="/map"
          className="text-sm font-semibold text-primary transition hover:text-foreground"
        >
          Open map
        </Link>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl">
        <MapView posts={posts} className="h-72 sm:h-80" compact />
      </div>
    </section>
  );
}
