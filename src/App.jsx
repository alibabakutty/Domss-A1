import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/nav-items/Navbar"
import NavbarDropDown from "./components/nav-items/NavbarDropDown"
import CreateForm from "./components/forms/CompanyCreate"
import HeaderText from "./components/header-text/HeaderText"
import Home from "./components/Home"
import CreateMasterFormRouter from "./components/create/CreateMasterFormRouter"
import DisplayFilter from "./components/display/DisplayFilter"
import AlterFilter from "./components/alter/AlterFilter"
import VoucherTypeDisplay from "./components/forms/VoucherTypeDisplay"
import VoucherTypeAlter from "./components/forms/VoucherTypeAlter"
import CurrencyDisplay from "./components/forms/CurrencyDisplay"
import CurrencyAlter from "./components/forms/CurrencyAlter"
import DepartmentDisplay from "./components/forms/DepartmentDisplay"
import DepartmentAlter from "./components/forms/DepartmentAlter"
import LocationDisplay from "./components/forms/LocationDisplay"
import LocationAlter from "./components/forms/LocationAlter"
import HeadOfficeDisplay from "./components/forms/HeadOfficeDisplay"
import HeadOfficeAlter from "./components/forms/HeadOfficeAlter"
import BranchOfficeDisplay from "./components/forms/BranchOfficeDisplay"
import BranchOfficeAlter from "./components/forms/BranchOfficeAlter"
import RevenueCategoryDisplay from "./components/forms/RevenueCategoryDisplay"
import RevenueCategoryAlter from "./components/forms/RevenueCategoryAlter"
import RevenueCentreDisplay from "./components/forms/RevenueCenterDisplay"
import RevenueCentreAlter from "./components/forms/RevenueCenterAlter"
import CostCategoryDisplay from "./components/forms/CostCategoryDisplay"
import CostCenterDisplay from "./components/forms/CostCenterDisplay"
import BatchCategoryDisplay from "./components/forms/BatchCategoryDisplay"
import BatchSerialNumberDisplay from "./components/forms/BatchSerialNumberDisplay"
import BatchColorDisplay from "./components/forms/BatchColorDisplay"
import BatchSizeDisplay from "./components/forms/BatchSizeDisplay"
import ProjectCategoryDisplay from "./components/forms/ProjectCategoryDisplay"
import ProjectNameDisplay from "./components/forms/ProjectNameDisplay"
import CostCategoryAlter from "./components/forms/CostCategoryAlter"
import CostCenterAlter from "./components/forms/CostCenterAlter"
import BatchCategoryAlter from "./components/forms/BatchCategoryAlter"
import BatchSerialNumberAlter from "./components/forms/BatchSerialNumberAlter"
import BatchColorAlter from "./components/forms/BatchColorAlter"
import BatchSizeAlter from "./components/forms/BatchSizeAlter"
import ProjectCategoryAlter from "./components/forms/ProjectCategoryAlter"
import ProjectNameAlter from "./components/forms/ProjectNameAlter"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <HeaderText />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="nav/:navbar" element={<NavbarDropDown headerText = "Gateway of Domss" />} />
          <Route path="/companyCreateForm" element={<CreateForm headerText = "Company Creation" />} />
          <Route path="menu/:type" element={<CreateMasterFormRouter />} />
          <Route path="/:type/display" element={<DisplayFilter />} />
          <Route path="/:type/alter" element={<AlterFilter />} />
          <Route path="/voucherTypeMasterApi/display/:datas" element={<VoucherTypeDisplay />} />
          <Route path="/preDefinedVoucherTypeApi/displayPreDefinedVoucher/:datas" element={<VoucherTypeDisplay />} />
          <Route path="/currencyMasterApi/displayCurrency/:datas" element={<CurrencyDisplay />} />
          <Route path="/departmentMasterApi/displayDepartment/:datas" element={<DepartmentDisplay />} />
          <Route path="/locationMasterApi/displayGodown/:datas" element={<LocationDisplay />} />
          <Route path="headOfficeMasterApi/displayHeadOffice/:datas" element={<HeadOfficeDisplay />} />
          <Route path="/branchOfficeMasterApi/displayBranchOffice/:datas" element={<BranchOfficeDisplay />} />
          <Route path="/revenueCategoryMasterApi/displayRevenueCategory/:datas" element={<RevenueCategoryDisplay />} />
          <Route path="/revenueCenterMasterApi/displayRevenueCenter/:datas" element={<RevenueCentreDisplay />} />
          <Route path="/costCategoryMasterApi/displayCostCategory/:datas" element={<CostCategoryDisplay />} />
          <Route path="/costCenterMasterApi/displayCostCenter/:datas" element={<CostCenterDisplay />} />
          <Route path="/batchCategoryMasterApi/displayBatchCategory/:datas" element={<BatchCategoryDisplay />} />
          <Route path="/batchSerialNumberMasterApi/displayBatchSerialNumber/:datas" element={<BatchSerialNumberDisplay />} />
          <Route path="/batchColorMasterApi/displayBatchColor/:datas" element={<BatchColorDisplay />} />
          <Route path="/batchSizeMasterApi/displayBatchSize/:datas" element={<BatchSizeDisplay />} />
          <Route path="/projectCategoryMasterApi/displayProjectCategory/:datas" element={<ProjectCategoryDisplay />} />
          <Route path="/projectNameMasterApi/displayProjectName/:datas" element={<ProjectNameDisplay />} />
          <Route path="/voucherTypeMasterApi/alterVoucherTypeMaster/:datas" element={<VoucherTypeAlter />} />
          <Route path="/currencyMasterApi/alterCurrencyMaster/:datas" element={<CurrencyAlter />} />
          <Route path="/departmentMasterApi/alterDepartmentMaster/:datas" element={<DepartmentAlter />} />
          <Route path="/locationMasterApi/alterGodown/:datas" element={<LocationAlter />} />
          <Route path="/headOfficeMasterApi/alterHeadOfficeMaster/:datas" element={<HeadOfficeAlter />} />
          <Route path="/branchOfficeMasterApi/alterBranchOfficeMaster/:datas" element={<BranchOfficeAlter />} />
          <Route path="/revenueCategoryMasterApi/alterRevenueCategoryMaster/:datas" element={<RevenueCategoryAlter />} />
          <Route path="/revenueCenterMasterApi/alterRevenueCenterMaster/:datas" element={<RevenueCentreAlter />} />
          <Route path="/costCategoryMasterApi/alterCostCategoryMaster/:datas" element={<CostCategoryAlter />} />
          <Route path="/costCenterMasterApi/alterCostCenterMaster/:datas" element={<CostCenterAlter />} />
          <Route path="/batchCategoryMasterApi/alterBatchCategoryMaster/:datas" element={<BatchCategoryAlter />} />
          <Route path="/batchSerialNumberMasterApi/alterBatchSerialNumberMaster/:datas" element={<BatchSerialNumberAlter />} />
          <Route path="/batchColorMasterApi/alterBatchColorMaster/:datas" element={<BatchColorAlter />} />
          <Route path="/batchSizeMasterApi/alterBatchSizeMaster/:datas" element={<BatchSizeAlter />} />
          <Route path="/projectCategoryMasterApi/alterProjectCategoryMaster/:datas" element={<ProjectCategoryAlter />} />
          <Route path="/projectNameMasterApi/alterProjectNameMaster/:datas" element={<ProjectNameAlter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
