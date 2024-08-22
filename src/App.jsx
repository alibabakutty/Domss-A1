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
          <Route path="/voucherTypeMasterApi/alterVoucherTypeMaster/:datas" element={<VoucherTypeAlter />} />
          <Route path="/currencyMasterApi/alterCurrencyMaster/:datas" element={<CurrencyAlter />} />
          <Route path="/departmentMasterApi/alterDepartmentMaster/:datas" element={<DepartmentAlter />} />
          <Route path="/locationMasterApi/alterGodown/:datas" element={<LocationAlter />} />
          <Route path="/headOfficeMasterApi/alterHeadOfficeMaster/:datas" element={<HeadOfficeAlter />} />
          <Route path="/branchOfficeMasterApi/alterBranchOfficeMaster/:datas" element={<BranchOfficeAlter />} />
          <Route path="/revenueCategoryMasterApi/alterRevenueCategoryMaster/:datas" element={<RevenueCategoryAlter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
