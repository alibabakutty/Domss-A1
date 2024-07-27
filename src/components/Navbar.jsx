import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#2a67b1] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-10">
            <Link className="text-white font-bold text-xl">Domss Logo</Link>
            <Link to="/company" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">K:</span> Company
            </Link>
            <Link to="/data" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">D:</span> Data
            </Link>
            <Link to="/exchange" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">E:</span> Exchange
            </Link>
            <Link to="/goto" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">G:</span> Go To
            </Link>
            <Link to="/import" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">O:</span> Import
            </Link>
            <Link to="/export" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">E:</span> Export
            </Link>
            <Link to="/email" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">M:</span> E-Mail
            </Link>
            <Link to="/print" className="text-white">
              <span className="underline underline-offset-4 text-[#478CCF]">P:</span> Print
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
