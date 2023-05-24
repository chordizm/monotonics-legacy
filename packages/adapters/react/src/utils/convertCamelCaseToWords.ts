export const convertCamelCaseToWords = (s: string): string => {
  const result = s.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

  return result
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
