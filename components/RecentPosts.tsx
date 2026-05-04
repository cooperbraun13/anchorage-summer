import Link from "next/link";
import { PostCard } from "@/components/PostCard";

type RecentPostsProps = {
  posts: Array<{
    title: string;
    category: string;
    date: string;
    location?: string | null;
    excerpt: string;
    imageUrl?: string | null;
  }>;
};

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Recent Posts
        </h2>
        <Link
          href="/posts"
          className="text-sm font-semibold text-primary transition hover:text-foreground"
        >
          View all
        </Link>
      </div>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
