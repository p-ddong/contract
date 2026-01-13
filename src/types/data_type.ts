export interface GeneralInformation {
  // Loại hình
  ContactType: "hirePurchase" | "pawn";

  // Thông tin khách hàng / chung
  idContract: string; // Mã HĐ
  name: string; // Tên khách hàng
  dob: string; // Ngày sinh khách hàng
  idUserNumber: string; // CCCD
  idUserDate: string; // Ngày cấp
  idUserIssuesing: string; // Nơi cấp
  phone1: string; // SĐT
  phone2: string; // SĐT ng thân
  jobStatus: string; // Công việc
  jobAddress: string; // Nơi làm việc
  userAddress: string; // Địa chỉ

  // Thông tin giao dịch / chung
  assetType: string; // Loại tài sản
  transactionAmount: string; // Số tiền giao dịch
  transactionDate: string; // Ngày giao dịch
  plateNumber: string; // Biển kiểm soát
  brand: string; // Nhãn hiệu
  model: string; // Loại xe
  engineNumber: string; // Số máy
  chassisNumber: string; // Số khung
  color: string; // Màu sắc
  odometer: string; // ODO
  status: string; // Tình trạng xe
  regNumber: string; // Số đăng ký

  //Chi phí tùy biến / chung
  customCost_permission: string; // Phê duyệt
}

export interface PawnTransaction extends GeneralInformation {
  // Thông tin giao dịch / Giao dịch cầm cố
  interestRate: string; // Lãi suất
  interestTerm: string; // Thời hạn vay

  // Giao dịch thuê thiết bị / Giao dịch cầm cố
  equipmentRentalFee: string; // Phí thuê thiết bị
  equipmentMonitoringFee: string; // Phí giám sát thiết bị
  deviceNameOrImei: string; // Tên thiết bị / IMEI
  rentalDurationDays: number; // Thời hạn thuê

  // Chi phí tùy biến / Giao dịch cầm cố
  customCost_interestRate: string; // Lãi suất
  customCost_contractManagementFee: string; // Phí quản lý HĐ
  customCost_valuationAndDepreciationFee: string; // Phí xác định giá trị và hao mòn
  custonCost_equipmentRentalFee: string; // Phí thuê thiết bị
  customCost_equipmentMonitoringFee: string; // Phí giám sát thiết bị

  // Giao dịch quản lý hợp đồng / Giao dịch cầm cố
  contractManagementFee: string; // Phí quản lý HĐ
  valuationAndDepreciationFee: string; // Phí xác định giá trị và hao mòn
}

export interface Hire_PurchaseTransaction extends GeneralInformation {
  // Giao dịch thuê xe / Giao dịch mua bán
  rentalPrice: string; //Giá thuê
  rentalDays: string; // Thời hạn
  positionDevice: string; // Thiết bị định vị

  //Chi phí tùy biến / Giao dịch mua bán
  customCost_rentalPrice: string; // Giá thuê chi phí tùy biến
}
