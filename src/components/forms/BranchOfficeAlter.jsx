import React, { useEffect, useRef, useState } from 'react'
import { getSpecificBranchOffice, updateBranchOfficeMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';

const BranchOfficeAlter = () => {
  const { type } = useParams();
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
    const focusAndPulseCursor = () => {
      if (inputRefs.current[0]){
          inputRefs.current[0]?.focus();
          inputRefs.current[0]?.setSelectionRange(0,0);
      }
  }

  setTimeout(focusAndPulseCursor, 100);

  const loadBranchOffice = async () => {
    try {
      const result = await getSpecificBranchOffice(type);
      console.log(result.data);
      setBranchOffice(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  loadBranchOffice();
  },[]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter'){
      e.preventDefault(); // Prevent default form submission on Enter

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want to confirm this submit!');
    if (userConfirmed){
        try {
            const response = await updateBranchOfficeMaster(type, branchOffice);
            console.log('Branch office altered successfully!', response.data);
            // Optionally, reset and focus the first input field
            setBranchOffice({ branchOfficeName: '' });

            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]){
                inputRefs.current[0].focus();
            }
        } catch (error) {
            console.error('Error creating branch office master!',error);
        }
    }
    navigate(-1);  // Navigate back after submission
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]'  onSubmit={handleSubmit}>
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

export default BranchOfficeAlter