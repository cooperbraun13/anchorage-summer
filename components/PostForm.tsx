"use client";

import { useActionState, useId, useState } from "react";
import type { PostActionState, PostFormValues } from "@/lib/validations";
import { getEmptyPostValues } from "@/lib/validations";

type PostFormProps = {
  action: (
    previousState: PostActionState,
    formData: FormData,
  ) => Promise<PostActionState>;
  submitLabel: string;
  initialValues?: PostFormValues;
};

const initialState: PostActionState = {};

export function PostForm({
  action,
  submitLabel,
  initialValues,
}: PostFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const values = state.values ?? initialValues ?? getEmptyPostValues();

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-lg border border-border bg-white/95 p-5 shadow-soft sm:gap-6 sm:p-6"
    >
      {state.message ? (
        <div className="rounded-sm border border-primary/10 bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" error={state.errors?.title}>
          <input
            className={inputClassName}
            name="title"
            required
            defaultValue={values.title}
            placeholder="Flattop Mountain Trail"
          />
        </Field>

        <Field label="Slug" name="slug" error={state.errors?.slug}>
          <input
            className={inputClassName}
            name="slug"
            defaultValue={values.slug}
            placeholder="flattop-mountain-trail"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Category" name="category" error={state.errors?.category}>
          <input
            className={inputClassName}
            name="category"
            required
            defaultValue={values.category}
            placeholder="HIKE"
          />
        </Field>

        <Field label="Date" name="date" error={state.errors?.date}>
          <input
            className={inputClassName}
            name="date"
            required
            type="date"
            defaultValue={values.date}
          />
        </Field>

        <Field label="Rating" name="rating" error={state.errors?.rating}>
          <input
            className={inputClassName}
            name="rating"
            inputMode="numeric"
            min="1"
            max="10"
            type="number"
            defaultValue={values.rating}
            placeholder="9"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Location" name="location">
          <input
            className={inputClassName}
            name="location"
            defaultValue={values.location}
            placeholder="Anchorage, AK"
          />
        </Field>

        <Field label="Latitude" name="latitude" error={state.errors?.latitude}>
          <input
            className={inputClassName}
            name="latitude"
            inputMode="decimal"
            type="number"
            step="any"
            defaultValue={values.latitude}
            placeholder="61.2176"
          />
        </Field>

        <Field label="Longitude" name="longitude" error={state.errors?.longitude}>
          <input
            className={inputClassName}
            name="longitude"
            inputMode="decimal"
            type="number"
            step="any"
            defaultValue={values.longitude}
            placeholder="-149.8997"
          />
        </Field>
      </div>

      <div className="grid gap-4 border-y border-border py-5 md:grid-cols-2">
        <ImageUploadField error={state.errors?.imageFile} />

        <Field label="Image URL" name="imageUrl" error={state.errors?.imageUrl}>
          <input
            className={inputClassName}
            name="imageUrl"
            defaultValue={values.imageUrl}
            placeholder="Optional fallback"
          />
          <span className="text-xs font-medium text-muted-foreground">
            Used only when no file is uploaded.
          </span>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Cost" name="cost" error={state.errors?.cost}>
          <input
            className={inputClassName}
            name="cost"
            inputMode="decimal"
            min="0"
            type="number"
            step="any"
            defaultValue={values.cost}
            placeholder="0"
          />
        </Field>

        <Field label="Distance" name="distance" error={state.errors?.distance}>
          <input
            className={inputClassName}
            name="distance"
            inputMode="decimal"
            min="0"
            type="number"
            step="any"
            defaultValue={values.distance}
            placeholder="4.3"
          />
        </Field>
      </div>

      <Field label="Body" name="body" error={state.errors?.body}>
        <textarea
          className={`${inputClassName} min-h-52 resize-y leading-7`}
          name="body"
          required
          defaultValue={values.body}
          placeholder="Write the full post..."
        />
      </Field>

      <Field
        label="Owner Password"
        name="adminPassword"
        error={state.errors?.adminPassword}
      >
        <input
          className={inputClassName}
          name="adminPassword"
          required
          type="password"
          autoComplete="current-password"
        />
      </Field>

      {state.errors?.form ? (
        <p className="text-sm font-semibold text-red-700">{state.errors.form}</p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  children,
  error,
  label,
  name,
}: {
  children: React.ReactNode;
  error?: string;
  label: string;
  name: string;
}) {
  return (
    <label
      className="grid gap-2 text-sm font-semibold text-foreground"
      htmlFor={name}
    >
      <span>{label}</span>
      {children}
      {error ? (
        <span className="text-xs font-semibold text-red-700">{error}</span>
      ) : null}
    </label>
  );
}

function ImageUploadField({ error }: { error?: string }) {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  return (
    <div className="grid gap-2 text-sm font-semibold text-foreground">
      <label htmlFor={inputId}>Upload Image</label>
      <div className="flex min-h-11 items-center gap-3 rounded-sm border border-border bg-white px-3 py-2">
        <label
          htmlFor={inputId}
          className="shrink-0 cursor-pointer rounded-sm bg-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary/90"
        >
          Choose
        </label>
        <span className="min-w-0 truncate text-sm font-medium text-muted-foreground">
          {fileName || "No file selected"}
        </span>
      </div>
      <input
        id={inputId}
        className="sr-only"
        name="imageFile"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(event) => {
          setFileName(event.currentTarget.files?.[0]?.name ?? "");
        }}
      />
      <span className="text-xs font-medium text-muted-foreground">
        JPEG, PNG, WebP, or AVIF. Max 4 MB.
      </span>
      {error ? (
        <span className="text-xs font-semibold text-red-700">{error}</span>
      ) : null}
    </div>
  );
}

const inputClassName =
  "w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/65 focus:border-primary focus:ring-2 focus:ring-primary-soft";
