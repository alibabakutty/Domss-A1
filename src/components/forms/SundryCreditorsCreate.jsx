import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { createSundryCreditorMaster } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const SundryCreditorsCreate = () => {

  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: '',
    billWiseStatus: '',
    addressOne: '',
    addressTwo: '',
    addressThree: '',
    addressFour: '',
    addressFive: '',
    state: '',
    country: '',
    pincode: '',
    panOrItNumber: '',
    msmeNumber: ''
  })

  const inputRefs = useRef([]);

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSundryCreditor({ ...sundryCreditor, [name]: value });
  };

  const handleKeyDown = (e,index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault();   // Prevents the default form submission behavior
      // If the current input has a non-empty value
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;    // Determine the next field index

        // Focus on the next field if it exists
        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);   // Set the cursor at the beginning
        } else if (e.target.name === 'msmeNumber'){
          const userConfirmed = window.confirm('Do you want to confirm this submit!');
          if (userConfirmed) {
            if (index === inputRefs.current.length - 1){
              handleSubmit(e);
            } else{
              e.preventDefault();
            }
          }
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        e.preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0,0);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSundryCreditorMaster(sundryCreditor);
      console.log(response.data);
      setSundryCreditor({
        sundryCreditorName: '',
        underGroup: '',
        billWiseStatus: '',
        addressOne: '',
        addressTwo: '',
        addressThree: '',
        addressFour: '',
        addressFive: '',
        state: '',
        country: '',
        pincode: '',
        panOrItNumber: '',
        msmeNumber: ''
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
        <form action="" className='border border-slate-500 w-[47%] h-[65vh]' onSubmit={handleSubmit}>
          <div className='text-sm p-1 flex mt-3'>
            <label htmlFor="sundryCreditorName" className='w-[35%] ml-2'>Sundry Creditor's Name</label>
            <span>:</span>
            <input type="text" id='sundryCreditorName' name='sundryCreditorName' ref={(input) => (inputRefs.current[0] = input)} value={sundryCreditor.sundryCreditorName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[300px] ml-16 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="underGroup" className='w-[35%] ml-2'>Under</label>
            <span>:</span>
            <input type="text" id='underGroup' name='underGroup' value={sundryCreditor.underGroup} ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="billWiseStatus" className='w-[35%] ml-2'>Bill-Wise Status</label>
            <span>:</span>
            <input type="text" id='billWiseStatus' value={sundryCreditor.billWiseStatus} name='billWiseStatus' ref={(input) => (inputRefs.current[2] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressOne" className='w-[35%] ml-2'>Address1</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryCreditor.addressOne} ref={(input) => (inputRefs.current[3] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex'>
            <label htmlFor="addressTwo" className='w-[35%] ml-3'>Address2</label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryCreditor.addressTwo} ref={(input) => (inputRefs.current[4] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex'>
            <label htmlFor="addressThree" className='w-[35%] ml-3'>Address3</label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryCreditor.addressThree} ref={(input) => (inputRefs.current[5] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex'>
            <label htmlFor="addressFour" className='w-[35%] ml-3'>Address4</label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryCreditor.addressFour} ref={(input) => (inputRefs.current[6] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex'>
            <label htmlFor="addressFive" className='w-[35%] ml-3'>Address5</label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryCreditor.addressFive} ref={(input) => (inputRefs.current[7] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="state" className='w-[35%] ml-2'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryCreditor.state} ref={(input) => (inputRefs.current[8] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="country" className='w-[35%] ml-2'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryCreditor.country} ref={(input) => (inputRefs.current[9] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="pincode" className='w-[35%] ml-2'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryCreditor.pincode} ref={(input) => (inputRefs.current[10] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[35%] ml-2'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryCreditor.panOrItNumber} ref={(input) => (inputRefs.current[11] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="msmeNumber" className='w-[35%] ml-2'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryCreditor.msmeNumber} ref={(input) => (inputRefs.current[12] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default SundryCreditorsCreate