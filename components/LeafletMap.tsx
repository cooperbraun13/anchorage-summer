"use client";

import L from "leaflet";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { MapPost } from "@/components/MapView";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

type LeafletMapProps = {
  posts: Array<MapPost & { latitude: number; longitude: number }>;
  className: string;
  compact?: boolean;
};

const categoryColors = siteConfig.map.categoryColors as Record<string, string>;

function getCategoryColor(category: string, compact?: boolean) {
  if (compact) {
    return siteConfig.map.compactMarkerColor;
  }

  return (
    categoryColors[category.toUpperCase()] ?? siteConfig.map.defaultMarkerColor
  );
}

function getMarkerIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span class="block size-6 rounded-full border-4 border-white shadow-soft" style="background:${color}"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function LeafletMap({ posts, className, compact }: LeafletMapProps) {
  return (
    <MapContainer
      center={siteConfig.map.defaultCenter}
      zoom={compact ? siteConfig.map.defaultZoom - 1 : siteConfig.map.defaultZoom}
      scrollWheelZoom={!compact}
      className={`${className} rounded-sm border border-border`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {posts.map((post) => {
        const markerColor = getCategoryColor(post.category, compact);

        return (
          <Marker
            key={post.id}
            position={[post.latitude, post.longitude]}
            icon={getMarkerIcon(markerColor)}
          >
            <Popup minWidth={compact ? 180 : 260}>
              {compact ? (
                <div className="grid gap-1 text-sm">
                  <strong className="font-serif text-base text-foreground">
                    {post.title}
                  </strong>
                  <span className="font-semibold text-muted-foreground">
                    {post.category}
                  </span>
                  {post.location ? <span>{post.location}</span> : null}
                  <a
                    href={`/posts/${post.slug}`}
                    className="mt-1 font-semibold text-primary"
                  >
                    View post
                  </a>
                </div>
              ) : (
                <div className="w-64 overflow-hidden text-sm">
                  <div className="relative h-28 overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={post.imageUrl || siteConfig.assets.defaultPostImage}
                      alt=""
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-sm border px-2 py-1 text-[0.65rem] font-semibold"
                        style={{
                          borderColor: `${markerColor}33`,
                          background: `${markerColor}18`,
                          color: markerColor,
                        }}
                      >
                        {post.category}
                      </span>
                      <time className="text-xs font-semibold text-muted-foreground">
                        {formatDate(post.date)}
                      </time>
                      {post.rating ? (
                        <span className="text-xs font-semibold text-amber-600">
                          {post.rating}/10
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
                      {post.title}
                    </h3>
                    {post.location ? (
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">
                        {post.location}
                      </p>
                    ) : null}
                    <p className="mt-2 line-clamp-3 leading-6 text-foreground/75">
                      {post.body}
                    </p>
                    <a
                      href={`/posts/${post.slug}`}
                      className="mt-3 inline-flex rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-white"
                    >
                      View post
                    </a>
                  </div>
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
