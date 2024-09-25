import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificSundryDebtorName } from '../services/MasterService';

const SundryDebtorsAlter = () => {

  const { datas } = useParams();

  const [sundryDebtor, setSundryDebtor] = useState({
    sundryDebtorName: '',
    underGroup: '',
    forexApplicable: '',
    billWiseStatus: '',
    provideBankDetails: '',
    bank: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      ifscCode: '',
      accountType: '',
      swiftCode: ''
    },
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
    dateForOpening: '',
    openingBalance: '',
    creditOrDebit: '',
    forexSubForm: [
      {
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexCurrencySymbol: '',
        forexAmount: '',
        exchangeRate: '',
        outwardReferenceAmount: '',
        inwardReferenceAmount: '',
        referenceCreditOrDebit: '',
        totalForexAmount: '',
        totalAmount: '',
        totalAmountCreditOrDebit: '',
        totalInwardReferenceAmount: '',
        totalInwardReferenceAmountCreditOrDebit: ''
      },
    ],
  });

  const [bankSubFormModal, setBankSubFormModal] = useState(false);
  const [forexSubFormModal, setForexSubFormModal] = useState(false);
  const [currencySuggestion, setCurrencySuggestion] = useState([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [currencyFocused, setCurrencyFocused] = useState(false);
  const [highlightedSuggestionCurrency, setHighlightedSuggestionCurrency] = useState(0);
  const inputRefs = useRef([]);
  const inputRefsBank = useRef([]);
  const inputRefsForex = useRef([]);
  const prevBankSubFormModal = useRef(false);      // Tracks the previous state of bankSubFormModal
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    if (bankSubFormModal && inputRefsBank.current[0]){
      inputRefsBank.current[0].focus();
    }

    // If forexSubFormModal is active, focus the first input in that form
    if (forexSubFormModal && inputRefsForex.current[0]){
      inputRefsForex.current[0].focus();
    }

    // Detect if the bankSubFormModal is closed
    if (prevBankSubFormModal.current && !bankSubFormModal){
      // Focus on the addressOne input when bankSubFormModal closes
      const addressOneInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'addressOne'
      );
      if (addressOneInputIndex !== -1 && inputRefs.current[addressOneInputIndex]){
        inputRefs.current[addressOneInputIndex].focus();
      }
    }

    // Update the previous state value
    prevBankSubFormModal.current = bankSubFormModal;
  },[bankSubFormModal, forexSubFormModal]);

  useEffect(() => {
    // Utility function to format dates from YYYY-MM-DD to DD-MMM-YYYY
    const formateDateForDisplay = (date) => {
      if (!date) return '';

      const [year, month, day] = date.split('-');    // Change to '-' for typical date format
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return `${day.padStart(2, '0')}-${monthNames[parseInt(month, 10) - 1]}-${year}`;
    };

    const loadCustomers = async () => {
      try {
        const result = await getSpecificSundryDebtorName(datas);
        console.log('API-Response',result.data);
        const {
          sundryDebtorName = '',
          underGroup = '',
          forexApplicable = '',
          billWiseStatus = '',
          provideBankDetails = '',
          sundryDebtorBankDetails,
          addressOne = '',
          addressTwo = '',
          addressThree = '',
          addressFour = '',
          addressFive = '',
          landMarkOrArea = '',
          state = '',
          country = '',
          pincode = '',
          panOrItNumber = '',
          gstinOrUinNumber = '',
          msmeNumber = '',
          contactPersonName = '',
          mobileNumber = '',
          landlineNumber = '',
          emailId = '',
          dateForOpening = '',
          openingBalance = '',
          creditOrDebit = '',
          sundryDebtorForexDetails
        } = result.data;   
        
        let fetchedBank = {
          accountName: '',
          accountNumber: '',
          bankName: '',
          branchName: '',
          ifscCode: '',
          accountType: '',
          swiftCode: '',
        };

        let fetchedForexSubForm = [
          {
            forexDate: '',
            referenceName: '',
            dueDate: '',
            forexCurrencyType: '',
            forexCurrencySymbol: '',
            forexAmount: '',
            exchangeRate: '',
            outwardReferenceAmount: '',
            inwardReferenceAmount: '',
            referenceCreditOrDebit: '',
            totalForexAmount: '',
            totalAmount: '',
            totalAmountCreditOrDebit: '',
            totalInwardReferenceAmount: '',
            totalInwardReferenceAmountCreditOrDebit: ''
          }
        ];

        if (sundryDebtorBankDetails && typeof sundryDebtorBankDetails === 'object'){
          fetchedBank = {
            accountName: sundryDebtorBankDetails.accountName || '',
            accountNumber: sundryDebtorBankDetails.accountNumber || '',
            bankName: sundryDebtorBankDetails.bankName || '',
            branchName: sundryDebtorBankDetails.branchName || '',
            ifscCode: sundryDebtorBankDetails.ifscCode || '',
            accountType: sundryDebtorBankDetails.accountType || '',
            swiftCode: sundryDebtorBankDetails.swiftCode || '',
          };
        }

        if (Array.isArray(sundryDebtorForexDetails) && sundryDebtorForexDetails.length > 0){
          fetchedForexSubForm = sundryDebtorForexDetails.map((forex) => ({
            forexDate: forex.forexDate || '',
            formattedForexDate: formateDateForDisplay(forex.forexDate),   // Format forexDate for display
            referenceName: forex.referenceName || '',
            dueDate: forex.dueDate || '',
            formattedDueDate: formateDateForDisplay(forex.dueDate),   // Format duedate for display
            forexCurrencyType: forex.forexCurrencyType || '',
            forexCurrencySymbol: forex.forexCurrencySymbol || '',
            forexAmount: forex.forexAmount || '',
            exchangeRate: forex.exchangeRate || '',
            outwardReferenceAmount: forex.outwardReferenceAmount || '',
            inwardReferenceAmount: forex.inwardReferenceAmount || '',
            referenceCreditOrDebit: forex.referenceCreditOrDebit || '',
          }));
        }

        // Set the state with the updated values
        setSundryDebtor({
          sundryDebtorName,
          underGroup,
          forexApplicable,
          billWiseStatus,
          provideBankDetails,
          bank: fetchedBank,
          addressOne,
          addressTwo,
          addressThree,
          addressFour,
          addressFive,
          landMarkOrArea,
          state,
          country,
          pincode,
          panOrItNumber,
          gstinOrUinNumber,
          msmeNumber,
          contactPersonName,
          mobileNumber,
          landlineNumber,
          emailId,
          dateForOpening,
          openingBalance,
          creditOrDebit,
          forexSubForm: fetchedForexSubForm
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadCustomers();
  },[]);
  
  

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
      setSundryDebtor({
        ...sundryDebtor,
        billWiseStatus: value,
      })
    } else if ((key === 'y' || key === 'n' || key === 'Y' || key === 'N') && e.target.name === 'provideBankDetails'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'Yes' : 'No';
      setSundryDebtor({
        ...sundryDebtor,
        provideBankDetails: value,
      })
      // Handle opening of the bank details subform modal if 'Yes' is selected
      if (value === 'Yes'){
        setBankSubFormModal(true);
      }
    } else if ((key === 'c' || key === 'd' || key === 'c' || key === 'D') && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'Cr' : 'Dr';
      setSundryDebtor({
        ...sundryDebtor,
        creditOrDebit: value,
      })
      // Open the forexSubFormModal when a value is entered in creditOrDebit input
      setForexSubFormModal(true);
    }
  };

  const handleBankSubFormBlur = () => {
    const confirmation = window.confirm('Are you want to proceed with this bank details?');
    if (confirmation) {
      // Hide the subform when "OK" is clicked
      setBankSubFormModal(false);
    }
  };

  // Utility function to format numbers in Indian decimal format
  const formatIndianNumber = (value) => {
    // Convert the value to a number, handle edge cases for NaN or empty strings
    const numberValue = Number(value);
    if (isNaN(numberValue)) return value; // Return as is if not a valid number
    
    // Format the number in Indian format with two decimal places
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numberValue);
  };
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[44.9%] h-[92.9vh]'></div>
        <form action="" className='border border-slate-500 w-[48.5%] h-[92.7vh]'>
          <div className='text-sm pl-1 mb-1 flex mt-3'>
            <label htmlFor="sundryDebtorName" className='w-[38%] ml-2'>Sundry Debtor's Name</label>
            <span>:</span>
            <input type="text" id='sundryDebtorName' name='sundryDebtorName' ref={(input) => (inputRefs.current[0] = input)} value={sundryDebtor.sundryDebtorName} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="underGroup" className='w-[38%] ml-2'>Under</label>
            <span>:</span>
            <input type="text" id='underGroup' name='underGroup' value={sundryDebtor.underGroup} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='flex'>
            <div className='text-sm pl-1 mb-1'>
              <label htmlFor="billWiseStatus" className='ml-2 mr-[155px]'>Bill-Wise Status</label>
              <span>:</span>
              <input type="text" id='billWiseStatus' value={sundryDebtor.billWiseStatus} name='billWiseStatus' ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            </div>
            <div className='text-sm pl-1 mb-1 absolute left-[990px]'>
              <label htmlFor="provideBankDetails" className='ml-2 mr-5'>Provide bank details</label>
              <span>:</span>
              <input type="text" id='provideBankDetails' name='provideBankDetails' value={sundryDebtor.provideBankDetails} ref={(input) => (inputRefs.current[2] = input)} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            </div>
          </div>

          {bankSubFormModal && (
            <div className='fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10' >
              <div className='w-[550px] bg-white h-[250px] border border-black' >
                <h2 className='text-sm font-medium underline text-center'>Bank Details</h2>
                <div className='text-sm mb-1 flex mt-5'>
                  <label htmlFor="accountName" className='pl-3 w-[30%]'>Account Name</label>
                  <span>:</span>
                  <input type="text" id='accountName' name='accountName' value={sundryDebtor.bank.accountName} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="accountNumber" className='pl-3 w-[30%]'>Account Number</label>
                  <span>:</span>
                  <input type="text" id='accountNumber' name='accountNumber' value={sundryDebtor.bank.accountNumber} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="bankName" className='pl-3 w-[30%]'>Bank Name</label>
                  <span>:</span>
                  <input type="text" id='bankName' name='bankName' value={sundryDebtor.bank.bankName} ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="branchName" className='pl-3 w-[30%]'>Branch Name</label>
                  <span>:</span>
                  <input type="text" id='branchName' name='branchName' value={sundryDebtor.bank.branchName} ref={(input) => (inputRefs.current[6] = input)} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="ifscCode" className='pl-3 w-[30%]'>IFSC Code</label>
                  <span>:</span>
                  <input type="text" id='ifscCode' name='ifscCode' value={sundryDebtor.bank.ifscCode} ref={(input) => (inputRefs.current[7] = input)} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="accountType" className='pl-3 w-[30%]'>Account Type</label>
                  <span>:</span>
                  <input type="text" id='accountType' name='accountType' value={sundryDebtor.bank.accountType} ref={(input) => (inputRefs.current[8] = input)} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
                </div>
                <div className='text-sm mb-1 flex'>
                  <label htmlFor="swiftCode" className='pl-3 w-[30%]'>Swift Code</label>
                  <span>:</span>
                  <input type="text" id='swiftCode' name='swiftCode' value={sundryDebtor.bank.swiftCode} ref={(input) => (inputRefs.current[9] = input)} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' onBlur={handleBankSubFormBlur} />
                </div>
              </div>
            </div>
          )}

          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="addressOne" className='w-[38%] ml-2'>Address</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryDebtor.addressOne} ref={(input) => (inputRefs.current[10] = input)} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressTwo" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryDebtor.addressTwo} ref={(input) => (inputRefs.current[11] = input)} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressThree" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryDebtor.addressThree} ref={(input) => (inputRefs.current[12] = input)} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFour" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryDebtor.addressFour} ref={(input) => (inputRefs.current[13] = input)} onKeyDown={(e) => handleKeyDown(e, 13)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFive" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryDebtor.addressFive} ref={(input) => (inputRefs.current[14] = input)} onKeyDown={(e) => handleKeyDown(e, 14)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landMarkOrArea" className='w-[38.2%] ml-2'>LandMark/Area</label>
            <span>:</span>
            <input type="text" id='landMarkOrArea' name='landMarkOrArea' value={sundryDebtor.landMarkOrArea} ref={(input) => (inputRefs.current[15] = input)} onKeyDown={(e) => handleKeyDown(e, 15)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="state" className='w-[38.2%] ml-2'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryDebtor.state} ref={(input) => (inputRefs.current[16] = input)} onKeyDown={(e) => handleKeyDown(e, 16)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="country" className='w-[38.3%] ml-2'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryDebtor.country} ref={(input) => (inputRefs.current[17] = input)} onKeyDown={(e) => handleKeyDown(e, 17)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="pincode" className='w-[38.3%] ml-2'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryDebtor.pincode} ref={(input) => (inputRefs.current[18] = input)} onKeyDown={(e) => handleKeyDown(e, 18)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[38.35%] ml-2'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryDebtor.panOrItNumber} ref={(input) => (inputRefs.current[19] = input)} onKeyDown={(e) => handleKeyDown(e, 19)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="gstinOrUinNumber" className='w-[38.35%] ml-2'>GSTIN/UIN No.</label>
            <span>:</span>
            <input type="text" id='gstinOrUinNumber' name='gstinOrUinNumber' value={sundryDebtor.gstinOrUinNumber} ref={(input) => (inputRefs.current[20] = input)} onKeyDown={(e) => handleKeyDown(e, 20)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="msmeNumber" className='w-[38.35%] ml-2'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryDebtor.msmeNumber} ref={(input) => (inputRefs.current[21] = input)} onKeyDown={(e) => handleKeyDown(e, 21)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="contactPersonName" className='w-[38.5%] ml-2'>Contact Person Name</label>
            <span>:</span>
            <input type="text" id='contactPersonName' name='contactPersonName' value={sundryDebtor.contactPersonName} ref={(input) => (inputRefs.current[22] = input)} onKeyDown={(e) => handleKeyDown(e, 22)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="mobileNumber" className='w-[38.5%] ml-2'>Mobile No.</label>
            <span>:</span>
            <input type="text" id='mobileNumber' name='mobileNumber' value={sundryDebtor.mobileNumber} ref={(input) => (inputRefs.current[23] = input)} onKeyDown={(e) => handleKeyDown(e, 23)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landlineNumber" className='w-[38.5%] ml-2'>Landline No.</label>
            <span>:</span>
            <input type="text" id='landlineNumber' name='landlineNumber' value={sundryDebtor.landlineNumber} ref={(input) => (inputRefs.current[24] = input)} onKeyDown={(e) => handleKeyDown(e, 24)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="emailId" className='w-[38.5%] ml-2'>Email Id</label>
            <span>:</span>
            <input type="text" id='emailId' name='emailId' value={sundryDebtor.emailId} ref={(input) => (inputRefs.current[25] = input)} onKeyDown={(e) => handleKeyDown(e, 25)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="openingBalance" className='w-[22%] ml-2'>Opening Balance</label>
            (<input type="text" id='dateForOpening' name='dateForOpening' value={sundryDebtor.dateForOpening} className='w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />)
            <span className='ml-3'>:</span>
            <input type="text" id='openingBalance' name='openingBalance' value={formatIndianNumber(sundryDebtor.openingBalance)} ref={(input) => (inputRefs.current[26] = input)} onKeyDown={(e) => handleKeyDown(e, 26)} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            <input type="text" id='creditOrDebit' name='creditOrDebit' value={sundryDebtor.creditOrDebit} ref={(input) => (inputRefs.current[27] = input)} onKeyDown={(e) => handleKeyDown(e,27)} className='w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>


          {forexSubFormModal && (
            <div className='fixed top-[44px] left-0 right-[138px] bottom-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10'>
              <div className='bg-white w-[1100px] h-[500px]'>

              </div>
            </div>
          )}

        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default SundryDebtorsAlter