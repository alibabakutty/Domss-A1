import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/nav-items/Navbar"
import NavbarDropDown from "./components/nav-items/NavbarDropDown"
import CreateForm from "./components/forms/CompanyCreate"
import HeaderText from "./components/header-text/HeaderText"
import Home from "./components/Home"
import CDAMaster from './components/cda-menu/CDAMaster'
import CreateMasterFormRouter from "./components/create/CreateMasterFormRouter"
import DisplayFilter from "./components/display/DisplayFilter"
import AlterFilter from "./components/alter/AlterFilter"
import VoucherTypeCreate from "./components/forms/VoucherTypeCreate"
import VoucherTypeDisplay from "./components/forms/VoucherTypeDisplay"
import VoucherTypeAlter from "./components/forms/VoucherTypeAlter"

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
          <Route path="menu/:type" element={<CDAMaster />} />
          <Route path="/:type/create" element={<CreateMasterFormRouter />} />
          <Route path="/:type/display" element={<DisplayFilter />} />
          <Route path="/:type/alter" element={<AlterFilter />} />
          <Route path="/voucherTypeMasterApi/display/:type" element={<VoucherTypeDisplay />} />
          <Route path="/preDefinedVoucherTypeApi/displayPreDefinedVoucher/:type" element={<VoucherTypeDisplay />} />
          <Route path="/voucherTypeMasterApi/alterVoucherTypeMaster/:type" element={<VoucherTypeAlter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
