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

export default function TB() {
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
          HỢP ĐỒNG THUÊ THIẾT BỊ GPS
        </h1>
        <div className="flex  text-sm">
          Căn cứ vào nhu cầu bảo vệ tài sản, hai bên thống nhất việc cung cấp và
          thuê, gắn thiết bị giám sát hành trình (GPS).
        </div>
      </div>

      {/* --- BÊN A --- */}
      <div className="border border-black border-b-0">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black">
          BÊN A (CUNG CẤP THIẾT BỊ)
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
          BÊN B (BÊN CẦM CỐ):
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

      {/* --- ĐIỀU 1 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          TÀI SẢN GẮN THIẾT BỊ
        </div>

        {/* 1.1 & 1.2 */}
        <div className="flex border-b border-black">
          <div className="w-1/2 px-2 py-1 border-r border-black font-bold">
            Nhãn hiệu/Model - Biển kiểm soát:
          </div>
          <div className="w-1/2 px-2 py-1">
            {formData.brand +
              " " +
              formData.model +
              " BKS " +
              formData.plateNumber}
          </div>
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="Số máy"
            value={formData.engineNumber}
            className="w-1/2"
          />
          <InputCell
            label="Số khung"
            value={formData.chassisNumber}
            className="w-1/2"
          />
        </div>
        <div className="border-b border-black italic px-2 py-1">
          Hai bên cùng thỏa thuận ký kết hợp đồng thuê thiết bị với các điều
          khoản sau:
        </div>

        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          ĐIỀU 1. NỘI DUNG THUÊ THIẾT BỊ
        </div>
        <div className="px-2 py-1 ">
          Bên B thuê và sử dụng thiết bị GPS để phục vụ việc giám sát tài sản
          trong thời gian cầm cố. Bên A chịu trách nhiệm lắp đặt – vận hành –
          duy trì sim 4G – phần mềm theo dõi.
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          ĐIỀU 2. THÔNG TIN THIẾT BỊ & CHI PHÍ VÀ THỜI HẠN THUÊ
        </div>
        <div className="border-b border-black px-2 py-1 font-bold text-center">
          {" "}
          i. Thông tin thiết bị
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="Tên thiết bị/IMEI"
            value={formData.deviceNameOrImei}
            className="w-1/2 border-r border-black"
          />
          <InputCell
            label="Giá trị thiết bị"
            className="w-1/2 border-r border-black"
          />
        </div>
        <div className="border-b border-black px-2 py-1 font-bold text-center">
          {" "}
          ii. Chi phí sử dụng và thời hạn thuê
        </div>
        <div className="flex border-b border-black font-bold">
          <div className="px-2 py-1 w-2/5 border-r border-black">
            Tên dịch vụ
          </div>
          <div className="px-2 py-1 w-1/3 border-r border-black">
            Chi phí / Ngày
          </div>
          <div className="px-2 py-1 w-1/3">Thành tiền / 30 Ngày</div>
        </div>
        <div className="flex border-b border-black ">
          <div className="px-2 py-1 w-2/5 border-r border-black">
            Thuê thiết bị GPS + Sim 4G
          </div>
          <div className="px-2 py-1 w-1/3 border-r border-black">
            10,000 VNĐ/ngày
          </div>
          <div className="px-2 py-1 w-1/3">300,000 VNĐ/Ngày</div>
        </div>
        <div className="flex border-b border-black ">
          <div className="px-2 py-1 w-2/5 border-r border-black">
            Hỗ trợ giám sát thiết bị + phần mềm
          </div>
          <div className="px-2 py-1 w-1/3 border-r border-black">
            {formatNumber(formData.equipmentRentalFee)} VNĐ/ngày
          </div>
          <div className="px-2 py-1 w-1/3">
            {formatNumber(30 * Number(formData.equipmentRentalFee))} VNĐ/ngày
          </div>
        </div>

        <div className="px-2 py-1 border-r border-black">
          Thời hạn thuê thiết bị: {formData.rentalDays} Ngày
        </div>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. CAM KẾT & TRÁCH NHIỆM
        </h3>
        <div className="px-2 py-1">
          <p>3.1 Trách nhiệm bên B</p>
          <ul className="list-disc pl-5">
            <li>
              Không được tháo gỡ, che chắn, can thiệp thiết bị, thay sim, ngắt
              nguồn hoặc làm gián đoạn tín hiệu.
            </li>
            <li>
              Giữ gìn thiết bị nguyên vẹn; nếu hư hỏng/mất → bồi thường
              1.400.000 VNĐ.
            </li>
            <li>Hợp tác kiểm tra khi thiết bị báo mất tín hiệu.</li>
            <li>Thanh toán đầy đủ phí theo kỳ đã thỏa thuận.</li>
          </ul>
        </div>

        <div className="px-2 py-1">
          <p>3.2. Vi phạm & xử lý</p>
          <ul className="list-disc pl-5">
            <li>
              Thiết bị mất tín hiệu quá 72 giờ mà không thông báo → bị xem là vi
              phạm nghĩa vụ giám sát.
            </li>
            <li>
              Bên A có quyền:
              <ol className="list-decimal pl-5 mt-1">
                <li>Kiểm tra lại thiết bị;</li>
                <li>Tạm ngừng dịch vụ giám sát;</li>
                <li>
                  Thu hồi tài sản cho mượn theo hợp đồng cầm cố khi cần thiết.
                </li>
              </ol>
            </li>
          </ul>
        </div>

        <div className="px-2 py-1">
          <p>3.3. Kết thúc thuê thiết bị</p>
          <ul className="list-disc pl-5">
            <li>
              Bên B phải trả lại thiết bị đúng mã số, đúng tình trạng ban đầu.
            </li>
            <li>
              Chậm trả → tính thêm phí theo ngày và bồi thường nếu có hư hỏng.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 4 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 4. XÁC NHẬN NHẬN THIẾT BỊ
        </h3>
        <div className="px-2 py-1">
          <p>Bên B xác nhận đã nhận:</p>

          <ul className="list-disc pl-5">
            <li>Thiết bị có thông tin như điều 2 tại hợp đồng này.</li>
            <li>Tình trạng: hoạt động bình thường.</li>
            <li>
              Đã được cơ sở hướng dẫn sử dụng và cài đặt ứng dụng quản lý giám
              sát.
            </li>
            <li>Sim 4G và phần mềm được kích hoạt đầy đủ</li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 5 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 5. GIẢI QUYẾT TRANH CHẤP
        </h3>
        <div className="px-2 py-1">
          Mọi tranh chấp phát sinh được giải quyết theo pháp luật Việt Nam; ưu
          tiên thương lượng. Nếu không thỏa thuận được 2 bên sẽ giải quyết tại
          Tòa án dân sự có thẩm quyền.
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN A (BÊN CUNG CẤP THIẾT BỊ)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, đóng dấu)
          </div>
        </div>
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN B (BÊN THUÊ)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, điểm chỉ)
          </div>
        </div>
      </div>
    </div>
  );
}
