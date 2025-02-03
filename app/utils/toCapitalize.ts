export function toCapitalize(str: string) {
  if (typeof str !== "string") return ""; // Ensure it's a string
  if (!str) return str; // Handle empty strings or null
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toUpperCase(str: string) {
  if (typeof str !== "string") return ""; // Ensure it's a string
  if (!str) return str; // Handle empty strings or null
  return str.toUpperCase();
}
