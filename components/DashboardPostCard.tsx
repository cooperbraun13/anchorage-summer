import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type DashboardPostCardProps = {
  post: {
    title: string;
    slug: string;
    category: string;
    date: string;
    location?: string | null;
    excerpt: string;
    imageUrl?: string | null;
  };
};

export function DashboardPostCard({ post }: DashboardPostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-lg border border-border bg-white/95 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
        <Image
          src={post.imageUrl || siteConfig.assets.defaultPostImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 text-sm text-muted-foreground">
        {post.date} <span aria-hidden="true">|</span> {post.category}
      </div>
      <h2 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
        {post.title}
      </h2>
      {post.location ? (
        <p className="mt-1 text-sm text-muted-foreground">{post.location}</p>
      ) : null}
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-foreground/75">
        {post.excerpt}
      </p>
    </Link>
  );
}
