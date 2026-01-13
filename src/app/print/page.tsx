"use client";

import { useEffect, useState } from "react";
// Import các component từ thư mục tương ứng
import MB from "@/components/HDBT/MB";
import GUQ from "@/components/HDBT/GUQ";
import TX from "@/components/HDBT/TX";
import PLTX from "@/components/HDBT/PLTX";
import BGBT from "@/components/HDBT/BG";

import CC from "@/components/HDCM/CC";
import SD from "@/components/HDCM/SD";
import QL from "@/components/HDCM/QL";
import TB from "@/components/HDCM/TB";
import BGCM from "@/components/HDCM/BG";

export default function PrintPage() {
  const [transactionType, setTransactionType] = useState<string | null>(null);

  useEffect(() => {
    // Lấy loại hình để biết cần in bộ hợp đồng nào
    const type = localStorage.getItem("vehicle_transaction_type");
    setTransactionType(type);

    // Kích hoạt lệnh in sau khi component mount
    if (type) {
      const timer = setTimeout(() => {
        window.print();
      }, 800); // Đợi 0.8s để đảm bảo CSS và nội dung load xong
      return () => clearTimeout(timer);
    }
  }, []);

  if (!transactionType) return null;

  return (
    <>
      {/* Không cần div bọc ngoài từng component vì bạn đã có logic ngắt trang bên trong */}
      {transactionType === "hirePurchase" ? (
        <>
          <MB />
          <GUQ />
          <TX />
          <PLTX />
          <BGBT />
        </>
      ) : (
        <>
          <CC />
          <SD />
          <QL />
          <TB />
          <BGCM />
        </>
      )}
    </>
  );
}