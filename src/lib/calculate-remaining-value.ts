export const calculateRemainingValue = (
  currentAmount: string,
  targetAmount: string,
): number => {
  const current = Number(currentAmount);
  const target = Number(targetAmount);

  if (!target || isNaN(current) || isNaN(target)) return 0;

  return target - current;
};
