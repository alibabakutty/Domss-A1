import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificSundryCreditorName } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const SundryCreditorsDisplay = () => {

  const { datas } = useParams();

  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
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
      swiftCode: '',
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
    totalForexAmount: '',
    totalForexAmountCreditOrDebit: '',
    totalInwardReferenceAmount: '',
    totalInwardReferenceAmountCreditOrDebit: '',
    totalOutwardReferenceAmount: '',
    totalOutwardReferenceAmountCreditOrDebit: '',
    forexSubForm: [
      {
        
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexCurrencySymbol: '',
        forexAmount: '',
        forexCreditOrDebit: '',
        exchangeRate: '',
        outwardReferenceAmount: '',
        inwardReferenceAmount: '',
        referenceCreditOrDebit: ''
      },
    ],
  });

  const [bankSubFormModal, setBankSubFormModal] = useState(false);
  const [forexSubFormModal, setForexSubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const inputRefsBank = useRef([]);
  const inputRefsForex = useRef([]);
  const totalRefs = useRef([]);
  const prevBankSubFormModal = useRef(false);  // Tracks the previous state of bankSubFormModal
  const navigate = useNavigate();

  useEffect(() =>{
    if (inputRefs.current[0]){
      inputRefs.current[0]?.focus();
    }

    if (bankSubFormModal){
      if(inputRefsBank.current[0]){
        inputRefsBank.current[0]?.focus();
      }
    }

    // If forexSubFormModal is active, focus the first input in that form
    if (forexSubFormModal && inputRefsForex.current[0]){
      inputRefsForex.current[0]?.focus();
    }

        // If forexSubFormModal is active, focus the first input in that form
        if (forexSubFormModal && inputRefsForex.current[0]){
          inputRefsForex.current[0]?.focus();
        }

        // Detect if the bankSubFormModal is closed
        if (prevBankSubFormModal.current && !bankSubFormModal){
          // Focus on the addressOne input when bankSubFormModal closes
          const addressOneInputIndex = inputRefs.current.findIndex(
            ref => ref && ref.name === 'addressOne'
          );
          if (addressOneInputIndex !== -1 && inputRefs.current[addressOneInputIndex]){
            inputRefs.current[addressOneInputIndex]?.focus();
          }
        }

        // Update the previous state value
      prevBankSubFormModal.current = bankSubFormModal;

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
          forexApplicable = '',
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
          totalForexAmount = '',
          totalInwardReferenceAmount = '',
          totalOutwardReferenceAmount = '',
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
            forexCreditOrDebit: '',
            exchangeRate: '',
            outwardReferenceAmount: '',
            inwardReferenceAmount: '',
            referenceCreditOrDebit: ''
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

        // Set default forexCurrencySymbol to avoid undefined error
        let frontForexSymbol = '';

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
            forexCreditOrDebit: forex.forexCreditOrDebit || '',
            exchangeRate: forex.exchangeRate || '',
            outwardReferenceAmount: forex.outwardReferenceAmount || '',
            inwardReferenceAmount: forex.inwardReferenceAmount || '',
            referenceCreditOrDebit: forex.referenceCreditOrDebit || '',
          }));

          // Debugging: check if fetched forex form has correct symbols
          console.log('Fetched Forex SubForm:', fetchedForexSubForm);

          // Assuming you want to set the first forexCurrencySymbol globally
          frontForexSymbol = sundryCreditorForexDetails[0]?.forexCurrencySymbol || '';
          console.log('Front side forex currency symbol:', frontForexSymbol);
        }

        // Set the state with the updated values
        setSundryCreditor({
          sundryCreditorName,
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
          forexCurrencySymbol: frontForexSymbol,
          totalForexAmount,
          totalInwardReferenceAmount,
          totalOutwardReferenceAmount,
          forexSubForm: fetchedForexSubForm,
        });
      } catch (error) {
        console.error(error);
      };
    }

    loadSuppliers();
  },[bankSubFormModal, forexSubFormModal]);
  console.log(sundryCreditor.forexCurrencySymbol);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      (e).preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;
        // Focus on the next input
        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField];
        }

        // Specific handling for 'creditOrDebit' input
        if (e.target.name === 'creditOrDebit'){
          // Open the forexSubFormModal when a value is entered in creditOrDebit input
          setForexSubFormModal(true);
        }

        // Specific handling for 'provideBankDetails' input
        if (e.target.name === 'provideBankDetails' && e.target.value.trim() === 'yes'){
          setBankSubFormModal(true);
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        e.preventDefault();
        const prevField = index - 1;
        inputRefs.current[prevField]?.focus();
        inputRefs.current[prevField];
      }
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
          inputRefsBank.current[nextField]?.focus();
          inputRefsBank.current[nextField];
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
          inputRefsBank.current[prevField]?.focus();
          inputRefsBank.current[prevField];
        }
      }
    } else if (key === 'Escape'){
      setBankSubFormModal(false);
    }
  };

  const handleKeyDownForex = async (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstForexDateIndex = 0;
    const lastRowIndex = sundryCreditor.forexSubForm.length - 1; // Last row index in the table
    const lastColIndex = 9; // Assuming the last column index is 9 (adjust this if different)
  
    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
  
      // Check if the current input is the first forexDate and ensure it has a value
      if (rowIndex === 0 && colIndex === firstForexDateIndex && e.target.value.trim() === '') {
        alert('The forexDate field must have a value before proceeding.');
        inputRefsForex.current[rowIndex * 10 + colIndex]?.focus(); // Refocus on the empty forexDate field
        return;
      }
  
      // Check if the current field is referenceCreditOrDebit, last row, and last column
      const isReferenceCreditOrDebit = e.target.name === 'referenceCreditOrDebit';
      const isLastCell = rowIndex === lastRowIndex && colIndex === lastColIndex;
  
      // If it's the last cell and the referenceCreditOrDebit field, move focus to totalForexAmount
      if (isReferenceCreditOrDebit && isLastCell) {
        if (totalRefs.current[0]) {
          totalRefs.current[0].focus(); // Focus on totalForexAmount input
        }
        return;
      }
  
      // Move to the next cell
      const nextCell = rowIndex * 10 + colIndex + 1;
      if (inputRefsForex.current[nextCell] && nextCell < inputRefsForex.current.length) {
        inputRefsForex.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 10 + colIndex - 1;
        if (prevCell >= 0 && inputRefsForex.current[prevCell]) {
          inputRefsForex.current[prevCell].focus();
          inputRefsForex.current[prevCell].setSelectionRange(0, 0); // Set cursor position at the start
        }
      }
    } else if (key === 'Tab') {
      e.preventDefault(); // Prevent default tabbing behavior
    } else if (key === 'Escape') {
      setForexSubFormModal(false); // Close the modal when Escape is pressed
    }
  };    

  const handleKeyDownTotal = async (e, currentIndex) => {
    switch (e.key) {
      case 'Enter':
        // Move focus to the next input field when Enter is pressed
        if (currentIndex < totalRefs.current.length - 1) {
          totalRefs.current[currentIndex + 1].focus();
        }

        // Check if specific fields are empty and handle submission logic
        if (
          (e.target.name === 'totalOutwardReferenceAmountCreditOrDebit' ||
            e.target.name === 'totalInwardReferenceAmountCreditOrDebit') &&
          e.target.value.trim() !== ''
        ) {
          e.preventDefault(); // Prevent form submission if the field is empty
          const confirmSubmit = window.confirm('Do you want to exit?');

          if (confirmSubmit) {
            navigate(-1);
          } else {
            // Return focus to the current input if the user cancels
            if (totalRefs.current[currentIndex]) {
              totalRefs.current[currentIndex].focus();
            }
          }
          return;
        }
        break;

      case 'Backspace':
        // Move focus to the previous input if Backspace is pressed and the current input is empty
        if (e.target.value.trim() === '' && currentIndex > 0) {
          totalRefs.current[currentIndex - 1].focus();
        }
        break;

      default:
        break;
    }
  };

  const handleInputForexChange = (e, index) => {
    const { name, value } = e.target;
  
    setSundryCreditor((prevState) => {
      let updatedForexSubForm = [...prevState.forexSubForm];
  
      // Update the current row's input field
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [name]: value,
      };
  
      // Propagate exchangeRate from the first row to all other rows
      if (
        (name === 'exchangeRate' && index === 0) ||
        (index !== 0 && updatedForexSubForm[index].exchangeRate === '')
      ) {
        const defaultExchangeRate = updatedForexSubForm[0].exchangeRate || value;
        updatedForexSubForm = updatedForexSubForm.map((row, i) => {
          if (i === 0) return row; // Skip the first row
  
          return {
            ...row,
            exchangeRate: defaultExchangeRate, // Propagate exchangeRate
          };
        });
      }
  
      // Propagate creditorDebit to referenceCreditorDebit for all rows
      if (name === 'creditOrDebit') {
        updatedForexSubForm = updatedForexSubForm.map((row) => ({
          ...row,
          referenceCreditorDebit: value, // Set referenceCreditorDebit from creditorDebit
        }));
      }
  
      // Recalculate totals after updating the forexSubForm
      calculateTotals();
  
      // Call calculateInwardTotals after updating the inwardReferenceAmount if that field is changed
      if (name === 'inwardReferenceAmount') {
        calculateInwardTotals();
      }
  
      return {
        ...prevState,
        forexSubForm: updatedForexSubForm,
      };
    });
  };

  const handleBankSubFormBlur = () => {
    const confirmation = window.confirm('Are you want to proceed with this bank details?');
    if (confirmation) {
      // Hide the subform when "OK" is clicked
      setBankSubFormModal(false);
    }
  };

  const handleFullFormBlur = () => {
    const confirmation = window.confirm('Are you want to close this form?');
    if(confirmation){
      // Hide theform when "OK" is clicked
      navigate(-1);
    }
  }

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
      <div className="flex">
        <LeftSideMenu />
        <form
          action=""
          className="border border-slate-500 w-[48.5%] h-[92.7vh]"
        >
          <div className="text-sm pl-1 mb-1 flex mt-3">
            <label htmlFor="sundryCreditorName" className="w-[33.8%] ml-2">
              Sundry Creditor's Name
            </label>
            <span>:</span>
            <input
              type="text"
              id="sundryCreditorName"
              name="sundryCreditorName"
              ref={input => (inputRefs.current[0] = input)}
              value={sundryCreditor.sundryCreditorName}
              
              onKeyDown={e => handleKeyDown(e, 0)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize border border-transparent focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off" readOnly
            />
          </div>
          <div className='flex'>
            <div className="text-sm pl-1 mb-1">
              <label htmlFor="underGroup" className="mr-[183px] ml-2">
                Under
              </label>
              <span>:</span>
              <input
                type="text"
                id="underGroup"
                name="underGroup"
                value={sundryCreditor.underGroup}
                
                className="w-[120px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                autoComplete="off" readOnly
              />
            </div>
            <div className="text-sm pl-1 mb-1 absolute left-[1005px]">
              <label htmlFor="forexApplicable" className="ml-2 mr-5">
                Forex Applicable
              </label>
              <span>:</span>
              <input
                type="text"
                id="forexApplicable"
                name="forexApplicable"
                value={sundryCreditor.forexApplicable}
                ref={input => (inputRefs.current[1] = input)}
                
                onKeyDown={e => handleKeyDown(e, 1)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                autoComplete="off" readOnly
              />
            </div>
          </div>
          <div className="flex">
            <div className="text-sm pl-1 mb-1">
              <label htmlFor="billWiseStatus" className="ml-2 mr-[125px]">
                Bill-Wise Status
              </label>
              <span>:</span>
              <input
                type="text"
                id="billWiseStatus"
                value={sundryCreditor.billWiseStatus}
                name="billWiseStatus"
                ref={input => (inputRefs.current[2] = input)}
                
                onKeyDown={e => handleKeyDown(e, 2)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                autoComplete="off" readOnly
              />
            </div>
            <div className="text-sm pl-1 mb-1 absolute left-[1005px]">
              <label htmlFor="provideBankDetails" className="ml-2 mr-5">
                Provide bank details
              </label>
              <span>:</span>
              <input
                type="text"
                id="provideBankDetails"
                name="provideBankDetails"
                value={sundryCreditor.provideBankDetails}
                ref={input => (inputRefs.current[3] = input)}
                
                onKeyDown={e => handleKeyDown(e, 3)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                autoComplete="off"
              />
            </div>
          </div>

          {bankSubFormModal && (
            <div className="fixed top-[44px] left-0 bottom-0 right-[138px] bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="w-[550px] bg-white h-[250px] border border-black">
                <h2 className="text-sm font-medium underline text-center">Bank Details</h2>
                <div className="text-sm mb-1 flex mt-5">
                  <label htmlFor="accountName" className="pl-3 w-[30%]">
                    Account Name
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={sundryCreditor.bank.accountName}
                    ref={input => (inputRefsBank.current[0] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 0)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="accountNumber" className="pl-3 w-[30%]">
                    Account Number
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={sundryCreditor.bank.accountNumber}
                    ref={input => (inputRefsBank.current[1] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 1)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="bankName" className="pl-3 w-[30%]">
                    Bank Name
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={sundryCreditor.bank.bankName}
                    ref={input => (inputRefsBank.current[2] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 2)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="branchName" className="pl-3 w-[30%]">
                    Branch Name
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="branchName"
                    name="branchName"
                    value={sundryCreditor.bank.branchName}
                    ref={input => (inputRefsBank.current[3] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 3)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="ifscCode" className="pl-3 w-[30%]">
                    IFSC Code
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={sundryCreditor.bank.ifscCode}
                    ref={input => (inputRefsBank.current[4] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 4)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="accountType" className="pl-3 w-[30%]">
                    Account Type
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="accountType"
                    name="accountType"
                    value={sundryCreditor.bank.accountType}
                    ref={input => (inputRefsBank.current[5] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 5)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
                <div className="text-sm mb-1 flex">
                  <label htmlFor="swiftCode" className="pl-3 w-[30%]">
                    Swift Code
                  </label>
                  <span>:</span>
                  <input
                    type="text"
                    id="swiftCode"
                    name="swiftCode"
                    value={sundryCreditor.bank.swiftCode}
                    ref={input => (inputRefsBank.current[6] = input)}
                    
                    onKeyDown={e => handleKeyDownBank(e, 6)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                    autoComplete="off" readOnly
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="addressOne" className="w-[33.5%] ml-2">
              Address
            </label>
            <span>:</span>
            <input
              type="text"
              id="addressOne"
              name="addressOne"
              value={sundryCreditor.addressOne}
              ref={input => (inputRefs.current[4] = input)}
              
              onKeyDown={e => handleKeyDown(e, 4)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressTwo" className="w-[33.8%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressTwo"
              name="addressTwo"
              value={sundryCreditor.addressTwo}
              ref={input => (inputRefs.current[5] = input)}
              
              onKeyDown={e => handleKeyDown(e, 5)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressThree" className="w-[33.8%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressThree"
              name="addressThree"
              value={sundryCreditor.addressThree}
              ref={input => (inputRefs.current[6] = input)}
              
              onKeyDown={e => handleKeyDown(e, 6)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressFour" className="w-[33.8%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressFour"
              name="addressFour"
              value={sundryCreditor.addressFour}
              ref={input => (inputRefs.current[7] = input)}
              
              onKeyDown={e => handleKeyDown(e, 7)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressFive" className="w-[33.8%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressFive"
              name="addressFive"
              value={sundryCreditor.addressFive}
              ref={input => (inputRefs.current[8] = input)}
              
              onKeyDown={e => handleKeyDown(e, 8)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="landMarkOrArea" className="w-[33.3%] ml-2">
              LandMark/Area
            </label>
            <span>:</span>
            <input
              type="text"
              id="landMarkOrArea"
              name="landMarkOrArea"
              value={sundryCreditor.landMarkOrArea}
              ref={input => (inputRefs.current[9] = input)}
              
              onKeyDown={e => handleKeyDown(e, 9)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="state" className="w-[33.3%] ml-2">
              State
            </label>
            <span>:</span>
            <input
              type="text"
              id="state"
              name="state"
              value={sundryCreditor.state}
              ref={input => (inputRefs.current[10] = input)}
              
              onKeyDown={e => handleKeyDown(e, 10)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="country" className="w-[33.3%] ml-2">
              Country
            </label>
            <span>:</span>
            <input
              type="text"
              id="country"
              name="country"
              value={sundryCreditor.country}
              ref={input => (inputRefs.current[11] = input)}
              
              onKeyDown={e => handleKeyDown(e, 11)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="pincode" className="w-[33.3%] ml-2">
              Pincode
            </label>
            <span>:</span>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={sundryCreditor.pincode}
              ref={input => (inputRefs.current[12] = input)}
              
              onKeyDown={e => handleKeyDown(e, 12)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="panOrItNumber" className="w-[33.4%] ml-2">
              PAN/IT No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="panOrItNumber"
              name="panOrItNumber"
              value={sundryCreditor.panOrItNumber}
              ref={input => (inputRefs.current[13] = input)}
              
              onKeyDown={e => handleKeyDown(e, 13)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="gstinOrUinNumber" className="w-[33.4%] ml-2">
              GSTIN/UIN No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="gstinOrUinNumber"
              name="gstinOrUinNumber"
              value={sundryCreditor.gstinOrUinNumber}
              ref={input => (inputRefs.current[14] = input)}
              
              onKeyDown={e => handleKeyDown(e, 14)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="msmeNumber" className="w-[33.4%] ml-2">
              MSME No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="msmeNumber"
              name="msmeNumber"
              value={sundryCreditor.msmeNumber}
              ref={input => (inputRefs.current[15] = input)}
              
              onKeyDown={e => handleKeyDown(e, 15)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="contactPersonName" className="w-[33.5%] ml-2">
              Contact Person Name
            </label>
            <span>:</span>
            <input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              value={sundryCreditor.contactPersonName}
              ref={input => (inputRefs.current[16] = input)}
              
              onKeyDown={e => handleKeyDown(e, 16)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="mobileNumber" className="w-[33.5%] ml-2">
              Mobile No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={sundryCreditor.mobileNumber}
              ref={input => (inputRefs.current[17] = input)}
              
              onKeyDown={e => handleKeyDown(e, 17)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="landlineNumber" className="w-[33.5%] ml-2">
              Landline No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="landlineNumber"
              name="landlineNumber"
              value={sundryCreditor.landlineNumber}
              ref={input => (inputRefs.current[18] = input)}
              
              onKeyDown={e => handleKeyDown(e, 18)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="emailId" className="w-[33.5%] ml-2">
              Email Id
            </label>
            <span>:</span>
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={sundryCreditor.emailId}
              ref={input => (inputRefs.current[19] = input)}
              
              onKeyDown={e => handleKeyDown(e, 19)}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="openingBalance" className="w-[17%] ml-2">
              Opening Balance
            </label>
            (
            <input
              type="text"
              id="dateForOpening"
              name="dateForOpening"
              value={sundryCreditor.dateForOpening}
              className="w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
            )<span className="ml-3">:</span>
            <span className="ml-2">₹</span>
            <input
              type="text"
              id="openingBalance"
              name="openingBalance"
              value={formatIndianNumber(sundryCreditor.openingBalance)}
              ref={input => (inputRefs.current[20] = input)}
              
              onBlur={formatIndianNumber}
              onKeyDown={e => handleKeyDown(e, 20)}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm text-right uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
            <input
              type="text"
              id="creditOrDebit"
              name="creditOrDebit"
              value={sundryCreditor.creditOrDebit}
              ref={input => (inputRefs.current[21] = input)}
              onKeyDown={e => handleKeyDown(e, 21)}
              
              className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>

          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="totalForexAmount" className="w-[31.8%] ml-2">
              Forex Amount Balance
            </label>
            <span className="ml-3">:</span>
            <span className="ml-2">{sundryCreditor.forexCurrencySymbol}</span>
            <input
              type="text"
              id="totalForexAmount"
              name="totalForexAmount"
              value={formatIndianNumber(sundryCreditor.totalForexAmount)}
              onBlur={formatIndianNumber}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm text-right uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off" readOnly
            />
            <input
              type="text"
              id="creditOrDebit"
              name="creditOrDebit"
              value={sundryCreditor.creditOrDebit}
              
              className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
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
                      autoComplete="off" readOnly
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
                      autoComplete="off" readOnly
                    />
                    <input
                      type="text"
                      id="uptoCreditOrDebit"
                      name="uptoCreditOrDebit"
                      value={sundryCreditor.creditOrDebit}
                      className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off" readOnly
                    />
                  </div>
                  <table className="border-collapse border border-slate-400 w-full table-fixed">
                  <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className="w-[13%]">Date</th>
                        <th className="w-[35%]">Bill Ref. Name</th>
                        <th className="w-[13%]">Due Date</th>
                        {sundryCreditor.forexApplicable !== 'no' && (
                          <>
                            <th className="w-[25%]">Forex Currency Type</th>
                            <th className="w-[20%]">Forex Amount</th>
                            <th className="w-[5%]">Cr/Dr</th>
                            <th className="w-[20%]">Exchange Rate</th>
                            <th className="w-[20%]">Amount</th>
                          </>
                        )}
                        {sundryCreditor.forexApplicable !== 'yes' && (
                          <>
                            <th className="w-[20%]">Amount</th>
                          </>
                        )}
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
                              
                              ref={input => (inputRefsForex.current[0 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 0)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" readOnly
                            />
                          </td>

                          {/* Reference Name Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceName"
                              name="referenceName"
                              value={row.referenceName}
                              
                              ref={input => (inputRefsForex.current[1 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 1 )}
                              className="w-[180px] h-5 pl-1 ml-5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" readOnly
                            />
                          </td>

                          {/* Due Date Input */}
                          <td>
                            <input
                              type="text"
                              id="dueDate"
                              name="dueDate"
                              value={row.formattedDueDate}
                              ref={input => (inputRefsForex.current[2 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 2)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* Conditional Rendering of Forex Fields */}
                          {sundryCreditor.forexApplicable !== 'no' && (
                            <>
                              {/* Forex Currency Type Input */}
                              <td>
                                <input
                                  type="text"
                                  id="forexCurrencyType"
                                  name="forexCurrencyType"
                                  value={row.forexCurrencyType}
                                  ref={input => (inputRefsForex.current[3 + index * 10] = input)}
                                  
                                  onKeyDown={e => handleKeyDownForex(e, index, 3)}
                                  className="w-[160px] h-5 pl-1 font-medium text-[12px] uppercase text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off" readOnly
                                />
                              </td>

                              {/* Forex Amount Input */}
                              <td>
                                <span className='ml-7'>{row.forexCurrencySymbol}</span>
                                <input
                                  type="text"
                                  id="forexAmount"
                                  name="forexAmount"
                                  value={formatIndianNumber(row.forexAmount)}
                                  
                                  ref={input => (inputRefsForex.current[4 + index * 10] = input)}
                                  onKeyDown={e => handleKeyDownForex(e, index, 4)}
                                  onBlur={(e) => {formatIndianNumber(e, index)}} 
                                  className="w-[50%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off" readOnly
                                />
                              </td>

                              {/* Reference Credit Or Debit Input */}
                              <td>
                                <input
                                  type="text"
                                  id="forexCreditOrDebit"
                                  name="forexCreditOrDebit"
                                  value={row.forexCreditOrDebit}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[5 + index * 10] = input)}
                                  onKeyDown={e => handleKeyDownForex(e, index, 5)}
                                  className="w-[30px] h-5 pl-1 pr-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                                  value={formatIndianNumber(row.exchangeRate)}
                                  
                                  ref={input => (inputRefsForex.current[6 + index * 10] = input)}
                                  onKeyDown={e => handleKeyDownForex(e,  index, 6)}
                                  className="w-[50px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off" readOnly
                                />
                              </td>

                              {/* Reference Amount Input */}
                              <td>
                                <span className='ml-10'>₹</span>
                                <input
                                  type="text"
                                  id="outwardReferenceAmount"
                                  name="outwardReferenceAmount"
                                  value={formatIndianNumber(row.outwardReferenceAmount)}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[7 + index * 10] = input)}
                                  onKeyDown={e => {
                                    handleKeyDownForex(e, index, 7);
                                    if (e.key === 'Enter'){
                                      inputRefsForex.current[index * 10 + 9]?.focus();
                                    }
                                  }
                                  }
                                  className="w-[50%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off" readOnly
                                />
                              </td>
                            </>
                          )}

                          {/* Conditional Rendering of Forex Fields */}
                          {sundryCreditor.forexApplicable !== 'yes' && (
                            <>
                              {/* Inward Amount Input */}
                              <td>
                                <span className="ml-36">₹</span>
                                <input
                                  type="text"
                                  id="inwardReferenceAmount"
                                  name="inwardReferenceAmount"
                                  value={formatIndianNumber(row.inwardReferenceAmount)}
                                  ref={(input) => (inputRefsForex.current[8 + index * 10] = input)}
                                  onKeyDown={(e) => handleKeyDownForex(e, index, 8)}
                                  onBlur={(e) => {
                                    formatIndianNumber(e, index);
                                  }}
                                  className="w-[40%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off" readOnly
                                />
                              </td>
                            </>
                          )}

                          {/* Reference Credit Or Debit Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceCreditOrDebit"
                              name="referenceCreditOrDebit"
                              value={row.referenceCreditOrDebit}
                              
                              ref={input => (inputRefsForex.current[9 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 9)}
                              className="w-[30px] h-5 pl-1 pr-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sundryCreditor.forexApplicable !== 'no' && (
                    <>
                      <div className=" mt-4">
                        <div className="w-[350px] h-[20px] flex absolute left-[690px] top-[500px] border border-t-black border-transparent">
                          <label htmlFor="totalForexAmount" className="text-[12px] mr-1 mt-1">
                            Total
                          </label>
                          <span className="text-sm mt-1">({sundryCreditor.forexSubForm[0].forexCurrencySymbol})</span>
                          <span className="absolute top-0 left-[50px] bottom-0">:</span>
                          <input
                            type="text"
                            id="totalForexAmount"
                            name="totalForexAmount"
                            value={formatIndianNumber(sundryCreditor.totalForexAmount)}
                            ref={input => (totalRefs.current[0] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 0)}
                            onBlur={(e) => formatIndianNumber(e, 0)}
                            className="w-[60px] h-5 pl-1 mt-1 ml-3 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                            readOnly
                          />
                          <input
                            type="text"
                            id="totalForexAmountCreditOrDebit"
                            name="totalForexAmountCreditOrDebit"
                            value={sundryCreditor.creditOrDebit}
                            ref={input => (totalRefs.current[1] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 1)}
                            className="w-[30px] h-5 pl-1 mt-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                            readOnly
                          />
                        </div>
                        <div className="w-[185px] flex absolute left-[965px] top-[500px] border border-t-black border-transparent">
                          <label htmlFor="totalOutwardReferenceAmount" className="text-[12px] mr-1 mt-1">
                            Total
                          </label>
                          <span className="text-sm mt-1">(₹)</span>
                          <span className="absolute left-[50px] bottom-0">:</span>
                          <input
                            type="text"
                            id="totalOutwardReferenceAmount"
                            name="totalOutwardReferenceAmount"
                            value={formatIndianNumber(sundryCreditor.totalOutwardReferenceAmount)}
                            ref={input => (totalRefs.current[2] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 2)}
                            onBlur={(e) => formatIndianNumber(e, 1)}
                            className="w-[80px] h-5 pl-1 mt-1 ml-5 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                            readOnly
                          />
                          <input
                            type="text"
                            id="totalOutwardReferenceAmountCreditOrDebit"
                            name="totalOutwardReferenceAmountCreditOrDebit"
                            value={sundryCreditor.creditOrDebit}
                            ref={input => (totalRefs.current[3] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 3)}
                            onChange={handleInputForexChange}
                            className="w-[30px] h-5 pl-1 mt-1 ml-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {sundryCreditor.forexApplicable !== 'yes' && (
                    <>
                      <div className='w-[126px] flex absolute left-[900px] top-[500px] text-sm border border-t-black border-transparent'>
                        <label htmlFor="" className='mt-1'>Total</label>
                        <span className='mt-1'>:</span>
                        <span className='ml-1 mt-1'>₹</span>
                        <input
                            type="text"
                            id="totalInwardReferenceAmount"
                            name="totalInwardReferenceAmount"
                            value={formatIndianNumber(sundryCreditor.totalInwardReferenceAmount)}
                            ref={input => (totalRefs.current[4] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 4)}
                            onBlur={(e) => formatIndianNumber(e, 1)}
                            className="w-[80px] h-5 mt-1 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                            readOnly
                          />
                          <input
                            type="text"
                            id="totalInwardReferenceAmountCreditOrDebit"
                            name="totalInwardReferenceAmountCreditOrDebit"
                            value={sundryCreditor.totalInwardReferenceAmountCreditOrDebit}
                            ref={input => (totalRefs.current[5] = input)}
                            onKeyDown={e => handleKeyDownTotal(e, 5)}
                            className="w-[30px] h-5 pl-1 ml-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                            autoComplete="off"
                          />
                      </div>
                    </>
                  )}    
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