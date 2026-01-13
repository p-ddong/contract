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

export default function SD() {
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

      <div className="mb-6">
        <h1 className="text-center text-2xl font-bold uppercase mb-4">
          PHỤ LỤC THỎA THUẬN TIẾP TỤC SỬ DỤNG TÀI SẢN CẦM CỐ
        </h1>
        <div className="">Căn cứ:</div>
        <ul className="list-disc pl-5">
          <li>Căn cứ Bộ luật Dân sự 2015, đặc biệt Điều 310 và Điều 314;</li>
          <li>
            Căn cứ Hợp đồng cầm cố tài sản số{" "}
            <strong>{formData.idContract}/HĐCC</strong> ký ngày <b>{date}</b>
          </li>
          <li>
            {" "}
            Căn cứ vào mong muốn và yêu cầu sử dụng tài sản trong thời gian cầm
            cố.
          </li>
        </ul>
        <div className="flex text-sm">
          <div className="">
            Hôm nay:{" "}
            <p className="outline-none font-semibold w-32 inline">{date}</p>
          </div>
          <div className="pl-2">
            theo nhu cầu và sự thỏa thuận tự nguyện giữa hai bên.
          </div>
        </div>
      </div>

      {/* --- BÊN A --- */}
      <div className="border border-black border-b-0">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black">
          BÊN A (BÊN NHẬN CẦM CỐ)
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
      <div className="m-1 ml-2 italic">
        Hai bên cùng thỏa thuận ký kết hợp đồng cầm cố tài sản với các điều
        khoản sau:
      </div>
      {/* --- ĐIỀU 1 --- */}
      <div className="border border-black ">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 1. MỤC ĐÍCH
        </div>

        <div className="px-2 py-1">
          <ul className="list-disc pl-5 ">
            <li>
              Phụ lục này được lập để quy định về việc thỏa thuận sử dụng tài
              sản cầm cố, cụ thể là chiếc xe đã nêu trong Hợp đồng cầm cố số
              …/HĐCC/2025.
            </li>
            <li>
              Bên B có yêu cầu mong muốn sử dụng xe phục vụ đi lại trong công
              việc.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          ĐIỀU 2. QUY ĐỊNH VỀ VIỆC SỬ DỤNG TÀI SẢN
        </h3>

        <p className="px-2 py-1">
          1. Bên A (nhận cầm cố) đồng ý cho Bên B (cầm cố) tiếp tục sử dụng xe
          trong thời gian cầm cố.
        </p>

        <p className="px-2 py-1">
          2. Xe phải được gắn thiết bị giám sát hành trình (GPS) để theo dõi
          trong suốt thời hạn hợp đồng.
        </p>

        <p className="px-2 py-1">
          3. Bên B có trách nhiệm giữ gìn, bảo quản xe, không được sang nhượng,
          cầm cố lại hoặc cho người khác thuê/mượn.
        </p>

        <p className="px-2 py-1">
          4. Trong trường hợp xe bị hư hỏng, tai nạn, mất mát, Bên B phải chịu
          toàn bộ trách nhiệm và bồi thường thiệt hại theo quy định.
        </p>

        <div className="px-2 py-1">
          <p>
            5. Trong trường hợp thiết bị giám sát hành trình (GPS) bị mất tín
            hiệu liên tục quá 24 giờ mà không có lý do chính đáng (xe vào hầm,
            khu vực không phủ sóng), Bên B phải:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Thông báo ngay cho Bên A và phối hợp kiểm tra, khắc phục trong
              vòng 24 giờ.
            </li>
            <li>
              Nếu xác định nguyên nhân do lỗi chủ quan của Bên B (tháo, che
              chắn, can thiệp thiết bị…), Bên B phải chịu toàn bộ chi phí lắp
              đặt lại thiết bị và bị coi là vi phạm nghĩa vụ bảo quản tài sản.
            </li>
            <li>
              Nếu Bên B không khắc phục, Bên A có quyền thu hồi tài sản ngay lập
              tức để đảm bảo an toàn hợp đồng, đồng thời xử lý theo quy định tại
              Hợp đồng cầm cố.
            </li>
          </ul>
        </div>

        <div className="px-2 py-1">
          <p>
            6. Nếu Bên B không hợp tác khắc phục hoặc đồng thời không thanh toán
            lãi, phí dịch vụ đúng hạn, Bên A có quyền:
          </p>
          <ul className="list-disc pl-5">
            <li>Đơn phương chấm dứt Phụ lục này;</li>
            <li>Thu hồi ngay tài sản để đảm bảo an toàn hợp đồng;</li>
            <li>Xử lý tài sản cầm cố theo thỏa thuận tại Hợp đồng Cầm cố.</li>
          </ul>
        </div>

        <p className="px-2 py-1">
          7. Mọi hành vi tráo đổi phụ tùng sẽ bị xử lý như chiếm đoạt tài sản,
          đồng thời Bên B phải bồi thường 30% giá trị xe. Việc xác định hành vi
          tráo đổi căn cứ vào biên bản giao nhận và đối chiếu thực tế.
        </p>

        <p className="px-2 py-1">
          8. Mọi vi phạm nghiêm trọng có thể bị truy cứu trách nhiệm dân sự hoặc
          hình sự.
        </p>

        <p className="px-2 py-1">
          9. Trường hợp Bên B vi phạm nghĩa vụ (bao gồm nhưng không giới hạn ở
          việc không thanh toán đúng hạn, làm mất tín hiệu GPS, can thiệp thiết
          bị giám sát…), quyền sử dụng tài sản sẽ chấm dứt và Bên B có trách
          nhiệm bàn giao ngay tài sản cầm cố cho Bên A theo quy định pháp luật.
          Việc giao trả được thực hiện trên tinh thần hợp tác và minh bạch giữa
          các bên.
        </p>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. QUAN HỆ VỚI HỢP ĐỒNG CẦM CỐ
        </div>

        <div className="px-2 py-1">
          <ul className="list-disc pl-5 ">
            <li>
              Việc cho phép Bên B tiếp tục sử dụng tài sản không làm thay đổi,
              hạn chế quyền xử lý tài sản cầm cố của Bên A nếu Bên B vi phạm
              nghĩa vụ thanh toán.
            </li>
            <li>
              Phụ lục này chỉ nhằm mục đích hỗ trợ Bên B được tiếp tục sử dụng
              tài sản theo Điều 314 BLDS, không phát sinh thêm bất kỳ khoản phí
              nào ngoài những nghĩa vụ đã quy định trong Hợp đồng dịch vụ và Hợp
              đồng cầm cố.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 4 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 4. Hiệu lực
        </div>

        <div className="px-2 py-1">
          <ul className="list-disc pl-5 ">
            <li>
              Phụ lục này là một phần không tách rời của Hợp đồng cầm cố số{" "}
              <b>{formData.idContract}/HĐCC</b>
            </li>
            <li>
              Có hiệu lực kể từ ngày ký và hết hiệu lực khi Hợp đồng cầm cố chấm
              dứt.
            </li>
          </ul>
        </div>
      </div>

      {/* --- ĐIỀU 5 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 5. ĐIỀU KHOẢN CUỐI CÙNG
        </h3>

        <p className="px-2 py-1">
          5.1. Hai bên cam kết thực hiện nghiêm túc các điều khoản trong hợp
          đồng.
        </p>

        <p className="px-2 py-1">
          5.2. Trường hợp xảy ra tranh chấp, hai bên ưu tiên giải quyết bằng
          thương lượng. Nếu không đạt được thỏa thuận, vụ việc sẽ được đưa ra
          Tòa án nhân dân có thẩm quyền.
        </p>

        <p className="px-2 py-1">
          5.3. Hợp đồng này có hiệu lực kể từ ngày ký và gắn liền với thời hạn
          Hợp đồng cầm cố số <b>{formData.idContract}/HĐCC</b>
        </p>

        <p className="px-2 py-1">
          5.4. Hợp đồng được lập 01 bản gốc, có chữ ký của hai bên và được lưu
          tại cơ sở <b>DNM.ht.</b> Hai bên thống nhất việc không lập thêm bản
          khác và xác nhận giá trị pháp lý không thay đổi.
        </p>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">
            ĐẠI DIỆN BÊN A (BÊN CHO THUÊ)
          </div>
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
