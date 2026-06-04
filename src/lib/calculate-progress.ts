export const calculateProgress = (
  currentAmount: number,
  targetAmount: number,
): number => {
  const current = currentAmount;
  const target = targetAmount;

  if (!target || isNaN(current) || isNaN(target)) return 0;

  const percent = (current / target) * 100;

  return Math.min(Math.round(percent), 100);
};
