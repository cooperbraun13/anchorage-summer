export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}
