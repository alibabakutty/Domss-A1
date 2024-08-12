import axios from "axios";



const REST_API_BASE_URL = "http://localhost:9080";

// ADD
export const createVoucherTypeMaster = (voucher) => axios.post(`${REST_API_BASE_URL}/voucherTypeMasterApi/addVoucherTypeMaster`, voucher);

// GET Specific Data
export const getSpecificVoucher = (voucherTypeName) => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`);
export const getSpecificPreDefinedVoucher = (voucherType) => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucherType}`);

// DISPLAY
export const listOfVouchers = () => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/allVouchers`);
export const listOfPreDefinedVouchers = () => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/allPreDefinedVoucherTypes`);

// ALTER
export const updateVoucherTypeMaster = (voucherTypeName,voucher) => axios.put(`${REST_API_BASE_URL}/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);

// DELETE
export const deleteVoucher = (id) => axios.delete(`${REST_API_BASE_URL}/voucherTypeMasterApi/deleteVoucher/${id}`);