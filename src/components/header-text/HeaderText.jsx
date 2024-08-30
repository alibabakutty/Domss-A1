import React from 'react'
import { IoClose } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

const HeaderText = () => {
    const location = useLocation();
    let headerText = "Gateway of Great AI";

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
    } else if (location.pathname === '/menu/department'){
      headerText = "Department Creation";
    } else if (location.pathname === '/menu/location'){
      headerText = "Location Creation";
    } else if (location.pathname === '/menu/headOffice'){
      headerText = "Head Office Creation";
    } else if (location.pathname === '/menu/branchOffice'){
      headerText = "Branch Office Creation";
    } else if (location.pathname === '/menu/revenueCategory'){
      headerText = "Revenue Category Creation";
    } else if (location.pathname === '/menu/revenueCentre'){
      headerText = "Revenue Centre Creation";
    } else if (location.pathname === '/menu/costCategory'){
      headerText = "Cost Category Creation";
    } else if (location.pathname === '/menu/costCentre'){
      headerText = "Cost Centre Creation";
    } else if (location.pathname === '/menu/batchMasterCategory'){
      headerText = "Batch Master Category Creation";
    } else if (location.pathname === '/menu/batchMasterSerialNumber'){
      headerText = "Batch Master Serial Number Creation";
    } else if (location.pathname === '/menu/batchMasterColor'){
      headerText = "Batch Master Color Creation";
    } else if (location.pathname === '/menu/batchMasterSize'){
      headerText = "Batch Master Size Creation";
    } else if (location.pathname === '/menu/projectCategory'){
      headerText = "Project Category Creation";
    } else if (location.pathname === '/menu/projectName'){
      headerText = "Project Name Creation";
    } else if (location.pathname === '/menu/sundryCreditor'){
      headerText = "Sundry Creditor Creation";
    } else if (location.pathname === '/menu/sundryDebtor'){
      headerText = "Sundry Debtor Creation";
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