import { formatDate } from "@/lib/format";

type CommentListProps = {
  comments: Array<{
    id: string;
    name: string;
    body: string;
    createdAt: Date;
  }>;
};

export function CommentList({ comments }: CommentListProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Comments
        </h2>
        <span className="text-sm font-semibold text-muted-foreground">
          {comments.length}
        </span>
      </div>

      {comments.length > 0 ? (
        <div className="mt-5 grid gap-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
            className="rounded-xl border border-border bg-background/60 p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {comment.name}
                </h3>
                <time className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-foreground/80">
                {comment.body}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted-foreground">
          No approved comments yet.
        </p>
      )}
    </section>
  );
}
