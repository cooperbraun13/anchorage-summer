import Link from "next/link";
import {
  approveCommentAction,
  deleteCommentAction,
  isAdminAuthenticated,
  loginAdminAction,
} from "@/app/admin/comments/actions";
import { formatDate } from "@/lib/format";
import { getPendingComments } from "@/lib/comments";

export const dynamic = "force-dynamic";

type AdminCommentsPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminCommentsPage({
  searchParams,
}: AdminCommentsPageProps) {
  const [query, isAuthenticated] = await Promise.all([
    searchParams,
    isAdminAuthenticated(),
  ]);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-16 sm:px-8">
        <section>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Admin
          </p>
          <h1 className="font-serif text-5xl font-bold text-foreground">
            Comment Moderation
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Enter the owner password to review pending comments.
          </p>
        </section>

        <form
          action={loginAdminAction}
          className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
        >
          {query?.error ? (
            <p className="rounded-xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground">
              Enter the owner password to continue.
            </p>
          ) : null}
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            Owner Password
            <input
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft"
              name="adminPassword"
              required
              type="password"
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            View Pending Comments
          </button>
        </form>
      </main>
    );
  }

  const comments = await getPendingComments();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Admin
          </p>
          <h1 className="font-serif text-5xl font-bold text-foreground">
            Comment Moderation
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Review guest comments before they appear publicly on post pages.
          </p>
        </div>
        <span className="rounded-sm bg-primary-soft px-4 py-2 text-sm font-bold text-primary">
          {comments.length} pending
        </span>
      </section>

      {comments.length > 0 ? (
        <section className="grid gap-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <Link
                    href={`/posts/${comment.post.slug}`}
                    className="font-serif text-2xl font-bold text-foreground transition hover:text-primary"
                  >
                    {comment.post.title}
                  </Link>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {comment.name} • {formatDate(comment.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <form action={approveCommentAction.bind(null, comment.id)}>
                    <button
                      type="submit"
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={deleteCommentAction.bind(null, comment.id)}>
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-wrap rounded-xl border border-border bg-background/60 p-4 leading-7 text-foreground/80">
                {comment.body}
              </p>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            No pending comments
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            New guest comments will appear here before they go live.
          </p>
        </section>
      )}
    </main>
  );
}
