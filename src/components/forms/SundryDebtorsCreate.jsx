import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { createSundryDebtorMaster } from '../services/MasterService';

const SundryDebtorsCreate = () => {

  const [sundryDebtor, setSundryDebtor] = useState({
    sundryDebtorName: '',
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
    setSundryDebtor({ ...sundryDebtor, [name]: value });
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
          if (userConfirmed){
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
      const response = await createSundryDebtorMaster(sundryDebtor);
      console.log(response.data);
      setSundryDebtor({
        ...sundryDebtor,
      })

      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[53.4%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[42.6%] h-[65vh]'>
          <div className='text-sm p-1 flex'>
            <label htmlFor="sundryDebtorName" className='w-[30%]'>Sundry Debtor's Name</label>
            <span>:</span>
            <input type="text" id='sundryDebtorName' name='sundryDebtorName' ref={(input) => (inputRefs.current[0] = input)} value={sundryDebtor.sundryDebtorName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="underGroup" className='w-[30%]'>Under</label>
            <span>:</span>
            <input type="text" id='underGroup' name='underGroup' value={sundryDebtor.underGroup} ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="billWiseStatus" className='w-[30%]'>Bill-Wise Status</label>
            <span>:</span>
            <input type="text" id='billWiseStatus' value={sundryDebtor.billWiseStatus} name='billWiseStatus' ref={(input) => (inputRefs.current[2] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressOne" className='w-[30%]'>Address1</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryDebtor.addressOne} ref={(input) => (inputRefs.current[3] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressTwo" className='w-[30%]'>Address2</label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryDebtor.addressTwo} ref={(input) => (inputRefs.current[4] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressThree" className='w-[30%]'>Address3</label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryDebtor.addressThree} ref={(input) => (inputRefs.current[5] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressFour" className='w-[30%]'>Address4</label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryDebtor.addressFour} ref={(input) => (inputRefs.current[6] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="addressFive" className='w-[30%]'>Address5</label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryDebtor.addressFive} ref={(input) => (inputRefs.current[7] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="state" className='w-[30%]'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryDebtor.state} ref={(input) => (inputRefs.current[8] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="country" className='w-[30%]'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryDebtor.country} ref={(input) => (inputRefs.current[9] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="pincode" className='w-[30%]'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryDebtor.pincode} ref={(input) => (inputRefs.current[10] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[30%]'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryDebtor.panOrItNumber} ref={(input) => (inputRefs.current[11] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
          <div className='text-sm p-1 flex'>
            <label htmlFor="msmeNumber" className='w-[30%]'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryDebtor.msmeNumber} ref={(input) => (inputRefs.current[12] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default SundryDebtorsCreate