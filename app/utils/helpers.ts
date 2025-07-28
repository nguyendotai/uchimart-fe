export const formatCurrencyToNumber = (
  value: string | null | undefined
): number => {
  if (!value) return 0;

  // Chỉ loại bỏ ký hiệu tiền tệ và dấu phẩy, giữ dấu chấm
  return Number(value.replace(/[₫,]/g, "").trim());
};

export const formatNumberToCurrency = (number: number) =>
  number.toLocaleString("vi-VN");
