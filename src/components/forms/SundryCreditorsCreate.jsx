import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { createSundryCreditorMaster } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const SundryCreditorsCreate = () => {

  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: 'sundry creditors',
    billWiseStatus: 'No',
    provideBankDetails: 'No',
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountType: '',
    swiftCode: '',
    addressOne: '',
    addressTwo: '',
    addressThree: '',
    addressFour: '',
    addressFive: '',
    landMarkOrArea: '',
    state: '',
    country: '',
    pincode: '',
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
    forexDate: '',
    referenceName: '',
    dueDate: '',
    forexCurrencyType: '',
    forexAmount: '',
    exchangeRate: '',
    referenceAmount: '',
    referenceCreditOrDebit: ''
  })

  const [bankSubFormModal, setBankSubFormModal] = useState(false);
  const [forexSubFormModal, setForexSubFormModal] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Define a new value for `sundryCreditor` based on the name of the field
    let newValue = value;
  
    // List of fields that should have two decimal formatting
    const fieldsWithTwoDecimals = ['openingBalance', 'uptoOpeningBalanceAmount', 'forexAmount', 'exchangeRate', 'referenceAmount'];
  
    // Check if the current field requires two decimal formatting
    if (fieldsWithTwoDecimals.includes(name)) {
      // Remove non-numeric characters except for '.' and handle the decimal places
      const cleanedValue = value.replace(/[^0-9.]/g, '');
      const [integerPart, decimalPart] = cleanedValue.split('.');
      let formattedValue = integerPart || '0'; // Ensure there is at least '0' before the decimal
  
      if (decimalPart !== undefined) {
        // Format to two decimal places, filling zeros if needed
        formattedValue += '.' + decimalPart.padEnd(2, '0').slice(0, 2);
      } else {
        // Always show '.00' when there is no decimal part
        formattedValue += '.00';
      }
  
      newValue = formattedValue; // Do not convert to Number, keep as a string to display '00'
    }
  
    // Update state based on the field name
    setSundryCreditor((prevState) => {
      const updatedState = { ...prevState, [name]: newValue };
  
      // Dynamically update related fields based on the input field name
      if (name === 'sundryCreditorName') {
        updatedState.billWiseBreakOf = newValue;
      } else if (name === 'openingBalance') {
        updatedState.uptoOpeningBalanceAmount = newValue;
      } else if (name === 'creditOrDebit') {
        updatedState.uptoCreditOrDebit = newValue;
      }
      return updatedState;
    });
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
        } else if (e.target.name === 'referenceCreditOrDebit'){
          const userConfirmed = window.confirm('Do you want to confirm this submit!');
          if (userConfirmed) {
            if (index === inputRefs.current.length - 1){
              handleSubmit(e);
              setForexSubFormModal(false);
            } else{
              // Hide the forexSubFormModal if not the last field
              setForexSubFormModal(false);
              
            }
          } else {
            // Hide the forexSubFormModal if canceled
            setForexSubFormModal(false);
            if (inputRefs.current[0]){
              inputRefs.current[0].focus();
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
      // Handle opening of the bank details subform modal if 'Yes' is selected
      if (value === 'Yes'){
        setBankSubFormModal(true);
      }
    } else if ((key === 'c' || key === 'd' || key === 'c' || key === 'D') && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'Cr' : 'Dr';
      setSundryCreditor({
        ...sundryCreditor,
        creditOrDebit: value,
      })
      // Open the forexSubFormModal when a value is entered in creditOrDebit input
      setForexSubFormModal(true);
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
        provideBankDetails: 'No',
        accountName: '',
        accountNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: '',
        accountType: '',
        swiftCode: '',
        addressOne: '',
        addressTwo: '',
        addressThree: '',
        addressFour: '',
        addressFive: '',
        landMarkOrArea: '',
        state: '',
        country: '',
        pincode: '',
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
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexAmount: '',
        exchangeRate: '',
        referenceAmount: '',
        referenceCreditOrDebit: ''
      })

      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBankSubFormBlur = () => {
    const confirmation = window.confirm('Are you want to proceed with this bank details?');
    if (confirmation) {
      // Hide the subform when "OK" is clicked
      setBankSubFormModal(false);
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
              <div className='w-[550px] bg-white h-[250px] border border-black' >
                <h2 className='text-sm font-medium underline text-center'>Bank Details</h2>
                <div className='text-sm mb-1 flex mt-5'>
                  <label htmlFor="accountName" className='pl-3 w-[30%]'>Account Name</label>
                  <span>:</span>
                  <input type="text" id='accountName' name='accountName' value={sundryCreditor.accountName} ref={(input) => (inputRefs.current[3] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="accountNumber" className='pl-3 w-[30%]'>Account Number</label>
                  <span>:</span>
                  <input type="text" id='accountNumber' name='accountNumber' value={sundryCreditor.accountNumber} ref={(input) => (inputRefs.current[4] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="bankName" className='pl-3 w-[30%]'>Bank Name</label>
                  <span>:</span>
                  <input type="text" id='bankName' name='bankName' value={sundryCreditor.bankName} ref={(input) => (inputRefs.current[5] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="branchName" className='pl-3 w-[30%]'>Branch Name</label>
                  <span>:</span>
                  <input type="text" id='branchName' name='branchName' value={sundryCreditor.branchName} ref={(input) => (inputRefs.current[6] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="ifscCode" className='pl-3 w-[30%]'>IFSC Code</label>
                  <span>:</span>
                  <input type="text" id='ifscCode' name='ifscCode' value={sundryCreditor.ifscCode} ref={(input) => (inputRefs.current[7] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="accountType" className='pl-3 w-[30%]'>Account Type</label>
                  <span>:</span>
                  <input type="text" id='accountType' name='accountType' value={sundryCreditor.accountType} ref={(input) => (inputRefs.current[8] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="swiftCode" className='pl-3 w-[30%]'>Swift Code</label>
                  <span>:</span>
                  <input type="text" id='swiftCode' name='swiftCode' value={sundryCreditor.swiftCode} ref={(input) => (inputRefs.current[9] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' onBlur={handleBankSubFormBlur} />
                </div>
              </div>
            </div>
          )}

          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="addressOne" className='w-[38%] ml-2'>Address</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryCreditor.addressOne} ref={(input) => (inputRefs.current[10] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressTwo" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryCreditor.addressTwo} ref={(input) => (inputRefs.current[11] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressThree" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryCreditor.addressThree} ref={(input) => (inputRefs.current[12] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFour" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryCreditor.addressFour} ref={(input) => (inputRefs.current[13] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 13)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFive" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryCreditor.addressFive} ref={(input) => (inputRefs.current[14] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 14)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landMarkOrArea" className='w-[38.2%] ml-2'>LandMark/Area</label>
            <span>:</span>
            <input type="text" id='landMarkOrArea' name='landMarkOrArea' value={sundryCreditor.landMarkOrArea} ref={(input) => (inputRefs.current[15] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 15)} className='w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="state" className='w-[38.2%] ml-2'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryCreditor.state} ref={(input) => (inputRefs.current[16] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 16)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="country" className='w-[38.3%] ml-2'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryCreditor.country} ref={(input) => (inputRefs.current[17] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 17)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="pincode" className='w-[38.3%] ml-2'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryCreditor.pincode} ref={(input) => (inputRefs.current[18] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 18)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[38.35%] ml-2'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryCreditor.panOrItNumber} ref={(input) => (inputRefs.current[19] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 19)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="gstinOrUinNumber" className='w-[38.35%] ml-2'>GSTIN/UIN No.</label>
            <span>:</span>
            <input type="text" id='gstinOrUinNumber' name='gstinOrUinNumber' value={sundryCreditor.gstinOrUinNumber} ref={(input) => (inputRefs.current[20] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 20)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="msmeNumber" className='w-[38.35%] ml-2'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryCreditor.msmeNumber} ref={(input) => (inputRefs.current[21] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 21)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="contactPersonName" className='w-[38.5%] ml-2'>Contact Person Name</label>
            <span>:</span>
            <input type="text" id='contactPersonName' name='contactPersonName' value={sundryCreditor.contactPersonName} ref={(input) => (inputRefs.current[22] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 22)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="mobileNumber" className='w-[38.5%] ml-2'>Mobile No.</label>
            <span>:</span>
            <input type="text" id='mobileNumber' name='mobileNumber' value={sundryCreditor.mobileNumber} ref={(input) => (inputRefs.current[23] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 23)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landlineNumber" className='w-[38.5%] ml-2'>Landline No.</label>
            <span>:</span>
            <input type="text" id='landlineNumber' name='landlineNumber' value={sundryCreditor.landlineNumber} ref={(input) => (inputRefs.current[24] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 24)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="emailId" className='w-[38.5%] ml-2'>Email Id</label>
            <span>:</span>
            <input type="text" id='emailId' name='emailId' value={sundryCreditor.emailId} ref={(input) => (inputRefs.current[25] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 25)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="openingBalance" className='w-[21%] ml-2'>Opening Balance</label>
            (<input type="text" id='dateForOpening' name='dateForOpening' value={sundryCreditor.dateForOpening} className='w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />)
            <span className='ml-3'>:</span>
            <input type="text" id='openingBalance' name='openingBalance' ref={(input) => (inputRefs.current[26] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 26)} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            <input type="text" id='creditOrDebit' name='creditOrDebit' value={sundryCreditor.creditOrDebit} ref={(input) => (inputRefs.current[27] = input)} onKeyDown={(e) => handleKeyDown(e,27)} onChange={handleInputChange} className='w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>


          {forexSubFormModal && (
            <div className='fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10' >
              <div className='w-[1100px] bg-white h-[400px] border border-black'>
                <div className='flex text-sm ml-[150px] mt-1'>
                  <label htmlFor="billWiseBreakOf" className='w-[16%]'>Bill-wise Breakup of</label>
                  <span>:</span>
                  <input type="text" id='billWiseBreakOf' name='billWiseBreakOf' value={sundryCreditor.billWiseBreakOf} onChange={handleInputChange} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='flex text-sm mb-1 ml-[150px]'>
                  <label htmlFor="uptoOpeningBalanceAmount" className='w-[16%]'>Upto</label>
                  <span>:</span>₹
                  <input type="text" id='uptoOpeningBalanceAmount' name='uptoOpeningBalanceAmount' value={sundryCreditor.uptoOpeningBalanceAmount} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='uptoCreditOrDebit' name='uptoCreditOrDebit' value={sundryCreditor.uptoCreditOrDebit} onChange={handleInputChange} className='w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='flex border border-t-slate-400 border-b-slate-400 justify-between'>
                  <p className='w-[60px] text-sm'>Date</p>
                  <p className='w-[150px] text-sm'>Reference Name</p>
                  <p className='text-sm'>Due Date</p>
                  <p className='text-sm'>Forex Currency Type</p>
                  <p className='text-sm'>Forex Amount</p>
                  <p className='text-sm'>Exchange Rate</p>
                  <p className='text-sm'>Amount</p>
                  <p>Cr/Dr</p>
                </div>
                <div className='flex justify-between'>
                  <input type="text" id='forexDate' name='forexDate' value={sundryCreditor.forexDate} onChange={handleInputChange} ref={(input) => (inputRefs.current[28] = input)} onKeyDown={(e) => handleKeyDown(e, 28)} className='w-[90px] h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='referenceName' name='referenceName' value={sundryCreditor.referenceName} onChange={handleInputChange} ref={(input) => (inputRefs.current[29] = input)} onKeyDown={(e) => handleKeyDown(e, 29)} className='w-[150px] h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='dueDate' name='dueDate' value={sundryCreditor.dueDate} onChange={handleInputChange} ref={(input) => (inputRefs.current[30] = input)} onKeyDown={(e) => handleKeyDown(e, 30)} className='w-[90px] ml-10 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='forexCurrencyType' name='forexCurrencyType' value={sundryCreditor.forexCurrencyType} onChange={handleInputChange} ref={(input) => (inputRefs.current[31] = input)} onKeyDown={(e) => handleKeyDown(e, 31)} className='w-[150px] ml-3 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='forexAmount' name='forexAmount' value={sundryCreditor.forexAmount} onChange={handleInputChange} ref={(input) => (inputRefs.current[32] = input)} onKeyDown={(e) => handleKeyDown(e, 32)} className='w-[100px] ml-3 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='exchangeRate' name='exchangeRate' value={sundryCreditor.exchangeRate} onChange={handleInputChange} ref={(input) => (inputRefs.current[33] = input)} onKeyDown={(e) => handleKeyDown(e, 33)} className='w-[100px] ml-3 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='referenceAmount' name='referenceAmount' value={sundryCreditor.referenceAmount} onChange={handleInputChange} ref={(input) => (inputRefs.current[34] = input)} onKeyDown={(e) => handleKeyDown(e, 34)} className='w-[120px] h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                  <input type="text" id='referenceCreditOrDebit' name='referenceCreditOrDebit' value={sundryCreditor.referenceCreditOrDebit} onChange={handleInputChange} ref={(input) => (inputRefs.current[35] = input)} onKeyDown={(e) => handleKeyDown(e, 35)} className='w-[50px] h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
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