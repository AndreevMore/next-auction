export const getYearRange = (start = 1900, end = new Date().getFullYear()) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
