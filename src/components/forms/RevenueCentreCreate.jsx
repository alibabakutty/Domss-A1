import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createRevenueCenterMaster, listOfRevenueCategories } from '../services/MasterService';

const RevenueCentreCreate = () => {
  const [revenueCenter, setRevenueCenter] = useState({
    revenueCenterName: '',
    revenueCategoryName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRevenueCenter((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    listOfRevenueCategories()
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRevenueCenterMaster(revenueCenter);
      console.log(response.data);
      // After the submit
      setRevenueCenter({ revenueCenterName: '' });
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
        <div className='bg-slate-400 w-[53.4%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[40%] h-[20vh] absolute left-[50%]' onSubmit={handleSubmit}>
          <div className='text-sm p-3 flex'>
            <label htmlFor="revenueCenterName" className='w-[30%]'>Revenue Center Name</label>
            <span>:</span>
            <input type="text" id='revenueCenterName' name='revenueCenterName' value={revenueCenter.revenueCenterName} onChange={handleInputChange} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e,0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="revenueCategoryName" className='w-[29.3%]'>Under</label>
            <span>:</span>
            <input type="text" id='revenueCategoryName' name='revenueCategoryName' value={revenueCenter.revenueCategoryName} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCentreCreate