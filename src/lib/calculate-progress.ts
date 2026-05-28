export const calculateProgress = (
  currentAmount: string,
  targetAmount: string,
): number => {
  const current = Number(currentAmount);
  const target = Number(targetAmount);

  if (!target || isNaN(current) || isNaN(target)) return 0;

  const percent = (current / target) * 100;

  return Math.min(Math.round(percent), 100);
};
