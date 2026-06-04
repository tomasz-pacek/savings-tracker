export const calculateRemainingValue = (
  currentAmount: number,
  targetAmount: number,
): number => {
  const current = currentAmount;
  const target = targetAmount;

  if (!target || isNaN(current) || isNaN(target)) return 0;

  return target - current;
};
