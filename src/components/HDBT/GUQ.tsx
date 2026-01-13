"use client";

import React, { useState, useEffect } from "react";
import logo from "../../asset/img/logo-DNM.png";
import Image from "next/image";
import { 
  GeneralInformation, 
  PawnTransaction, 
  Hire_PurchaseTransaction 
} from "@/types/data_type";

import { formatDate } from "@/lib/formatDate";
import { InputCell } from "@/components/inputCell";

type CombinedFormData = GeneralInformation & Partial<PawnTransaction> & Partial<Hire_PurchaseTransaction>;

export default function GUQ() {
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
        <h1 className="text-2xl font-bold uppercase mb-4">GIẤY ỦY QUYỀN</h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "} 
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/GUQ"}
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
              defaultValue={formData.name || ""}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Ngày sinh:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              // Áp dụng format ngày sinh
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
              defaultValue={formData.idUserNumber || ""}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Ngày cấp:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              // Áp dụng format ngày cấp
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
              defaultValue={formData.idUserIssuesing || ""}
              className="w-full outline-none"
            />
          </div>
          <div className="col-span-4 font-bold px-2 py-1 border-r border-black">
            Phone 1:
          </div>
          <div className="col-span-4 px-2 py-1">
            <input
              type="text"
              defaultValue={formData.phone1 || ""}
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
              defaultValue={formData.phone2 || ""}
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
              defaultValue={formData.userAddress || ""}
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* --- ĐIỀU 1 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 1. NỘI DUNG ỦY QUYỀN
        </div>

        {/* 1.1 & 1.2 */}
        <div className="flex border-b border-black">
          <InputCell
            label="1.1 Loại tài sản"
            value={formData.assetType || ""}
            className="w-1/2"
          />
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="1.2 Nhãn hiệu"
            value={formData.brand || ""}
            className="w-1/2"
          />
          <InputCell label="Loại xe" value={formData.model || ""} className="w-1/2" />
        </div>

        {/* 1.3 */}
        <div className="border-b border-black flex items-center">
          <div className="px-2 py-1 font-bold ">1.3 Đặc điểm:</div>
          <div className=""> <p>Giấy đăng ký xe số: <span className="tracking-[3]">{formData.regNumber}</span></p></div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <InputCell label="Số máy" value={formData.engineNumber || ""} />
          <InputCell label="Số khung" value={formData.chassisNumber || ""} />
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <InputCell label="Biển số" value={formData.plateNumber || ""} />
          <InputCell label="Màu sắc" value={formData.color || ""} />
        </div>

        {/* 1.4 */}
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-3 font-bold px-2 py-1">
            1.4 Nội dung ủy quyền:
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-2 py-1 border-black text-justify">
          Cam kết & Ủy quyền về quản lý và thủ tục pháp lý xe Căn cứ theo Hợp
          đồng mua bán xe ký ngày .../.../20..., tôi – Bên A – đã chuyển nhượng
          toàn bộ quyền sở hữu chiếc xe nêu trên cho Bên B. Tuy nhiên, do nhu
          cầu sử dụng liên tục nên hai bên thống nhất chưa thực hiện thủ tục
          sang tên ngay trong tháng.
          <br />
          Do đó, tôi đồng ý:
          <br /> 1. Ủy quyền cho Bên B toàn quyền sử dụng, quản lý và khai thác
          hợp pháp chiếc xe, bao gồm: <br />
          <ul className="list-disc pl-5 mb-1">
            <li>
              Quản lý, sử dụng xe cho mục đích cá nhân hoặc cho thuê lại theo
              quy định pháp luật;
            </li>
            <li>Chịu trách nhiệm bảo dưỡng, sửa chữa và quản lý xe;</li>
            <li>
              Cung cấp giấy tờ liên quan khi có yêu cầu từ cơ quan chức năng.
            </li>
          </ul>
          2. Ủy quyền cho Bên B thay mặt và nhân danh tôi thực hiện các thủ tục
          pháp lý như sau:
          <br />
          <ul className="list-disc pl-5 mb-1">
            <li>Rút hồ sơ gốc tại cơ quan công an (nếu cần);</li>
            <li>
              Làm thủ tục đăng ký sang tên, đóng lệ phí trước bạ, nhận cà vẹt và
              biển số mới;
            </li>
            <li>
              Ký tên vào tờ khai, giấy tờ liên quan đến việc chuyển quyền sở
              hữu, làm việc với cơ quan nhà nước;
            </li>
            <li>
              Giao dịch với ngân hàng hoặc tổ chức tài chính (nếu có) để đồng bộ
              hóa hồ sơ mua bán, đăng ký giao dịch bảo đảm.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          II. CAM KẾT CHUNG
        </div>
        <div className="px-2 py-1 border-black text-justify">
          Hai bên cam kết:
          <ul className="list-disc pl-5 mb-1 pb-2">
            <li>Mọi thông tin trên là đúng sự thật;</li>
            <li>Giao dịch mua bán xe đã hoàn tất;</li>
            <li>
              Bên A sẽ không thực hiện bất kỳ hành vi định đoạt nào khác với
              chiếc xe này;
            </li>
            <li>
              Nếu vi phạm, bên vi phạm sẽ hoàn toàn chịu trách nhiệm trước pháp
              luật;
            </li>
            <li>
              Trường hợp cơ quan nhà nước hoặc tổ chức có thẩm quyền yêu cầu văn
              bản ủy quyền này phải được công chứng hoặc chứng thực để thực hiện
              thủ tục pháp lý liên quan đến tài sản nêu trên, hai bên cam kết sẽ
              cùng nhau có mặt tại tổ chức hành nghề công chứng hoặc Ủy ban nhân
              dân có thẩm quyền để tiến hành công chứng giấy ủy quyền theo đúng
              quy định pháp luật.
            </li>
            <li>
              Mọi chi phí liên quan đến việc công chứng, chứng thực sẽ do bên
              được ủy quyền thanh toán.
            </li>
          </ul>
          <p className="italic">
            <b>Giấy Ủy Quyền</b> được lập 01 bản gốc, có chữ ký của hai bên
            và được lưu tại <b>DNM.HT</b>. Hai bên thống nhất việc không lập
            thêm bản khác và xác nhận giá trị pháp lý không thay đổi.
          </p>
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">
            ĐẠI DIỆN BÊN A (BÊN NHẬN ỦY QUYỀN)
          </div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, đóng dấu)
          </div>
        </div>
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">
            ĐẠI DIỆN BÊN B (BÊN ỦY QUYỀN)
          </div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, điểm chỉ)
          </div>
        </div>
      </div>
    </div>
  );
}