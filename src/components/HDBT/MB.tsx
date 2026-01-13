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
import { formatNumber } from "@/lib/formatNumber";
import { numberToText } from "@/lib/numberToText";

type CombinedFormData = GeneralInformation & Partial<PawnTransaction> & Partial<Hire_PurchaseTransaction>;

export default function MB() {
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
          HỢP ĐỒNG MUA BÁN XE CŨ
        </h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "} 
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/HĐMB"}
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
          BÊN A (BÊN MUA)
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
          BÊN B (BÊN BÁN):
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
          Điều 1. THÔNG TIN XE GIAO DỊCH
        </div>

        {/* 1.1 & 1.2 */}
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
              <div className="px-2 py-1 border-r border-black flex items-center gap-2">
                <input type="checkbox" /> Cavet bản gốc
              </div>
              <div className="px-2 py-1 flex items-center gap-2">
                <input type="checkbox" /> Bảo hiểm
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-2 py-1 border-r border-black flex items-center gap-2">
                <input type="checkbox" /> Hợp đồng mua bán (Công chứng)
              </div>
              <div className="px-2 py-1 flex items-center gap-2">
                <input type="checkbox" /> Hợp đồng ủy quyền (công chứng)
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-2 py-1 italic border-b border-black text-justify">
          Bên B cam kết rằng toàn bộ giấy tờ liên quan đến xe (bao gồm nhưng
          không giới hạn: Giấy đăng ký xe, cà vẹt, số khung – số máy, hồ sơ gốc,
          các giấy tờ nhân thân và tài liệu liên quan đến giao dịch) đều là bản
          thật, hợp pháp, không bị chỉnh sửa, tẩy xóa, làm giả hoặc được tạo lập
          trái quy định pháp luật.
          <br />
          Trường hợp phát sinh tranh chấp hoặc cơ quan chức năng xác định giấy
          tờ do Bên B cung cấp là giả mạo, không hợp pháp hoặc không đúng sự
          thật, Bên B hoàn toàn chịu trách nhiệm trước pháp luật, đồng thời Bên
          B phải bồi thường toàn bộ thiệt hại, chi phí phát sinh cho Bên A (nếu
          có).
        </div>

        {/* 1.5 */}
        <div className="flex">
          <InputCell
            label="1.5 Tình trạng tài sản"
            className="w-1/3 border-r"
          />
          <InputCell
            label="ODO"
            value={formatNumber(formData.odometer) + " km"}
            className="w-1/3"
          />
          <InputCell
            label="Tình trạng"
            value="Đã qua sử dụng"
            className="w-1/3"
          />
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 2. GIÁ BÁN VÀ THANH TOÁN
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="2.1. Giá bán"
            value={`${formatNumber(formData.transactionAmount)} VND`}
            className="w-full"
          />
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="Số tiền bằng chữ là"
            value={numberToText(formData.transactionAmount ?? 0) + " đồng"}
            className="w-full italic"
          />
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/3 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">2.2. Hình thức thanh toán:</span>
          </div>
          <div className="w-1/3 px-2 py-1 border-r border-black">
            <span className="mr-4">Tiền mặt [ ]</span>
          </div>
          <div className="w-1/3 px-2 py-1">
            <span>Chuyển khoản [ ]</span>
          </div>
        </div>
        <div className="flex">
          <InputCell
            label="2.3 Thời điểm thanh toán"
            value="Tại thời điểm hoàn thành ký kết hợp đồng và nhận xe"
            className="w-full"
          />
        </div>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. CHUYỂN GIAO VÀ QUYỀN SỞ HỮU
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">
            3.1. Kể từ thời điểm hai bên ký kết hợp đồng và hoàn tất thanh toán,
            Bên B là chủ sở hữu hợp pháp của xe nêu tại Điều 1.
          </p>
          <p>3.2. Tuy nhiên, theo đề nghị của Bên A, hai bên thống nhất:</p>
          <ul className="list-disc pl-5 mb-1">
            <li>
              Thủ tục sang tên đăng ký xe sẽ được các bên thực hiện theo quy
              định pháp luật vào thời điểm phù hợp, dựa trên tình hình thực tế
              và sự thống nhất giữa các bên
            </li>
            <li className="pb-2">
              Bên A cam kết sẽ phối hợp, hỗ trợ đầy đủ và cung cấp các giấy tờ,
              thủ tục cần thiết để Bên B thực hiện việc sang tên xe theo đúng
              quy định pháp luật khi có yêu cầu.
            </li>
          </ul>
          <p className="pb-2">
            3.3. Việc chậm thực hiện sang tên không làm ảnh hưởng đến quyền sở
            hữu hợp pháp của Bên B.
          </p>
          <p className="pb-2">
            3.4. Bên A cam kết không tranh chấp, khiếu nại, hoặc định đoạt lại
            xe dưới bất kỳ hình thức nào sau khi đã ký hợp đồng và nhận đủ tiền
            bán xe.
          </p>
          <p className="pb-2">
            3.5. Bên B (bên mua) đã thực hiện việc đăng ký giao dịch bảo đảm với
            tài sản nói trên để đảm bảo quyền sở hữu và phòng ngừa các hành vi
            định đoạt bất hợp pháp trong thời gian chưa sang tên. Bên A (bên
            bán) cam kết không thực hiện bất kỳ thủ tục đăng ký, sang tên,
            chuyển nhượng, cầm cố hoặc giao dịch nào với bên thứ ba đối với xe
            nêu trên. Mọi hành vi vi phạm sẽ bị xử lý theo quy định pháp luật và
            cam kết bồi thường toàn bộ thiệt hại phát sinh.
          </p>
          <p>
            3.6. Việc mua bán xe giữa hai bên là giao dịch độc lập, không ràng
            buộc với bất kỳ thỏa thuận nào khác. Nếu có thỏa thuận khác, sẽ được
            lập bằng văn bản hợp đồng riêng theo ý chí tự nguyện của các bên và
            không ảnh hưởng đến hiệu lực của hợp đồng này.
          </p>
        </div>
      </div>

      {/* --- ĐIỀU 4 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 4. TRÁCH NHIỆM VÀ CAM KẾT CỦA CÁC BÊN
        </h3>
        <div className="px-2 py-1">
          <div className="mb-1">
            <strong>4.1. Bên A cam kết:</strong>
            <ul className="list-disc pl-5">
              <li>
                Là chủ sở hữu hợp pháp của chiếc xe, xe không bị tranh chấp,
                không thế chấp, không cầm cố;
              </li>
              <li>Giao xe và đầy đủ giấy tờ hợp lệ cho Bên B;</li>
              <li>Ký xác nhận khi Bên B tiến hành thủ tục sang tên về sau.</li>
            </ul>
          </div>
          <div>
            <strong>4.2. Bên B cam kết:</strong>
            <ul className="list-disc pl-5">
              <li>Thanh toán đúng thời hạn, đúng số tiền;</li>
              <li>
                Cho phép Bên A tiếp tục sử dụng xe đúng theo hợp đồng thuê đã
                ký.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- ĐIỀU 5 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 5. GIẢI QUYẾT TRANH CHẤP
        </h3>
        <p className="px-2 py-1">
          5.1. Mọi tranh chấp phát sinh được ưu tiên giải quyết bằng thương
          lượng. Nếu không thành, sẽ giải quyết tại Tòa án nhân dân có thẩm
          quyền nơi Bên B đặt trụ sở.
        </p>
      </div>

      {/* --- ĐIỀU 6 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 6. HIỆU LỰC HỢP ĐỒNG
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">6.1. Hợp đồng này có hiệu lực kể từ ngày ký.</p>
          <p>
            6.2. <b>Hợp Đồng Mua Bán</b> được lập 01 bản gốc, có chữ ký của hai bên và được lưu
            tại <b>DNM.HT</b>. Hai bên thống nhất việc không lập thêm bản
            khác và xác nhận giá trị pháp lý không thay đổi.
          </p>
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN A (BÊN MUA)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, đóng dấu)
          </div>
        </div>
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN B (BÊN BÁN)</div>
          <div className="italic text-sm">
            (Ký tên, ghi rõ họ tên, điểm chỉ)
          </div>
        </div>
      </div>
    </div>
  );
}
