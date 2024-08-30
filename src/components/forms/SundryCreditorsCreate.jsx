import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { createSundryCreditorMaster } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const SundryCreditorsCreate = () => {

  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: 'Sundry Creditors',
    billWiseStatus: 'No',
    addressOne: '',
    addressTwo: '',
    addressThree: '',
    addressFour: '',
    addressFive: '',
    landMarkOrArea: '',
    state: '',
    country: '',
    pincode: '',
    provideBankDetails: 'No',
    panOrItNumber: '',
    gstinOrUinNumber: '',
    msmeNumber: '',
    contactPersonName: '',
    mobileNumber: '',
    landlineNumber: '',
    emailId: '',
    dateForOpening: '1-Apr-2024',
    openingBalance: '',
    creditOrDebit: '',
    billWiseBreakOf: '',
    uptoOpeningBalanceAmount: '',
    uptoCreditOrDebit: '',
    billDetails: '',
    date: '',
    baseCurrency: '',
    addOnCurrency: '',
    exchangeRate: '',
    controlForexBills: '',
    noOfDaysOrDueDate: '',
    creditControlAmount: ''
  })

  const [bankSubFormModal, setBankSubFormModal] = useState(false);
  const [forexSubFormModal, setForexSubFormModal] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const formatNumberWithCommas = (value) => {
    const [integerPart, decimalPart] = value.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'openingBalance') {
      // Remove non-numeric characters except for '.' and handle the decimal places
      const cleanedValue = value.replace(/[^0-9.]/g, '');
      const [integerPart, decimalPart] = cleanedValue.split('.');
      let formattedValue = integerPart;
  
      if (decimalPart) {
        // Format to two decimal places
        formattedValue += '.' + decimalPart.slice(0, 2);
      }
  
      setSundryCreditor({ ...sundryCreditor, [name]: formattedValue });
    } else {
      setSundryCreditor({ ...sundryCreditor, [name]: value });
    }
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
        } else if (e.target.name === 'creditControlAmount'){
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
    } else if ((key === 'y' || key === 'n' || key === 'Y' || key === 'N') && e.target.name === 'billWiseStatus'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'Yes' : 'No';
      setSundryCreditor({
        ...sundryCreditor,
        billWiseStatus: value,
      })
    } else if ((key === 'y' || key === 'n' || key === 'Y' || key === 'N') && e.target.name === 'provideBankDetails'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'Yes' : 'No';
      setSundryCreditor({
        ...sundryCreditor,
        provideBankDetails: value,
      })
    } else if ((key === 'c' || key === 'd' || key === 'c' || key === 'D') && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'Cr' : 'Dr';
      setSundryCreditor({
        ...sundryCreditor,
        creditOrDebit: value,
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert openingBalance to a number for backend calculations
      const submissionData = {
        ...sundryCreditor,
        openingBalance: parseFloat(sundryCreditor.openingBalance) || 0
      }
      const response = await createSundryCreditorMaster(submissionData);
      console.log(response.data);

      // Reset form data including openingBalance
      setSundryCreditor({
        sundryCreditorName: '',
        underGroup: 'Sundry Creditors',
        billWiseStatus: 'No',
        addressOne: '',
        addressTwo: '',
        addressThree: '',
        addressFour: '',
        addressFive: '',
        landMarkOrArea: '',
        state: '',
        country: '',
        pincode: '',
        provideBankDetails: 'No',
        panOrItNumber: '',
        gstinOrUinNumber: '',
        msmeNumber: '',
        contactPersonName: '',
        mobileNumber: '',
        landlineNumber: '',
        emailId: '',
        dateForOpening: '1-Apr-2024',
        openingBalance: '',
        creditOrDebit: '',
        billWiseBreakOf: '',
        uptoOpeningBalanceAmount: '',
        uptoCreditOrDebit: '',
        billDetails: '',
        date: '',
        baseCurrency: '',
        addOnCurrency: '',
        exchangeRate: '',
        controlForexBills: '',
        noOfDaysOrDueDate: '',
        creditControlAmount: ''
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
        <form action="" className='border border-slate-500 w-[48.5%] h-[92.7vh]' onSubmit={handleSubmit}>
          <div className='text-sm pl-1 mb-1 flex mt-3'>
            <label htmlFor="sundryCreditorName" className='w-[38%] ml-2'>Sundry Creditor's Name</label>
            <span>:</span>
            <input type="text" id='sundryCreditorName' name='sundryCreditorName' ref={(input) => (inputRefs.current[0] = input)} value={sundryCreditor.sundryCreditorName} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="underGroup" className='w-[38%] ml-2'>Under</label>
            <span>:</span>
            <input type="text" id='underGroup' name='underGroup' value={sundryCreditor.underGroup} onChange={handleInputChange} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='flex'>
            <div className='text-sm pl-1 mb-1'>
              <label htmlFor="billWiseStatus" className='ml-2 mr-[138.4px]'>Bill-Wise Status</label>
              <span>:</span>
              <input type="text" id='billWiseStatus' value={sundryCreditor.billWiseStatus} name='billWiseStatus' ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            </div>
            <div className='text-sm pl-1 mb-1 absolute left-[990px]'>
              <label htmlFor="provideBankDetails" className='ml-2 mr-5'>Provide bank details</label>
              <span>:</span>
              <input type="text" id='provideBankDetails' name='provideBankDetails' value={sundryCreditor.provideBankDetails} ref={(input) => (inputRefs.current[2] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            </div>
          </div>

          {bankSubFormModal && (
            <div className='fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10' >
              <div className='w-[550px] bg-white h-[400px] border border-black' >
                <h2 className='text-sm font-medium underline text-center'>Bank Details</h2>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>Account Name</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>Account Number</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>Bank Name</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>Branch Name</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>IFSC Code</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="" className='pl-3 w-[30%]'>Account Type</label>
                  <span>:</span>
                  <input type="text" className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
                </div>
              </div>
            </div>
          )}

          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="addressOne" className='w-[38%] ml-2'>Address</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryCreditor.addressOne} ref={(input) => (inputRefs.current[3] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressTwo" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryCreditor.addressTwo} ref={(input) => (inputRefs.current[4] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressThree" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryCreditor.addressThree} ref={(input) => (inputRefs.current[5] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFour" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryCreditor.addressFour} ref={(input) => (inputRefs.current[6] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFive" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryCreditor.addressFive} ref={(input) => (inputRefs.current[7] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landMarkOrArea" className='w-[38.2%] ml-2'>LandMark/Area</label>
            <span>:</span>
            <input type="text" id='landMarkOrArea' name='landMarkOrArea' value={sundryCreditor.landMarkOrArea} ref={(input) => (inputRefs.current[8] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="state" className='w-[38.2%] ml-2'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryCreditor.state} ref={(input) => (inputRefs.current[9] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="country" className='w-[38.3%] ml-2'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryCreditor.country} ref={(input) => (inputRefs.current[10] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="pincode" className='w-[38.3%] ml-2'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryCreditor.pincode} ref={(input) => (inputRefs.current[11] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[38.35%] ml-2'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryCreditor.panOrItNumber} ref={(input) => (inputRefs.current[12] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="gstinOrUinNumber" className='w-[38.35%] ml-2'>GSTIN/UIN No.</label>
            <span>:</span>
            <input type="text" id='gstinOrUinNumber' name='gstinOrUinNumber' value={sundryCreditor.gstinOrUinNumber} ref={(input) => (inputRefs.current[13] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 13)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="msmeNumber" className='w-[38.35%] ml-2'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryCreditor.msmeNumber} ref={(input) => (inputRefs.current[14] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 14)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="contactPersonName" className='w-[38.5%] ml-2'>Contact Person Name</label>
            <span>:</span>
            <input type="text" id='contactPersonName' name='contactPersonName' value={sundryCreditor.contactPersonName} ref={(input) => (inputRefs.current[15] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 15)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="mobileNumber" className='w-[38.5%] ml-2'>Mobile No.</label>
            <span>:</span>
            <input type="text" id='mobileNumber' name='mobileNumber' value={sundryCreditor.mobileNumber} ref={(input) => (inputRefs.current[16] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 16)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landlineNumber" className='w-[38.5%] ml-2'>Landline No.</label>
            <span>:</span>
            <input type="text" id='landlineNumber' name='landlineNumber' value={sundryCreditor.landlineNumber} ref={(input) => (inputRefs.current[17] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 17)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="emailId" className='w-[38.5%] ml-2'>Email Id</label>
            <span>:</span>
            <input type="text" id='emailId' name='emailId' value={sundryCreditor.emailId} ref={(input) => (inputRefs.current[18] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 18)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="openingBalance" className='w-[21%] ml-2'>Opening Balance</label>
            (<input type="text" id='dateForOpening' name='dateForOpening' value={sundryCreditor.dateForOpening} className='w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />)
            <span className='ml-3'>:</span>
            <input type="text" id='openingBalance' name='openingBalance' ref={(input) => (inputRefs.current[19] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 19)} className='w-[150px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
            <input type="text" id='creditOrDebit' name='creditOrDebit' value={sundryCreditor.creditOrDebit} ref={(input) => (inputRefs.current[20] = input)} onKeyDown={(e) => handleKeyDown(e,20)} onChange={handleInputChange} className='w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
          </div>


          {forexSubFormModal && (
            <div className='fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10' >
              <div className='w-[1000px] bg-white h-[400px]'>
                <h2 className='text-sm font-medium underline text-center'>Forex Details</h2>
                <div className='flex border border-t-slate-400 border-b-slate-400 justify-between'>
                  <p className='w-[60px]'>Date</p>
                  <p className='w-[60px]'>Reference Name</p>
                  <p>Due Date</p>
                  <p>Forex Currency Type</p>
                  <p>Forex Amount</p>
                  <p>Exchange Rate</p>
                  <p>Amount (Dr/Cr)</p>
                </div>
                <div>
                  <input type="text" className='w-[70px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[150px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[150px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                </div>
                
            </div>
          )}

        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default SundryCreditorsCreate