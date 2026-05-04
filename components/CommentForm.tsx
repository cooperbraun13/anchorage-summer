"use client";

import { useActionState } from "react";
import type { CommentActionState, CommentFormValues } from "@/lib/validations";
import { getEmptyCommentValues } from "@/lib/validations";

type CommentFormProps = {
  action: (
    previousState: CommentActionState,
    formData: FormData,
  ) => Promise<CommentActionState>;
};

const initialState: CommentActionState = {};

export function CommentForm({ action }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const values: CommentFormValues =
    state.ok ? getEmptyCommentValues() : state.values ?? getEmptyCommentValues();

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6"
    >
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Leave a Comment
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Comments are reviewed before going live.
        </p>
      </div>

      {state.message ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            state.ok
              ? "border-primary-soft bg-primary-soft text-primary"
              : "border-border bg-muted text-foreground"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <input
        className="hidden"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        defaultValue={values.website}
        aria-hidden="true"
      />

      <label className="grid gap-2 text-sm font-semibold text-foreground">
        Your name
        <input
          className={inputClassName}
          name="name"
          required
          maxLength={50}
          defaultValue={values.name}
          placeholder="Jane"
        />
        {state.errors?.name ? (
          <span className="text-xs font-semibold text-red-700">
            {state.errors.name}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-semibold text-foreground">
        Leave a comment
        <textarea
          className={`${inputClassName} min-h-36 resize-y leading-7`}
          name="body"
          required
          maxLength={1000}
          defaultValue={values.body}
          placeholder="What did this make you want to try?"
        />
        {state.errors?.body ? (
          <span className="text-xs font-semibold text-red-700">
            {state.errors.body}
          </span>
        ) : null}
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary-soft";
