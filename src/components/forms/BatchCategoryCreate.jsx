import React, { useEffect, useRef, useState } from 'react'
import { createBatchCategoryMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const BatchCategoryCreate = () => {
  const [batchCategory, setBatchCategory] = useState({
    batchCategoryName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchCategory({ ...batchCategory, [name]: value });
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);  // Empty dependency array to run only on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBatchCategoryMaster(batchCategory);
      console.log(response.data);
      // After the submit
      setBatchCategory({ batchCategoryName: '' });
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
       // Only show confirmation if the input field is not empty
       if (e.target.value.trim() !== '') {
        const userConfirmed = window.confirm('Do you want to confirm this submit?');
        if (userConfirmed) {
          // Check if it's the last input field
          if (index === inputRefs.current.length - 1) {
            handleSubmit(e); // Submit the form
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
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[10vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm pl-3 mt-4 flex'>
            <label htmlFor="batchCategoryName" className='w-[25%]'>Batch Category Name</label>
            <span>:</span>
            <input type="text" id='batchCategoryName' name='batchCategoryName' value={batchCategory.batchCategoryName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} ref={input => inputRefs.current[0] = input} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default BatchCategoryCreate