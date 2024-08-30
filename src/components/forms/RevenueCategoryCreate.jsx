import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import { createRevenueCategoryMaster } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const RevenueCategoryCreate = () => {
  const [revenueCategory, setRevenueCategory] = useState({
    revenueCategoryName: ''
  });
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRevenueCategory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRevenueCategoryMaster(revenueCategory);
      console.log(response.data);
      // After the submit
      setRevenueCategory({ revenueCategoryName: '' });
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
  };

  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[10vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="revenueCategoryName" className='w-[30%]'>Revenue Category Name</label>
            <span>:</span>
            <input type="text" id='revenueCategoryName' name="revenueCategoryName" value={revenueCategory.revenueCategoryName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e,0)} ref={input => inputRefs.current[0] = input} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCategoryCreate