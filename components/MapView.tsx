"use client";

import dynamic from "next/dynamic";

export type MapPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: Date;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  body: string;
  imageUrl: string | null;
};

export type MapViewProps = {
  posts: MapPost[];
  className?: string;
  compact?: boolean;
};

const LeafletMap = dynamic(
  () => import("@/components/LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-72 items-center justify-center rounded-sm border border-border bg-primary-soft/40 p-8 text-sm font-semibold text-primary">
        Loading map...
      </div>
    ),
  },
);

export function MapView({
  posts,
  className = "h-[32rem]",
  compact,
}: MapViewProps) {
  const mappedPosts = posts.filter(
    (post): post is MapPost & { latitude: number; longitude: number } =>
      post.latitude !== null && post.longitude !== null,
  );

  if (mappedPosts.length === 0) {
    return (
      <div
        className={`flex ${className} items-center justify-center rounded-sm border border-border bg-primary-soft/50 p-8 text-center`}
      >
        <div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            No mapped posts yet
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add latitude and longitude to posts, and they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return <LeafletMap posts={mappedPosts} className={className} compact={compact} />;
}
