import axios from "axios";



const REST_API_BASE_URL = "http://localhost:9080";

// ADD
export const createVoucherTypeMaster = (voucher) => axios.post(`${REST_API_BASE_URL}/voucherTypeMasterApi/addVoucherTypeMaster`, voucher);
export const createCurrencyMaster = (currency) => axios.post(`${REST_API_BASE_URL}/currencyMasterApi/addCurrencyMaster`, currency);
export const createDepartmentMaster = (department) => axios.post(`${REST_API_BASE_URL}/departmentMasterApi/addDepartmentMaster`, department);

// GET Specific Data
export const getSpecificVoucher = (voucherTypeName) => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`);
export const getSpecificPreDefinedVoucher = (voucherType) => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucherType}`);
export const getSpecificCurrency = (forexCurrencySymbol) => axios.get(`${REST_API_BASE_URL}/currencyMasterApi/displayCurrency/${forexCurrencySymbol}`);
export const getSpecificDepartment = (departmentName) => axios.get(`${REST_API_BASE_URL}/departmentMasterApi/displayDepartment/${departmentName}`);

// DISPLAY
export const listOfVouchers = () => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/allVouchers`);
export const listOfPreDefinedVouchers = () => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/allPreDefinedVoucherTypes`);
export const listOfCurrencies = () => axios.get(`${REST_API_BASE_URL}/currencyMasterApi/allCurrency`);
export const listOfDepartments = () => axios.get(`${REST_API_BASE_URL}/departmentMasterApi/allDepartments`);

// ALTER
export const updateVoucherTypeMaster = (voucherTypeName,voucher) => axios.put(`${REST_API_BASE_URL}/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
export const updateCurrencyMaster = (forexCurrencySymbol,currency) => axios.put(`${REST_API_BASE_URL}/currencyMasterApi/alterCurrencyMaster/${forexCurrencySymbol}`, currency);

// DELETE
export const deleteVoucher = (id) => axios.delete(`${REST_API_BASE_URL}/voucherTypeMasterApi/deleteVoucher/${id}`);
export const deleteCurrency = (id) => axios.delete(`${REST_API_BASE_URL}/currencyMasterApi/deleteCurrency/${id}`);
export const deleteDepartment = (id) => axios.delete(`${REST_API_BASE_URL}/departmentMasterApi/${id}`);