import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificSundryCreditorName } from '../services/MasterService';

const SundryCreditorsDisplay = () => {

  const { datas } = useParams();

  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: '',
    billWiseStatus: '',
    provideBankDetails: '',
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
    dateForOpening: '',
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
  const inputRefsBank = useRef([]);
  const inputRefsForex = useRef([]);
  const navigate = useNavigate();

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    if (bankSubFormModal){
      if(inputRefsBank.current[0]){
        inputRefsBank.current[0].focus();
      }
    }

    // If forexSubFormModal is active, focus the first input in that form
    if (forexSubFormModal && inputRefsForex.current[0]){
      inputRefsForex.current[0].focus();
    }

    // Utility function to format dates from YYYY-MM-DD to DD-MMM-YYYY
    const formatDateForDisplay = (date) => {
      if (!date) return '';
    
      const [year, month, day] = date.split('-'); // Change to '-' for typical date format
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      return `${day.padStart(2, '0')}-${monthNames[parseInt(month, 10) - 1]}-${year}`;
    };
    

    const loadSuppliers = async () => {
      try {
        const result = await getSpecificSundryCreditorName(datas);
        console.log('API-Response',result.data);
        
        const {
          sundryCreditorName= '',
          underGroup = '',
          billWiseStatus = '',
          provideBankDetails = '',
          sundryCreditorBankDetails,
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
          sundryCreditorForexDetails
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
            referenceAmount: '',
            referenceCreditOrDebit: '',
          }
        ];

        if (sundryCreditorBankDetails && typeof sundryCreditorBankDetails === 'object'){
          fetchedBank = {
            accountName: sundryCreditorBankDetails.accountName || '',
            accountNumber: sundryCreditorBankDetails.accountNumber || '',
            bankName: sundryCreditorBankDetails.bankName || '',
            branchName: sundryCreditorBankDetails.branchName || '',
            ifscCode: sundryCreditorBankDetails.ifscCode || '',
            accountType: sundryCreditorBankDetails.accountType || '',
            swiftCode: sundryCreditorBankDetails.swiftCode || '',
          };
        }

        if (Array.isArray(sundryCreditorForexDetails) && sundryCreditorForexDetails.length > 0){
          fetchedForexSubForm = sundryCreditorForexDetails.map((forex) => ({
            forexDate: forex.forexDate || '',
            formattedForexDate: formatDateForDisplay(forex.forexDate),   // Format forexDate for display
            referenceName: forex.referenceName || '',
            dueDate: forex.dueDate || '',
            formattedDueDate: formatDateForDisplay(forex.dueDate),   // Format dueDate for display
            forexCurrencyType: forex.forexCurrencyType || '',
            forexCurrencySymbol: forex.forexCurrencySymbol || '',
            forexAmount: forex.forexAmount || '',
            exchangeRate: forex.exchangeRate || '',
            referenceAmount: forex.referenceAmount || '',
            referenceCreditOrDebit: forex.referenceCreditOrDebit || '',
          }));
        }

        // Set the state with the updated values
        setSundryCreditor({
          sundryCreditorName,
          underGroup,
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
          forexSubForm: fetchedForexSubForm,
        });
      } catch (error) {
        console.error(error);
      };
    }

    loadSuppliers();
  },[bankSubFormModal, forexSubFormModal]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      (e).preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;
        // Focus on the next input
        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        e.preventDefault();
        const prevField = index - 1;
        inputRefs.current[prevField]?.focus();
        inputRefs.current[prevField].setSelectionRange(0, 0);
      }
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'provideBankDetails'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryCreditor({
        ...sundryCreditor,
        provideBankDetails: value
      });
      // Handle opening of the bank details subform modal if 'Yes' is selected
      if (value === 'yes'){
        setBankSubFormModal(true);
      }
    } else if (['c', 'd', 'C', 'D'].includes(key) && e.target.name === 'creditOrDebit'){
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'cr' : 'dr';
      setSundryCreditor(prevState => ({
        ...prevState,
        creditOrDebit: value
      }));
      // Open the forexSubFormModal when a value is entered in creditOrDebit input
      setForexSubFormModal(true);
    } else if (key === 'Escape'){
      navigate(-1);
    }
  }

  const handleKeyDownBank = (e, index) => {
    const key = e.key;
    if (e.key === 'Enter'){
      (e).preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefsBank.current.length){
          inputRefsBank.current[nextField].focus();
          inputRefsBank.current[nextField].setSelectionRange(0,0);
        }

        // Check if the current field is swiftCode and call handleBankSubFormBlur
        if (e.target.name === 'swiftCode'){
          handleBankSubFormBlur(e, index);  // call your blur here
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;

        if (inputRefsBank.current[prevField]){
          inputRefsBank.current[prevField].focus();
          inputRefsBank.current[prevField].setSelectionRange(0, 0);
        }
      }
    }
  }

  const handleKeyDownForex = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();

      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefsForex.current.length) {
          inputRefsForex.current[nextField].focus();
          inputRefsForex.current[nextField].setSelectionRange(0, 0);
        }
      } else if (e.target.name === 'forexDate') {
        // If forexDate input is empty, ask for confirmation
        const confirmEmpty = window.confirm('Do you want to proceed submit?');
        if (confirmEmpty) {
          handleSubmit(e);
          setForexSubFormModal(false);
        } else {
          e.preventDefault();
          inputRefsForex.current[0].focus();
        }
      } else if (currencyFocused && filteredSuggestion.length > 0) {
        // If a value is entered in creditOrDebit input, open the forexSubFormModal
        const selectedItem = filteredSuggestion[highlightedSuggestionCurrency];
        setSundryCreditor(prevState => ({
          ...prevState,
          forexSubForm: prevState.forexSubForm.map((item, i) =>
            i === index ? { ...item, forexCurrencyType: selectedItem.forexCurrencyName } : item,
          ),
        }));
        setCurrencyFocused(false);
      }
    } else if (key === 'Backspace') {
      if (e.target.value.trim() === '' && index > 0) {
        e.preventDefault();
        const prevField = index - 1;
        if (inputRefsForex.current[prevField]) {
          inputRefsForex.current[prevField].focus();
          inputRefsForex.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'ArrowDown' && currencyFocused) {
      e.preventDefault();
      setHighlightedSuggestionCurrency(prevIndex =>
        prevIndex === filteredSuggestion.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (key === 'ArrowUp' && currencyFocused) {
      e.preventDefault();
      setHighlightedSuggestionCurrency(prevIndex =>
        prevIndex === 0 ? filteredSuggestion.length - 1 : prevIndex - 1,
      );
    } else if (key === 'Tab') {
      e.preventDefault();
      setCurrencyFocused(false);
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
            <label htmlFor="sundryCreditorName" className='w-[38%] ml-2'>Sundry Creditor's Name</label>
            <span>:</span>
            <input type="text" id='sundryCreditorName' name='sundryCreditorName' ref={(input) => (inputRefs.current[0] = input)} value={sundryCreditor.sundryCreditorName} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="underGroup" className='w-[38%] ml-2'>Under</label>
            <span>:</span>
            <input type="text" id='underGroup' name='underGroup' value={sundryCreditor.underGroup} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='flex'>
            <div className='text-sm pl-1 mb-1'>
              <label htmlFor="billWiseStatus" className='ml-2 mr-[155px]'>Bill-Wise Status</label>
              <span>:</span>
              <input type="text" id='billWiseStatus' value={sundryCreditor.billWiseStatus} name='billWiseStatus' ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
            </div>
            <div className='text-sm pl-1 mb-1 absolute left-[990px]'>
              <label htmlFor="provideBankDetails" className='ml-2 mr-5'>Provide bank details</label>
              <span>:</span>
              <input type="text" id='provideBankDetails' name='provideBankDetails' value={sundryCreditor.provideBankDetails} ref={(input) => (inputRefs.current[2] = input)} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
            </div>
          </div>

          {bankSubFormModal && (
            <div className="fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="w-[550px] bg-white h-[250px] border border-black">
                <h2 className="text-sm font-medium underline text-center">Bank Details</h2>
                <div className="text-sm mb-1 flex mt-5">
                  <label htmlFor="accountName" className="pl-3 w-[30%]">Account Name</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={sundryCreditor.bank.accountName}
                    ref={(input) => (inputRefsBank.current[0] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 0)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="accountNumber" className="pl-3 w-[30%]">Account Number</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={sundryCreditor.bank.accountNumber}
                    ref={(input) => (inputRefsBank.current[1] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 1)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="bankName" className="pl-3 w-[30%]">Bank Name</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={sundryCreditor.bank.bankName}
                    ref={(input) => (inputRefsBank.current[2] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 2)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="branchName" className="pl-3 w-[30%]">Branch Name</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="branchName"
                    name="branchName"
                    value={sundryCreditor.bank.branchName}
                    ref={(input) => (inputRefsBank.current[3] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 3)}
                    
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="ifscCode" className="pl-3 w-[30%]">IFSC Code</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={sundryCreditor.bank.ifscCode}
                    ref={(input) => (inputRefsBank.current[4] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 4)}
                    
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="accountType" className="pl-3 w-[30%]">Account Type</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountType"
                    name="accountType"
                    value={sundryCreditor.bank.accountType}
                    ref={(input) => (inputRefsBank.current[5] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 5)}
                    
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="swiftCode" className="pl-3 w-[30%]">Swift Code</label>
                  <span>:</span>
                  <input
                    type="text"
                    id="swiftCode"
                    name="swiftCode"
                    value={sundryCreditor.bank.swiftCode}
                    ref={(input) => (inputRefsBank.current[6] = input)}
                    onKeyDown={(e) => handleKeyDownBank(e, 6)}
                    
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    readOnly
                    onBlur={handleBankSubFormBlur}
                  />
                </div>
              </div>
            </div>
          )}

          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="addressOne" className='w-[38%] ml-2'>Address</label>
            <span>:</span>
            <input type="text" id='addressOne' name='addressOne' value={sundryCreditor.addressOne} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressTwo" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressTwo' name='addressTwo' value={sundryCreditor.addressTwo} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressThree" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressThree' name='addressThree' value={sundryCreditor.addressThree} ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e, 5)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFour" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFour' name='addressFour' value={sundryCreditor.addressFour} ref={(input) => (inputRefs.current[6] = input)} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm mb-1 flex'>
            <label htmlFor="addressFive" className='w-[38.4%] ml-2'></label>
            <span>:</span>
            <input type="text" id='addressFive' name='addressFive' value={sundryCreditor.addressFive} ref={(input) => (inputRefs.current[7] = input)} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landMarkOrArea" className='w-[38.2%] ml-2'>LandMark/Area</label>
            <span>:</span>
            <input type="text" id='landMarkOrArea' name='landMarkOrArea' value={sundryCreditor.landMarkOrArea} ref={(input) => (inputRefs.current[8] = input)} onKeyDown={(e) => handleKeyDown(e, 8)} className='w-[330px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="state" className='w-[38.2%] ml-2'>State</label>
            <span>:</span>
            <input type="text" id='state' name='state' value={sundryCreditor.state} ref={(input) => (inputRefs.current[9] = input)} onKeyDown={(e) => handleKeyDown(e, 9)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="country" className='w-[38.3%] ml-2'>Country</label>
            <span>:</span>
            <input type="text" id='country' name='country' value={sundryCreditor.country} ref={(input) => (inputRefs.current[10] = input)} onKeyDown={(e) => handleKeyDown(e, 10)} className='w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="pincode" className='w-[38.3%] ml-2'>Pincode</label>
            <span>:</span>
            <input type="text" id='pincode' name='pincode' value={sundryCreditor.pincode} ref={(input) => (inputRefs.current[11] = input)} onKeyDown={(e) => handleKeyDown(e, 11)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="panOrItNumber" className='w-[38.35%] ml-2'>PAN/IT No.</label>
            <span>:</span>
            <input type="text" id='panOrItNumber' name='panOrItNumber' value={sundryCreditor.panOrItNumber} ref={(input) => (inputRefs.current[12] = input)} onKeyDown={(e) => handleKeyDown(e, 12)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="gstinOrUinNumber" className='w-[38.35%] ml-2'>GSTIN/UIN No.</label>
            <span>:</span>
            <input type="text" id='gstinOrUinNumber' name='gstinOrUinNumber' value={sundryCreditor.gstinOrUinNumber} ref={(input) => (inputRefs.current[13] = input)} onKeyDown={(e) => handleKeyDown(e, 13)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="msmeNumber" className='w-[38.35%] ml-2'>MSME No.</label>
            <span>:</span>
            <input type="text" id='msmeNumber' name='msmeNumber' value={sundryCreditor.msmeNumber} ref={(input) => (inputRefs.current[14] = input)} onKeyDown={(e) => handleKeyDown(e, 14)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="contactPersonName" className='w-[38.5%] ml-2'>Contact Person Name</label>
            <span>:</span>
            <input type="text" id='contactPersonName' name='contactPersonName' value={sundryCreditor.contactPersonName} ref={(input) => (inputRefs.current[15] = input)} onKeyDown={(e) => handleKeyDown(e, 15)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="mobileNumber" className='w-[38.5%] ml-2'>Mobile No.</label>
            <span>:</span>
            <input type="text" id='mobileNumber' name='mobileNumber' value={sundryCreditor.mobileNumber} ref={(input) => (inputRefs.current[16] = input)} onKeyDown={(e) => handleKeyDown(e, 16)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="landlineNumber" className='w-[38.5%] ml-2'>Landline No.</label>
            <span>:</span>
            <input type="text" id='landlineNumber' name='landlineNumber' value={sundryCreditor.landlineNumber} ref={(input) => (inputRefs.current[17] = input)} onKeyDown={(e) => handleKeyDown(e, 17)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="emailId" className='w-[38.5%] ml-2'>Email Id</label>
            <span>:</span>
            <input type="text" id='emailId' name='emailId' value={sundryCreditor.emailId} ref={(input) => (inputRefs.current[18] = input)} onKeyDown={(e) => handleKeyDown(e, 18)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm pl-1 mb-1 flex'>
            <label htmlFor="openingBalance" className='w-[22%] ml-2'>Opening Balance</label>
            (<input type="text" id='dateForOpening' name='dateForOpening' value={sundryCreditor.dateForOpening} className='w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />)
            <span className='ml-3'>:</span>
            <input type="text" id='openingBalance' name='openingBalance' value={formatIndianNumber(sundryCreditor.openingBalance)} ref={(input) => (inputRefs.current[19] = input)} onKeyDown={(e) => handleKeyDown(e, 19)} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
            <input type="text" id='creditOrDebit' name='creditOrDebit' value={sundryCreditor.creditOrDebit} ref={(input) => (inputRefs.current[20] = input)} onKeyDown={(e) => handleKeyDown(e,20)} className='w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>


          {forexSubFormModal && (
            <div className="fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="w-[1100px] bg-white h-[500px] border border-black">
                <div className={`h-[460px] overflow-y-scroll`}>
                  <div className="flex text-sm mb-2 mt-2 ml-5">
                    <label htmlFor="billWiseBreakOf" className="w-[16%]">
                      Bill-wise Reference
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="billWiseBreakOf"
                      name="billWiseBreakOf"
                      value={sundryCreditor.sundryCreditorName}
                      className="w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex text-sm mb-4 mt-2 ml-5">
                    <label htmlFor="uptoOpeningBalanceAmount" className="w-[16%]">
                      Upto
                    </label>
                    <span>:</span>
                    <span className='ml-1'>₹</span>
                    <input
                      type="text"
                      id="uptoOpeningBalanceAmount"
                      name="uptoOpeningBalanceAmount"
                      value={formatIndianNumber(sundryCreditor.openingBalance)}
                      className="w-[100px] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      id="uptoCreditOrDebit"
                      name="uptoCreditOrDebit"
                      value={sundryCreditor.creditOrDebit}
                      className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border-collapse border border-slate-400 w-full table-fixed">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className="w-[10%]">Date</th>
                        <th className="w-[25%]">Bill Ref. Name</th>
                        <th className="w-[10%]">Due Date</th>
                        <th className="w-[25%]">Forex Currency Type</th>
                        <th className="w-[15%]">Forex Amount</th>
                        <th className="w-[15%]">Exchange Rate</th>
                        <th className="w-[25%]">Amount</th>
                        <th className="w-[5%]">Cr/Dr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sundryCreditor.forexSubForm.map((row, index) => (
                        <tr key={index} className='leading-4'>
                          {/* Forex Date Input */}
                          <td>
                            <input
                              type="text"
                              id="forexDate"
                              name="forexDate"
                              value={row.formattedForexDate}
                              ref={input => (inputRefsForex.current[0 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 0 + index * 8)}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Reference Name Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceName"
                              name="referenceName"
                              value={row.referenceName}
                              ref={input => (inputRefsForex.current[1 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 1 + index * 8)}
                              className="w-[180px] h-5 pl-1 ml-5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Due Date Input */}
                          <td>
                            <input
                              type="text"
                              id="dueDate"
                              name="dueDate"
                              value={row.formattedDueDate}
                              ref={input => (inputRefsForex.current[2 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 2 + index * 8)}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Forex Currency Type Input */}
                          <td>
                            <input
                              type="text"
                              id="forexCurrencyType"
                              name="forexCurrencyType"
                              value={row.forexCurrencyType}
                              ref={input => (inputRefsForex.current[3 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 3 + index * 8)}
                              onBlur={() => setCurrencyFocused(false)}
                              className="w-[160px] h-5 pl-1 font-medium text-[12px] uppercase text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                            
                          </td>

                          {/* Forex Amount Input */}
                          <td>
                            <span className='ml-7'>{row.forexCurrencySymbol}</span>
                            <input
                              type="text"
                              id="forexAmount"
                              name="forexAmount"
                              value={row.forexAmount}
                              ref={input => (inputRefsForex.current[4 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 4 + index * 8)}
                              onBlur={(e) => {numberFormat(e, index)}} 
                              className="w-[50%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Exchange Rate Input */}
                          <td>
                            <span className='ml-8'>₹</span>
                            <input
                              type="text"
                              id="exchangeRate"
                              name="exchangeRate"
                              value={row.exchangeRate}
                              ref={input => (inputRefsForex.current[5 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 5 + index * 8)}
                              onBlur={(e) => {numberFormat(e, index)}}
                              className="w-[50px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Reference Amount Input */}
                          <td>
                            <span className='ml-16'>₹</span>
                            <input
                              type="text"
                              id="referenceAmount"
                              name="referenceAmount"
                              value={row.referenceAmount}
                              ref={input => (inputRefsForex.current[6 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 6 + index * 8)}
                              onBlur={(e) => {numberFormat(e, index)}}
                              className="w-[40%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Reference Credit Or Debit Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceCreditOrDebit"
                              name="referenceCreditOrDebit"
                              value={row.referenceCreditOrDebit}
                              ref={input => (inputRefsForex.current[7 + index * 8] = input)}
                              onKeyDown={e => handleKeyDownForex(e, 7 + index * 8)}
                              className="w-full h-5 pl-1 pr-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className=" mt-4">
                    <div className="flex absolute left-[610px] top-[500px]">
                      <label htmlFor="totalForexAmount" className="text-[12px] mr-1">
                        Total
                      </label>
                      <span className="text-sm">($)</span>
                      <span className="absolute left-[60px] bottom-0">:</span>
                      <input
                        type="text"
                        id="totalForexAmount"
                        name="totalForexAmount"
                        value={sundryCreditor.totalForexAmount}
                        // onChange={handleInputForexChange}
                        onBlur={(e) => numberFormat(e, 0)}
                        className="w-[100px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                        autoComplete="off"
                        readOnly
                      />
                    </div>
                    <div className="flex absolute left-[900px] top-[500px]">
                      <label htmlFor="totalAmount" className="text-[12px] mr-1">
                        Total
                      </label>
                      <span className="text-sm">(₹)</span>
                      <span className="absolute left-[60px] bottom-0">:</span>
                      <input
                        type="text"
                        id="totalAmount"
                        name="totalAmount"
                        value={sundryCreditor.totalAmount}
                        // onChange={handleInputForexChange}
                        onBlur={(e) => numberFormat(e, 1)}
                        className="w-[120px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                        autoComplete="off"
                        readOnly
                      />
                      <input
                        type="text"
                        id="totalAmountCreditOrDebit"
                        name="totalAmountCreditOrDebit"
                        value={sundryCreditor.totalAmountCreditOrDebit}
                        className="w-[30px] h-5 pl-1 ml-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                        autoComplete="off"
                      />
                    </div>
                  </div>
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

export default SundryCreditorsDisplay