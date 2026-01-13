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
type CombinedFormData = GeneralInformation &
  Partial<PawnTransaction> &
  Partial<Hire_PurchaseTransaction>;

export default function BG() {
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

      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold uppercase mb-4">
          BIÊN BẢN GIAO NHẬN TÀI SẢN
        </h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "} 
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/BBGNTS"}
            </p>
          </div>
          <div className="">
            Hôm nay:{" "}
            <p
              className="outline-none font-semibold w-32 inline"
            >{date}</p>
          </div>
          <div>Chúng tôi gồm có:</div>
        </div>
      </div>
      <div className="pb-3 italic">
        Căn cứ theo nhu cầu sự thỏa thuận tự nguyện giữa hai bên
      </div>
      {/* --- BÊN A --- */}
      <div className="border border-black border-b-0">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black">
          BÊN A (BÊN GIAO)
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
          BÊN B (BÊN NHẬN):
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
          I. THÔNG TIN TÀI SẢN GIAO NHẬN
        </div>

        <div className="flex border-b border-black">
          <InputCell
            label="1.1 Loại tài sản"
            value={formData.assetType}
            className="w-1/2"
          />
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="1.2 Nhãn hiệu"
            value={formData.brand}
            className="w-1/2"
          />
          <InputCell label="Loại xe" value={formData.model} className="w-1/2" />
        </div>

        {/* 1.3 */}
        <div className="border-b border-black flex items-center">
          <div className="px-2 py-1 font-bold ">1.3 Đặc điểm:</div>
          <div className=""> <p>Giấy đăng ký xe số: <span className="tracking-[3]">{formData.regNumber}</span></p></div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <InputCell label="Số máy" value={formData.engineNumber} />
          <InputCell label="Số khung" value={formData.chassisNumber} />
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <InputCell label="Biển số" value={formData.plateNumber} />
          <InputCell label="Màu sắc" value={formData.color} />
        </div>

        {/* 1.4 */}
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-3 font-bold px-2 py-1 border-r border-black">
            1.4 Giấy tờ kèm theo:
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-2 border-b border-black">
              <div className="px-2 py-1 flex items-center gap-2">
                <input type="checkbox" /> Giấy đăng ký xe (Bản sao công chứng)
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-2 py-1 border-r border-black flex items-center gap-2">
                <input type="checkbox" /> Giấy đăng kiểm (Bản gốc)
              </div>
              <div className="px-2 py-1 flex items-center gap-2">
                <input type="checkbox" /> Bảo hiểm (Bản gốc)
              </div>
            </div>
          </div>
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="1.5 Tình trạng tài sản"
            className="w-1/4 border-r"
          />
          <InputCell
            label="ODO"
            value={formatNumber(formData.odometer) + " km"}
            className="w-1/4"
          />
          <InputCell label="Tình trạng" value="tốt" className="w-1/3" />
        </div>
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-3 font-bold px-2 py-1 border-r border-black">
            1.6 Thiết bị giám sát:
          </div>

          <div className="col-span-9">
            <div className="grid grid-cols-2">
              <div className="px-2 py-1 flex items-center gap-2">
                {formData.positionDevice}
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 italic text-justify">
          Bên B không được tự ý tháo gỡ hoặc can thiệp thiết bị định vị GPS.
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-t-black border-l-black border-r-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b  uppercase">
          II. TÌNH TRẠNG TÀI SẢN GIAO NHẬN
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-black px-4 py-1 text-center w-16">
              STT
            </th>
            <th className="border border-black px-4 py-1 text-left">
              Hạng mục
            </th>
            <th className="border border-black px-4 py-1 text-left">
              Thông tin chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-black px-4 py-1 text-center">1</td>
            <td className="border border-black px-4 py-1">Ngoại thất</td>
            <td className="border border-black px-4 py-1">Tốt</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-black px-4 py-1 text-center">2</td>
            <td className="border border-black px-4 py-1">Nội thất</td>
            <td className="border border-black px-4 py-1">Tốt</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-black px-4 py-1 text-center">3</td>
            <td className="border border-black px-4 py-1">Lốp xe</td>
            <td className="border border-black px-4 py-1">Mới</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-black px-4 py-1 text-center">4</td>
            <td className="border border-black px-4 py-1">Bình ắc quy</td>
            <td className="border border-black px-4 py-1">Tốt</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-black px-4 py-1 text-center">5</td>
            <td className="border border-black px-4 py-1">Đèn phanh, còi</td>
            <td className="border border-black px-4 py-1">Hoạt động tốt</td>
          </tr>
        </tbody>
      </table>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          III. CAM KẾT VÀ XÁC NHẬN
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">
            1. Bên B cam kết giữ gìn, không tự ý sửa chữa, thay thế phụ tùng,
            không cho thuê lại hoặc sử dụng sai mục đích.
          </p>
          <p className="pb-2">
            2. Bên B cam kết bồi thường toàn bộ thiệt hại bằng tiền hoặc khôi
            phục hiện trạng ban đầu trong vòng 03 ngày làm việc kể từ khi phát
            sinh sự cố. Trường hợp không khắc phục đúng hạn, Bên A có quyền đơn
            phương chấm dứt hợp đồng và yêu cầu bồi thường thiệt hại.
          </p>
          <p className="pb-2">
            3. Hai bên đã kiểm tra đầy đủ và đồng ý ký biên bản này làm căn cứ
            giao nhận.
          </p>
          <p>
            4 <b>Biên bản giao nhận tài sản</b> được lập 01 bản gốc, có chữ ký
            của hai bên và được lưu tại <b>DNM.HT</b>. Hai bên thống nhất việc
            không lập thêm bản khác và xác nhận giá trị pháp lý không thay đổi.
          </p>
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">BÊN A (BÊN GIAO)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, đóng dấu)
          </div>
        </div>
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">BÊN B (BÊN NHẬN)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, điểm chỉ)
          </div>
        </div>
      </div>
    </div>
  );
}
