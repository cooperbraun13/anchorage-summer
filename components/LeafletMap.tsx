"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { MapPost } from "@/components/MapView";
import { siteConfig } from "@/lib/site-config";

type LeafletMapProps = {
  posts: Array<MapPost & { latitude: number; longitude: number }>;
  className: string;
  compact?: boolean;
};

const markerIcon = L.divIcon({
  className: "",
  html: '<span class="block size-6 rounded-full border-4 border-white bg-primary shadow-soft"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export function LeafletMap({ posts, className, compact }: LeafletMapProps) {
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
      {posts.map((post) => (
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
