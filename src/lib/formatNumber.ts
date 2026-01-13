// utils/formatNumber.ts

export const formatNumber = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null || value === '') return '';
  
  // Chuyển về string và dùng Regex để thêm phẩy
  // \B: Không phải ranh giới từ, (?=(\d{3})+(?!\d)): Lookahead cho mỗi 3 số
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Cách dùng:
// formatNumber(1000000) -> "1,000,000"