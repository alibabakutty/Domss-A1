import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBranchOffice } from '../services/MasterService';

const BranchOfficeDisplay = () => {

    const { datas } = useParams();
  const [branchOffice, setBranchOffice] = useState({
    branchOfficeName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadBranchOffice = async () => {
      try {
        const result = await getSpecificBranchOffice(datas);
        console.log(result.data);
        setBranchOffice(result.data);
      } catch (error) {
        
      }
    }

    loadBranchOffice();

    // Event listener for Escape key to go back to the previous page
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-2); // Go back to the previous page
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[datas,navigate]);

  
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>    
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="branchOfficeName" className='w-[30%]'>Branch Office Name</label>
            <span>:</span>
            <input type="text" id='branchOfficeName' name='branchOfficeName' value={branchOffice.branchOfficeName}  ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BranchOfficeDisplay