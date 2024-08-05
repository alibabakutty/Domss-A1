import axios from "axios";



const REST_API_BASE_URL = "http://localhost:9080";

// ADD
export const createVoucherTypeMaster = (voucher) => axios.post(`${REST_API_BASE_URL}/voucherTypeMasterApi/addVoucherTypeMaster`, voucher);

// GET Specific Data
export const getSpecificVoucher = (voucherTypeName) => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`);

// DISPLAY
export const listOfVouchers = () => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/allVouchers`);

// ALTER
export const updateVoucherTypeMaster = (voucherTypeName,voucher) => axios.put(`${REST_API_BASE_URL}/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);

// DELETE
export const deleteVoucher = (id) => axios.delete(`${REST_API_BASE_URL}/voucherTypeMasterApi/deleteVoucher/${id}`);