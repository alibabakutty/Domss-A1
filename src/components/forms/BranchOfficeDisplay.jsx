import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useParams } from 'react-router-dom';

const BranchOfficeDisplay = () => {

    const { type } = useParams();
  const [branchOffice, setBranchOffice] = useState({
    branchOfficeName: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);
  return (
    <>
      <form action="" className='border border-slate-500 w-[50%] h-[10vh]'>
        <div className='text-sm p-3 flex'>
          <label htmlFor="branchOfficeName" className='w-[30%]'>Branch Office Name</label>
          <span>:</span>
          <input type="text" id='branchOfficeName' name='branchOfficeName' value={branchOffice.branchOfficeName}  ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default BranchOfficeDisplay