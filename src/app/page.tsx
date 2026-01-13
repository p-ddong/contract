"use client";

import React, { useEffect } from "react";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
  type FieldError,
} from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  GeneralInformation,
  PawnTransaction,
  Hire_PurchaseTransaction,
} from "@/types/data_type";

export const formatNumber = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const unformatNumber = (value?: string) => {
  if (!value) return "";
  return value.replace(/,/g, "");
};

// Type tổng hợp
type CombinedFormData = GeneralInformation &
  Partial<PawnTransaction> &
  Partial<Hire_PurchaseTransaction>;

interface FormFieldProps {
  label: string;
  name: keyof CombinedFormData;
  register: UseFormRegister<CombinedFormData>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <input
        id={name}
        type={type === "number" ? "text" : type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? "Vui lòng nhập thông tin này" : false,
          onChange: (e) => {
            if (type === "number") {
              // remove comma then push back to form as raw number
              const clean = unformatNumber(e.target.value);
              e.target.value = clean;
            }
          },
        })}
        onBlur={(e) => {
          if (type === "number") {
            const value = unformatNumber(e.target.value);
            e.target.value = formatNumber(value);
          }
        }}
        onFocus={(e) => {
          if (type === "number") {
            e.target.value = unformatNumber(e.target.value);
          }
        }}
        className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary${
          error ? "border-red-500 focus:ring-red-500" : "border-input"
        } ${className}`}
      />
      {error && (
        <span className="text-red-500 text-xs italic">{error.message}</span>
      )}
    </div>
  );
}

// KHAI BÁO 2 KEY STORAGE RIÊNG BIỆT (Khớp với TopBar)
const STORAGE_KEY_FORM = "vehicle_transaction_form_data";
const STORAGE_KEY_TYPE = "vehicle_transaction_type";

export default function VehicleTransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CombinedFormData>({
    defaultValues: {
      ContactType: "hirePurchase", // Giá trị mặc định
    } as CombinedFormData,
  });

  // Theo dõi ContactType để render giao diện
  const contactType = watch("ContactType");

  // --- EFFECT 1: LOAD DỮ LIỆU KHI VÀO TRANG ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Load Loại hình trước (Ưu tiên từ Storage riêng)
      const savedType = localStorage.getItem(STORAGE_KEY_TYPE);

      // 2. Load Dữ liệu Form
      const savedForm = localStorage.getItem(STORAGE_KEY_FORM);

      // Khởi tạo biến data tạm
      let finalData: Partial<CombinedFormData> = {
        ContactType: "hirePurchase",
      };

      if (savedForm) {
        try {
          const parsedForm = JSON.parse(savedForm);
          finalData = { ...finalData, ...parsedForm };
        } catch (e) {
          console.error("Lỗi đọc form storage", e);
        }
      }

      // 3. Ghi đè ContactType bằng cái đã lưu riêng (để đảm bảo đúng ý người dùng lần trước)
      if (savedType === "hirePurchase" || savedType === "pawn") {
        finalData.ContactType = savedType;
      }

      // Reset form với dữ liệu đã gộp
      reset(finalData as CombinedFormData);
    }
  }, [reset]);

  // --- HÀM XỬ LÝ KHI CHỌN RADIO BUTTON (LƯU NGAY LẬP TỨC) ---
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value as "hirePurchase" | "pawn";

    // 1. Cập nhật state của React Hook Form
    setValue("ContactType", newType);

    // 2. Lưu ngay vào Local Storage riêng biệt
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_TYPE, newType);
    }
  };

  // --- XỬ LÝ SUBMIT (LOGIC MỚI KHÔNG DÙNG CONTEXT) ---
  const onSubmit = (
    data: CombinedFormData,
    event?: React.BaseSyntheticEvent
  ) => {
    // Lấy thông tin nút bấm từ event (Do TopBar đặt name="submitAction" value="SAVE" hoặc "PRINT")
    // Ép kiểu event để lấy nativeEvent.submitter
    const nativeEvent = event?.nativeEvent as SubmitEvent;
    const submitter = nativeEvent?.submitter as HTMLButtonElement;
    const actionType = submitter?.value; // "SAVE" hoặc "PRINT"

    if (actionType === "SAVE") {
      // 1. Lưu dữ liệu
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(data));
        localStorage.setItem(STORAGE_KEY_TYPE, data.ContactType); // Backup type

        // 2. BẮN SỰ KIỆN ĐỂ TOPBAR CẬP NHẬT GIAO DIỆN (Mở khóa menu)
        window.dispatchEvent(new Event("vehicle-storage-update"));
      }

      console.log("Đã lưu Form Data & Type");
      alert("Đã LƯU thành công!");
    } else if (actionType === "PRINT") {
      // Logic in ấn
      console.log("LOGIC IN: ", data);
      alert("Đang mở giao diện IN...");
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <form
          id="vehicle-transaction-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* SECTION 1: CHỌN LOẠI HÌNH */}
          <Card className="p-6 border-2 border-primary/20">
            <div className="flex items-center space-x-8">
              <span className="font-bold text-lg">Loại hình:</span>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="hirePurchase"
                  {...register("ContactType")}
                  onChange={(e) => {
                    register("ContactType").onChange(e);
                    handleTypeChange(e);
                  }}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">Bán thuê (Hire Purchase)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="pawn"
                  {...register("ContactType")}
                  onChange={(e) => {
                    register("ContactType").onChange(e);
                    handleTypeChange(e);
                  }}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">Cầm mượn (Pawn)</span>
              </label>
            </div>
          </Card>

          {/* SECTION 2: THÔNG TIN KHÁCH HÀNG */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              Thông tin khách hàng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Họ và tên"
                name="name"
                register={register}
                error={errors.name}
                required
              />
              <FormField
                label="Mã HĐ"
                name="idContract"
                register={register}
                error={errors.idContract}
                required
              />
              <FormField
                label="Ngày sinh"
                name="dob"
                type="date"
                register={register}
                error={errors.dob}
              />
              <FormField
                label="Số điện thoại 1"
                name="phone1"
                type="tel"
                register={register}
                error={errors.phone1}
                required
              />
              <FormField
                label="CMND/CCCD/GPLX"
                name="idUserNumber"
                register={register}
                error={errors.idUserNumber}
                required
              />
              <FormField
                label="Số điện thoại 2"
                name="phone2"
                type="tel"
                register={register}
                error={errors.phone2}
              />
              <FormField
                label="Nơi cấp CCCD"
                name="idUserIssuesing"
                register={register}
                error={errors.idUserIssuesing}
              />
              <FormField
                label="Ngày cấp"
                name="idUserDate"
                type="date"
                register={register}
                error={errors.idUserDate}
              />

              <FormField
                label="Công việc"
                name="jobStatus"
                register={register}
                error={errors.jobStatus}
              />
              <FormField
                label="Nơi làm việc"
                name="jobAddress"
                register={register}
                error={errors.jobAddress}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Địa chỉ ĐKTT / Trụ sở"
                  name="userAddress"
                  register={register}
                  error={errors.userAddress}
                  required
                />
              </div>
            </div>
          </Card>

          {/* SECTION 3: THÔNG TIN GIAO DỊCH */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              Thông tin giao dịch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Loại tài sản"
                name="assetType"
                placeholder="Xe máy, Xe ô tô..."
                register={register}
                error={errors.assetType}
              />
              <FormField
                label="Nhãn hiệu"
                name="brand"
                placeholder="HONDA..."
                register={register}
                error={errors.brand}
              />
              <FormField
                label="Số tiền giao dịch"
                name="transactionAmount"
                type="number"
                placeholder="VNĐ"
                register={register}
                error={errors.transactionAmount}
                required
              />
              <FormField
                label="Loại xe"
                name="model"
                placeholder="AIRBLADE..."
                register={register}
                error={errors.model}
              />
              <FormField
                label="Ngày giao dịch"
                name="transactionDate"
                type="date"
                register={register}
                error={errors.transactionDate}
                required
              />
              <FormField
                label="Số máy"
                name="engineNumber"
                register={register}
                error={errors.engineNumber}
              />
              <FormField
                label="Biển kiểm soát"
                name="plateNumber"
                register={register}
                error={errors.plateNumber}
                required
              />
              <FormField
                label="Số khung"
                name="chassisNumber"
                register={register}
                error={errors.chassisNumber}
              />
              <FormField
                label="Màu sắc"
                name="color"
                register={register}
                error={errors.color}
              />
              <FormField
                label="Số đăng ký"
                name="regNumber"
                register={register}
                error={errors.regNumber}
                className="tracking-[4]"
              />
              <FormField
                label="ODO"
                name="odometer"
                type="number"
                register={register}
                error={errors.odometer}
              />
              <FormField
                label="Tình trạng xe"
                name="status"
                register={register}
                error={errors.status}
              />

              {/* Pawn Fields inside Main Transaction */}
              {contactType === "pawn" && (
                <>
                  <FormField
                    label="Thời hạn vay"
                    name="interestTerm"
                    register={register}
                    error={errors.interestTerm}
                  />
                  <FormField
                    label="Lãi suất (%)"
                    name="interestRate"
                    register={register}
                    error={errors.interestRate}
                  />
                </>
              )}
            </div>
          </Card>

          {/* PAWN SPECIFIC SECTIONS */}
          {contactType === "pawn" && (
            <>
              <Card className="p-6">
                <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
                  Giao dịch quản lý hợp đồng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Phí quản lý hợp đồng"
                    name="contractManagementFee"
                    type="number"
                    register={register}
                    error={errors.contractManagementFee}
                  />
                  <FormField
                    label="Phí xác định giá trị và hao mòn"
                    name="valuationAndDepreciationFee"
                    type="number"
                    register={register}
                    error={errors.valuationAndDepreciationFee}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
                  Giao dịch thuê thiết bị
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Phí thuê thiết bị"
                    name="equipmentRentalFee"
                    type="number"
                    register={register}
                    error={errors.equipmentRentalFee}
                  />
                  <FormField
                    label="Thời hạn thuê (ngày)"
                    name="rentalDurationDays"
                    type="number"
                    register={register}
                    error={errors.rentalDurationDays}
                  />
                  <FormField
                    label="Tên thiết bị / IMEI"
                    name="deviceNameOrImei"
                    register={register}
                    error={errors.deviceNameOrImei}
                  />
                  <FormField
                    label="Phí giám sát thiết bị"
                    name="equipmentMonitoringFee"
                    type="number"
                    register={register}
                    error={errors.equipmentMonitoringFee}
                  />
                </div>
              </Card>
            </>
          )}

          {/* HIRE PURCHASE SPECIFIC SECTIONS */}
          {contactType === "hirePurchase" && (
            <Card className="p-6">
              <h2 className="text-xl font-bold bg-blue-100 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
                Giao dịch thuê xe
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Giá thuê/Ngày"
                  name="rentalPrice"
                  type="number"
                  register={register}
                  error={errors.rentalPrice}
                />
                <FormField
                  label="Thời hạn"
                  name="rentalDays"
                  register={register}
                  error={errors.rentalDays}
                />
                <FormField
                  label="Thiết bị định vị"
                  name="positionDevice"
                  register={register}
                  error={errors.positionDevice}
                />
              </div>
            </Card>
          )}

          {/* CUSTOM COST SECTION */}
          <Card className="p-6">
            <h2 className="text-xl font-bold bg-orange-300 text-blue-900 -mx-6 -mt-6 px-6 py-3 mb-6">
              Chi phí tùy biến
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactType === "hirePurchase" && (
                <FormField
                  label="Giá thuê (Tùy biến)"
                  name="customCost_rentalPrice"
                  type="number"
                  register={register}
                  error={errors.customCost_rentalPrice}
                />
              )}

              {contactType === "pawn" && (
                <FormField
                  label="Lãi suất (Tùy biến)"
                  name="customCost_interestRate"
                  register={register}
                  error={errors.customCost_interestRate}
                />
              )}

              <FormField
                label="Phê duyệt"
                name="customCost_permission"
                register={register}
                error={errors.customCost_permission}
              />

              {contactType === "pawn" && (
                <>
                  <FormField
                    label="Phí quản lý HĐ (Tùy biến)"
                    name="customCost_contractManagementFee"
                    register={register}
                    error={errors.customCost_contractManagementFee}
                  />
                  <FormField
                    label="Phí xác định GT & HM (Tùy biến)"
                    name="customCost_valuationAndDepreciationFee"
                    register={register}
                    error={errors.customCost_valuationAndDepreciationFee}
                  />
                  <FormField
                    label="Phí thuê thiết bị (Tùy biến)"
                    name="custonCost_equipmentRentalFee"
                    register={register}
                    error={errors.custonCost_equipmentRentalFee}
                  />
                  <FormField
                    label="Phí giám sát thiết bị (Tùy biến)"
                    name="customCost_equipmentMonitoringFee"
                    register={register}
                    error={errors.customCost_equipmentMonitoringFee}
                  />
                </>
              )}
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}
