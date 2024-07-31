import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/nav-items/Navbar"
import NavbarDropDown from "./components/nav-items/NavbarDropDown"
import CreateForm from "./components/forms/CompanyCreateForm"
import HeaderText from "./components/header-text/HeaderText"
import Home from "./components/Home"
import CreateMasterFilter from "./components/create/CreateMasterFilter"
import CreateMasterFormRouter from "./components/create/CreateMasterFormRouter"



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <HeaderText />
        <Routes>
          <Route path="/" element={<Home headerText = "Gateway of Domss" />} />
          <Route path=":type" element={<NavbarDropDown headerText = "Gateway of Domss" />} />
          <Route path="/companyCreateForm" element={<CreateForm headerText = "Company Creation" />} />
          <Route path="/create" element={<CreateMasterFilter />} />
          <Route path="/create/:type" element={<CreateMasterFormRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
