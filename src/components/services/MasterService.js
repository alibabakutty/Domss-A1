import axios from "axios";


const REST_API_BASE_URL = "http://localhost:9080";

// ADD
export const createVoucherTypeMaster = (voucher) => axios.post(`${REST_API_BASE_URL}/voucherTypeMasterApi/addVoucherTypeMaster`, voucher);
export const createCurrencyMaster = (currency) => axios.post(`${REST_API_BASE_URL}/currencyMasterApi/addCurrencyMaster`, currency);
export const createDepartmentMaster = (department) => axios.post(`${REST_API_BASE_URL}/departmentMasterApi/addDepartmentMaster`, department);
export const createLocationMaster = (location) => axios.post(`${REST_API_BASE_URL}/locationMasterApi/addGodown`, location);
export const createHeadOfficeMaster = (headOffice) => axios.post(`${REST_API_BASE_URL}/headOfficeMasterApi/addHeadOffice`, headOffice);
export const createBranchOfficeMaster = (branchOffice) => axios.post(`${REST_API_BASE_URL}/branchOfficeMasterApi/addBranchOffice`, branchOffice);
export const createRevenueCategoryMaster = (revenueCategory) => axios.post(`${REST_API_BASE_URL}/revenueCategoryMasterApi/addRevenueCategory`, revenueCategory);
export const createRevenueCenterMaster = (revenueCenter) => axios.post(`${REST_API_BASE_URL}/revenueCenterMasterApi/addRevenueCenter`, revenueCenter);

// GET Specific Data
export const getSpecificVoucher = (voucherTypeName) => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`);
export const getSpecificPreDefinedVoucher = (voucherType) => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucherType}`);
export const getSpecificCurrency = (forexCurrencySymbol) => axios.get(`${REST_API_BASE_URL}/currencyMasterApi/displayCurrency/${forexCurrencySymbol}`);
export const getSpecificDepartment = (departmentName) => axios.get(`${REST_API_BASE_URL}/departmentMasterApi/displayDepartment/${departmentName}`);
export const getSpecificLocation = (godownName) => axios.get(`${REST_API_BASE_URL}/locationMasterApi/displayGodown/${godownName}`);
export const getSpecificHeadOffice = (headOfficeName) => axios.get(`${REST_API_BASE_URL}/headOfficeMasterApi/displayHeadOffice/${headOfficeName}`);
export const getSpecificBranchOffice = (branchOfficeName) => axios.get(`${REST_API_BASE_URL}/branchOfficeMasterApi/displayBranchOffice/${branchOfficeName}`);
export const getSpecificRevenueCategory = (revenueCategoryName) => axios.get(`${REST_API_BASE_URL}/revenueCategoryMasterApi/displayRevenueCategory/${revenueCategoryName}`);
export const getSpecificRevenueCenter = (revenueCenterName) => axios.get(`${REST_API_BASE_URL}/revenueCenterMasterApi/displayRevenueCenter/${revenueCenterName}`);

// DISPLAY
export const listOfVouchers = () => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/allVouchers`);
export const listOfPreDefinedVouchers = () => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/allPreDefinedVoucherTypes`);
export const listOfCurrencies = () => axios.get(`${REST_API_BASE_URL}/currencyMasterApi/allCurrency`);
export const listOfDepartments = () => axios.get(`${REST_API_BASE_URL}/departmentMasterApi/allDepartments`);
export const listOfLocations = () => axios.get(`${REST_API_BASE_URL}/locationMasterApi/allGodowns`);
export const listOfHeadOffices = () => axios.get(`${REST_API_BASE_URL}/headOfficeMasterApi/allHeadOffices`);
export const listOfBranchOffices = () => axios.get(`${REST_API_BASE_URL}/branchOfficeMasterApi/allBranchOffices`);
export const listOfRevenueCategories = () => axios.get(`${REST_API_BASE_URL}/revenueCategoryMasterApi/allRevenueCategories`);
export const listOfRevenueCenters = () => axios.get(`${REST_API_BASE_URL}/revenueCenterMasterApi/allRevenueCenters`);

// ALTER
export const updateVoucherTypeMaster = (voucherTypeName,voucher) => axios.put(`${REST_API_BASE_URL}/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
export const updateCurrencyMaster = (forexCurrencySymbol,currency) => axios.put(`${REST_API_BASE_URL}/currencyMasterApi/alterCurrencyMaster/${forexCurrencySymbol}`, currency);
export const updateDepartmentMaster = (departmentName, department) => axios.put(`${REST_API_BASE_URL}/departmentMasterApi/alterDepartmentMaster/${departmentName}`, department);
export const updateLocationMaster = (godownName, location) => axios.put(`${REST_API_BASE_URL}/locationMasterApi/alterGodown/${godownName}`, location);
export const updateHeadOfficeMaster = (headOfficeName, headOffice) => axios.put(`${REST_API_BASE_URL}/headOfficeMasterApi/alterHeadOfficeMaster/${headOfficeName}`, headOffice);
export const updateBranchOfficeMaster = (branchOfficeName, branchOffice) => axios.put(`${REST_API_BASE_URL}/branchOfficeMasterApi/alterBranchOfficeMaster/${branchOfficeName}`, branchOffice);
export const updateRevenueCategoryMaster = (revenueCategoryName,revenueCategory) => axios.put(`${REST_API_BASE_URL}/revenueCategoryMasterApi/alterRevenueCategoryMaster/${revenueCategoryName}`, revenueCategory);
export const updateRevenueCenterMaster = (revenueCenterName, revenueCenter) => axios.put(`${REST_API_BASE_URL}/revenueCenterMasterApi/alterRevenueCenterMaster/${revenueCenterName}`, revenueCenter);

// DELETE
export const deleteVoucher = (id) => axios.delete(`${REST_API_BASE_URL}/voucherTypeMasterApi/deleteVoucher/${id}`);
export const deleteCurrency = (id) => axios.delete(`${REST_API_BASE_URL}/currencyMasterApi/deleteCurrency/${id}`);
export const deleteDepartment = (id) => axios.delete(`${REST_API_BASE_URL}/departmentMasterApi/${id}`);
export const deleteLocation = (id) => axios.delete(`${REST_API_BASE_URL}/locationMasterApi/deleteGodown/${id}`);
export const deleteHeadOffice = (id) => axios.delete(`${REST_API_BASE_URL}/headOfficeMasterApi/deleteHeadOffice/${id}`);
export const deleteBranchOffice = (id) => axios.delete(`${REST_API_BASE_URL}/branchOfficeMasterApi/deleteBranchOffice/${id}`);
export const deleteRevenueCategory = (id) => axios.delete(`${REST_API_BASE_URL}/revenueCategoryMasterApi/deleteRevenueCategoryMaster/${id}`);
export const deleteRevenueCenter = (id) => axios.delete(`${REST_API_BASE_URL}/revenueCenterMasterApi/deleteRevenueCenter/${id}`);