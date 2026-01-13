// utils/numberToText.ts

// ... (Giữ nguyên các biến MANG_SO, MANG_HANG và hàm docSo3ChuSo cũ) ...
const MANG_SO = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const MANG_HANG = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function docSo3ChuSo(baso: number): string {
    // ... (Giữ nguyên logic hàm docSo3ChuSo như cũ)
    let tram = Math.floor(baso / 100);
    let chuc = Math.floor((baso % 100) / 10);
    let donvi = baso % 10;
    let ketqua = '';
  
    if (tram !== 0) {
      ketqua += MANG_SO[tram] + ' trăm';
      if (chuc === 0 && donvi !== 0) ketqua += ' linh';
    }
  
    if (chuc !== 0 && chuc !== 1) {
      ketqua += ' ' + MANG_SO[chuc] + ' mươi';
      if (chuc === 0 && donvi !== 0) ketqua += ' linh';
    } else if (chuc === 1) {
      ketqua += ' mười';
    }
  
    switch (donvi) {
      case 1:
        if (chuc > 1) ketqua += ' mốt';
        else ketqua += ' ' + MANG_SO[donvi];
        break;
      case 5:
        if (chuc === 0) ketqua += ' ' + MANG_SO[donvi];
        else ketqua += ' lăm';
        break;
      case 4:
        if (chuc > 1) ketqua += ' tư';
        else ketqua += ' ' + MANG_SO[donvi];
        break;
      case 0:
        break;
      default:
        ketqua += ' ' + MANG_SO[donvi];
        break;
    }
  
    return ketqua;
}

// === CẬP NHẬT HÀM CHÍNH TẠI ĐÂY ===
export const numberToText = (numberInput: number | string | undefined | null): string => {
  if (numberInput === undefined || numberInput === null || numberInput === '') return '';

  // BƯỚC QUAN TRỌNG: Chuyển về string và Xóa mọi dấu phẩy "," hoặc chấm "." trước khi parse
  const cleanNumber = numberInput.toString().replace(/[,.]/g, ''); 
  
  let so = Number(cleanNumber);
  
  if (isNaN(so)) return 'Số không hợp lệ';
  if (so === 0) return 'Không';

  // ... (Phần logic while loop bên dưới giữ nguyên) ...
  let tienTo = '';
  if (so < 0) {
    tienTo = 'Âm ';
    so = Math.abs(so);
  }

  let position = 0;
  let str = '';
  let i = 0;
  
  while (so > 0) {
    let baSo = so % 1000;
    if (i > 0 && so > 0 && baSo === 0) {
        // Do nothing
    } else if (baSo > 0) {
      let kieuDoc = docSo3ChuSo(baSo);
      if (Math.floor(so / 1000) > 0 && baSo < 100) {
          kieuDoc = 'không trăm ' + kieuDoc.trim(); 
      }
      str = kieuDoc.trim() + ' ' + MANG_HANG[i] + ' ' + str;
    }
    so = Math.floor(so / 1000);
    i++;
  }

  let result = tienTo + str.trim();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result.replace(/\s+/g, ' ');
};

export const formatCurrencyText = (amount: number | string | undefined): string => {
    return amount ? `${numberToText(amount)} đồng` : '';
}