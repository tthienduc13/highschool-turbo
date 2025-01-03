export function formatDate(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleDateString("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
