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
type CombinedFormData = GeneralInformation & Partial<PawnTransaction> & Partial<Hire_PurchaseTransaction>;

export default function TX() {
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
          console.log(JSON.parse(savedData))
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
        <h1 className="text-2xl font-bold uppercase mb-4">HỢP ĐỒNG THUÊ XE</h1>
        <div className="flex justify-between text-sm">
          <div>
            Hợp đồng số:{" "} 
            <p className="outline-none font-semibold w-40 inline">
              {formData.idContract + "/HĐTX"}
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
            <div className="grid grid-cols-1 border-b border-black">
              <div className="px-2 py-1 border-black flex items-center gap-2">
                <input type="checkbox" /> Giấy đăng ký xe (bản sao công chứng)
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-2 py-1 border-r border-black flex items-center gap-2">
                <input type="checkbox" /> Giấy đăng kiểm (bản gốc)
              </div>
              <div className="px-2 py-1 flex items-center gap-2">
                <input type="checkbox" /> Bảo hiểm (bản gốc)
              </div>
            </div>
          </div>
        </div>

        {/* 1.5 */}
        <div className="flex border-b border-black">
          <InputCell
            label="1.5 Tình trạng tài sản"
            className="w-1/4 border-r-0"
          />
          <InputCell
            label="ODO"
            value={formatNumber(formData.odometer)+ " km"}
            className="w-1/4"
          />
          <InputCell label="Tình trạng" value="Tốt" className="w-1/2" />
        </div>
        {/* 1.6 */}
        <div className="flex border-b border-black">
          <InputCell
            label="1.6 Thiết bị GPS"
            className="w-4/4 border-r-0"
            value="Bên thuê không được tự ý tháo gỡ hoặc can thiệp đến thiết bị."
          />
        </div>
        {/* 1.7 */}
        <div className="px-2 py-1 border-black text-justify">
          <span>
            <b>1.7 </b>
            Xe cho thuê nêu tại Điều 1 là tài sản thuộc quyền sở hữu hợp pháp
            của Bên A, đã được Bên A nhận chuyển nhượng từ chính Bên B theo Hợp
            đồng mua bán xe lập ngày <b>{formatDate(date)}</b> Hai bên thỏa thuận rằng trong
            thời gian chưa thực hiện thủ tục sang tên xe vì nhu cầu sử dụng liên
            tục, Bên A đồng ý cho Bên B thuê lại tài sản này với các điều khoản
            dưới đây.
          </span>
        </div>
      </div>

      {/* --- ĐIỀU 2 --- */}
      <div className="border border-black mt-4">
        <div className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 2. MỤC ĐÍCH, THỜI HẠN VÀ CHI PHÍ THUÊ
        </div>

        <div className="flex border-b border-black">
          <InputCell
            label="2.1. Mục đích thuê"
            value={`Phục vụ nhu cầu đi lại cá nhân.`}
            className="w-full"
          />
        </div>

        <div className="flex border-b border-black">
          <InputCell
            label="2.2. Thời hạn thuê"
            value={`${formData.rentalDays} Ngày`}
            className="w-1/2"
          />
          <InputCell
            label="2.3. Ngày thuê"
            value={`${formatDate(date)}`}
            className="w-1/2"
          />
        </div>

        <div className="border-b border-black">
          <InputCell
            label="2.4 Đơn giá thuê"
            value={`${formatNumber(formData.rentalPrice)} VNĐ/Ngày`}
            className="w-full"
          />
        </div>

        <div className="px-2 py-1 italic border-b border-black text-justify">
          “Giá thuê xe được xác định theo giá thị trường địa phương.”
        </div>

        <div className="px-2 py-1 border-black text-justify">
          <p>
            <b>2.5.</b> Phương thức thanh toán:
          </p>
          <ul className="list-disc pl-5 mb-1">
            <li>
              Đợt đầu: 30 ngày tiền thuê, thanh toán ngay khi ký hợp đồng.
            </li>
            <li className="pb-1">Các đợt tiếp theo: tối thiểu 15 ngày/lần.</li>
          </ul>

          <p className="pb-1">
            <b>2.6.</b> Hình thức thanh toán: Tiền mặt hoặc chuyển khoản theo
            thông tin được cung cấp.
          </p>

          <p className="pb-1">
            <b>2.7.</b> Mọi khoản thanh toán không có biên lai tại văn phòng chỉ
            được xem là hợp lệ nếu có xác nhận bằng văn bản hoặc tin nhắn chính
            thức từ Bên A (cơ sở DNM)
          </p>
        </div>
      </div>

      {/* --- ĐIỀU 3 --- */}
      <div className="border border-black mt-4">
        <h3 className="bg-gray-100 font-bold px-2 py-1 border-b border-black uppercase">
          Điều 3. QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
        </h3>
        <div className="px-2 py-1">
          <p className="font-bold">3.1. Bên A có quyền và nghĩa vụ:</p>
          <ul className="list-disc pl-5 mb-1">
            <li>
              Giao xe đúng loại, đúng tình trạng và kèm các giấy tờ liên quan
              nếu cần.
            </li>
            <li>Theo dõi, giám sát tình trạng tài sản bằng thiết bị GPS.</li>
            <li>Thu hồi xe khi bên B vi phạm nghĩa vụ.</li>
            <li className="pb-2">
              Không chịu trách nhiệm nếu Bên B sử dụng xe trái quy định pháp
              luật.
            </li>
          </ul>

          <p className="font-bold">3.2. Bên B có quyền và nghĩa vụ:</p>
          <ul className="list-disc pl-5 mb-1">
            <li>Thanh toán tiền thuê đúng kỳ hạn.</li>
            <li>
              Giữ gìn, bảo quản phương tiện trong tình trạng như lúc nhận.
            </li>
            <li>
              Không được tháo gỡ, hoán đổi, tráo linh kiện, thay đổi kết cấu xe.
            </li>
            <li>
              Chịu trách nhiệm bồi thường khi làm hỏng hoặc mất xe hay phụ tùng.
            </li>
            <li>Báo trước tối thiểu 24 giờ nếu muốn kết thúc hợp đồng sớm.</li>
            <li>
              Xe cho thuê được gắn thiết bị giám sát hành trình (GPS) để quản lý
              trong thời gian thuê.
            </li>
            <li> Bên thuê có trách nhiệm:</li>
            <li className="list-none">
              - Giữ nguyên trạng thiết bị GPS, không tháo dỡ, che chắn hoặc can
              thiệp kỹ thuật.
            </li>
            <li className="list-none">
              - Thông báo ngay cho Bên cho thuê nếu GPS bị lỗi, mất tín hiệu
              hoặc hỏng hóc.
            </li>
            <li>
              Trường hợp GPS bị mất tín hiệu liên tục trên 24 giờ mà không có lý
              do chính đáng:
            </li>
            <li className="list-none">
              - Bên thuê phải phối hợp khắc phục trong vòng 24 giờ kể từ khi
              nhận được yêu cầu từ Bên cho thuê.
            </li>
            <li className="list-none">
              - Nếu nguyên nhân do lỗi chủ quan của Bên thuê, Bên thuê phải chịu
              toàn bộ chi phí sửa chữa, lắp đặt lại thiết bị GPS.
            </li>
            <li>
              TNếu Bên thuê không hợp tác khắc phục trong thời gian 3 ngày, Bên
              cho thuê có quyền đơn phương chấm dứt hợp đồng, thu hồi ngay tài
              sản thuê và yêu cầu bồi thường thiệt hại phát sinh (nếu có).
            </li>
          </ul>
        </div>
      </div>

      {/* --- SIGNATURES --- */}
      <div className="flex mt-6 gap-4">
        <div className="w-1/2 border border-black h-40 flex flex-col items-center pt-2">
          <div className="font-bold uppercase">ĐẠI DIỆN BÊN A (BÊN CHO THUÊ)</div>
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
