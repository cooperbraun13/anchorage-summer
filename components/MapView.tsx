"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { siteConfig } from "@/lib/site-config";

export type MapPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
};

type MapViewProps = {
  posts: MapPost[];
  className?: string;
  compact?: boolean;
};

const markerIcon = L.divIcon({
  className: "",
  html: '<span class="block size-6 rounded-full border-4 border-white bg-primary shadow-soft"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export function MapView({ posts, className = "h-[32rem]", compact }: MapViewProps) {
  const mappedPosts = posts.filter(
    (post): post is MapPost & { latitude: number; longitude: number } =>
      post.latitude !== null && post.longitude !== null,
  );

  if (mappedPosts.length === 0) {
    return (
      <div
        className={`flex ${className} items-center justify-center rounded-xl border border-border bg-primary-soft/50 p-8 text-center`}
      >
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            No mapped posts yet
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add latitude and longitude to posts, and they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={siteConfig.map.defaultCenter}
      zoom={compact ? siteConfig.map.defaultZoom - 1 : siteConfig.map.defaultZoom}
      scrollWheelZoom={!compact}
      className={`${className} rounded-xl border border-border`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappedPosts.map((post) => (
        <Marker
          key={post.id}
          position={[post.latitude, post.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <div className="grid gap-1">
              <strong>{post.title}</strong>
              <span>{post.category}</span>
              {post.location ? <span>{post.location}</span> : null}
              <a href={`/posts/${post.slug}`}>View post</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
