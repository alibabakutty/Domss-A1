import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/nav-items/Navbar"
import NavbarDropDown from "./components/nav-items/NavbarDropDown"
import CreateForm from "./components/forms/CompanyCreateForm"
import HeaderText from "./components/header-text/HeaderText"
import Home from "./components/Home"
import CreateMasterFilter from "./components/create/CreateMasterFilter"
import CreateMasterFormRouter from "./components/create/CreateMasterFormRouter"
import MasterRouter from "./components/MasterRouter"
import AlterGroupRouter from "./components/alter/AlterGroupRouter"
import DisplayGroupRouter from "./components/display/DisplayGroupRouter"



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <HeaderText />
        <Routes>
          <Route path="/" element={<Home headerText = "Gateway of Domss" />} />
          <Route path="nav/:navbar" element={<NavbarDropDown headerText = "Gateway of Domss" />} />
          <Route path="/companyCreateForm" element={<CreateForm headerText = "Company Creation" />} />
          <Route path=":type" element={<MasterRouter />} />
          <Route path="/create/:type" element={<CreateMasterFormRouter />} />
          <Route path="/alter/:type" element={<AlterGroupRouter />} />
          <Route path="/display/:type" element={<DisplayGroupRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
