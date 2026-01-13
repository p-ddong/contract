"use client";

import React, { useState, useEffect } from "react";
import logo from "../../asset/img/logo-DNM.png";
import Image from "next/image";
import {
  GeneralInformation,
  PawnTransaction,
  Hire_PurchaseTransaction,
} from "@/types/data_type";

type CombinedFormData = GeneralInformation &
  Partial<PawnTransaction> &
  Partial<Hire_PurchaseTransaction>;

export default function PLTX() {
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
          PHỤ LỤC HỢP ĐỒNG THUÊ XE
        </h1>
        <div className="flex justify-between text-sm">
          <div>
            Kèm theo hợp đồng thuê xe số:{" "}
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/HĐTX"}
            </p>
          </div>
          <div className="">
            Hôm nay:{" "}
            <p className="outline-none font-semibold w-32 inline">{date}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold px-2 py-1 uppercase">
          CAM KẾT THANH LÝ XE CHO THUÊ
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">
            <b>1.</b>{" "}
            <b>
              Căn cứ vào nhu cầu thực tế sử dụng phương tiện của Bên B (bên
              thuê)
            </b>{" "}
            , đồng thời để đảm bảo quyền ưu tiên mua lại phương tiện đang thuê
            trong tương lai, <b>hai bên thống nhất bổ sung cam kết sau:</b>
          </p>
          <p className="font-bold">2. Cam kết:</p>
          <ul className="list-disc pl-5 mb-1">
            <li className="pb-2">
              Trong trường hợp Bên B (bên thuê) có nhu cầu mua lại chiếc xe đang
              thuê, thì Bên A (bên cho thuê) sẽ ưu tiên chuyển nhượng thanh lý
              với mức giá tương đương số tiền mà Bên A đã chi trả cho chiếc xe
              theo Hợp đồng mua bán trước đây, trừ khi các bên có thỏa thuận
              khác bằng văn bản.
            </li>
          </ul>

          <p className="font-bold">3. Điều kiện thực hiện quyền mua lại:</p>
          <ul className="list-disc pl-5 mb-1">
            <li>
              Bên B có nhu cầu mua lại và <b>gửi đề nghị</b> cho Bên A (có thể
              là giấy đề nghị, email, tin nhắn có xác nhận danh tính).
            </li>
            <li>
              Xe không trong tình trạng hư hỏng nghiêm trọng, không bị mất khả
              năng lưu hành.
            </li>
            <li className="pb-2">
              Hai bên sẽ lập <b>Hợp đồng mua bán riêng</b>, căn cứ trên giá trị
              được thỏa thuận tại thời điểm đó.
            </li>
          </ul>

          <p className="pb-2">
            <b>4. Mục đích và tính chất:</b>
            <br /> Phụ lục này được lập ra nhằm thể hiện thiện chí giữa các bên
            và làm rõ quyền ưu tiên của Bên B trong trường hợp Bên B có nhu cầu
            mua lại xe đang thuê, không làm thay đổi bản chất hợp đồng thuê xe
            và không có giá trị bắt buộc nếu không có thỏa thuận cụ thể bằng văn
            bản.
          </p>

          <p className="pb-2">
            <b>5. Hiệu lực và áp dụng:</b>
            <br /> Phụ lục này có hiệu lực kể từ ngày ký và là một phần không
            tách rời của Hợp đồng thuê xe đã ký giữa hai bên. Mọi điều khoản
            không đề cập trong Phụ lục này sẽ tuân theo hợp đồng chính.
          </p>
        </div>
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
