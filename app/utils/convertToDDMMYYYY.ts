export function convertToDDMMYYYY(isoDate: string) {
  if (!isoDate) return ''; // Handle empty or undefined input

  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year}`;
}
