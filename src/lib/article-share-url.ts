/**
 * Search context helps someone navigate back during the current visit, but it
 * should not become part of a copied or shared article link. Keep a deliberate
 * in-article anchor so sharing a specific section remains possible.
 */
export function articleShareUrl(currentUrl: string) {
  const url = new URL(currentUrl);
  url.searchParams.delete("q");
  return url.toString();
}
