import Image from "next/image";

type FeaturedPostProps = {
  post: {
    title: string;
    category: string;
    date: string;
    location: string;
    elevation: string;
    excerpt: string;
    rating: string;
    imageUrl: string;
    meta: string[];
  };
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:grid-cols-[1.12fr_0.88fr]">
      <div className="relative min-h-64 md:min-h-full">
        <Image
          src={post.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-sm bg-primary-soft px-3 py-1 text-xs font-bold uppercase text-primary">
            {post.category}
          </span>
          <time className="text-sm text-muted-foreground">{post.date}</time>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {post.location} <span aria-hidden="true">|</span> {post.elevation}
          </p>
        </div>
        <p className="line-clamp-4 leading-7 text-foreground/80">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-primary">
            Rating {post.rating}
          </span>
          {post.meta.map((item) => (
            <span
              key={item}
              className="rounded-sm bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
