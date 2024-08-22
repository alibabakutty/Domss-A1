import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';

const RevenueCategoryCreate = () => {
  const [revenueCategory, setRevenueCategory] = useState({
    revenueCategoryName: ''
  });
  const inputRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRevenueCategory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[53.4%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[40%] h-[10vh] absolute left-[50%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="revenueCategoryName" className='w-[30%]'>Revenue Category Name</label>
            <span>:</span>
            <input type="text" id='revenueCategoryName' name="revenueCategoryName" value={revenueCategory.revenueCategoryName} ref={input => inputRefs.current[0] = input} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCategoryCreate