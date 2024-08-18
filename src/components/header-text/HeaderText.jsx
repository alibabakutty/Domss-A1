import React from 'react'
import { IoClose } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

const HeaderText = () => {
    const location = useLocation();
    let headerText = "Gateway of Domss";

    if (location.pathname === '/companyCreateForm'){
        headerText = "Company Creation";
    } else if (location.pathname === '/menu/group'){
      headerText = "Group Creation";
    } else if (location.pathname === '/menu/voucher'){
      headerText = "Voucher Type Creation";
    } else if (location.pathname === '/menu/currency'){
      headerText = "Currency Creation";
    } else if (location.pathname === '/menu/ledger'){
      headerText = "Ledger Creation";
    }
  return (
    <>
        <div className='bg-[#6EACDA] flex justify-between w-full'>
            <p className='text-[10px] font-bold pl-2'>{headerText}</p>
            <IoClose className='text-xs mt-[2px] mr-1' />
      </div>
    </>
  )
}

export default HeaderText