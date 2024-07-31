import React from 'react'
import { useParams } from 'react-router-dom'
import NavCompany from './NavCompany'
import NavData from './NavData'
import NavExchange from './NavExchange'
import NavGoto from './NavGoto'
import NavImport from './NavImport'
import NavExport from './NavExport'
import NavMail from './NavMail'
import NavPrint from './NavPrint'
import About from './About'

const NavbarDropDown = () => {
    const {type} = useParams();

    const renderComp = () => {
        switch (type) {
            case 'company':
                return <NavCompany />
            case 'data':
                return <NavData />
            case 'exchange':
                return <NavExchange />
            case 'goto':
                return <NavGoto />
            case 'import':
                return <NavImport />
            case 'export':
                return <NavExport />
            case 'email':
                return <NavMail />
            case 'print':
                return <NavPrint />
            case 'about':
                return <About />
            default:
                break;
        }
    }
  return (
    <>
        <div>
            {renderComp()}
        </div>
    </>
  )
}

export default NavbarDropDown