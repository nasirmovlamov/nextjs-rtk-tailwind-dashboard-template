export function convertToDDMMYYYY(date: Date) {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date');
  }

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
  const year = date.getFullYear();

  // Return the formatted date in DD/MM/YYYY format
  return `${day}/${month}/${year}`;
}
