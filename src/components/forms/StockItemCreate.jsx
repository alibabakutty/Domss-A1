import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'

const StockItemCreate = () => {

  const [stocItem, setStockItem] = useState({
    stockItemName: '',
    under: '♦ primary',
    units: '♦ not applicable',
    gstApplicability: '♦ not applicable',
    hsnOrSacDetails: 'As per Company/Stock Group',
    sourceOfDetails: 'not available',
    hsnOrSac: '',
    description: '',
    typeOfSupply: 'goods',
    isInclusiveOfDutiesAndTaxes: '',
    rateOfDuty: ''
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
      (e).preventDefault();
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    setStockItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[52vh] absolute left-[44.5%]'>
          <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="stockItemName" className='w-[40%]'>Name</label>
            <span>:</span>
            <input type="text" name='stockItemName' ref={(input) => (inputRefs.current[0] = input)} value={stocItem.stockItemName} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[40%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} value={stocItem.under} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="units" className='w-[40%]'>Units</label>
            <span>:</span>
            <input type="text" name='units' ref={(input) => (inputRefs.current[2] = input)} value={stocItem.units} onKeyDown={(e) => handleKeyDown(e, 2)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <p className='underline text-sm ml-2 mt-3 mb-2'>Statutory Details</p>
          <div className='text-sm flex ml-2 mb-1'>
            <label htmlFor="gstApplicability" className='w-[40%]'>GST applicability</label>
            <span>:</span>
            <input type="text" name='gstApplicability' value={stocItem.gstApplicability} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={handleInputChange} className='w-[200px] h-5 ml-2 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm'>
            <p className='underline ml-2'>HSN/SAC & Related Details</p>
            <div className='flex ml-2'>
              <label htmlFor="hsnOrSacDetails" className='w-[40%]'>HSN/SAC Details</label>
              <span>:</span>
              <input type="text" name='hsnOrSacDetails' ref={(input) => (inputRefs.current[4] = input)} value={stocItem.hsnOrSacDetails} onKeyDown={(e) => handleKeyDown(e, 4)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2'>
              <label htmlFor="sourceOfDetails" className='w-[40%]'>Source of Details</label>
              <span>:</span>
              <input type="text" name='sourceOfDetails' ref={(input) => (inputRefs.current[5] = input)} value={stocItem.sourceOfDetails} onKeyDown={(e) => handleKeyDown(e, 5)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2'>
              <label htmlFor="hsnOrSac" className='w-[40%]'>HSN/SAC</label>
              <span>:</span>
              <input type="text" name='hsnOrSac' ref={(input) => (inputRefs.current[6] = input)} value={stocItem.hsnOrSac} onKeyDown={(e) => handleKeyDown(e, 6)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
            <div className='flex ml-2 mb-2'>
              <label htmlFor="description" className='w-[40%]'>Description</label>
              <span>:</span>
              <input type="text" name='description' ref={(input) => (inputRefs.current[7] = input)} value={stocItem.description} onKeyDown={(e) => handleKeyDown(e, 7)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            </div>
          </div>

          <div className='text-sm flex ml-2'>
            <label htmlFor="typeOfSupply" className='w-[40%]'>Type of Supply</label>
            <span>:</span>
            <input type="text" name='typeOfSupply' value={stocItem.typeOfSupply} ref={(input) => (inputRefs.current[8] = input)} onKeyDown={(e) => handleKeyDown(e, 8)} onChange={handleInputChange} className='w-[200px] h-5 ml-2 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="isInclusiveOfDutiesAndTaxes" className='w-[40%]'>Is inclusive of duties and taxes</label>
            <span>:</span>
            <input type="text" name='isInclusiveOfDutiesAndTaxes' value={stocItem.isInclusiveOfDutiesAndTaxes} ref={(input) => (inputRefs.current[9] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[200px] h-5 ml-2 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="rateOfDuty" className='w-[40%]'>Rate of Duty (eg 5)</label>
            <span>:</span>
            <input type="text" name='rateOfDuty' value={stocItem.rateOfDuty} ref={(input) => (inputRefs.current[10] = input)} onKeyDown={(e) => handleKeyDown(e, 10)} onChange={handleInputChange} className='w-[200px] h-5 ml-2 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          {/* <div className='text-sm flex ml-2 mb-1'>
            <label htmlFor="" className='w-[40%]'>Opening Balance</label>
            <span>:</span>
            <input type="text" className='w-[200px] h-5 ml-2 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div> */}
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default StockItemCreate