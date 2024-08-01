import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  },[location]);
  
  return (
    <>
      <nav className="bg-[#2a67b1]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-10 text-[13px] h-7">
            <Link to={'/about'} className="text-white font-bold px-4 py-1">Domss Logo</Link>

            <Link to="nav/company" className={`text-white px-4 py-1 ${activeLink === 'nav/company' || activeLink === '/companyCreateForm' ? 'bg-blue-900' : 'bg-[#2a67b1]'}`} onClick={() => setActiveLink('nav/company')}>
              <span className="underline underline-offset-4 text-[#478CCF]" >K:</span> Company
            </Link>
            <Link to="nav/data" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">D:</span> Data
            </Link>
            <Link to="nav/exchange" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">E:</span> Exchange
            </Link>
            <Link to="nav/goto" className="text-black px-4 py-1 bg-[#def1fc]">
              <span className="underline underline-offset-4 text-[#478CCF]">G:</span> Go To
            </Link>
            <Link to="nav/import" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">O:</span> Import
            </Link>
            <Link to="nav/export" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">E:</span> Export
            </Link>
            <Link to="nav/email" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">M:</span> E-Mail
            </Link>
            <Link to="nav/print" className="text-white px-4 py-1">
              <span className="underline underline-offset-4 text-[#478CCF]">P:</span> Print
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
