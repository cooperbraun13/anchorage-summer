import Image from "next/image";

type PostCardProps = {
  post: {
    title: string;
    category: string;
    date: string;
    location: string;
    excerpt: string;
    imageUrl: string;
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={post.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[0.68rem] font-bold uppercase text-primary">
          {post.category}
        </span>
        <h3 className="mt-2 font-serif text-xl font-bold text-foreground">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {post.date} <span aria-hidden="true">|</span> {post.location}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/80">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
