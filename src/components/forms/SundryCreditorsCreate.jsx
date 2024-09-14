import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { createSundryCreditorMaster, listOfCurrencies } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import { useNavigate } from 'react-router-dom';

const SundryCreditorsCreate = () => {
  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: 'sundry creditors',
    billWiseStatus: 'No',
    provideBankDetails: 'No',
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
    dateForOpening: '1-Apr-2024',
    openingBalance: '',
    creditOrDebit: '',
    forexSubForm: [
      {
        billWiseBreakOf: '',
        uptoOpeningBalanceAmount: '',
        uptoCreditOrDebit: '',
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexCurrencySymbol: '',
        forexAmount: '',
        exchangeRate: '',
        referenceAmount: '',
        referenceCreditOrDebit: '',
        totalForexAmount: '',
        totalAmount: '',
        totalAmountCreditOrDebit: '',
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
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    listOfCurrencies()
      .then(response => {
        console.log(response.data);
        setCurrencySuggestion(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
      setSundryCreditor((prev)=>{
        return {...prev, [name]: value};
      })
  };

  const handleInputBankChange = e => {
    const { name, value } = e.target;
    setSundryCreditor(prevState => ({
      ...prevState,
      bank: { ...prevState.bank, [name]: value },
    }));
  };

  const calculateTotals = () => {
    let totalForexAmount = 0;
    let totalAmount = 0;

    // Calculate totals by iterating over each row in forexSubForm
    sundryCreditor.forexSubForm.forEach(row => {
      const forexAmount = parseFloat(row.forexAmount) || 0;
      const referenceAmount = parseFloat(row.referenceAmount) || 0;

      totalForexAmount += forexAmount;
      totalAmount += referenceAmount;
    });

    console.log('Calculated Totals:', {
      totalForexAmount: totalForexAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });

    // Update the state with the calculated totals
    setSundryCreditor(prevState => ({
      ...prevState,
      totalForexAmount: totalForexAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  const handleInputForexChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'forexCurrencyType' && index === 0) {
      // Only apply filtering for the first input
      const filtered = currencySuggestion.filter(currency =>
        currency.forexCurrencyName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestion(filtered);
      setCurrencyFocused(true);
      setHighlightedSuggestionCurrency(0); // Reset highlighted suggestion index
    }

    setSundryCreditor(prevState => {
      const updatedForexSubForm = [...prevState.forexSubForm];

      // Update the current row's input field
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [name]: value,
      };

      // If forexCurrencyType is updated in the first row, propagate it to all other rows
      if (name === 'forexCurrencyType' && index === 0) {
        const selectedCurrency = currencySuggestion.find(
          currency => currency.forexCurrencyName.toLowerCase() === value.toLowerCase(),
        );

        const currencySymbol = selectedCurrency ? selectedCurrency.forexCurrencySymbol : '';

        for (let i = 1; i < updatedForexSubForm.length; i++) {
          updatedForexSubForm[i] = {
            ...updatedForexSubForm[i],
            forexCurrencyType: value, // Set all other rows to the first row's forexCurrencyType
            forexCurrencySymbol: currencySymbol, // Set all other rows to the symbol of the selected currency
          };
        }
      }

      // Automatically add a new row if the last input field is filled
      if (
        name === 'referenceCreditOrDebit' &&
        value !== '' &&
        index === updatedForexSubForm.length - 1
      ) {
        const forexCurrencyType = updatedForexSubForm[0].forexCurrencyType;
        const selectedCurrency = currencySuggestion.find(
          currency => currency.forexCurrencyName.toLowerCase() === forexCurrencyType.toLowerCase(),
        );

        const forexCurrencySymbol = selectedCurrency ? selectedCurrency.forexCurrencySymbol : '';

        updatedForexSubForm.push({
          billWiseBreakOf: '',
          uptoOpeningBalanceAmount: '',
          uptoCreditOrDebit: '',
          forexDate: '',
          referenceName: '',
          dueDate: '',
          forexCurrencyType: forexCurrencyType, // Use the first row's forexCurrencyType
          forexCurrencySymbol: forexCurrencySymbol, // Use the symbol of the first row's forexCurrencyType
          forexAmount: '',
          exchangeRate: '',
          referenceAmount: '',
          referenceCreditOrDebit: '',
        });
      }

      // Calculate totals after updating forexSubForm
      calculateTotals();

      return { ...prevState, forexSubForm: updatedForexSubForm };
    });
  };

  const handleSuggestionClick = (suggestion, index) => {
    setSundryCreditor(prevState => {
      // Clone the existing forexSubForm array
      const updatedForexSubForm = [...prevState.forexSubForm];

      // Update the selected forexCurrencyType and forexCurrencySymbol
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        forexCurrencyType: suggestion.forexCurrencyName,
        forexCurrencySymbol: suggestion.forexCurrencySymbol, // Assuming this field exists in the suggestion object
      };

      return { ...prevState, forexSubForm: updatedForexSubForm };
    });

    // Close the suggestion dropdown after selecting
    setCurrencyFocused(false);
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault(); // Prevents the default form submission behavior

      // If the current input has a non-empty value
      if (e.target.value.trim() !== '') {
        const nextField = index + 1; // Determine the next field index

        // Focus on the next field if it exists
        if (nextField < inputRefs.current.length) {
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField].setSelectionRange(0, 0); // Set the cursor at the beginning
        }
      } else if (e.target.name === 'forexDate') {
        // If forexDate input is empty, ask for confirmation
        const confirmEmpty = window.confirm('Do you want to proceed to submit?');
        if (confirmEmpty) {
          handleSubmit(e);
          setForexSubFormModal(false);
        } else {
          e.preventDefault();
          inputRefs.current[28].focus();
        }
      } else if (currencyFocused && filteredSuggestion.length > 0) {
        // If suggestions are focused, select the highlighted suggestion
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
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'billWiseStatus') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'Yes' : 'No';
      setSundryCreditor({
        ...sundryCreditor,
        billWiseStatus: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'provideBankDetails') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'Yes' : 'No';
      setSundryCreditor({
        ...sundryCreditor,
        provideBankDetails: value,
      });

      // Handle opening of the bank details subform modal if 'Yes' is selected
      if (value === 'Yes') {
        setBankSubFormModal(true);
      }
    } else if (['c', 'd', 'C', 'D'].includes(key) && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'Cr' : 'Dr';
      setSundryCreditor({
        ...sundryCreditor,
        creditOrDebit: value,
      });

      // Open the forexSubFormModal when a value is entered in creditOrDebit input
      setForexSubFormModal(true);
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
      setCurrencyFocused(false);
    } else if (key === 'Escape') {
      e.preventDefault();
      navigate(-1);
    }
  };

  // Utility function to parse numbers and remove commas
  const parseNumber = value => {
    if (value) {
      return parseFloat(value.replace(/,/g, '')) || 0;
    }
    return 0;
  };

  // Function to sanitize and prepare data for backend
  const prepareDataForBackend = sundryCreditor => {
    return {
      ...sundryCreditor,
      openingBalance: parseNumber(sundryCreditor.openingBalance),
      sundryCreditorBankDetails: {
        accountName: sundryCreditor.bank.accountName,
        accountNumber: sundryCreditor.bank.accountNumber,
        bankName: sundryCreditor.bank.bankName,
        branchName: sundryCreditor.bank.branchName,
        ifscCode: sundryCreditor.bank.ifscCode,
        accountType: sundryCreditor.bank.accountType,
        swiftCode: sundryCreditor.bank.swiftCode,
      },
      sundryCreditorForexDetails: sundryCreditor.forexSubForm.map(forex => ({
        ...forex,
        uptoOpeningBalanceAmount: parseNumber(forex.uptoOpeningBalanceAmount),
        forexAmount: parseNumber(forex.forexAmount),
        exchangeRate: parseNumber(forex.exchangeRate),
        referenceAmount: parseNumber(forex.referenceAmount),
        totalForexAmount: parseNumber(forex.totalForexAmount),
        totalAmount: parseNumber(forex.totalAmount),
      })),
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Prepare data for backend
      const sanitizedData = prepareDataForBackend(sundryCreditor);

      // Send sanitized data to backend
      const response = await createSundryCreditorMaster(sanitizedData);
      console.log('Response:', response.data);

      // Reset form data
      setSundryCreditor({
        sundryCreditorName: '',
        underGroup: 'sundry creditors',
        billWiseStatus: 'No',
        provideBankDetails: 'No',
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
        dateForOpening: '1-Apr-2024',
        openingBalance: '',
        creditOrDebit: '',
        forexSubForm: [
          {
            billWiseBreakOf: '',
            uptoOpeningBalanceAmount: '',
            uptoCreditOrDebit: '',
            forexDate: '',
            referenceName: '',
            dueDate: '',
            forexCurrencyType: '',
            forexCurrencySymbol: '',
            forexAmount: '',
            exchangeRate: '',
            referenceAmount: '',
            referenceCreditOrDebit: '',
            totalForexAmount: '',
            totalAmount: '',
            totalAmountCreditOrDebit: '',
          },
        ],
      });

      // Focus on the first input field
      if (inputRefs.current && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleBankSubFormBlur = () => {
    const confirmation = window.confirm(
      'Are you sure you want to proceed with these bank details?',
    );
    if (confirmation) {
      // Hide the subform when "OK" is clicked
      setBankSubFormModal(false);
    }
  };

  const numberFormat = (e) =>{
    const value = e.target.value.replace(/,/g, "");
    if(!isNaN) return "";

    const result = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
    e.target.value = result;
  };

  const dateConvert = (e) => {
    const dateValue = e.target.value;
  
    // Regex to match a date in DD/MM/YYYY format
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  
    // Check if the entered date matches the pattern
    if (datePattern.test(dateValue)) {
      const [_, day, month, year] = datePattern.exec(dateValue);
  
      // Convert to YYYY-MM-DD format
      const convertedDate = `${year}-${month}-${day}`;
  
      // Set the converted value back to the input field or update your state
      e.target.value = convertedDate;
  
      // Optionally, update your state if you're storing the date in state
      // setSundryCreditor((prevState) => ({
      //   ...prevState,
      //   forexSubForm: {
      //     ...prevState.forexSubForm,
      //     forexDate: convertedDate,
      //   },
      // }));
    } else {
      console.log("Invalid date format. Please enter a valid date in DD/MM/YYYY format.");
    }
  };
  

  return (
    <>
      <div className="flex">
        <LeftSideMenu />
        <form
          action=""
          className="border border-slate-500 w-[48.5%] h-[92.7vh]"
          onSubmit={handleSubmit}
        >
          <div className="text-sm pl-1 mb-1 flex mt-3">
            <label htmlFor="sundryCreditorName" className="w-[38%] ml-2">
              Sundry Creditor's Name
            </label>
            <span>:</span>
            <input
              type="text"
              id="sundryCreditorName"
              name="sundryCreditorName"
              ref={input => (inputRefs.current[0] = input)}
              value={sundryCreditor.sundryCreditorName}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 0)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="underGroup" className="w-[38%] ml-2">
              Under
            </label>
            <span>:</span>
            <input
              type="text"
              id="underGroup"
              name="underGroup"
              value={sundryCreditor.underGroup}
              onChange={handleInputChange}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="flex">
            <div className="text-sm pl-1 mb-1">
              <label htmlFor="billWiseStatus" className="ml-2 mr-[138.4px]">
                Bill-Wise Status
              </label>
              <span>:</span>
              <input
                type="text"
                id="billWiseStatus"
                value={sundryCreditor.billWiseStatus}
                name="billWiseStatus"
                ref={input => (inputRefs.current[1] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 1)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                autoComplete="off"
              />
            </div>
            <div className="text-sm pl-1 mb-1 absolute left-[990px]">
              <label htmlFor="provideBankDetails" className="ml-2 mr-5">
                Provide bank details
              </label>
              <span>:</span>
              <input
                type="text"
                id="provideBankDetails"
                name="provideBankDetails"
                value={sundryCreditor.provideBankDetails}
                ref={input => (inputRefs.current[2] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 2)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
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
                    ref={input => (inputRefs.current[3] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 3)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[4] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 4)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[5] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 5)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[6] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 6)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[7] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 7)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[8] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 8)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
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
                    ref={input => (inputRefs.current[9] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDown(e, 9)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                    autoComplete="off"
                    onBlur={handleBankSubFormBlur}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="addressOne" className="w-[38%] ml-2">
              Address
            </label>
            <span>:</span>
            <input
              type="text"
              id="addressOne"
              name="addressOne"
              value={sundryCreditor.addressOne}
              ref={input => (inputRefs.current[10] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 10)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressTwo" className="w-[38.4%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressTwo"
              name="addressTwo"
              value={sundryCreditor.addressTwo}
              ref={input => (inputRefs.current[11] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 11)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressThree" className="w-[38.4%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressThree"
              name="addressThree"
              value={sundryCreditor.addressThree}
              ref={input => (inputRefs.current[12] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 12)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressFour" className="w-[38.4%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressFour"
              name="addressFour"
              value={sundryCreditor.addressFour}
              ref={input => (inputRefs.current[13] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 13)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm mb-1 flex">
            <label htmlFor="addressFive" className="w-[38.4%] ml-2"></label>
            <span>:</span>
            <input
              type="text"
              id="addressFive"
              name="addressFive"
              value={sundryCreditor.addressFive}
              ref={input => (inputRefs.current[14] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 14)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="landMarkOrArea" className="w-[38.2%] ml-2">
              LandMark/Area
            </label>
            <span>:</span>
            <input
              type="text"
              id="landMarkOrArea"
              name="landMarkOrArea"
              value={sundryCreditor.landMarkOrArea}
              ref={input => (inputRefs.current[15] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 15)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="state" className="w-[38.2%] ml-2">
              State
            </label>
            <span>:</span>
            <input
              type="text"
              id="state"
              name="state"
              value={sundryCreditor.state}
              ref={input => (inputRefs.current[16] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 16)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="country" className="w-[38.3%] ml-2">
              Country
            </label>
            <span>:</span>
            <input
              type="text"
              id="country"
              name="country"
              value={sundryCreditor.country}
              ref={input => (inputRefs.current[17] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 17)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="pincode" className="w-[38.3%] ml-2">
              Pincode
            </label>
            <span>:</span>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={sundryCreditor.pincode}
              ref={input => (inputRefs.current[18] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 18)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="panOrItNumber" className="w-[38.35%] ml-2">
              PAN/IT No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="panOrItNumber"
              name="panOrItNumber"
              value={sundryCreditor.panOrItNumber}
              ref={input => (inputRefs.current[19] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 19)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="gstinOrUinNumber" className="w-[38.35%] ml-2">
              GSTIN/UIN No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="gstinOrUinNumber"
              name="gstinOrUinNumber"
              value={sundryCreditor.gstinOrUinNumber}
              ref={input => (inputRefs.current[20] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 20)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="msmeNumber" className="w-[38.35%] ml-2">
              MSME No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="msmeNumber"
              name="msmeNumber"
              value={sundryCreditor.msmeNumber}
              ref={input => (inputRefs.current[21] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 21)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="contactPersonName" className="w-[38.5%] ml-2">
              Contact Person Name
            </label>
            <span>:</span>
            <input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              value={sundryCreditor.contactPersonName}
              ref={input => (inputRefs.current[22] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 22)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="mobileNumber" className="w-[38.5%] ml-2">
              Mobile No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={sundryCreditor.mobileNumber}
              ref={input => (inputRefs.current[23] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 23)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="landlineNumber" className="w-[38.5%] ml-2">
              Landline No.
            </label>
            <span>:</span>
            <input
              type="text"
              id="landlineNumber"
              name="landlineNumber"
              value={sundryCreditor.landlineNumber}
              ref={input => (inputRefs.current[24] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 24)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="emailId" className="w-[38.5%] ml-2">
              Email Id
            </label>
            <span>:</span>
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={sundryCreditor.emailId}
              ref={input => (inputRefs.current[25] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 25)}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
          </div>
          <div className="text-sm pl-1 mb-1 flex">
            <label htmlFor="openingBalance" className="w-[21%] ml-2">
              Opening Balance
            </label>
            (
            <input
              type="text"
              id="dateForOpening"
              name="dateForOpening"
              value={sundryCreditor.dateForOpening}
              className="w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
            )<span className="ml-3">:</span>
            <span className="ml-2">₹</span>
            <input
              type="text"
              id="openingBalance"
              name="openingBalance"
              value={sundryCreditor.openingBalance}
              ref={input => (inputRefs.current[26] = input)}
              onChange={handleInputChange}
              onBlur={numberFormat}
              onKeyDown={e => handleKeyDown(e, 26)}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
              autoComplete="off"
            />
            <input
              type="text"
              id="creditOrDebit"
              name="creditOrDebit"
              value={sundryCreditor.creditOrDebit}
              ref={input => (inputRefs.current[27] = input)}
              onKeyDown={e => handleKeyDown(e, 27)}
              onChange={handleInputChange}
              className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
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
                      value={sundryCreditor.forexSubForm.billWiseBreakOf}
                      onChange={handleInputForexChange}
                      className="w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex text-sm mb-4 mt-2 ml-5">
                    <label htmlFor="uptoOpeningBalanceAmount" className="w-[16%]">
                      Upto
                    </label>
                    <span>:</span>₹
                    <input
                      type="text"
                      id="uptoOpeningBalanceAmount"
                      name="uptoOpeningBalanceAmount"
                      value={sundryCreditor.forexSubForm.uptoOpeningBalanceAmount}
                      onChange={handleInputForexChange}
                      className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      id="uptoCreditOrDebit"
                      name="uptoCreditOrDebit"
                      value={sundryCreditor.forexSubForm.uptoCreditOrDebit}
                      onChange={handleInputForexChange}
                      className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border-collapse border border-slate-400 w-full table-fixed">
                    <thead className="text-sm">
                      <tr className="border-t border-b border-slate-400">
                        <th className="w-[10%]">Date</th>
                        <th className="w-[15%]">Bill Ref. Name</th>
                        <th className="w-[10%]">Due Date</th>
                        <th className="w-[20%]">Forex Currency Type</th>
                        <th className="w-[15%]">Forex Amount</th>
                        <th className="w-[14%]">Exchange Rate</th>
                        <th className="w-[20%]">Amount</th>
                        <th className="w-[5%]">Cr/Dr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sundryCreditor.forexSubForm.map((row, index) => (
                        <tr key={index}>
                          {/* Forex Date Input */}
                          <td>
                            <input
                              type="text"
                              id="forexDate"
                              name="forexDate"
                              value={row.forexDate}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[28 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 28 + index * 8)}
                              onBlur={dateConvert}
                              className="w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Reference Name Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceName"
                              name="referenceName"
                              value={row.referenceName}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[29 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 29 + index * 8)}
                              className="w-[130px] h-5 pl-1 ml-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Due Date Input */}
                          <td>
                            <input
                              type="text"
                              id="dueDate"
                              name="dueDate"
                              value={row.dueDate}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[30 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 30 + index * 8)}
                              onBlur={dateConvert}
                              className="w-full h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Forex Currency Type Input */}
                          <td>
                            <input
                              type="text"
                              id="forexCurrencyType"
                              name="forexCurrencyType"
                              value={row.forexCurrencyType}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[31 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 31 + index * 8)}
                              onFocus={e => {
                                setCurrencyFocused(true);
                                handleInputForexChange(e, index);
                              }}
                              onBlur={() => setCurrencyFocused(false)}
                              className="w-[180px] h-5 pl-1 ml-1 font-medium text-sm uppercase text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                            {/* Currency Suggestion Dropdown */}
                            {currencyFocused && filteredSuggestion.length > 0 && (
                              <div className="w-[20%] h-[50vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[585px] top-[100px]">
                                <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                                  <p>List of Currencies</p>
                                </div>
                                <ul
                                  className="suggestions w-full h-[87vh] text-left text-sm mt-2"
                                  ref={optionsRef}
                                >
                                  {filteredSuggestion.map((currency, suggestionIndex) => (
                                    <li
                                      key={suggestionIndex}
                                      tabIndex={0}
                                      className={`pl-2 uppercase cursor-pointer hover:bg-yellow-200 ${
                                        highlightedSuggestionCurrency === suggestionIndex
                                          ? 'bg-yellow-200'
                                          : ''
                                      }`}
                                      onClick={() => handleSuggestionClick(currency, index)}
                                      onMouseDown={e => e.preventDefault()}
                                    >
                                      {currency.forexCurrencyName}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </td>

                          {/* Forex Amount Input */}
                          <td>
                            <span>{row.forexCurrencySymbol}</span>
                            <input
                              type="text"
                              id="forexAmount"
                              name="forexAmount"
                              value={row.forexAmount}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[32 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 32 + index * 8)}
                              onBlur={numberFormat}
                              className="w-[50%] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Exchange Rate Input */}
                          <td>
                            <span>₹</span>
                            <input
                              type="text"
                              id="exchangeRate"
                              name="exchangeRate"
                              value={row.exchangeRate}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[33 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 33 + index * 8)}
                              onBlur={numberFormat}
                              className="w-[50px] h-5 pl-1 ml-14 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Reference Amount Input */}
                          <td>
                            <span>₹</span>
                            <input
                              type="text"
                              id="referenceAmount"
                              name="referenceAmount"
                              value={row.referenceAmount}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[34 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 34 + index * 8)}
                              onBlur={numberFormat}
                              className="w-[60%] h-5 pl-1 ml-5 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>

                          {/* Reference Credit Or Debit Input */}
                          <td>
                            <input
                              type="text"
                              id="referenceCreditOrDebit"
                              name="referenceCreditOrDebit"
                              value={row.referenceCreditOrDebit}
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefs.current[35 + index * 8] = input)}
                              onKeyDown={e => handleKeyDown(e, 35 + index * 8)}
                              className="w-full h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className=" mt-4">
                    <div className="flex absolute left-[560px] top-[500px]">
                      <label htmlFor="totalForexAmount" className="text-sm mr-1">
                        Total
                      </label>
                      <span className="text-sm">($)</span>
                      <span className="absolute left-[60px] bottom-0">:</span>
                      <input
                        type="text"
                        id="totalForexAmount"
                        name="totalForexAmount"
                        value={sundryCreditor.totalForexAmount || ''}
                        onChange={handleInputForexChange}
                        className="w-[100px] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                        autoComplete="off"
                        readOnly
                      />
                    </div>
                    <div className="flex absolute left-[880px] top-[500px]">
                      <label htmlFor="totalAmount" className="text-sm mr-1">
                        Total
                      </label>
                      <span className="text-sm">(₹)</span>
                      <span className="absolute left-[60px] bottom-0">:</span>
                      <input
                        type="text"
                        id="totalAmount"
                        name="totalAmount"
                        value={sundryCreditor.totalAmount || ''}
                        onChange={handleInputForexChange}
                        className="w-[120px] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
                        autoComplete="off"
                        readOnly
                      />
                      <input
                        type="text"
                        id="totalAmountCreditOrDebit"
                        name="totalAmountCreditOrDebit"
                        value={sundryCreditor.forexSubForm.totalAmountCreditOrDebit}
                        onChange={handleInputForexChange}
                        className="w-[30px] h-5 pl-1 ml-2 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border"
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
  );
};

export default SundryCreditorsCreate;
