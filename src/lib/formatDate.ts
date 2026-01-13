export const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    // Kiểm tra xem có đúng format yyyy-mm-dd không
    const parts = isoDate.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return isoDate;
  };
