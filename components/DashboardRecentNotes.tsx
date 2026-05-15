import Link from "next/link";

type DashboardRecentNotesProps = {
  posts: Array<{
    title: string;
    slug: string;
    category: string;
    date: string;
    location?: string | null;
  }>;
};

export function DashboardRecentNotes({ posts }: DashboardRecentNotesProps) {
  return (
    <section className="rounded-lg border border-border bg-white/95 p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          recent notes
        </h2>
        <Link
          href="/posts"
          className="text-sm font-semibold text-primary transition hover:text-foreground"
        >
          view all
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="mt-4 divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block py-4 transition hover:translate-x-1"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="rounded-sm bg-primary-soft px-2 py-1 text-primary">
                  {post.category}
                </span>
                <time>{post.date}</time>
              </div>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
                {post.title}
              </h3>
              {post.location ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {post.location}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-sm border border-border bg-muted/45 p-4 text-sm leading-6 text-muted-foreground">
          no recent posts yet.
        </p>
      )}
    </section>
  );
}
