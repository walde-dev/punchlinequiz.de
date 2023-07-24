export function sanitizeString(string: string): string {
  return string
    .toLocaleLowerCase()
    .replaceAll("-", "")
    .replaceAll("'", "")
    .replaceAll("`", "")
    .replaceAll(".", "")
    .replaceAll(" ", "");
}
