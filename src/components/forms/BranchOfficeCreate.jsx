import React, { useEffect, useRef, useState } from 'react'
import { createBranchOfficeMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';

const BranchOfficeCreate = () => {
  const [branchOffice, setBranchOffice] = useState({
    branchOfficeName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranchOffice({ ...branchOffice, [name]: value });
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBranchOfficeMaster(branchOffice);
      console.log(response.data);
      // After the submit
      setBranchOffice({ branchOfficeName: '' });
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter'){
      e.preventDefault(); // Prevent default form submission on Enter
      // Show confirmation prompt
      const userConfirmed = window.confirm('Do you want to confirm this submit?');

      if (userConfirmed){
        // Check if the current input has a value
        if (e.target.value.trim() !== ''){
           // Check if it's the last input field
           if (index === inputRefs.current.length - 1){
            // submit the form
            handleSubmit(e);
           } else{
            // Move focus to the next input
            inputRefs.current[index + 1].focus();
           }
        }
      }
    } else if (key === 'Escape'){
      navigate('/');
    }
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[57.62%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]' onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="branchOfficeName" className='w-[30%]'>Branch Office Name</label>
            <span>:</span>
            <input type="text" id='branchOfficeName' name='branchOfficeName' value={branchOffice.branchOfficeName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BranchOfficeCreate