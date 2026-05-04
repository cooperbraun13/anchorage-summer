export type PostFormValues = {
  title: string;
  slug: string;
  category: string;
  date: string;
  location: string;
  latitude: string;
  longitude: string;
  rating: string;
  cost: string;
  distance: string;
  body: string;
  imageUrl: string;
};

export type PostValidationErrors = Partial<Record<keyof PostFormValues, string>>;

export type PostActionState = {
  message?: string;
  errors?: PostValidationErrors & {
    adminPassword?: string;
    form?: string;
  };
  values?: PostFormValues;
};

export type ValidPostInput = {
  title: string;
  slug: string;
  category: string;
  date: Date;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  cost: number | null;
  distance: number | null;
  body: string;
  imageUrl: string | null;
};

export type CommentFormValues = {
  name: string;
  body: string;
  website: string;
};

export type CommentValidationErrors = Partial<
  Record<keyof Pick<CommentFormValues, "name" | "body">, string>
>;

export type CommentActionState = {
  message?: string;
  ok?: boolean;
  errors?: CommentValidationErrors;
  values?: CommentFormValues;
};

export type ValidCommentInput = {
  name: string;
  body: string;
  approved: false;
};

const emptyPostValues: PostFormValues = {
  title: "",
  slug: "",
  category: "",
  date: "",
  location: "",
  latitude: "",
  longitude: "",
  rating: "",
  cost: "",
  distance: "",
  body: "",
  imageUrl: "",
};

const emptyCommentValues: CommentFormValues = {
  name: "",
  body: "",
  website: "",
};

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostFormValues(formData: FormData): PostFormValues {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    category: getString(formData, "category").toUpperCase(),
    date: getString(formData, "date"),
    location: getString(formData, "location"),
    latitude: getString(formData, "latitude"),
    longitude: getString(formData, "longitude"),
    rating: getString(formData, "rating"),
    cost: getString(formData, "cost"),
    distance: getString(formData, "distance"),
    body: getString(formData, "body"),
    imageUrl: getString(formData, "imageUrl"),
  };
}

export function validatePostFormData(formData: FormData) {
  const values = getPostFormValues(formData);
  const errors: PostValidationErrors = {};

  const title = values.title.trim();
  const slug = slugify(values.slug || title);
  const category = values.category.trim();
  const date = parseDate(values.date);
  const body = values.body.trim();
  const latitude = parseOptionalNumber(values.latitude);
  const longitude = parseOptionalNumber(values.longitude);
  const rating = parseOptionalInteger(values.rating);
  const cost = parseOptionalNumber(values.cost);
  const distance = parseOptionalNumber(values.distance);
  const imageUrl = values.imageUrl.trim();

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!slug) {
    errors.slug = "Slug is required.";
  }

  if (!category) {
    errors.category = "Category is required.";
  }

  if (!date) {
    errors.date = "Date is required.";
  }

  if (!body) {
    errors.body = "Body is required.";
  }

  if (latitude !== null && (Number.isNaN(latitude) || latitude < -90 || latitude > 90)) {
    errors.latitude = "Latitude must be between -90 and 90.";
  }

  if (
    longitude !== null &&
    (Number.isNaN(longitude) || longitude < -180 || longitude > 180)
  ) {
    errors.longitude = "Longitude must be between -180 and 180.";
  }

  if (rating !== null && (Number.isNaN(rating) || rating < 1 || rating > 10)) {
    errors.rating = "Rating must be a whole number from 1 to 10.";
  }

  if (cost !== null && (Number.isNaN(cost) || cost < 0)) {
    errors.cost = "Cost must be greater than or equal to 0.";
  }

  if (distance !== null && (Number.isNaN(distance) || distance < 0)) {
    errors.distance = "Distance must be greater than or equal to 0.";
  }

  if (imageUrl && !isValidImageUrl(imageUrl)) {
    errors.imageUrl = "Use a valid URL or a local public path like /alaska/photo.jpg.";
  }

  if (Object.keys(errors).length > 0 || !date) {
    return {
      ok: false as const,
      errors,
      values: {
        ...values,
        slug,
      },
    };
  }

  return {
    ok: true as const,
    data: {
      title,
      slug,
      category,
      date,
      location: nullableString(values.location),
      latitude,
      longitude,
      rating,
      cost,
      distance,
      body,
      imageUrl: nullableString(imageUrl),
    } satisfies ValidPostInput,
  };
}

export function getEmptyPostValues() {
  return emptyPostValues;
}

export function getCommentFormValues(formData: FormData): CommentFormValues {
  return {
    name: getString(formData, "name"),
    body: getString(formData, "body"),
    website: getString(formData, "website"),
  };
}

export function validateCommentFormData(formData: FormData) {
  const values = getCommentFormValues(formData);
  const errors: CommentValidationErrors = {};
  const name = values.name.trim();
  const body = values.body.trim();

  if (values.website) {
    return {
      ok: true as const,
      spam: true as const,
      data: null,
    };
  }

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 50) {
    errors.name = "Name must be 50 characters or fewer.";
  }

  if (!body) {
    errors.body = "Comment is required.";
  } else if (body.length > 1000) {
    errors.body = "Comment must be 1000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false as const,
      errors,
      values,
    };
  }

  return {
    ok: true as const,
    spam: false as const,
    data: {
      name,
      body,
      approved: false,
    } satisfies ValidCommentInput,
  };
}

export function getEmptyCommentValues() {
  return emptyCommentValues;
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nullableString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseDate(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseOptionalNumber(value: string) {
  if (!value) {
    return null;
  }

  return Number(value);
}

function parseOptionalInteger(value: string) {
  if (!value) {
    return null;
  }

  const number = Number(value);
  return Number.isInteger(number) ? number : Number.NaN;
}

function isValidImageUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
