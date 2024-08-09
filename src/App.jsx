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
import DisplayMasterFormRouter from "./components/display/DisplayMasterFormRouter"
import VoucherTypeCreate from "./components/forms/VoucherTypeCreate"

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
          <Route path="/display/:type" element={<VoucherTypeCreate />} />
          <Route path="/:type/alter" element={<AlterFilter />} />
          <Route path="alter/:type" element={<VoucherTypeCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
