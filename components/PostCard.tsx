import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type PostCardProps = {
  post: {
    title: string;
    slug?: string;
    category: string;
    date: string;
    location?: string | null;
    excerpt: string;
    imageUrl?: string | null;
    rating?: number | null;
  };
};

export function PostCard({ post }: PostCardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
        <Image
          src={post.imageUrl || siteConfig.assets.defaultPostImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-primary/10 bg-primary-soft px-2.5 py-1 text-[0.68rem] font-semibold text-primary">
            {post.category}
          </span>
          {post.rating ? (
            <span className="text-xs font-semibold text-amber-600">
              {post.rating}/10
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {post.date}
          {post.location ? (
            <>
              {" "}
              <span aria-hidden="true">|</span> {post.location}
            </>
          ) : null}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/75">
          {post.excerpt}
        </p>
      </div>
    </>
  );

  if (post.slug) {
    return (
      <article className="group min-w-0">
        <Link href={`/posts/${post.slug}`}>{content}</Link>
      </article>
    );
  }

  return (
    <article className="group min-w-0">
      {content}
    </article>
  );
}
