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

export default function CC() {
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
        <h1 className="text-2xl font-bold uppercase mb-4">HỢP ĐỒNG CẦM CỐ</h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "}
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/HĐCC"}
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
      <div className="m-1 ml-2 italic">
        Hai bên cùng thỏa thuận ký kết hợp đồng cầm cố tài sản với các điều
        khoản sau:
      </div>
      {/* --- ĐIỀU 1 --- */}
      <div className="border border-black ">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 1. TÀI SẢN CẦM CỐ
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
          <div className="">
            {" "}
            <p>
              Giấy đăng ký xe số:{" "}
              <span className="tracking-[3]">{formData.regNumber}</span>
            </p>
          </div>
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
          Điều 2. SỐ TIỀN VÀ THỜI HẠN CẦM CỐ
        </div>
        <div className="flex border-b border-black">
          <InputCell
            label="2.1. Số tiền cầm cố"
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
          <div className="w-1/3 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">2.3. Thời hạn cầm cố:</span>
          </div>
          <div className="w-2/3 px-2 py-1 border-r border-black">
            {formData.interestTerm} Ngày
          </div>
        </div>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. LÃI SUẤT VÀ THANH TOÁN
        </h3>
        <div className="border-b border-black">
          <InputCell
            label="3.1. Lãi suất"
            value={`${formatNumber(
              formData.interestRate
            )} VNĐ/Ngày (Tương đương 1,6%/tháng và 19,2%/năm)`}
            className="w-full"
          />
        </div>
        <div className="flex border-b border-black">
          <div className="w-1/3 px-2 py-1 border-r border-black flex items-center">
            <span className="font-bold mr-2">3.2. Hình thức thanh toán:</span>
          </div>
          <div className="w-1/3 px-2 py-1 border-r border-black">
            <span className="mr-4">THEO KỲ 30 NGÀY [ ]</span>
          </div>
          <div className="w-1/3 px-2 py-1">
            <span>THANH TOÁN TRƯỚC [ ]</span>
          </div>
        </div>

        <div className="flex">
          <div className="px-2 py-1 border-r border-black flex items-center">
            <span className="mr-2">
              <>3.3. </>Trường hợp Bên B tất toán hợp đồng trước hạn trong vòng
              30 (ba mươi) ngày kể từ ngày ký, tổng số tiền phải thanh toán bao
              gồm:
              <br />
              – Nợ gốc còn lại;
              <br />
              – Lãi phát sinh tính đến ngày tất toán;
              <br />
              – Phí dịch vụ (nếu có) theo số ngày thực tế sử dụng;
              <br />
              – Phí chấm dứt trước hạn bằng 3% (ba phần trăm) trên số tiền gốc
              còn lại.
              <br />
              <>3.4.</> Sau thời hạn 30 (ba mươi) ngày, tất toán trước hạn không
              phát sinh phí chấm dứt; Bên B chỉ cần thanh toán gốc, lãi và phí
              dịch vụ (nếu có).
              <br />
              <>3.5.</> Sau khi Bên B hoàn tất nghĩa vụ thanh toán, Bên A phải
              bàn giao lại giấy tờ, tài sản bảo đảm (nếu có).
              <br />
              <>3.6.</> Bên B có quyền tất toán một phần gốc trước hạn theo thỏa
              thuận với Bên A.
              <br />
              <>3.7.</> Trường hợp tất toán một phần gốc trước hạn trong vòng 30
              (ba mươi) ngày kể từ ngày ký, Bên B phải thanh toán:
              <br />
              – Số tiền gốc tất toán;
              <br />
              – Lãi và phí dịch vụ tính đến ngày tất toán, dựa trên số dư gốc
              trước khi tất toán;
              <br />
              – Phí xử lý tất toán một phần bằng 3% (ba phần trăm) trên số tiền
              gốc tất toán.
              <br />
              <>3.8.</> Sau khi tất toán một phần, dư nợ gốc còn lại được điều
              chỉnh giảm và tiếp tục tính lãi, phí dịch vụ cho các kỳ tiếp theo.
            </span>
          </div>
        </div>
      </div>

      {/* --- ĐIỀU 4 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 4. QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
        </h3>
        <div className="px-2 py-1">
          <div className="mb-1">
            <strong>4.1. Bên A:</strong>
            <ul className="list-disc pl-5">
              <li>
                Giữ tài sản và giấy tờ kèm theo cho đến khi Bên B thanh toán đầy
                đủ.
              </li>
              <li>
                Có quyền khai thác, giám sát tài sản nếu bên B đồng ý (theo Điều
                314 BLDS).
              </li>
              <li>
                Không được bán, cho thuê, cho mượn tài sản nếu không có sự đồng
                ý của bên B.
              </li>
              <li>
                Xử lý tài sản cầm cố nếu Bên B không thực hiện nghĩa vụ đúng
                hạn.
              </li>
              <li>
                Không gia hạn hợp đồng nếu tài sản bị giảm giá trị đáng kể tại
                thời điểm gia hạn, trừ khi Bên B thanh toán bớt phần vốn hoặc
                chuộc lại tài sản.
              </li>
              <li>Trả lại tài sản khi bên B hoàn thành nghĩa vụ.</li>
            </ul>
          </div>
          <div>
            <strong>4.2. Bên B:</strong>
            <ul className="list-disc pl-5">
              <li>
                Cam kết tài sản cầm cố là thuộc quyền sở hữu hợp pháp, không
                tranh chấp, không thế chấp nơi khác, cung cấp thông tin, giấy
                tờ, tài sản đúng thực tế.
              </li>
              <li>
                Có nghĩa vụ thanh toán đầy đủ nợ gốc, lãi và các khoản phí dịch
                vụ theo thỏa thuận.
              </li>
              <li>
                Được tiếp tục sử dụng tài sản trong thời gian cầm cố (theo Phụ
                lục thỏa thuận sử dụng tài sản).
              </li>
              <li>Chịu trách nhiệm nếu tài sản hư hỏng, mất mát.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black px-2 py-1 italic">
          <p>
            Bên A xác nhận đã tiến hành đăng ký giao dịch bảo đảm cho tài sản
            cầm cố tại Cục Đăng ký giao dịch bảo đảm Quốc gia theo đúng quy định
            pháp luật. Bên B cam kết không thực hiện bất kỳ hành vi nào nhằm
            chuyển nhượng, cầm cố, thế chấp hoặc đăng ký sang tên tài sản đang
            bị cầm cố khi chưa có sự đồng ý bằng văn bản của Bên A. Việc vi phạm
            cam kết này được xem là hành vi vi phạm pháp luật và Bên A có quyền
            khởi kiện, xử lý tài sản theo thỏa thuận và pháp luật hiện hành.
          </p>
        </div>
      </div>

      {/* --- ĐIỀU 5 --- */}
      <div className="border border-black mt-4 ">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 5. VI PHẠM NGHĨA VỤ VÀ XỬ LÝ TÀI SẢN CẦM CỐ
        </h3>
        <p className="px-2 py-1">
          5.1. Trường hợp Bên B chậm thanh toán từ 05 (năm) ngày trở lên kể từ
          ngày đến hạn, thì được coi là vi phạm nghĩa vụ hợp đồng.
        </p>
        <div className="px-2 py-1">
          <p>5.2. Khi xảy ra vi phạm, Bên A có quyền:</p>
          <ul className="list-disc pl-5">
            <li>
              Thu hồi ngay tài sản cầm cố, chấm dứt quyền sử dụng tài sản của
              Bên B.
            </li>
            <li>
              Bảo quản, lưu giữ và xử lý tài sản cầm cố để thu hồi nợ theo Điều
              299 và Điều 303 Bộ luật Dân sự 2015.
            </li>
            <li>
              Trong thời gian chưa thanh lý, Bên A có quyền sử dụng tài sản với
              điều kiện không làm giảm giá trị tài sản.
            </li>
          </ul>
        </div>

        <p className="px-2 py-1">
          5.3. Bên B đồng ý và xác nhận ủy quyền cho Bên A toàn quyền đại diện
          thực hiện các thủ tục pháp lý và giao dịch cần thiết để xử lý tài sản
          cầm cố, bao gồm nhưng không giới hạn ở việc lập hồ sơ, ký hợp đồng mua
          bán, bàn giao tài sản cho bên thứ ba theo phương án xử lý tài sản.
        </p>
        <p className="px-2 py-1">
          5.4. Việc ủy quyền này là một phần không thể tách rời của hợp đồng này
          và có giá trị pháp lý như một văn bản ủy quyền độc lập.
        </p>
        <p className="px-2 py-1">
          5.5. Thời điểm xử lý tài sản cầm cố có thể được thực hiện ngay sau khi
          Bên B chậm thanh toán nghĩa vụ trong một kỳ theo hợp đồng quá 30 ngày,
          kể cả khi thời hạn hợp đồng chưa kết thúc.
        </p>
        <div className="px-2 py-1">
          <p>
            5.6. Thứ tự thanh toán từ số tiền thu được sau khi xử lý tài sản:
          </p>
          <ul className="list-disc pl-5">
            <li>(i) Chi phí thu hồi, bảo quản, xử lý tài sản;</li>
            <li>(ii) Nợ gốc, lãi và phí dịch vụ còn nợ;</li>
            <li>(iii) Số tiền còn dư (nếu có) trả lại cho Bên B.</li>
          </ul>
        </div>
        <p className="px-2 py-1">
          5.7. Trong trường hợp Bên B vi phạm nghĩa vụ thanh toán hoặc các nghĩa
          vụ khác theo Hợp đồng này, Bên B có trách nhiệm bàn giao ngay tài sản
          cầm cố cho Bên A theo quy định pháp luật. Việc này được xem là thỏa
          thuận chung trong Hợp đồng, không cần thêm sự đồng ý riêng biệt nào
          khác.
        </p>
      </div>

      {/* --- ĐIỀU 6 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 6. PHIẾU XÁC NHẬN GIAO DỊCH:
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">
            6.1. Sau khi ký kết hợp đồng, Bên A sẽ phát hành cho Bên B một Phiếu
            Xác Nhận Giao Dịch, bao gồm các thông tin: Họ tên khách hàng, mã hợp
            đồng, số tiền đã nhận, kỳ thanh toán, ngày nhận và người nhận.{" "}
          </p>
          <p>
            6.2. Phiếu Xác Nhận Giao Dịch được xem là căn cứ pháp lý bổ sung cho
            hợp đồng này.
          </p>
        </div>
      </div>

      {/* --- ĐIỀU 7 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 7. GIẢI QUYẾT TRANH CHẤP
        </h3>
        <div className="px-2 py-1">
          <p className="pb-2">
            7.1. Hai bên ưu tiên giải quyết bằng thương lượng.{" "}
          </p>
          <p>
            7.2. Nếu không thỏa thuận được, tranh chấp sẽ được giải quyết tại
            Tòa án nhân dân có thẩm quyền nơi Bên A đặt trụ sở.
          </p>
        </div>
      </div>

      {/* --- ĐIỀU 8 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 8. CAM KẾT CHUNG
        </h3>
        <p className="px-2 py-1">
          8.1. Hai bên đã đọc, hiểu và đồng ý toàn bộ nội dung hợp đồng.{" "}
        </p>
        <p className="px-2 py-1">8.2. Hợp đồng có hiệu lực kể từ ngày ký. </p>
        <p className="px-2 py-1">
          8.3. Hợp đồng được lập thành 01 bản chính (do cơ sở giữ) và 01 Phiếu
          xác nhận giao dịch (giao cho khách hàng). Cả hai đều có giá trị pháp
          lý như nhau trong việc xác lập quyền và nghĩa vụ các bên.
        </p>
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
