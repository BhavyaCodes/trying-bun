export const calculateFib = (index: number): number => {
  if (index === 0) {
    return 0;
  }

  if (index === 1) {
    return 1;
  }

  return calculateFib(index - 1) + calculateFib(index - 2);
};
