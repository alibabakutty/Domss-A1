import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NewHome } from "./NewHome"
import Navbar from "./components/Navbar"



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<NewHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
