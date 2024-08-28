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
export const createCostCategoryMaster = (costCategory) => axios.post(`${REST_API_BASE_URL}/costCategoryMasterApi/addCostCategory`, costCategory);
export const createCostCenterMaster = (costCenter) => axios.post(`${REST_API_BASE_URL}/costCenterMasterApi/addCostCenter`, costCenter);
export const createBatchCategoryMaster = (batchCategory) => axios.post(`${REST_API_BASE_URL}/batchCategoryMasterApi/addBatchCategory`, batchCategory);
export const createBatchSerialNumberMaster = (batchSerial) => axios.post(`${REST_API_BASE_URL}/batchSerialNumberMasterApi/addBatchSerialNumber`, batchSerial);
export const createBatchColorMaster = (batchColor) => axios.post(`${REST_API_BASE_URL}/batchColorMasterApi/addBatchColor`, batchColor);
export const createBatchSizeMaster = (batchSize) => axios.post(`${REST_API_BASE_URL}/batchSizeMasterApi/addBatchSize`, batchSize);
export const createProjectCategoryMaster = (projectCategory) => axios.post(`${REST_API_BASE_URL}/projectCategoryMasterApi/addProjectCategory`, projectCategory);
export const createProjectNameMaster = (projectName) => axios.post(`${REST_API_BASE_URL}/projectNameMasterApi/addProjectName`, projectName);
export const createSundryCreditorMaster = (sundryCreditor) => axios.post(`${REST_API_BASE_URL}/sundryCreditorMasterApi/addSundryCreditor`, sundryCreditor);
export const createSundryDebtorMaster = (sundryDebtor) => axios.post(`${REST_API_BASE_URL}/sundryDebtorMasterApi/addSundryDebtor`, sundryDebtor);

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
export const getSpecificCostCategory = (costCategoryName) => axios.get(`${REST_API_BASE_URL}/costCategoryMasterApi/displayCostCategory/${costCategoryName}`);
export const getSpecificCostCenter = (costCenterName) => axios.get(`${REST_API_BASE_URL}/costCenterMasterApi/displayCostCenter/${costCenterName}`);
export const getSpecificBatchCategory = (batchCategoryName) => axios.get(`${REST_API_BASE_URL}/batchCategoryMasterApi/displayBatchCategory/${batchCategoryName}`);
export const getSpecificBatchSerialNumber = (batchSerialNumber) => axios.get(`${REST_API_BASE_URL}/batchSerialNumberMasterApi/displayBatchSerialNumber/${batchSerialNumber}`);
export const getSpecificBatchColor = (batchColorName) => axios.get(`${REST_API_BASE_URL}/batchColorMasterApi/displayBatchColor/${batchColorName}`);
export const getSpecificBatchSize = (batchSizeName) => axios.get(`${REST_API_BASE_URL}/batchSizeMasterApi/displayBatchSize/${batchSizeName}`);
export const getSpecificProjectCategory = (projectCategoryName) => axios.get(`${REST_API_BASE_URL}/projectCategoryMasterApi/displayProjectCategory/${projectCategoryName}`);
export const getSpecificProjectName = (project) => axios.get(`${REST_API_BASE_URL}/projectNameMasterApi/displayProjectName/${project}`);
export const getSpecificSundryCreditorName = (sundryCreditorName) => axios.get(`${REST_API_BASE_URL}/sundryCreditorMasterApi/displaySundryCreditor/${sundryCreditorName}`);
export const getSpecificSundryDebtorName = (sundryDebtorName) => axios.get(`${REST_API_BASE_URL}/sundryDebtorMasterApi/displaySundryDebtor/${sundryDebtorName}`);


