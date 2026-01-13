"use client";

import type React from "react";
import { useEffect } from "react";
import { useForm, type SubmitHandler, type UseFormRegister, type FieldError } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useVehicleTransaction } from "@/context/VehicleTransactionContext";

interface VehicleFormData {
  idContract: string;
  name: string;
  dob: string;
  idUserNumber: string;
  idUserDate: string;
  idUserIssuesing: string;
  phone1: string;
  phone2: string;
  jobStatus: string;
  jobAddress: string;
  userAddress: string;
  assetType: string;
  transactionAmount: string;
  transactionDate: string;
  plateNumber: string;
  brand: string;
  model: string;
  engineNumber: string;
  chassisNumber: string;
  color: string;
  odometer: string;
  status: string;
  regNumber: string;
  rentalPrice: string;
  rentalDays: string;
  positionDevice: string;
}

interface FormFieldProps {
  label: string;
  name: keyof VehicleFormData;
  register: UseFormRegister<VehicleFormData>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? "Vui lòng nhập thông tin này" : false,
        })}
        className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500 focus:ring-red-500" : "border-input"
        }`}
      />
      {error && <span className="text-red-500 text-xs italic">{error.message}</span>}
    </div>
  );
}

export default function VehicleTransactionForm() {
  // 1. Lấy actionType từ context để biết người dùng bấm nút nào
  const { formData, setFormData, actionType } = useVehicleTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormData>({
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  // 2. Hàm xử lý logic chung cho cả Lưu và In
  const onSubmit: SubmitHandler<VehicleFormData> = (data) => {
    // Luôn lưu data vào context
    setFormData(data);

    // Kiểm tra hành động dựa trên context
    if (actionType === "SAVE") {
      console.log("LOGIC LƯU: ", data);
      alert("✅ Đã LƯU hợp đồng thành công!");
      // Gọi API save tại đây
    } 
    else if (actionType === "PRINT") {
      console.log("LOGIC IN: ", data);
      alert("🖨️ Đang mở giao diện IN...");
      // Gọi window.print() hoặc tạo PDF tại đây
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 3. QUAN TRỌNG: ID này phải khớp với nút ở TopBar */}
        <form 
          id="vehicle-transaction-form" 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          {/* Customer Information Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              📋 Thông tin khách hàng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Họ và tên" name="name" register={register} error={errors.name} required />
              <FormField label="Mã HĐ" name="idContract" register={register} error={errors.idContract} required />
              <FormField label="Ngày sinh" name="dob" type="date" register={register} error={errors.dob} />
              <FormField label="Số điện thoại 1" name="phone1" type="tel" register={register} error={errors.phone1} required />
              <FormField label="CMND/CCCD/GPLX" name="idUserNumber"  type="number" register={register} error={errors.idUserNumber} required />
              <FormField label="Số điện thoại 2" name="phone2" type="tel" register={register} error={errors.phone2} />
              <FormField label="Nơi cấp CCCD" name="idUserIssuesing" placeholder="Bộ công an, ..." register={register} error={errors.idUserIssuesing} />
              <FormField label="Ngày cấp" name="idUserDate" type="date" register={register} error={errors.idUserDate} />
              <FormField label="Nơi làm việc" name="jobAddress" register={register} error={errors.jobAddress} />
              <FormField label="Công việc" name="jobStatus" register={register} error={errors.jobStatus} />

              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Địa chỉ ĐKTT <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  placeholder="Tố 2, Xóm 21, Kế Môn, Diễn Môn, Phong Điền, TT Huế"
                  {...register("userAddress", { required: "Vui lòng nhập địa chỉ" })}
                  className={`w-full mt-2 px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.userAddress ? "border-red-500 focus:ring-red-500" : "border-input"
                  }`}
                />
                {errors.userAddress && (
                  <span className="text-red-500 text-xs italic">{errors.userAddress.message}</span>
                )}
              </div>
            </div>
          </Card>

          {/* Vehicle Information Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              🚗 Thông tin giao dịch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Loại tài sản" name="assetType" placeholder="Xe máy, Xe ô tô, ..." register={register} error={errors.assetType} />
              <FormField label="Nhãn hiệu" name="brand" placeholder="HONDA, SYM, ..." register={register} error={errors.brand} />
              <FormField label="Số tiền giao dịch" name="transactionAmount" type="number" placeholder="VNĐ" register={register} error={errors.transactionAmount} required />
              <FormField label="Loại xe" name="model" placeholder="AIRBALDE 125 2022" register={register} error={errors.model} />
              <FormField label="Ngày giao dịch" name="transactionDate" type="date" register={register} error={errors.transactionDate} required />
              <FormField label="Số máy" name="engineNumber" placeholder="JK14E0020424" register={register} error={errors.engineNumber} />
              <FormField label="Biển kiểm soát" name="plateNumber" placeholder="75C1-433.93" register={register} error={errors.plateNumber} required />
              <FormField label="Số khung" name="chassisNumber" placeholder="RLHJK1400NZ015342" register={register} error={errors.chassisNumber} />
              <FormField label="Màu sắc" name="color" register={register} error={errors.color} />
              <FormField label="Số đăng ký" name="regNumber" placeholder="006365" type="number" register={register} error={errors.regNumber} />
              <FormField label="ODO" name="odometer" placeholder="Số km" type="number" register={register} error={errors.odometer} />
              <FormField label="Tình trạng xe" name="status" register={register} error={errors.status} />
            </div>
          </Card>

          {/* Rental Agreement Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              📝 Giao dịch thuê xe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Giá thuê/Ngày" name="rentalPrice" type="number" placeholder="VNĐ/Ngày" register={register} error={errors.rentalPrice} />
              <FormField label="Thời hạn" name="rentalDays" type="number" placeholder="Số ngày" register={register} error={errors.rentalDays} />
              <FormField label="Thiết bị định vị" name="positionDevice" register={register} error={errors.positionDevice} />
            </div>
          </Card>
          
          {/* Đã xóa các nút cục bộ vì đã có nút trên TopBar */}
        </form>
      </div>
    </main>
  );
}