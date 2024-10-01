import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { createStockGroupMaster } from '../services/MasterService';

const StockGroupCreate = () => {

  const [stocGroup, setStockGroup] = useState({
    stockGroupName: '',
    under: '♦ primary',
    shouldQuantitiesOfItemsBeAdded: 'no',
    // hsnOrSacDetails: 'as per company/stock group',
    // sourceOfDetails: 'not available',
    // hsnOrSac: '',
    // description: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  }, []);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      (e).preventDefault();   // Prevent default form submission on Enter

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          // Move to the next field if the current field is not the last one
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
        } else if (e.target.name === 'shouldQuantitiesOfItemsBeAdded'){
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?')
          if (userConfirmed) {
            handleSubmit(e);
          } else {
            (e).preventDefault();
          }
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField]?.setSelectionRange(0, 0);
        }
      }
    }
  };

  // Update state values based on input name
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setStockGroup((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    try {
      const response = await createStockGroupMaster(stocGroup);
      console.log(response.data);
      setStockGroup({
        stockGroupName: '',
        under: '♦ primary',
        shouldQuantitiesOfItemsBeAdded: 'no',
        hsnOrSacDetails: 'as per company/stock group',
        sourceOfDetails: 'not available',
        hsnOrSac: '',
        description: ''
      })
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[15vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="stockGroupName" className='w-[40%]'>Name</label>
            <span>:</span>
            <input type="text" name='stockGroupName' ref={(input) => (inputRefs.current[0] = input)} value={stocGroup.stockGroupName} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[40%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} value={stocGroup.under} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="shouldQuantitiesOfItemsBeAdded" className='w-[40%]'>Should quantities of items be added</label>
            <span>:</span>
            <input type="text" name='shouldQuantitiesOfItemsBeAdded' ref={(input) => (inputRefs.current[2] = input)} value={stocGroup.shouldQuantitiesOfItemsBeAdded} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          {/* <p className='underline text-sm ml-2 mt-3 mb-2'>Statutory Details</p> */}
          {/* <div className='text-sm'>
            <p className='underline ml-2'>HSN/SAC & Related Details</p>
            <div className='flex ml-2'>
              <label htmlFor="hsnOrSacDetails" className='w-[40%]'>HSN/SAC Details</label>
              <span>:</span>
              <input type="text" name='hsnOrSacDetails' ref={(input) => (inputRefs.current[3] = input)} value={stocGroup.hsnOrSacDetails} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2'>
              <label htmlFor="sourceOfDetails" className='w-[40%]'>Source of Details</label>
              <span>:</span>
              <input type="text" name='sourceOfDetails' ref={(input) => (inputRefs.current[4] = input)} value={stocGroup.sourceOfDetails} onKeyDown={(e) => handleKeyDown(e, 4)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2'>
              <label htmlFor="hsnOrSac" className='w-[40%]'>HSN/SAC</label>
              <span>:</span>
              <input type="text" name='hsnOrSac' ref={(input) => (inputRefs.current[5] = input)} value={stocGroup.hsnOrSac} onKeyDown={(e) => handleKeyDown(e, 5)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2'>
              <label htmlFor="description" className='w-[40%]'>Description</label>
              <span>:</span>
              <input type="text" name='description' ref={(input) => (inputRefs.current[6] = input)} value={stocGroup.description} onKeyDown={(e) => handleKeyDown(e, 6)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
          </div> */}
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default StockGroupCreate