// DISPLAY ALL
export const listOfVouchers = () => axios.get(`${REST_API_BASE_URL}/voucherTypeMasterApi/allVouchers`);
export const listOfPreDefinedVouchers = () => axios.get(`${REST_API_BASE_URL}/preDefinedVoucherTypeApi/allPreDefinedVoucherTypes`);
export const listOfCurrencies = () => axios.get(`${REST_API_BASE_URL}/currencyMasterApi/allCurrency`);
export const listOfDepartments = () => axios.get(`${REST_API_BASE_URL}/departmentMasterApi/allDepartments`);
export const listOfLocations = () => axios.get(`${REST_API_BASE_URL}/locationMasterApi/allGodowns`);
export const listOfHeadOffices = () => axios.get(`${REST_API_BASE_URL}/headOfficeMasterApi/allHeadOffices`);
export const listOfBranchOffices = () => axios.get(`${REST_API_BASE_URL}/branchOfficeMasterApi/allBranchOffices`);
export const listOfRevenueCategories = () => axios.get(`${REST_API_BASE_URL}/revenueCategoryMasterApi/allRevenueCategories`);
export const listOfRevenueCenters = () => axios.get(`${REST_API_BASE_URL}/revenueCenterMasterApi/allRevenueCenters`);
export const listOfCostCategories = () => axios.get(`${REST_API_BASE_URL}/costCategoryMasterApi/allCostCategories`);
export const listsOfCostCenters = () => axios.get(`${REST_API_BASE_URL}/costCenterMasterApi/allCostCenters`);
export const listsOfBatchCategories = () => axios.get(`${REST_API_BASE_URL}/batchCategoryMasterApi/allBatchCategories`);
export const listOfBatchSerialNumbers = () => axios.get(`${REST_API_BASE_URL}/batchSerialNumberMasterApi/allBatchSerialNumbers`);
export const listOfBatchColorNames = () => axios.get(`${REST_API_BASE_URL}/batchColorMasterApi/allBatchColors`);
export const listOfBatchSizes = () => axios.get(`${REST_API_BASE_URL}/batchSizeMasterApi/allBatchSizes`);
export const listsOfProjectCategories = () => axios.get(`${REST_API_BASE_URL}/projectCategoryMasterApi/allProjectCategories`);
export const listsOfProjectNames = () => axios.get(`${REST_API_BASE_URL}/projectNameMasterApi/allProjects`);
export const listsOfSundryCreditors = () => axios.get(`${REST_API_BASE_URL}/sundryCreditorMasterApi/allSundryCreditors`);
export const listsOfSundryDebtors = () => axios.get(`${REST_API_BASE_URL}/sundryDebtorMasterApi/allSundryDebtors`);

// ALTER
export const updateVoucherTypeMaster = (voucherTypeName,voucher) => axios.put(`${REST_API_BASE_URL}/voucherTypeMasterApi/alterVoucherTypeMaster/${voucherTypeName}`, voucher);
export const updateCurrencyMaster = (forexCurrencySymbol,currency) => axios.put(`${REST_API_BASE_URL}/currencyMasterApi/alterCurrencyMaster/${forexCurrencySymbol}`, currency);
export const updateDepartmentMaster = (departmentName, department) => axios.put(`${REST_API_BASE_URL}/departmentMasterApi/alterDepartmentMaster/${departmentName}`, department);
export const updateLocationMaster = (godownName, location) => axios.put(`${REST_API_BASE_URL}/locationMasterApi/alterGodown/${godownName}`, location);
export const updateHeadOfficeMaster = (headOfficeName, headOffice) => axios.put(`${REST_API_BASE_URL}/headOfficeMasterApi/alterHeadOfficeMaster/${headOfficeName}`, headOffice);
export const updateBranchOfficeMaster = (branchOfficeName, branchOffice) => axios.put(`${REST_API_BASE_URL}/branchOfficeMasterApi/alterBranchOfficeMaster/${branchOfficeName}`, branchOffice);
export const updateRevenueCategoryMaster = (revenueCategoryName,revenueCategory) => axios.put(`${REST_API_BASE_URL}/revenueCategoryMasterApi/alterRevenueCategoryMaster/${revenueCategoryName}`, revenueCategory);
export const updateRevenueCenterMaster = (revenueCenterName, revenueCenter) => axios.put(`${REST_API_BASE_URL}/revenueCenterMasterApi/alterRevenueCenterMaster/${revenueCenterName}`, revenueCenter);
export const updateCostCategoryMaster = (costCategoryName, costCategory) => axios.put(`${REST_API_BASE_URL}/costCategoryMasterApi/alterCostCategoryMaster/${costCategoryName}`, costCategory);
export const updateCostCenterMaster = (costCenterName, costCenter) => axios.put(`${REST_API_BASE_URL}/costCenterMasterApi/alterCostCenterMaster/${costCenterName}`, costCenter);
export const updateBatchCategoryMaster = (batchCategoryName, batchCategory) => axios.put(`${REST_API_BASE_URL}/batchCategoryMasterApi/alterBatchCategoryMaster/${batchCategoryName}`, batchCategory);
export const updateBatchSerialNumberMaster = (batchSerialNumber, batchSerial) => axios.put(`${REST_API_BASE_URL}/batchSerialNumberMasterApi/alterBatchSerialNumberMaster/${batchSerialNumber}`, batchSerial);
export const updateBatchColorNameMaster = (batchColorName, batchColor) => axios.put(`${REST_API_BASE_URL}/batchColorMasterApi/alterBatchColorMaster/${batchColorName}`, batchColor);
export const updateBatchSizeMaster = (batchSizeName, batchSize) => axios.put(`${REST_API_BASE_URL}/batchSizeMasterApi/alterBatchSizeMaster/${batchSizeName}`, batchSize);
export const updateProjectCategoryMaster = (projectCategoryName, projectCategory) => axios.put(`${REST_API_BASE_URL}/projectCategoryMasterApi/alterProjectCategoryMaster/${projectCategoryName}`, projectCategory);
export const updateProjectNameMaster = (projectName, project) => axios.put(`${REST_API_BASE_URL}/projectNameMasterApi/alterProjectNameMaster/${projectName}`, project);
export const updateSundryCreditorMaster = (sundryCreditorName, sundryCreditor) => axios.put(`${REST_API_BASE_URL}/sundryCreditorMasterApi/alterSundryCreditorMaster/${sundryCreditorName}`, sundryCreditor);
export const updateSundryDebtorMaster = (sundryDebtorName, sundryDebtor) => axios.put(`${REST_API_BASE_URL}/sundryDebtorMasterApi/alterSundryDebtorMaster/${sundryDebtorName}`, sundryDebtor);

// DELETE
export const deleteVoucher = (id) => axios.delete(`${REST_API_BASE_URL}/voucherTypeMasterApi/deleteVoucher/${id}`);
export const deleteCurrency = (id) => axios.delete(`${REST_API_BASE_URL}/currencyMasterApi/deleteCurrency/${id}`);
export const deleteDepartment = (id) => axios.delete(`${REST_API_BASE_URL}/departmentMasterApi/${id}`);
export const deleteLocation = (id) => axios.delete(`${REST_API_BASE_URL}/locationMasterApi/deleteGodown/${id}`);
export const deleteHeadOffice = (id) => axios.delete(`${REST_API_BASE_URL}/headOfficeMasterApi/deleteHeadOffice/${id}`);
export const deleteBranchOffice = (id) => axios.delete(`${REST_API_BASE_URL}/branchOfficeMasterApi/deleteBranchOffice/${id}`);
export const deleteRevenueCategory = (id) => axios.delete(`${REST_API_BASE_URL}/revenueCategoryMasterApi/deleteRevenueCategoryMaster/${id}`);
export const deleteRevenueCenter = (id) => axios.delete(`${REST_API_BASE_URL}/revenueCenterMasterApi/deleteRevenueCenter/${id}`);
export const deleteCostCategory = (id) => axios.delete(`${REST_API_BASE_URL}/costCategoryMasterApi/deleteCostCategory/${id}`);
export const deleteCostCenter = (id) => axios.delete(`${REST_API_BASE_URL}/costCenterMasterApi/deleteCostCenter/${id}`);
export const deleteBatchCategory = (id) => axios.delete(`${REST_API_BASE_URL}/batchCategoryMasterApi/deleteBatchCategory/${id}`);
export const deleteBatchSerialNumber = (id) => axios.delete(`${REST_API_BASE_URL}/batchSerialNumberMasterApi/deleteBatchSerialNumber/${id}`);
export const deleteBatchColorName = (id) => axios.delete(`${REST_API_BASE_URL}/batchColorMasterApi/deleteBatchColor/${id}`);
export const deleteBatchSizeName = (id) => axios.delete(`${REST_API_BASE_URL}/batchSizeMasterApi/deleteBatchSize/${id}`);
export const deleteProjectCategoryName = (id) => axios.delete(`${REST_API_BASE_URL}/projectCategoryMasterApi/deleteProjectCategory/${id}`);
export const deleteProjectName = (id) => axios.delete(`${REST_API_BASE_URL}/projectNameMasterApi/deleteProjectName/${id}`);
export const deleteSundryCreditor = (id) => axios.delete(`${REST_API_BASE_URL}/sundryCreditorMasterApi/deleteSundryCreditor/${id}`);
export const deleteSundryDebtor = (id) => axios.delete(`${REST_API_BASE_URL}/sundryDebtorMasterApi/deleteSundryDebtor/${id}`);