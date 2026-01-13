"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const STORAGE_KEY_FORM = "vehicle_transaction_form_data";
const STORAGE_KEY_TYPE = "vehicle_transaction_type"; // Key kiểm tra loại hình

export function TopBar() {
  const pathname = usePathname();

  const [isDataValid, setIsDataValid] = useState(false);
  const [transactionType, setTransactionType] = useState<string | null>(null);

  // Hàm kiểm tra LocalStorage cho cả dữ liệu và loại hình
  const checkStorage = () => {
    if (typeof window !== "undefined") {
      // 1. Kiểm tra tính hợp lệ của dữ liệu (để enable/disable nút)
      const data = localStorage.getItem(STORAGE_KEY_FORM);
      try {
        const parsed = data ? JSON.parse(data) : null;
        setIsDataValid(!!(parsed && Object.keys(parsed).length > 0));
      } catch (e) {
        setIsDataValid(false);
      }

      // 2. Kiểm tra loại hình giao dịch (để lọc menu)
      const type = localStorage.getItem(STORAGE_KEY_TYPE);
      setTransactionType(type);
    }
  };

  useEffect(() => {
    checkStorage();

    const handleCustomUpdate = () => checkStorage();
    window.addEventListener("vehicle-storage-update", handleCustomUpdate);
    window.addEventListener("storage", handleCustomUpdate);

    return () => {
      window.removeEventListener("vehicle-storage-update", handleCustomUpdate);
      window.removeEventListener("storage", handleCustomUpdate);
    };
  }, []);

  const navItems = [
    {
      href: "/",
      label: "Trang chủ",
      info: "Thông tin giao dịch",
      isAlwaysActive: true,
    },

    // Nhóm Hợp đồng Bán Thuê (HDBT)
    {
      href: "/HDBT/MB",
      label: "MB",
      info: "Hợp đồng mua bán xe cũ",
      group: "hirePurchase",
    },
    {
      href: "/HDBT/GUQ",
      label: "GUQ",
      info: "Giấy ủy quyền",
      group: "hirePurchase",
    },
    {
      href: "/HDBT/TX",
      label: "TX",
      info: "Hợp đồng thuê xe",
      group: "hirePurchase",
    },
    {
      href: "/HDBT/PLTX",
      label: "PLTX",
      info: "Phụ lục hợp đồng thuê xe",
      group: "hirePurchase",
    },
    {
      href: "/HDBT/BG",
      label: "BG",
      info: "Biên bản giao nhận tài sản",
      group: "hirePurchase",
    },

    // Nhóm Hợp đồng Cầm Mượn (HDCM)
    { href: "/HDCM/CC", label: "CC", info: "Hợp đồng cầm cố", group: "pawn" },
    {
      href: "/HDCM/SD",
      label: "SD",
      info: "Phụ lục thỏa thuận sử dụng tài sản",
      group: "pawn",
    },
    {
      href: "/HDCM/QL",
      label: "QL",
      info: "Hợp đồng dịch vụ quản lý",
      group: "pawn",
    },
    {
      href: "/HDCM/TB",
      label: "TB",
      info: "Hợp đồng thuê thiết bị GPS",
      group: "pawn",
    },
    {
      href: "/HDCM/BG",
      label: "BG",
      info: "Biên bản giao nhận tài sản",
      group: "pawn",
    },
  ];

  // LOGIC LỌC MENU:
  // 1. Luôn hiển thị Trang chủ.
  // 2. Nếu type là hirePurchase -> chỉ hiện HDBT.
  // 3. Nếu type là pawn -> chỉ hiện HDCM.
  const filteredNavItems = navItems.filter((item) => {
    if (item.isAlwaysActive) return true;
    if (transactionType === "hirePurchase")
      return item.group === "hirePurchase";
    if (transactionType === "pawn") return item.group === "pawn";
    return false; // Nếu chưa chọn loại hình thì không hiện các link con
  });

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_FORM);
      // Giữ lại STORAGE_KEY_TYPE như bạn yêu cầu
    }
    window.location.reload();
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      // Mở một cửa sổ mới với kích thước lớn
      window.open(
        "/print",
        "_blank",
        "noopener,noreferrer,width=1200,height=800"
      );
    }
  };
  return (
    <header className="no-print bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TooltipProvider>
            <nav className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
              {filteredNavItems.map((item) => {
                const isDisabled = !item.isAlwaysActive && !isDataValid;
                const isActive = pathname === item.href;

                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <span>
                        {" "}
                        {/* Wrap span để Tooltip hoạt động khi button disabled */}
                        <Link
                          href={isDisabled ? "#" : item.href}
                          className={isDisabled ? "cursor-not-allowed" : ""}
                        >
                          <Button
                            variant="ghost"
                            disabled={isDisabled}
                            className={`text-white hover:bg-blue-500 font-semibold transition-colors whitespace-nowrap ${
                              isActive ? "bg-blue-500" : ""
                            } ${isDisabled ? "opacity-50" : ""}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isDisabled
                          ? "Vui lòng Lưu HĐ trước khi xem tài liệu."
                          : item.info}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </nav>
          </TooltipProvider>

          <div className="flex gap-4">
            <Button
              type="submit"
              form="vehicle-transaction-form"
              name="submitAction"
              value="SAVE"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 font-bold"
            >
              Lưu HĐ
            </Button>

            <Button
              type="button" // Chuyển từ submit sang button
              onClick={handlePrint}
              disabled={!isDataValid}
              className={`px-6 font-bold ${
                isDataValid ? "bg-blue-500 text-white" : "bg-gray-400"
              }`}
            >
              In HĐ
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6 border-white text-blue-700 hover:bg-red-500"
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
