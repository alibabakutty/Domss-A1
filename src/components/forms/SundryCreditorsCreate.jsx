import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { createSundryCreditorMaster, listOfCurrencies } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import { useNavigate } from 'react-router-dom';

const SundryCreditorsCreate = () => {
  const [sundryCreditor, setSundryCreditor] = useState({
    sundryCreditorName: '',
    underGroup: 'sundry creditors',
    forexApplicable: 'no',
    billWiseStatus: 'no',
    provideBankDetails: 'no',
    sundryCreditorBankDetails: {
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
    creditOrDebit: 'cr',
    totalForexAmount: '',
    totalForexAmountCreditOrDebit: 'cr',
    totalInwardReferenceAmount: '',
    totalOutwardReferenceAmount: '',
    totalReferenceAmountCreditOrDebit: 'cr',
    sundryCreditorForexDetails: [
      {
        
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: '',
        forexCurrencySymbol: '',
        forexAmount: '',
        forexCreditOrDebit: 'cr',
        exchangeRate: '',
        outwardReferenceAmount: '',
        inwardReferenceAmount: '',
        referenceCreditOrDebit: 'cr'
      },
    ],
  });

  console.log(sundryCreditor);

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
  const totalRefs = useRef([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Focus the first input in the main form
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  
    if (bankSubFormModal && inputRefsBank.current[0]) {
      inputRefsBank.current[0]?.focus();
    }
  
    // If forexSubFormModal is active, focus the first input in that form
    if (forexSubFormModal && inputRefsForex.current[0]) {
      inputRefsForex.current[0]?.focus();
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
        inputRefs.current[addressOneInputIndex]?.focus();
      }
    }
  
    // Update the previous state value
    prevBankSubFormModal.current = bankSubFormModal;
  }, [bankSubFormModal, forexSubFormModal]);  

 // Handling input changes in sundryCreditor form
 const handleInputChange = (e) => {
  const { name, value } = e.target;
    setSundryCreditor((prev) => {
      return {...prev, [name]: value};
    })
};
  

  const handleInputBankChange = (e) => {
    const { name, value } = e.target;
    setSundryCreditor(prevState => ({
      ...prevState,
      sundryCreditorBankDetails: { ...prevState.sundryCreditorBankDetails, [name]: value },
    }));
  };        
  

  const handleInputForexChange = (e, index) => {
    const { name, value } = e.target;
  
    setSundryCreditor((prevState) => {
      let updatedForexSubForm = [...prevState.sundryCreditorForexDetails];
  
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
  
      // Propagate creditorDebit to referenceCreditorDebit for all rows
      if (name === 'creditOrDebit') {
        updatedForexSubForm = updatedForexSubForm.map((row) => ({
          ...row,
          referenceCreditorDebit: value, // Set referenceCreditorDebit from creditorDebit
        }));
      }
  
      return {
        ...prevState,
        sundryCreditorForexDetails: updatedForexSubForm,
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
      setSundryCreditor({
        ...sundryCreditor,
        forexApplicable: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'billWiseStatus') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryCreditor({
        ...sundryCreditor,
        billWiseStatus: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'provideBankDetails') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setSundryCreditor({
        ...sundryCreditor,
        provideBankDetails: value,
      });
    } else if (['c', 'd', 'C', 'D'].includes(key) && e.target.name === 'creditOrDebit') {
      e.preventDefault();
      const value = key.toLowerCase() === 'c' ? 'cr' : 'dr';
      setSundryCreditor(prevState => {
        const updatedForexSubForm = prevState.sundryCreditorForexDetails.map(row => ({
          ...row,
          referenceCreditOrDebit: value, // Update referenceCreditOrDebit in all rows
        }));
  
        return {
          ...prevState,
          creditOrDebit: value,
          sundryCreditorForexDetails: updatedForexSubForm,
        };
      });
    } else if (key === 'Escape') {
      e.preventDefault();
      navigate('/');
    }
  };  

  const handleKeyDownBank = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefsBank.current.length){
          inputRefsBank.current[nextField]?.focus();
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
          inputRefsBank.current[prevField]?.focus();
          inputRefsBank.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      setBankSubFormModal(false);
      setSundryCreditor(prev => ({ ...prev, provideBankDetails: 'no' }))
    }
  };

  // Function to add a new row to the forexSubForm with conditional referenceCreditOrDebit value
  const addNewRow = () => {
    setSundryCreditor((prevState) => {
      // Define the structure of a new row with conditional referenceCreditOrDebit based on creditOrDebit value
      const newRow = {
        forexDate: '',
        referenceName: '',
        dueDate: '',
        forexCurrencyType: prevState.sundryCreditorForexDetails[0]?.forexCurrencyType || '',
        forexCurrencySymbol: prevState.sundryCreditorForexDetails[0]?.forexCurrencySymbol || '',
        forexAmount: '',
        forexCreditOrDebit: 'cr',
        exchangeRate: '',
        outwardReferenceAmount: '',
        inwardReferenceAmount: '',
        // Set referenceCreditOrDebit based on the value of creditOrDebit
        referenceCreditOrDebit: 'cr',
      };
  
      return {
        ...prevState,
        sundryCreditorForexDetails: [...prevState.sundryCreditorForexDetails, newRow],
      };
    });
  };  

  const handleKeyDownForex = async (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstForexDateIndex = 0;

    // Helper function to parse amounts
    const parseAmount = (value) => parseFloat(value?.replace(/,/g, '').trim()) || 0;

    // Ensure both quantities are parsed correctly
    const openingBalance = parseAmount(sundryCreditor.openingBalance);
    const totalOutwardReferenceAmount = parseAmount(sundryCreditor.totalOutwardReferenceAmount);
    const totalInwardReferenceAmount = parseAmount(sundryCreditor.totalInwardReferenceAmount);

    if (key === 'Enter') {
        e.preventDefault(); // Prevent default Enter key behavior

        // Check if the current input is the first forexDate and ensure it has a value
        if (rowIndex === 0 && colIndex === firstForexDateIndex && e.target.value.trim() === '') {
            alert('The forexDate field must have a value before proceeding.');
            inputRefsForex.current[rowIndex * 10 + colIndex]?.focus(); // Refocus on the empty forexDate field
            return;
        }

        // Check if the current field is referenceCreditOrDebit and its value is not empty
        const isReferenceCreditOrDebit = e.target.name === 'referenceCreditOrDebit';
        const isLastRow = rowIndex === sundryCreditor.sundryCreditorForexDetails.length - 1;

        // Calculate whether the opening balance matches the total outward and inward reference amounts
        const canAddNewRowOutward = openingBalance > totalOutwardReferenceAmount;
        const canAddNewRowInward = openingBalance > totalInwardReferenceAmount;

        // Separate handling for outward and inward rows
        if (isReferenceCreditOrDebit && e.target.value.trim() !== '' && isLastRow) {
            if (canAddNewRowInward && canAddNewRowOutward) {
                addNewRow(); // Add the new row if both conditions are true
                setTimeout(() => {
                    inputRefsForex.current[(rowIndex + 1) * 10]?.focus(); // Focus on the first cell of the new row
                }, 0);
            } else {
                if (!canAddNewRowOutward) {
                    // Alert when outward balance has been reached
                    alert(`You've reached the opening balance amount of ${formattedBalance(openingBalance)}. No more outward rows can be added.`);
                    totalRefs.current[0]?.focus(); // Focus on the first total outward reference input
                }
                if (!canAddNewRowInward) {
                    // Alert when inward balance has been reached
                    alert(`You've reached the opening balance amount of ${formattedBalance(openingBalance)}. No more inward rows can be added.`);
                    totalRefs.current[3]?.focus(); // Focus on the fourth total inward reference input
                }
            }
            return;
        }

        // Move to the next cell if we're not adding a new row
        const nextCell = rowIndex * 10 + colIndex + 1;
        if (inputRefsForex.current[nextCell] && nextCell < inputRefsForex.current.length) {
            inputRefsForex.current[nextCell]?.focus();
        } else {
            // If the next cell is not available, move to the first total reference input
            totalRefs.current[0]?.focus();
        }
    } else if (key === 'Backspace') {
        // Move focus to the previous input if the current input is empty
        if (e.target.value.trim() !== '') {
            e.preventDefault();
            const prevCell = rowIndex * 10 + colIndex - 1;
            if (prevCell >= 0 && inputRefsForex.current[prevCell]) {
                inputRefsForex.current[prevCell]?.focus();
                inputRefsForex.current[prevCell].setSelectionRange(0, 0);
            }
        }
    } else if (key === 'Tab') {
        e.preventDefault();
        setCurrencyFocused(false);
    } else if (key === 'Escape') {
        setForexSubFormModal(false);
    }
};

// Helper function to format the balance for alert messages
const formattedBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};  

const handleKeyDownTotal = async (e, currentIndex) => {
  switch (e.key) {
    case 'Enter':
      // Move focus to the next input field if Enter is pressed
      if (e.target.name === 'totalOutwardReferenceAmount' || e.target.name === 'totalInwardReferenceAmount') {
        // Directly focus on the input at index 4
        totalRefs.current[4]?.focus();
      } else if (currentIndex < totalRefs.current.length - 1) {
        totalRefs.current[currentIndex + 1]?.focus();
      }

      // Check if specific fields are filled and handle submission logic
      if (e.target.name === 'totalReferenceAmountCreditOrDebit' && e.target.value.trim() !== '') {
        e.preventDefault(); // Prevent default form submission

        // Parse and sanitize the amounts
        const openingBalance = parseFloat(sundryCreditor.openingBalance?.replace(/,/g, '')) || 0;
        const totalOutwardReferenceAmount = parseFloat(sundryCreditor.totalOutwardReferenceAmount?.replace(/,/g, '')) || 0;
        const totalInwardReferenceAmount = parseFloat(sundryCreditor.totalInwardReferenceAmount?.replace(/,/g, '')) || 0;

        // Check if either totalOutwardReferenceAmount or totalInwardReferenceAmount matches openingBalance
        if ((openingBalance !== totalOutwardReferenceAmount) && (openingBalance !== totalInwardReferenceAmount)) {
          // Show alert
          alert(`The total outward or inward reference amount does not match the opening balance (${openingBalance.toFixed(2)}).`);

          // Set focus back to the first input in totalRefs after the alert
          if (totalRefs.current[0]) {
            totalRefs.current[0]?.focus();
          }
          return; // Stop the submission process and stay on the first input
        }

        // Proceed with form submission after confirmation
        const confirmSubmission = window.confirm('Do you want to proceed with submitting the form despite the mismatch?');
        if (!confirmSubmission) {
          if (totalRefs.current[0]) {
            totalRefs.current[0]?.focus();  // Refocus on the first input if user cancels
          }
          return;  // Do not submit if user cancels
        }

        // Submit the form and navigate after confirmation
        handleSubmit(e);
        setForexSubFormModal(false);
        return;
      }
      break;

    case 'Backspace':
      // Move focus to the previous input if Backspace is pressed and the current input is empty
      if (e.target.value.trim() === '' && currentIndex > 0) {
        totalRefs.current[currentIndex - 1]?.focus();
      }
      break;

    default:
      break;
  }
};  

  const handleSuggestionClick = (suggestion, index) => {
    setSundryCreditor(prevState => {
      // Clone the existing forexSubForm array
      const updatedForexSubForm = [...prevState.sundryCreditorForexDetails];

      // Update the selected forexCurrencyType and forexCurrencySymbol
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        forexCurrencyType: suggestion.forexCurrencyName,
        forexCurrencySymbol: suggestion.forexCurrencySymbol, // Assuming this field exists in the suggestion object
      };

      return { ...prevState, sundryCreditorForexDetails: updatedForexSubForm };
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
        setSundryCreditor(prevState => {
          const updatedForexSubForm = [...prevState.sundryCreditorForexDetails];

          // Update the specific row
          updatedForexSubForm[index] = {
            ...updatedForexSubForm[index],
            forexCurrencyType: selectedCurrency.forexCurrencyName,
            forexCurrencySymbol: selectedCurrency.forexCurrencySymbol, // Assuming this field exists in the
          };

          return { ...prevState, sundryCreditorForexDetails: updatedForexSubForm };
        });

        setCurrencyFocused(false);

        // Set focus to the forexAmount input
        inputRefsForex.current[4 + index * 10]?.focus();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if sundryCreditorName is filled
    if (!sundryCreditor.sundryCreditorName.trim()) {
      alert('Sundry Creditor Name is required!');
      // Optionally focus on the sundryCreditorName input field
      if (inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
      return;  // stop the form submission
    }
  
    // Parse and sanitize the amounts
    const openingBalance = parseFloat(sundryCreditor?.openingBalance?.replace(/,/g, '')) || 0;
    const totalOutwardReferenceAmount = parseFloat(sundryCreditor.totalOutwardReferenceAmount?.replace(/,/g, '')) || 0;
  
    // Check if totalOutwardReferenceAmount is equal to openingBalance
    if (openingBalance !== totalOutwardReferenceAmount) {
      const confirmSubmission = window.confirm(
        `The total outward reference amount (${totalOutwardReferenceAmount.toFixed(2)}) does not match the opening balance (${openingBalance.toFixed(2)}).\n\nAre you sure you want to proceed with submitting the form?`
      );
      
      if (!confirmSubmission) {
        return; // stop the form submission if the user clicks "Cancel"
      }
    }
  
    try {
      // Prepare data for backend
      const sanitizedData = {
        ...sundryCreditor,
        openingBalance,
        totalForexAmount: parseFloat(sundryCreditor.totalForexAmount?.replace(/,/g, '')) || 0,
        totalInwardReferenceAmount: parseFloat(sundryCreditor.totalInwardReferenceAmount?.replace(/,/g, '')) || 0,
        totalOutwardReferenceAmount,
        sundryCreditorBankDetails: {
          accountName: sundryCreditor.sundryCreditorBankDetails?.accountName,
          accountNumber: sundryCreditor.sundryCreditorBankDetails?.accountNumber,
          bankName: sundryCreditor.sundryCreditorBankDetails?.bankName,
          branchName: sundryCreditor.sundryCreditorBankDetails?.branchName,
          ifscCode: sundryCreditor.sundryCreditorBankDetails?.ifscCode,
          accountType: sundryCreditor.sundryCreditorBankDetails?.accountType,
          swiftCode: sundryCreditor.sundryCreditorBankDetails?.swiftCode,
        },
        sundryCreditorForexDetails: sundryCreditor.sundryCreditorForexDetails.filter(forex => forex.forexDate.trim() !== '')
          .map(forex => ({
            ...forex,
            forexCurrencySymbol: forex.forexCurrencySymbol,
            forexAmount: parseFloat(forex.forexAmount?.replace(/,/g, '')) || 0,
            exchangeRate: parseFloat(forex.exchangeRate?.replace(/,/g, '')) || 0,
            outwardReferenceAmount: parseFloat(forex.outwardReferenceAmount?.replace(/,/g, '')) || 0,
            inwardReferenceAmount: parseFloat(forex.inwardReferenceAmount?.replace(/,/g, '')) || 0,
          })),
      };
  
      // Send sanitized data to backend
      const response = await createSundryCreditorMaster(sanitizedData);
      console.log('Response:', response.data);
  
      // Reset form data
      setSundryCreditor({
        sundryCreditorName: '',
        underGroup: 'sundry creditors',
        forexApplicable: 'no',
        billWiseStatus: 'no',
        provideBankDetails: 'no',
        sundryCreditorBankDetails: {
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
        creditOrDebit: 'cr',
        totalForexAmount: '',
        totalForexAmountCreditOrDebit: 'cr',
        totalInwardReferenceAmount: '',
        totalOutwardReferenceAmount: '',
        totalReferenceAmountCreditOrDebit: 'cr',
        sundryCreditorForexDetails: [
          {
            forexDate: '',
            referenceName: '',
            dueDate: '',
            forexCurrencyType: '',
            forexCurrencySymbol: '',
            forexAmount: '',
            forexCreditOrDebit: 'cr',
            exchangeRate: '',
            outwardReferenceAmount: '',
            inwardReferenceAmount: '',
            referenceCreditOrDebit: 'cr',
          },
        ],
      });
  
      // Focus on the first input field
      if (inputRefs.current && inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
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
      setSundryCreditor(prev => ({ ...prev, provideBankDetails: 'yes' }))
    }
  };

  const numberFormat = (e, index) => {
    // Remove existing commas and parse the value
    const rawValue = e.target.value?.replace(/,/g, "");
    
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
  
      setSundryCreditor(prevState => {
        const updatedForexSubForm = [...prevState.sundryCreditorForexDetails];
        updatedForexSubForm[index] = {
          ...updatedForexSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: formattedDisplayDate // Save the formatted date (DD-MMM-YYYY format)
        };
        return {
          ...prevState,
          sundryCreditorForexDetails: updatedForexSubForm
        };
      });
    }
  };
  
  
  const handleFormattedDateChange = (e, index, fieldName) => {
    const dateValue = e.target.value;
    
    // Update the sundryCreditor state for the specific row and field (forexDate or dueDate)
    setSundryCreditor(prevState => {
      const updatedForexSubForm = [...prevState.sundryCreditorForexDetails];
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue
      };
      return {
        ...prevState,
        sundryCreditorForexDetails: updatedForexSubForm
      };
    });
  };
  
 // Function to calculate outward reference amount for a specific forex subform entry
const calculateOutwardReferenceAmountForForex = (index) => {
  setSundryCreditor((prevState) => {
    const updatedForexSubForm = [...prevState.sundryCreditorForexDetails];

    // Parse and clean forexAmount and exchangeRate inputs for the specific row
    const forexAmount = parseFloat(updatedForexSubForm[index].forexAmount?.replace(/,/g, '')) || 0;
    const exchangeRate = parseFloat(updatedForexSubForm[index].exchangeRate?.replace(/,/g, '')) || 0;

    // Calculate outwardReferenceAmount only if both forexAmount and exchangeRate are valid numbers
    if (forexAmount > 0 && exchangeRate > 0) {
      const outwardReferenceAmount = forexAmount * exchangeRate;

      // Format the outwardReferenceAmount with commas and 2 decimal places
      const formattedOutwardReferenceAmount = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(outwardReferenceAmount);

      // Update the specific row with the calculated outwardReferenceAmount
      updatedForexSubForm[index].outwardReferenceAmount = formattedOutwardReferenceAmount;
    } else {
      // If input is invalid, clear the outwardReferenceAmount field
      updatedForexSubForm[index].outwardReferenceAmount = '';
    }

    // Return the updated state with the modified forexSubForm
    return {
      ...prevState,
      sundryCreditorForexDetails: updatedForexSubForm,
    };
  });
};

// useEffect to calculate totals whenever forexSubForm changes
useEffect(() => {
  // Function to calculate totalForexAmount
  const totalForexAmount = sundryCreditor.sundryCreditorForexDetails.reduce((total, row) => {
    // Parse and clean forexAmount inputs
    const forexAmount = parseFloat(row.forexAmount?.replace(/,/g, '')) || 0;
    return total + forexAmount;
  }, 0);

  // Function to calculate totalOutwardReferenceAmount
  const totalOutwardReferenceAmount = sundryCreditor.sundryCreditorForexDetails.reduce((total, row) => {
    // Parse and clean outwardReferenceAmount inputs
    const outwardReferenceAmount = parseFloat(row.outwardReferenceAmount?.replace(/,/g, '')) || 0;
    return total + outwardReferenceAmount;
  }, 0);

  // Format the totals with commas and two decimal places
  const formattedTotalForexAmount = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalForexAmount);

  const formattedTotalOutwardReferenceAmount = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalOutwardReferenceAmount);

  // Update the sundryCreditor state with the calculated totals
  setSundryCreditor((prevState) => ({
    ...prevState,
    totalForexAmount: formattedTotalForexAmount,
    totalOutwardReferenceAmount: formattedTotalOutwardReferenceAmount,
  }));
  console.log(totalOutwardReferenceAmount);
  console.log(sundryCreditor.openingBalance);
}, [sundryCreditor.sundryCreditorForexDetails]);

useEffect(() => {
  // Function to calculate totalInwardReferenceAmount
  const totalInwardReferenceAmount = sundryCreditor.sundryCreditorForexDetails.reduce((total, row) => {
    const inwardReferenceAmount = parseFloat(row.inwardReferenceAmount?.replace(/,/g, '')) || 0;
    return total + inwardReferenceAmount;
  },0);

  // Format the totalInwardReferenceAmount with commas and two decimal places
  const formattedTotalInwardReferenceAmount = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(totalInwardReferenceAmount);

  // Update the sundryCreditor state with the calculated totalInwardReferenceAmount
  setSundryCreditor((prevState) => ({
    ...prevState,
    totalInwardReferenceAmount: formattedTotalInwardReferenceAmount,
  }));
  console.log(totalInwardReferenceAmount);
},[sundryCreditor.sundryCreditorForexDetails]);


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
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                value={sundryCreditor.underGroup}
                onChange={handleInputChange}
                className="w-[120px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                value={sundryCreditor.forexApplicable}
                ref={input => (inputRefs.current[1] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 1)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                value={sundryCreditor.billWiseStatus}
                name="billWiseStatus"
                ref={input => (inputRefs.current[2] = input)}
                onChange={handleInputChange}
                onKeyDown={e => handleKeyDown(e, 2)}
                className="w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                ref={input => (inputRefs.current[3] = input)}
                onChange={handleInputChange}
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
                    value={sundryCreditor.sundryCreditorBankDetails.accountName}
                    ref={input => (inputRefsBank.current[0] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 0)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.accountNumber}
                    ref={input => (inputRefsBank.current[1] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 1)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.bankName}
                    ref={input => (inputRefsBank.current[2] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 2)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.branchName}
                    ref={input => (inputRefsBank.current[3] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 3)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.ifscCode}
                    ref={input => (inputRefsBank.current[4] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 4)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.accountType}
                    ref={input => (inputRefsBank.current[5] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 5)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                    value={sundryCreditor.sundryCreditorBankDetails.swiftCode}
                    ref={input => (inputRefsBank.current[6] = input)}
                    onChange={handleInputBankChange}
                    onKeyDown={e => handleKeyDownBank(e, 6)}
                    className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              value={sundryCreditor.addressOne}
              ref={input => (inputRefs.current[4] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 4)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[5] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 5)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[6] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 6)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[7] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 7)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[8] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 8)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[9] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 9)}
              className="w-[350px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[10] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 10)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[11] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 11)}
              className="w-[250px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[12] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 12)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[13] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 13)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[14] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 14)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[15] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 15)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[16] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 16)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[17] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 17)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[18] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 18)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[19] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 19)}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              className="w-[80px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
            )<span className="ml-3">:</span>
            <span className="ml-2">₹</span>
            <input
              type="text"
              id="openingBalance"
              name="openingBalance"
              value={sundryCreditor.openingBalance}
              ref={input => (inputRefs.current[20] = input)}
              onChange={handleInputChange}
              onBlur={numberFormat}
              onKeyDown={e => handleKeyDown(e, 20)}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
            <input
              type="text"
              id="creditOrDebit"
              name="creditOrDebit"
              value={sundryCreditor.creditOrDebit}
              ref={input => (inputRefs.current[21] = input)}
              onKeyDown={e => handleKeyDown(e, 21)}
              onChange={handleInputChange}
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
                      className="w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                      value={sundryCreditor.openingBalance}
                      className="w-[100px] h-5 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      id="uptoCreditOrDebit"
                      name="uptoCreditOrDebit"
                      value={sundryCreditor.creditOrDebit}
                      className="w-[50px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                  <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className={sundryCreditor.forexApplicable === 'yes' ? 'w-[100px]' : 'w-[10%]'}>Date</th>
                        <th className={sundryCreditor.forexApplicable === 'yes' ? 'w-[180px]' : 'w-[20%] pr-5'}>Bill Ref. Name</th>
                        <th className={sundryCreditor.forexApplicable === 'yes' ? 'w-[100px]' : 'w-[10%]'}>Due Date</th>
                        {sundryCreditor.forexApplicable !== 'no' && (
                          <>
                            <th className="w-[140px]">Forex Currency Type</th>
                            <th className="w-[90px]">Forex Amount</th>
                            <th className="w-[50px]">Cr/Dr</th>
                            <th className="w-[90px]">Exchange Rate</th>
                            <th className="w-[120px]">Amount</th>
                          </>
                        )}
                        {sundryCreditor.forexApplicable !== 'yes' && (
                          <>
                            <th className="w-[150px] pr-28">Amount</th>
                          </>
                        )}
                        <th className={sundryCreditor.forexApplicable === 'yes' ? 'w-[10px]' : 'w-[5%]'}>Cr/Dr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sundryCreditor.sundryCreditorForexDetails.map((row, index) => (
                        <tr key={index} className='leading-4'>
                          {/* Forex Date Input */}
                          <td>
                            <input
                              type="text"
                              id="forexDate"
                              name="forexDate"
                              value={row.formattedForexDate}
                              onChange={(e) => handleFormattedDateChange(e, index, 'forexDate')}
                              ref={input => (inputRefsForex.current[0 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 0)}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              ref={input => (inputRefsForex.current[1 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 1 )}
                              className="w-[180px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              ref={input => (inputRefsForex.current[2 + index * 10] = input)}
                              onKeyDown={e => {
                                handleKeyDownForex(e, index, 2)
                                if(e.key === 'Enter' && sundryCreditor.forexApplicable === 'no'){
                                  inputRefsForex.current[index * 10 + 8]?.focus()
                                }
                              }}
                              onBlur={(e) => {dateConvert(e, index)}}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
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
                                  className="w-[120px] h-5 pl-1 font-medium text-[12px] uppercase text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                                <span className=''>{row.forexCurrencySymbol}</span>
                                <input
                                  type="text"
                                  id="forexAmount"
                                  name="forexAmount"
                                  value={row.forexAmount}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[4 + index * 10] = input)}
                                  onKeyDown={e => {handleKeyDownForex(e, index, 4); calculateOutwardReferenceAmountForForex(index);}}
                                  onBlur={(e) => {numberFormat(e, index)}} 
                                  className="w-[70px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off"
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
                                  className="w-[30px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off"
                                />
                              </td>

                              {/* Exchange Rate Input */}
                              <td>
                                <span className=''>₹</span>
                                <input
                                  type="text"
                                  id="exchangeRate"
                                  name="exchangeRate"
                                  value={row.exchangeRate}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[6 + index * 10] = input)}
                                  onKeyDown={e => {handleKeyDownForex(e, index, 6); calculateOutwardReferenceAmountForForex(index);}}
                                  onBlur={(e) => {numberFormat(e, index)}}
                                  className="w-[50px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off"
                                />
                              </td>

                              {/* Reference Amount Input */}
                              <td>
                                <span className=''>₹</span>
                                <input
                                  type="text"
                                  id="outwardReferenceAmount"
                                  name="outwardReferenceAmount"
                                  value={row.outwardReferenceAmount}
                                  onChange={e => handleInputForexChange(e, index)}
                                  ref={input => (inputRefsForex.current[7 + index * 10] = input)}
                                  onKeyDown={e => 
                                    {handleKeyDownForex(e, index, 7)
                                    if(e.key === 'Enter'){
                                      inputRefsForex.current[index * 10 + 9]?.focus();
                                    }
                                  }}
                                  onBlur={(e) => {numberFormat(e, index)}}
                                  className="w-[100px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                  autoComplete="off"
                                />
                              </td>
                            </>
                          )}

                          {/* Conditional Rendering of Forex Fields */}
                          {sundryCreditor.forexApplicable !== 'yes' && (
                            <>
                              {/* Inward Amount Input */}
                              <td>
                                <span className="ml-48">₹</span>
                                <input
                                  type="text"
                                  id="inwardReferenceAmount"
                                  name="inwardReferenceAmount"
                                  value={row.inwardReferenceAmount}
                                  onChange={(e) => handleInputForexChange(e, index)}
                                  ref={(input) => (inputRefsForex.current[8 + index * 10] = input)}
                                  onKeyDown={(e) => handleKeyDownForex(e, index, 8)}
                                  onBlur={(e) => {
                                    numberFormat(e, index);
                                  }}
                                  className="w-[100px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              ref={input => (inputRefsForex.current[9 + index * 10] = input)}
                              onKeyDown={e => handleKeyDownForex(e, index, 9)}
                              className="w-[30px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-4">
                    {sundryCreditor.forexApplicable === 'yes' && (
                      <div className="w-[350px] h-[20px] flex absolute left-[680px] top-[500px] border border-t-black border-transparent">
                        <label htmlFor="totalForexAmount" className="text-[12px] mr-1 mt-1">
                          Total
                        </label>
                        <span className="text-sm mt-1">
                          ({sundryCreditor.sundryCreditorForexDetails[0].forexCurrencySymbol || ''})
                        </span>
                        <span className="absolute top-0 left-[50px] bottom-0">:</span>
                        <input
                          type="text"
                          id="totalForexAmount"
                          name="totalForexAmount"
                          value={sundryCreditor.totalForexAmount}
                          onBlur={(e) => numberFormat(e, 0)}
                          ref={(input) => (totalRefs.current[0] = input)}
                          onKeyDown={e => handleKeyDownTotal(e, 0)}
                          className="w-[60px] h-5 pl-1 mt-1 ml-3 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                          autoComplete="off"
                          readOnly
                        />
                        <input
                          type="text"
                          id="totalForexAmountCreditOrDebit"
                          name="totalForexAmountCreditOrDebit"
                          value={sundryCreditor.creditOrDebit}
                          onChange={handleInputChange}
                          ref={input => (totalRefs.current[1] = input)}
                          onKeyDown={e => handleKeyDownTotal(e, 1)}
                          className="w-[30px] h-5 pl-1 mt-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                          autoComplete="off"
                          readOnly
                        />
                      </div>
                    )}
                    <div className="w-[167px] flex absolute left-[960px] top-[500px] border border-t-black border-transparent">
                      <label htmlFor="totalOutwardReferenceAmount" className="text-[12px] mr-1 mt-1">
                        Total
                      </label>
                      <span className="text-sm mt-1">(₹)</span>
                      <span className="absolute left-[50px] bottom-0">:</span>
                      {(sundryCreditor.forexApplicable === 'yes') && (
                        <input
                        type="text"
                        id="totalOutwardReferenceAmount"
                        name="totalOutwardReferenceAmount"
                        value={sundryCreditor.totalOutwardReferenceAmount}
                        ref={(input) => (totalRefs.current[2] = input)}
                        onKeyDown={e => handleKeyDownTotal(e, 2)}
                        onBlur={(e) => numberFormat(e, 1)}
                        className="w-[80px] h-5 pl-1 mt-1 ml-4 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                        readOnly
                      />
                      )}
                      {(sundryCreditor.forexApplicable === 'no') && (
                        <input
                          type="text"
                          id="totalInwardReferenceAmount"
                          name="totalInwardReferenceAmount"
                          value={sundryCreditor.totalInwardReferenceAmount}
                          onBlur={(e) => numberFormat(e, 2)}
                          ref={(input) => (totalRefs.current[3] = input)}
                          onKeyDown={e => handleKeyDownTotal(e, 3)}
                          className="w-[80px] h-5 mt-1 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                          autoComplete="off"
                          readOnly
                        />
                      )}
                      <input
                        type="text"
                        id="totalReferenceAmountCreditOrDebit"
                        name="totalReferenceAmountCreditOrDebit"
                        value={sundryCreditor.totalReferenceAmountCreditOrDebit}
                        ref={(input) => (totalRefs.current[4] = input)}
                        onKeyDown={e => handleKeyDownTotal(e, 4)}
                        className="w-[30px] h-5 pl-1 ml-2 mt-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                        readOnly
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
