import { deletePostAction } from "@/app/posts/actions";

type DeletePostFormProps = {
  slug: string;
  showError?: boolean;
};

export function DeletePostForm({ slug, showError }: DeletePostFormProps) {
  const deleteAction = deletePostAction.bind(null, slug);

  return (
    <form
      action={deleteAction}
      className="grid gap-4 rounded-lg border border-red-200 bg-red-50/70 p-6"
    >
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Delete Post
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This removes the post and any future related records from the database.
        </p>
      </div>
      {showError ? (
        <p className="rounded-sm bg-white px-4 py-3 text-sm font-semibold text-red-700">
          Enter the owner password to delete this post.
        </p>
      ) : null}
      <label className="grid gap-2 text-sm font-semibold text-foreground">
        Owner Password
        <input
          className="w-full rounded-sm border border-red-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          name="adminPassword"
          required
          type="password"
          autoComplete="current-password"
        />
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-sm bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-800"
        >
          Delete Post
        </button>
      </div>
    </form>
  );
}
