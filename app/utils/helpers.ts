export const formatCurrencyToNumber = (value: string | null | undefined): number => {
  if (!value) return 0;
  return Number(value.replace(/[₫,.]/g, "").trim());
};
