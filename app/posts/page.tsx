import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/format";
import { getPostCategories, getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PostsPageProps = {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = (await searchParams) ?? {};
  const [posts, categories] = await Promise.all([
    getPosts(params),
    getPostCategories(),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-9 sm:px-8 lg:px-10">
      <section className="flex flex-col justify-between gap-5 border-b border-border/80 pb-7 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold text-accent">
            Field notes
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Posts
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Browse hikes, food spots, trail notes, and internship-life updates.
          </p>
        </div>
        <Link
          href="/posts/new"
          className="inline-flex w-fit items-center rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Add Post
        </Link>
      </section>

      <form className="grid gap-3 rounded-lg border border-border bg-white/95 p-4 shadow-soft md:grid-cols-[1fr_180px_160px_auto] md:p-5">
        <input
          className="rounded-sm border border-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary-soft"
          name="search"
          placeholder="Search title, location, or body"
          defaultValue={params.search}
        />
        <select
          className="rounded-sm border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
          name="category"
          defaultValue={params.category}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="rounded-sm border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
          name="sort"
          defaultValue={params.sort ?? "newest"}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button
          type="submit"
          className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Filter
        </button>
      </form>

      {posts.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-border bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft"
            >
              <PostCard
                post={{
                  title: post.title,
                  slug: post.slug,
                  category: post.category,
                  date: formatDate(post.date),
                  location: post.location,
                  excerpt: post.body,
                  imageUrl: post.imageUrl,
                  rating: post.rating,
                }}
              />
            </div>
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-border bg-white/95 p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            No posts yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            Add the first Anchorage note, or clear your filters to see every
            post.
          </p>
        </section>
      )}
    </main>
  );
}
