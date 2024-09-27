import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { createSundryDebtorMaster, listOfCurrencies } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import { useNavigate } from 'react-router-dom';

const SundryDebtorsCreate = () => {
  const [sundryDebtor, setSundryDebtor] = useState({
    sundryDebtorName: '',
    underGroup: 'sundry debtors',
    forexApplicable: 'no',
    billWiseStatus: 'no',
    provideBankDetails: 'no',
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
    creditOrDebit: 'dr',
    totalForexAmount: '',
    totalInwardReferenceAmount: '',
    totalOutwardReferenceAmount: '',
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
        referenceCreditOrDebit: 'dr'
      },
    ],
  });
console.log(sundryDebtor)
  const [bankSubFormModal, setBankSubFormModal] = useState(false);
  const [forexSubFormModal, setForexSubFormModal] = useState(false);
  const [currencySuggestion, setCurrencySuggestion] = useState([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [currencyFocused, setCurrencyFocused] = useState(false);
  const [highlightedSuggestionCurrency, setHighlightedSuggestionCurrency] = useState(0);
  const prevBankSubFormModal = useRef(false); // Tracks the previous state of bankSubFormModal
  const inputRefs = useRef([]);
  const inputRefsBank = useRef([]);
  const inputRefsForex = useRef([]);
  const optionsRef = useRef(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Focus the first input in the main form
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  
    if (bankSubFormModal && inputRefsBank.current[0]) {
      inputRefsBank.current[0].focus();
    }
  
    // If forexSubFormModal is active, focus the first input in that form
    if (forexSubFormModal && inputRefsForex.current[0]) {
      inputRefsForex.current[0].focus();
    }
  
    // Fetch the list of currencies
    listOfCurrencies()
      .then(response => {
        console.log(response.data); // Check the data for debugging
        setCurrencySuggestion(response.data); // Update the state with currency data
      })
      .catch(error => {
        console.error('Error fetching currencies:', error); // Log any errors
      });
  
    // Detect if the bankSubFormModal is closed
    if (prevBankSubFormModal.current && !bankSubFormModal) {
      // Focus on the addressOne input when bankSubFormModal closes
      const addressOneInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'addressOne'
      );
      if (addressOneInputIndex !== -1 && inputRefs.current[addressOneInputIndex]) {
        inputRefs.current[addressOneInputIndex].focus();
      }
    }
  
    // Update the previous state value
    prevBankSubFormModal.current = bankSubFormModal;
  }, [bankSubFormModal, forexSubFormModal]);  

 // Handling input changes in sundryDebtor form
 const handleInputChange = e => {
  const { name, value } = e.target;
    setSundryDebtor((prev)=>{
      return {...prev, [name]: value};
    })
};
  

  const handleInputBankChange = e => {
    const { name, value } = e.target;
    setSundryDebtor(prevState => ({
      ...prevState,
      bank: { ...prevState.bank, [name]: value },
    }));
  };

  const calculateOutwardTotals = () => {
    let totalForexAmount = 0;
    let totalOutwardReferenceAmount = 0;
    let rowIndexToClear = -1; // Variable to keep track of the row that exceeds the limit
  
    setSundryDebtor((prevState) => {
      // Parse openingBalance as a float, removing commas
      const openingBalance = parseFloat(prevState.openingBalance.replace(/,/g, '')) || 0;
  
      const updatedForexSubForm = prevState.forexSubForm.map((row, index) => {
        // Parse forexAmount and exchangeRate as floats, removing commas
        const forexAmount = parseFloat(row.forexAmount.replace(/,/g, '')) || 0;
        const exchangeRate = parseFloat(row.exchangeRate.replace(/,/g, '')) || 1; // Assume 1 if exchangeRate is not provided
  
        // Calculate outwardReferenceAmount
        const outwardReferenceAmount = forexAmount * exchangeRate;
  
        // Accumulate totals
        totalForexAmount += forexAmount;
        totalOutwardReferenceAmount += outwardReferenceAmount;
  
        // Check if totalOutwardReferenceAmount exceeds openingBalance
        if (totalOutwardReferenceAmount > openingBalance && rowIndexToClear === -1) {
          rowIndexToClear = index; // Store the index of the row that caused the excess
        }
  
        // Return the updated row with outwardReferenceAmount
        return {
          ...row,
          outwardReferenceAmount: outwardReferenceAmount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        };
      });
  
      // Check if totalOutwardReferenceAmount exceeds the openingBalance
      if (totalOutwardReferenceAmount > openingBalance) {
        const remainingAmount = (openingBalance - (totalOutwardReferenceAmount - updatedForexSubForm[rowIndexToClear].outwardReferenceAmount)).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  
        // Display alert for exceeding balance
        window.alert(`The total amount exceeds the opening balance! Remaining amount: ₹ ${remainingAmount}`);
  
        // Clear the forexAmount and outwardReferenceAmount of the row that caused the excess
        if (rowIndexToClear !== -1) {
          updatedForexSubForm[rowIndexToClear].forexAmount = '0'; // Reset forexAmount to zero
          updatedForexSubForm[rowIndexToClear].outwardReferenceAmount = '0'; // Reset outwardReferenceAmount to zero
  
          // Set focus to the problematic forexAmount input
          inputRefsForex.current[rowIndexToClear * 9]?.focus(); // Adjust index based on layout
        }
      }
  
      // Format totals to 2 decimal places
      const formattedTotalForexAmount = totalForexAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const formattedTotalOutwardReferenceAmount = totalOutwardReferenceAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  
      // Log calculated totals for debugging
      console.log('Calculated Totals:', {
        totalForexAmount: formattedTotalForexAmount,
        totalOutwardReferenceAmount: formattedTotalOutwardReferenceAmount,
      });
  
      // Return the updated state with updated totals and forexSubForm
      return {
        ...prevState,
        forexSubForm: updatedForexSubForm, // Update forexSubForm rows
        totalForexAmount: formattedTotalForexAmount, // Update totalForexAmount
        totalOutwardReferenceAmount: formattedTotalOutwardReferenceAmount, // Update totalOutwardReferenceAmount
      };
    });
  };       
  
  const calculateInwardTotals = () => {
    let totalInwardReferenceAmount = 0;
    let rowIndexToClear = -1; // Variable to keep track of the row index that exceeds the limit
  
    setSundryDebtor((prevState) => {
      // Parse openingBalance as a float, removing commas
      const openingBalance = parseFloat(prevState.openingBalance.replace(/,/g, '')) || 0;
  
      const updatedForexSubForm = prevState.forexSubForm.map((row, index) => {
        // Parse inwardReferenceAmount as a float, removing commas
        const inwardReferenceAmount = parseFloat(row.inwardReferenceAmount.replace(/,/g, '')) || 0;
  
        // Accumulate the inward reference amount
        totalInwardReferenceAmount += inwardReferenceAmount;
  
        // Check if the totalInwardReferenceAmount exceeds the openingBalance
        if (totalInwardReferenceAmount > openingBalance && rowIndexToClear === -1) {
          rowIndexToClear = index; // Store the index of the row that caused the excess
        }
  
        // Return the row unchanged as no additional modifications are required
        return row;
      });
  
      // Ensure the total amount does not exceed the opening balance
      if (totalInwardReferenceAmount > openingBalance) {
        const remainingAmount = (openingBalance - (totalInwardReferenceAmount - updatedForexSubForm[rowIndexToClear].inwardReferenceAmount)).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  
        // Display alert with the remaining balance
        window.alert(`The total inward reference amount exceeds the opening balance! Remaining amount: ₹ ${remainingAmount}`);
  
        // Clear the inwardReferenceAmount of the row that caused the excess
        if (rowIndexToClear !== -1) {
          updatedForexSubForm[rowIndexToClear].inwardReferenceAmount = '0'; // Reset the inwardReferenceAmount to zero
          // Set focus to the row input that caused the issue
        inputRefsForex.current[rowIndexToClear * 9]?.focus();
        }
      }
  
      // Format the total inward reference amount
      const formattedTotalInwardReferenceAmount = totalInwardReferenceAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  
      // Return the updated state
      return {
        ...prevState,
        forexSubForm: updatedForexSubForm,
        totalInwardReferenceAmount: formattedTotalInwardReferenceAmount, // Update total inward reference amount
      };
    });
  };        
  

  const handleInputForexChange = (e, index) => {
    const { name, value } = e.target;
  
    setSundryDebtor((prevState) => {
      let updatedForexSubForm = [...prevState.forexSubForm];
  
      // Update the current row's input field
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [name]: value,
      };
  
      // Apply filtering for forexCurrencyType in the first row
      if (name === 'forexCurrencyType' && index === 0) {
        const filtered = currencySuggestion.filter((currency) =>
          currency.forexCurrencyName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestion(filtered);
        setCurrencyFocused(true);
        setHighlightedSuggestionCurrency(0);
      }
  
      // Propagate forexCurrencyType and forexCurrencySymbol from the first row to all other rows
      if (name === 'forexCurrencyType' && index === 0) {
        const selectedCurrency = currencySuggestion.find(
          (currency) => currency.forexCurrencyName.toLowerCase() === value.toLowerCase()
        );
  
        const currencySymbol = selectedCurrency ? selectedCurrency.forexCurrencySymbol : '';
  
        updatedForexSubForm = updatedForexSubForm.map((row, i) => {
          if (i === 0) return row; // Skip the first row
  
          return {
            ...row,
            forexCurrencyType: value, // Propagate forexCurrencyType
            forexCurrencySymbol: currencySymbol, // Propagate forexCurrencySymbol
          };
        });
      }
  
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
      calculateOutwardTotals();
  
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
    } else if (key === 'Backspace') {
      if (e.target.value.trim() === '' && index > 0) {
        e.preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'forexApplicable') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryDebtor({
        ...sundryDebtor,
        forexApplicable: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'billWiseStatus') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryDebtor({
        ...sundryDebtor,
        billWiseStatus: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'provideBankDetails') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryDebtor({
        ...sundryDebtor,
        provideBankDetails: value,
      });
    } else if (['c', 'd', 'C', 'D'].includes(key) && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'cr' : 'dr';
      setSundryDebtor(prevState => {
        const updatedForexSubForm = prevState.forexSubForm.map(row => ({
          ...row,
          referenceCreditOrDebit: value, // Update referenceCreditOrDebit in all rows
        }));
  
        return {
          ...prevState,
          creditOrDebit: value,
          forexSubForm: updatedForexSubForm,
        };
      });
    } else if (key === 'Escape') {
      e.preventDefault();
      navigate(-1);
    }
  };  

  const handleKeyDownBank = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefsBank.current.length){
          inputRefsBank.current[nextField].focus();
          inputRefsBank.current[nextField].setSelectionRange(0, 0);
        }

        // Check if the current field is swiftCode and call handleBankSubFormBlur
        if (e.target.name === 'swiftCode'){
          handleBankSubFormBlur(); // Call your blur handler here
        }
      }
    } else if (key === 'Backspace'){

      if (e.target.value.trim() === '' && index > 0){
        e.preventDefault();

        const prevField = index - 1;
        if (inputRefsBank.current[prevField]){
          inputRefsBank.current[prevField].focus();
          inputRefsBank.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      setBankSubFormModal(false);
    }
  };

  // Function to add a new row to the forexSubForm with conditional referenceCreditOrDebit value
  const addNewRow = () => {
    setSundryDebtor((prevState) => {
      // Define the structure of a new row with conditional referenceCreditOrDebit based on creditOrDebit value
      const newRow = {
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: prevState.forexSubForm[0]?.forexCurrencyType || '',
        forexCurrencySymbol: prevState.forexSubForm[0]?.forexCurrencySymbol || '',
        forexAmount: '',
        exchangeRate: prevState.forexSubForm[0]?.exchangeRate || '',
        outwardReferenceAmount: '',
        inwardReferenceAmount: '',
        // Set referenceCreditOrDebit based on the value of creditOrDebit
        referenceCreditOrDebit: 'dr',
      };
  
      return {
        ...prevState,
        forexSubForm: [...prevState.forexSubForm, newRow],
      };
    });
  };  

  const handleKeyDownForex = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstForexDateIndex = 0;
  
    if (key === 'Enter') {
      e.preventDefault();
  
      // Check if the current input is the first forexDate and ensure it has a value
      if (rowIndex === 0 && colIndex === firstForexDateIndex && e.target.value.trim() === '') {
        alert('The forexDate field must have a value before proceeding.');
        inputRefsForex.current[rowIndex * 9 + colIndex]?.focus();
        return;
      }
  
      // Check if the current field is forexDate and its value is empty to trigger submit logic
      if (e.target.name === 'forexDate' && e.target.value.trim() === '') {
        const confirmSubmit = window.confirm('Do you want to proceed with submit?');
        if (confirmSubmit) {
          handleSubmit(e);
          setForexSubFormModal(false);
        } else {
          inputRefsForex.current[rowIndex * 9 + colIndex]?.focus();
        }
        return;
      }
  
      // Check if Enter key is pressed on the referenceCreditOrDebit field with a completed value
      const isReferenceCreditOrDebit = e.target.name === 'referenceCreditOrDebit';
      const isLastRow = rowIndex === sundryDebtor.forexSubForm.length - 1;
  
      // Add a new row when Enter is pressed on the last row referenceCreditOrDebit with a value
      if (isReferenceCreditOrDebit && e.target.value.trim() !== '' && isLastRow) {
        addNewRow();
        setTimeout(() => {
          inputRefsForex.current[(rowIndex + 1) * 9]?.focus();
        }, 0);
        return;
      }
  
      // Move to the next cell
      const nextCell = rowIndex * 9 + colIndex + 1;
      if (inputRefsForex.current[nextCell] && nextCell < inputRefsForex.current.length) {
        inputRefsForex.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 9 + colIndex - 1;
        if (prevCell >= 0 && inputRefsForex.current[prevCell]) {
          inputRefsForex.current[prevCell].focus();
          inputRefsForex.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Tab') {
      e.preventDefault();
      setCurrencyFocused(false);
    } else if (key === 'Escape'){
      setForexSubFormModal(false);
    }
  };  

  const handleSuggestionClick = (suggestion, index) => {
    setSundryDebtor(prevState => {
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

  const handleKeyDownCurrency = (e, index) => {
    const key = e.key;

    // Prevent default behavior for Enter key and execute custom logic
    if (key === 'Enter'){
      (e).preventDefault();

      // Check if any suggestion is highlighted
      if (highlightedSuggestionCurrency >= 0 && highlightedSuggestionCurrency < filteredSuggestion.length){
        // Select the highlighted suggestion
        const selectedCurrency = filteredSuggestion[highlightedSuggestionCurrency];
        
        // Update the forexCurrencyType in the forexSubForm
        setSundryDebtor(prevState => {
          const updatedForexSubForm = [...prevState.forexSubForm];

          // Update the specific row
          updatedForexSubForm[index] = {
            ...updatedForexSubForm[index],
            forexCurrencyType: selectedCurrency.forexCurrencyName,
            forexCurrencySymbol: selectedCurrency.forexCurrencySymbol, // Assuming this field exists in the
          };

          return { ...prevState, forexSubForm: updatedForexSubForm };
        });

        setCurrencyFocused(false);

        // Set focus to the forexAmount input
        inputRefsForex.current[4 + index * 9]?.focus();
      } else {
        setCurrencyFocused(false);
      }
    } else if (key === 'ArrowDown' && currencyFocused){
      e.preventDefault();
      setHighlightedSuggestionCurrency(prevIndex =>
        prevIndex === filteredSuggestion.length - 1 ? 0 : prevIndex + 1
      );
    } else if (key === 'ArrowUp'){
      e.preventDefault();
      setHighlightedSuggestionCurrency(prevIndex =>
        prevIndex === 0 ? filteredSuggestion.length - 1 : prevIndex - 1
      );
    } else if (key === 'Tab'){
      e.preventDefault();
      setCurrencyFocused(false);
    }
  }

  // Utility function to parse numbers and remove commas
  const parseNumber = value => {
    if (value) {
      return parseFloat(value.replace(/,/g, '')) || 0;
    }
    return 0;
  };

  // Function to sanitize and prepare data for backend
  const prepareDataForBackend = sundryDebtor => {
    return {
      ...sundryDebtor,
      openingBalance: parseNumber(sundryDebtor.openingBalance),
      totalForexAmount: parseNumber(sundryDebtor.totalForexAmount),
      totalInwardReferenceAmount: parseNumber(sundryDebtor.totalInwardReferenceAmount),
      totalOutwardReferenceAmount: parseNumber(sundryDebtor.totalOutwardReferenceAmount),
      sundryDebtorBankDetails: {
        accountName: sundryDebtor.bank?.accountName,
        accountNumber: sundryDebtor.bank?.accountNumber,
        bankName: sundryDebtor.bank?.bankName,
        branchName: sundryDebtor.bank?.branchName,
        ifscCode: sundryDebtor.bank?.ifscCode,
        accountType: sundryDebtor.bank?.accountType,
        swiftCode: sundryDebtor.bank?.swiftCode,
      },
      sundryDebtorForexDetails: sundryDebtor.forexSubForm.filter(forex => forex.forexDate.trim() !== '')  // Filter out rows with empty forexDate
      .map(forex => ({
        ...forex,
        forexCurrencySymbol: forex.forexCurrencySymbol,
        forexAmount: parseNumber(forex.forexAmount),
        exchangeRate: parseNumber(forex.exchangeRate),
        outwardReferenceAmount: parseNumber(forex.outwardReferenceAmount),
        inwardReferenceAmount: parseNumber(forex.inwardReferenceAmount),
      })),
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if sundryDebtorName is filled
    if (!sundryDebtor.sundryDebtorName.trim()){
      alert('Sundry Creditor Name is required!');
      // Optionally focus on the sundryDebtorName input field
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
      return;  // stop the form submission
    }
    try {
      // Prepare data for backend
      const sanitizedData = prepareDataForBackend(sundryDebtor);

      // Send sanitized data to backend
      const response = await createSundryDebtorMaster(sanitizedData);
      console.log('Response:', response.data);

      // Reset form data
      setSundryDebtor({
        sundryDebtorName: '',
        underGroup: 'sundry creditors',
        forexApplicable: 'no',
        billWiseStatus: 'no',
        provideBankDetails: 'no',
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
            forexDate: '',
            referenceName: '',
            dueDate: '',
            forexCurrencyType: '',
            forexCurrencySymbol: '',
            forexAmount: '',
            exchangeRate: '',
            referenceAmount: '',
            referenceCreditOrDebit: '',
            outwardReferenceAmount: '',
            inwardReferenceAmount: '',
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

  const numberFormat = (e, index) => {
    // Remove existing commas and parse the value
    const rawValue = e.target.value.replace(/,/g, "");
    
    // Check if the value is a valid number
    if (isNaN(rawValue) || rawValue === "") return;
    
    // Format the number with commas
    const formattedValue = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rawValue);
    
    // Update the input field's value to the formatted result
    e.target.value = formattedValue;
  
    // Update the state with the formatted value
    handleInputForexChange({ target: { name: e.target.name, value: formattedValue } }, index);
  
    // Ensure that handleInputChange is called with the formatted value
    handleInputChange({ target: { name: e.target.name, value: formattedValue } });
  };      

  const dateConvert = (e, index) => {
    const dateValue = e.target.value;
    const fieldName = e.target.name; // forexDate or dueDate
  
    // Validate and format date
    const datePattern = /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/;
    if (datePattern.test(dateValue)) {
      let [_, day, month, year] = datePattern.exec(dateValue);
  
      if (year.length === 2) year = `20${year}`;
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');
  
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = parseInt(month) - 1;
      const formattedDisplayDate = `${day}-${monthNames[monthIndex]}-${year}`;
      const convertedDate = `${year}-${month}-${day}`;
  
      setSundryDebtor(prevState => {
        const updatedForexSubForm = [...prevState.forexSubForm];
        updatedForexSubForm[index] = {
          ...updatedForexSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: formattedDisplayDate // Save the formatted date (DD-MMM-YYYY format)
        };
        return {
          ...prevState,
          forexSubForm: updatedForexSubForm
        };
      });
    }
  };
  
  
  const handleFormattedDateChange = (e, index, fieldName) => {
    const dateValue = e.target.value;
    
    // Update the sundryDebtor state for the specific row and field (forexDate or dueDate)
    setSundryDebtor(prevState => {
      const updatedForexSubForm = [...prevState.forexSubForm];
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue
      };
      return {
        ...prevState,
        forexSubForm: updatedForexSubForm
      };
    });
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
            <label htmlFor="sundryDebtorName" className="w-[38%] ml-2">
              Sundry Debtor's Name
            </label>
            <span>:</span>
            <input
              type="text"
              id="sundryDebtorName"
              name="sundryDebtorName"
              ref={input => (inputRefs.current[0] = input)}
              value={sundryDebtor.sundryDebtorName}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 0)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />
          </div>
          <div className='flex'>
            <div className="text-sm pl-1 mb-1">
              <label htmlFor="underGroup" className="mr-[194.9px] ml-2">
                Under
              </label>
              <span>:</span>
              <input
                type="text"
                id="underGroup"
                name="underGroup"
                value={sundryDebtor.underGroup}
                onChange={handleInputChange}
                className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                autoComplete="off"
              />
            </div>
            <div className="text-sm pl-1 mb-1 absolute left-[990px]">
              <label htmlFor="forexApplicable" className="ml-2 mr-5">
                Forex Applicable
              </label>
              <span>:</span>
              <input
                type="text"
                id="forexApplicable"
                name="forexApplicable"
                value={sundryDebtor.forexApplicable}
                ref={input => (inputRefs.current[1] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 1)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                autoComplete="off"
              />
            </div>
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
                value={sundryDebtor.billWiseStatus}
                name="billWiseStatus"
                ref={input => (inputRefs.current[2] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 2)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                value={sundryDebtor.provideBankDetails}
                ref={input => (inputRefs.current[3] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 3)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.accountName}
                    ref={input => (inputRefsBank.current[0] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 0)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.accountNumber}
                    ref={input => (inputRefsBank.current[1] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 1)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.bankName}
                    ref={input => (inputRefsBank.current[2] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 2)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.branchName}
                    ref={input => (inputRefsBank.current[3] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 3)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.ifscCode}
                    ref={input => (inputRefsBank.current[4] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 4)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.accountType}
                    ref={input => (inputRefsBank.current[5] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 5)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    value={sundryDebtor.bank.swiftCode}
                    ref={input => (inputRefsBank.current[6] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 6)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                    autoComplete="off"
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
              value={sundryDebtor.addressOne}
              ref={input => (inputRefs.current[4] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 4)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.addressTwo}
              ref={input => (inputRefs.current[5] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 5)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.addressThree}
              ref={input => (inputRefs.current[6] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 6)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.addressFour}
              ref={input => (inputRefs.current[7] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 7)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.addressFive}
              ref={input => (inputRefs.current[8] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 8)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.landMarkOrArea}
              ref={input => (inputRefs.current[9] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 9)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.state}
              ref={input => (inputRefs.current[10] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 10)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.country}
              ref={input => (inputRefs.current[11] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 11)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.pincode}
              ref={input => (inputRefs.current[12] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 12)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.panOrItNumber}
              ref={input => (inputRefs.current[13] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 13)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.gstinOrUinNumber}
              ref={input => (inputRefs.current[14] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 14)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.msmeNumber}
              ref={input => (inputRefs.current[15] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 15)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.contactPersonName}
              ref={input => (inputRefs.current[16] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 16)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.mobileNumber}
              ref={input => (inputRefs.current[17] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 17)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.landlineNumber}
              ref={input => (inputRefs.current[18] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 18)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.emailId}
              ref={input => (inputRefs.current[19] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 19)}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={sundryDebtor.dateForOpening}
              className="w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />
            )<span className="ml-3">:</span>
            <span className="ml-2">₹</span>
            <input
              type="text"
              id="openingBalance"
              name="openingBalance"
              value={sundryDebtor.openingBalance}
              ref={input => (inputRefs.current[20] = input)}
              onChange={handleInputChange}
              onBlur={numberFormat}
              onKeyDown={e => handleKeyDown(e, 20)}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />
            <input
              type="text"
              id="creditOrDebit"
              name="creditOrDebit"
              value={sundryDebtor.creditOrDebit}
              ref={input => (inputRefs.current[21] = input)}
              onKeyDown={e => handleKeyDown(e, 21)}
              onChange={handleInputChange}
              className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                      value={sundryDebtor.sundryDebtorName}
                      className="w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                      value={sundryDebtor.openingBalance}
                      className="w-[100px] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      id="uptoCreditOrDebit"
                      name="uptoCreditOrDebit"
                      value={sundryDebtor.creditOrDebit}
                      className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border-collapse border border-slate-400 w-full table-fixed">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className="w-[10%]">Date</th>
                        <th className="w-[25%]">Bill Ref. Name</th>
                        <th className="w-[10%]">Due Date</th>
                        {sundryDebtor.forexApplicable !== 'no' && (
                          <>
                            <th className="w-[25%]">Forex Currency Type</th>
                            <th className="w-[15%]">Forex Amount</th>
                            <th className="w-[15%]">Exchange Rate</th>
                            <th className="w-[25%]">Amount</th>
                          </>
                        )}
                        {sundryDebtor.forexApplicable !== 'yes' && (
                          <>
                            <th className='w-[35%]'>Amount</th>
                          </>
                        )}
                        <th className="w-[5%]">Cr/Dr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sundryDebtor.forexSubForm.map((row, index) => (
                        <tr key={index} className='leading-4'>
                          {/* Forex Date Input */}
                          <td>
                            <input
                              type="text"
                              id="forexDate"
                              name="forexDate"
                              value={row.formattedForexDate}
                              onChange={(e) => handleFormattedDateChange(e, index, 'forexDate')}
                              ref={input => (inputRefsForex.current[0 + index * 9] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 0)}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              ref={input => (inputRefsForex.current[1 + index * 9] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 1 )}
                              className="w-[180px] h-5 pl-1 ml-5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              autoComplete="off"
                            />
                          </td>

                          {/* Due Date Input */}
                          <td>
                            <input
                              type="text"
                              id="dueDate"
                              name="dueDate"
                              value={row.formattedDueDate}
                              onChange={(e) => handleFormattedDateChange(e, index, 'dueDate')}
                              ref={input => (inputRefsForex.current[2 + index * 9] = input)}
                              onKeyDown={e => {
                                handleKeyDownForex(e, index, 2)
                                if(e.key === 'Enter' && sundryDebtor.forexApplicable === 'no'){
                                  inputRefsForex.current[index * 9 + 7].focus()
                                }
                              }}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              autoComplete="off"
                            />
                          </td>

                          {/* Conditional Rendering of Forex Fields */}
                          {sundryDebtor.forexApplicable !== 'no' && (
                            <>
                              {/* Forex Currency Type Input */}
                              <td>
                                <input
                                  type="text"
                                  id="forexCurrencyType"
                                  name="forexCurrencyType"
                                  value={row.forexCurrencyType}
                                  ref={input => (inputRefsForex.current[3 + index * 9] = input)}
                                  onChange={e => handleInputForexChange(e, index)}
                                  onKeyDown={e => handleKeyDownCurrency(e, index)}
                                  onFocus={e => {
                                    // Set focus only for the first row
                                    if (index === 0){
                                      setCurrencyFocused(true);
                                      handleInputForexChange(e, index);
                                    }
                                  }}
                                  onBlur={() => setCurrencyFocused(false)}
                                  className="w-[160px] h-5 pl-1 font-medium text-[12px] uppercase text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                                  autoComplete="off"
                                />
                                {/* Currency Suggestion Dropdown */}
                                {currencyFocused && filteredSuggestion.length > 0 && (
                                  <div className="w-[20%] h-[50vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[558px] top-[100px]">
                                    <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                                      <p>List of Currencies</p>
                                    </div>
                                    <ul
                                      className="suggestions w-full h-[87vh] text-left text-[12px] mt-2"
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
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              e.preventDefault();
                                              handleSuggestionClick(currency, index);
                                            }
                                          }}
                                          onMouseEnter={() => {
                                            setHighlightedSuggestionCurrency(suggestionIndex)
                                          }}
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
                                <span className='ml-7'>{row.forexCurrencySymbol}</span>
                                <input
                                  type="text"
                                  id="forexAmount"
                                  name="forexAmount"
                                  value={row.forexAmount}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[4 + index * 9] = input)}
                                  onKeyDown={e => handleKeyDownForex(e, index, 4)}
                                  onBlur={(e) => {numberFormat(e, index)}} 
                                  className="w-[50%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                                  autoComplete="off"
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
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[5 + index * 9] = input)}
                                  onKeyDown={e => handleKeyDownForex(e, index, 5)}
                                  onBlur={(e) => {numberFormat(e, index)}}
                                  className="w-[50px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                                  autoComplete="off"
                                />
                              </td>

                              {/* Reference Amount Input */}
                              <td>
                                <span className='ml-16'>₹</span>
                                <input
                                  type="text"
                                  id="outwardReferenceAmount"
                                  name="outwardReferenceAmount"
                                  value={row.outwardReferenceAmount}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[6 + index * 9] = input)}
                                  onKeyDown={e => 
                                    {handleKeyDownForex(e, index, 6)
                                    if(e.key === 'Enter'){
                                      inputRefsForex.current[index * 9 + 8]?.focus()
                                    }
                                  }}
                                  onBlur={(e) => {numberFormat(e, index)}}
                                  className="w-[40%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                                  autoComplete="off"
                                />
                              </td>
                            </>
                          )}

                          {/* Conditional Rendering of Forex Fields */}
                          {sundryDebtor.forexApplicable !== 'yes' && (
                            <>
                              {/* Inward Amount Input */}
                              <td>
                                <span className="ml-36">₹</span>
                                <input
                                  type="text"
                                  id="inwardReferenceAmount"
                                  name="inwardReferenceAmount"
                                  value={row.inwardReferenceAmount}
                                  onChange={(e) => handleInputForexChange(e, index)}
                                  ref={(input) => (inputRefsForex.current[7 + index * 9] = input)}
                                  onKeyDown={(e) => handleKeyDownForex(e, index,7)}
                                  onBlur={(e) => {
                                    numberFormat(e, index);
                                  }}
                                  className="w-[40%] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                                  autoComplete="off"
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
                              onChange={e => handleInputForexChange(e, index)}
                              ref={input => (inputRefsForex.current[8 + index * 9] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 8)}
                              className="w-[30px] h-5 pl-1 pr-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {sundryDebtor.forexApplicable !== 'no' && (
                    <>
                      <div className=" mt-4">
                        <div className="w-[350px] h-[20px] flex absolute left-[610px] top-[500px] border border-t-black border-transparent">
                          <label htmlFor="totalForexAmount" className="text-[12px] mr-1 mt-1">
                            Total
                          </label>
                          <span className="text-sm mt-1">($)</span>
                          <span className="absolute top-0 left-[60px] bottom-0">:</span>
                          <input
                            type="text"
                            id="totalForexAmount"
                            name="totalForexAmount"
                            value={sundryDebtor.totalForexAmount}
                            onBlur={(e) => numberFormat(e, 0)}
                            className="w-[100px] h-5 pl-1 mt-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                            autoComplete="off"
                            readOnly
                          />
                        </div>
                        <div className="w-[167px] flex absolute left-[900px] top-[500px] border border-t-black border-transparent">
                          <label htmlFor="totalOutwardReferenceAmount" className="text-[12px] mr-1 mt-1">
                            Total
                          </label>
                          <span className="text-sm mt-1">(₹)</span>
                          <span className="absolute left-[60px] bottom-0">:</span>
                          <input
                            type="text"
                            id="totalOutwardReferenceAmount"
                            name="totalOutwardReferenceAmount"
                            value={sundryDebtor.totalOutwardReferenceAmount}
                            onBlur={(e) => numberFormat(e, 1)}
                            className="w-[120px] h-5 pl-1 mt-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                            autoComplete="off"
                            readOnly
                          />
                          <input
                            type="text"
                            id="totalOutwardReferenceAmountCreditOrDebit"
                            name="totalOutwardReferenceAmountCreditOrDebit"
                            value={sundryDebtor.forexSubForm.totalOutwardReferenceAmountCreditOrDebit}
                            onChange={handleInputForexChange}
                            className="w-[30px] h-5 pl-1 ml-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {sundryDebtor.forexApplicable !== 'yes' && (
                    <>
                      <div className='w-[126px] flex absolute left-[900px] top-[500px] text-sm border border-t-black border-transparent'>
                        <label htmlFor="" className='mt-1'>Total</label>
                        <span className='mt-1'>:</span>
                        <span className='ml-1 mt-1'>₹</span>
                        <input
                            type="text"
                            id="totalInwardReferenceAmount"
                            name="totalInwardReferenceAmount"
                            value={sundryDebtor.totalInwardReferenceAmount}
                            onBlur={(e) => numberFormat(e, 1)}
                            className="w-[80px] h-5 mt-1 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                            autoComplete="off"
                            readOnly
                          />
                          <input
                            type="text"
                            id="totalInwardReferenceAmountCreditOrDebit"
                            name="totalInwardReferenceAmountCreditOrDebit"
                            value={sundryDebtor.forexSubForm.totalInwardReferenceAmountCreditOrDebit}
                            className="w-[30px] h-5 pl-1 ml-2 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
  );
};

export default SundryDebtorsCreate;
