"use client";

import React, { useState, useEffect } from "react";
import logo from "../../asset/img/logo-DNM.png";
import Image from "next/image";
import {
  GeneralInformation,
  PawnTransaction,
  Hire_PurchaseTransaction,
} from "@/types/data_type";

import { formatDate } from "@/lib/formatDate";
import { InputCell } from "@/components/inputCell";
import { formatNumber } from "@/lib/formatNumber";
import { numberToText } from "@/lib/numberToText";

type CombinedFormData = GeneralInformation &
  Partial<PawnTransaction> &
  Partial<Hire_PurchaseTransaction>;

export default function QL() {
  const [formData, setFormData] = useState<Partial<CombinedFormData>>({});
  const [date, setDate] = useState("");

  // Load dữ liệu từ LocalStorage khi component mount
  useEffect(() => {
    // 1. Set ngày hiện tại theo định dạng dd/mm/yyyy
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setDate(`${dd}/${mm}/${yyyy}`);

    // 2. Load dữ liệu form
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("vehicle_transaction_form_data");
      if (savedData) {
        try {
          setFormData(JSON.parse(savedData));
        } catch (error) {
          console.error("Lỗi khi đọc dữ liệu từ cache:", error);
        }
      }
    }
  }, []);

  return (
    <div className="print-component max-w-[210mm] mx-auto bg-white p-8 text-sm text-black font-sans leading-tight">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-2/4 flex">
          <Image
            src={logo}
            width={500}
            height={500}
            alt="DNMHT logo"
            className="w-32 h-12 flex items-center justify-center text-white italic font-bold text-xl"
          />
          <div className="pt-2 pl-2">
            {" "}
            <div className="text-xs font-bold">CƠ SỞ DỊCH VỤ DNM.HT</div>
            <div className="text-xs">Phone/Zalo: 0797097668</div>
          </div>
        </div>

        <div className="w-2/4 text-right">
          <h2 className="font-bold uppercase text-sm">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </h2>
          <h2 className="font-bold text-sm pr-10">
            Độc lập - Tự do - Hạnh phúc
          </h2>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-4">
          HỢP ĐỒNG DỊCH VỤ QUẢN LÝ HỢP ĐỒNG
        </h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "}
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/GUQ"}
            </p>
          </div>
          <div className="">
            Hôm nay:{" "}
            <p className="outline-none font-semibold w-32 inline">{date}</p>
          </div>
          <div>Chúng tôi gồm có:</div>
        </div>
      </div>

      {/* --- BÊN A --- */}
      <div className="border border-black border-b-0">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black">
          BÊN A (BÊN NHẬN ỦY QUYỀN)
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Tên cơ sở:
          </div>
          <div className="col-span-8 px-2 py-1 border-r border-black">
            <input
              type="text"
              defaultValue="DNM.HT"
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Mã số cơ sở:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue="046169004276"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Địa chỉ:
          </div>
          <div className="col-span-16 px-2 py-1">
            <input
              type="text"
              defaultValue="Tổ 9, Lại Thế 2, Phường Mỹ Thượng, TP Huế"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Đại diện:
          </div>
          <div className="col-span-8 px-2 py-1 border-r border-black">
            <input
              type="text"
              defaultValue="Hoàng Thị Hiền"
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Chức vụ:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue="Chủ cơ sở"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Số điện thoại:
          </div>
          <div className="col-span-16 px-2 py-1">
            <input
              type="text"
              defaultValue="0797097668"
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* --- BÊN B --- */}
      <div className="border border-black border-b-0 mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black">
          BÊN B (BÊN ỦY QUYỀN):
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Họ và tên:
          </div>
          <div className="col-span-8 px-2 py-1 border-r border-black">
            <input
              type="text"
              defaultValue={formData.name}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Ngày sinh:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue={formatDate(formData.dob)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Số CMND/CCCD:
          </div>
          <div className="col-span-8 px-2 py-1 border-r border-black">
            <input
              type="text"
              defaultValue={formData.idUserNumber}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Ngày cấp:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue={formatDate(formData.idUserDate)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Nơi cấp:
          </div>
          <div className="col-span-8 px-2 py-1 border-r border-black">
            <input
              type="text"
              defaultValue={formData.idUserIssuesing}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Phone 1:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue={formData.phone1}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Phone 2:
          </div>
          <div className="col-span-16 px-2 py-1">
            <input
              type="text"
              defaultValue={formData.phone2}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-20 border-b border-black">
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Địa chỉ thường trú:
          </div>
          <div className="col-span-16 px-2 py-1">
            <input
              type="text"
              defaultValue={formData.userAddress}
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>
      <div className="m-1 ml-2 italic">
        Hai bên cùng thỏa thuận ký kết hợp đồng cầm cố tài sản với các điều
        khoản sau:
      </div>
      {/* --- ĐIỀU 1 --- */}
      <div className="border border-black ">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 1. NỘI DUNG DỊCH VỤ
        </div>

        <p className="px-2 py-1">
          Bên A cung cấp cho Bên B dịch vụ quản lý hợp đồng và các dịch vụ liên
          quan nhằm bảo đảm an toàn tài sản trong suốt quá trình Bên B tiếp tục
          sử dụng tài sản cầm cố và thực hiện Hợp đồng cầm cố số{" "}
          <b>{formData.idContract}/HĐCC</b>
        </p>

        <p className="px-2 py-1">
          1. Quản lý, lưu trữ và theo dõi tình trạng hợp đồng; nhắc nợ và hỗ trợ
          thanh toán, thông báo thanh toán qua SMS.
        </p>

        <p className="px-2 py-1">
          2. Xác định giá trị tài sản ban đầu và kiểm tra, đánh giá lại tình
          trạng tài sản định kỳ trong thời gian cầm cố.
        </p>

        <p className="px-2 py-1">
          3. Lắp đặt, vận hành và duy trì thiết bị giám sát hành trình (GPS) gắn
          trên xe; duy trì phần mềm quản lý. (Đối với trường hợp đề nghị tiếp
          tục sử dụng tài sản trong thời gian cầm cố)
        </p>

        <p className="px-2 py-1">
          4. Các công việc hỗ trợ khác liên quan đến bảo đảm an toàn tài sản và
          hồ sơ.
        </p>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 2. PHÍ DỊCH VỤ VÀ THỜI HẠN HỢP ĐỒNG
        </div>
        <div className="flex border-b border-black px-2 py-1">
          Bên B đồng ý thanh toán cho Bên A phí dịch vụ hàng tháng như sau:
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/2 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">1. Phí quản lý hợp đồng:</span>
          </div>
          <div className="w-1/2 px-2 py-1 border-r border-black text-center">
            <span className="mr-4">
              {formatNumber(formData.contractManagementFee)} VNĐ/Ngày
            </span>
          </div>
        </div>

        <div className="flex border-b border-black">
          <div className="w-1/2 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">
              2. Phí xác định giá trị & hao mòn tài sản:
            </span>
          </div>
          <div className="w-1/2 px-2 py-1 border-r border-black text-center">
            <span className="mr-4">
              {formatNumber(formData.valuationAndDepreciationFee)} VNĐ/Ngày
            </span>
          </div>
        </div>
        <div className="flex  border-black">
          <div className="w-1/2 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">3. Thời hạn hợp đồng:</span>
          </div>
          <div className="w-1/2 px-2 py-1 border-r border-black text-center">
            <span className="mr-4">{formData.interestTerm} Ngày</span>
          </div>
        </div>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. PHƯƠNG THỨC THANH TOÁN
        </div>

        <div className="px-2 py-1">
          <ul className="list-disc pl-5 ">
            <li>
              Bên B thanh toán phí dịch vụ hàng tháng cùng kỳ với việc thanh
              toán lãi suất theo Hợp đồng cầm cố.
            </li>
            <li>Hình thức thanh toán: tiền mặt/chuyển khoản.</li>
            <li>
              Bên A có trách nhiệm xuất phiếu thu tách bạch cho từng khoản phí
              dịch vụ.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 4 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 4. QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
        </div>

        <div className="px-2 py-1">
          <p>4.1. Bên A có quyền và nghĩa vụ:</p>
          <ul className="list-disc pl-5">
            <li>Cung cấp đầy đủ dịch vụ quản lý như đã cam kết.</li>
            <li>Xuất phiếu thu, biên lai cho từng khoản phí.</li>
            <li>Bảo mật thông tin khách hàng, hồ sơ hợp đồng.</li>
          </ul>
        </div>

        <div className="px-2 py-1">
          <p>4.2. Bên B có quyền và nghĩa vụ:</p>
          <ul className="list-disc pl-5">
            <li>Có nghĩa vụ hanh toán đầy đủ phí dịch vụ đúng kỳ hạn.</li>
            <li>
              Phối hợp cung cấp thông tin, giấy tờ cần thiết để Bên A quản lý
              hợp đồng.
            </li>
            <li>
              Đồng ý về phí dịch vụ đã được thỏa thuận trong hợp đồng này và
              không có khiếu nại gì khác.
            </li>
            <li>Có nghĩa vụ hanh toán đầy đủ phí dịch vụ đúng kỳ hạn.</li>
            <li>
              Phối hợp cung cấp thông tin, giấy tờ cần thiết để Bên A quản lý
              hợp đồng.
            </li>
            <li>
              Đồng ý về phí dịch vụ đã được thỏa thuận trong hợp đồng này và
              không có khiếu nại gì khác.
            </li>
            <li>
              Trường hợp Bên B chậm thanh toán phí dịch vụ quá 05 (năm) ngày,
              Bên A có quyền:
              <ul className="list-inside mt-1">
                <li>
                  - Ngừng cung cấp dịch vụ, đồng thời thông báo cho Bên B;
                </li>
                <li>
                  - Áp dụng các biện pháp xử lý theo thỏa thuận trong Hợp đồng
                  Cầm cố số …/HĐCC/2025, bao gồm quyền yêu cầu giao trả và xử lý
                  tài sản cầm cố.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 5 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 5. CÁC THỎA THUẬN KHÁC
        </div>

        <p className="px-2 py-1">
          5.1. Việc xác nhận thanh toán ngoài văn phòng chỉ được công nhận khi
          có thông báo bằng tin nhắn chính thức từ bên A.
        </p>
        <p className="px-2 py-1">
          5.2. Các chi tiết khác sẽ được thể hiện trong Biên bản giao nhận và
          các phụ lục kèm theo (nếu có).
        </p>
      </div>

      {/* --- ĐIỀU 6 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 6. ĐIỀU KHOẢN CUỐI CÙNG
        </div>

        <p className="px-2 py-1">
          6.1. Hai bên cam kết thực hiện nghiêm túc các điều khoản trong hợp
          đồng.
        </p>
        <p className="px-2 py-1">
          6.2. Trường hợp xảy ra tranh chấp, hai bên ưu tiên giải quyết bằng
          thương lượng. Nếu không đạt được thỏa thuận, vụ việc sẽ được đưa ra
          Tòa án nhân dân có thẩm quyền.
        </p>
        <p className="px-2 py-1">
          6.3. Hợp đồng lập thành 01 bản, mỗi bên giữ 01 bản có giá trị pháp lý
          như nhau.
        </p>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN A (BÊN NHẬN ỦY QUYỀN)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, đóng dấu)
          </div>
        </div>
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN B (BÊN ỦY QUYỀN)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, điểm chỉ)
          </div>
        </div>
      </div>
    </div>
  );
}
