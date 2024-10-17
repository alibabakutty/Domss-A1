import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificStockItemName } from '../services/MasterService';

const StockItemDisplay = () => {

  const { datas } = useParams();
  const [stockItem, setStockItem] = useState({
    stockItemCode: '',
    stockItemName: '',
    under: '',
    category: '',
    units: '',
    standardSellingPrice: '',
    standardSellingPriceSubForm: [
      {
        sellingPriceDate: '',
        sellingPriceRate: '',
        sellingPricePercentage: '',
        sellingPriceNetRate: '',
        sellingPriceStatus: '',
      },
    ],
    standardSellingCost: '',
    standardSellingCostSubForm: [
      {
        sellingCostDate: '',
        sellingCostRate: '',
        sellingCostPercentage: '',
        sellingCostNetRate: '',
        sellingCostStatus: '',
      },
    ],
    gstApplicable: '',
    gstStockItemSubForm: [
      {
        gstDate: '',
        hsnCode: '',
        gstPercentage: '',
        gstStatus: '',
      },
    ],
    vatApplicable: '',
    vatStockItemSubForm: [
      {
        vatDate: '',
        vatCode: '',
        vatPercentage: '',
        vatStatus: '',
      },
    ],
    openingBalanceQuantity: '',
    godownSubForm: [
      {
        godownName: '',
        batchName: '',
        quantity: '',
        rateAmount: '',
        perUnit: '',
        netAmount: '',
      },
    ],
    totalQuantity: '',
    totalNetAmount: '',
    openingBalanceRate: '',
    openingBalanceUnit: '',
    openingBalanceValue: '',
  });

  const [standardSellingPriceModal, setStandardSellingPriceModal] = useState(false);
  const [standardSellingCostModal, setStandardSellingCostModal] = useState(false);
  const [gstStockItemSubFormModal, setGstStockItemSubFormModal] = useState(false);
  const [vatStockItemSubFormModal, setVatStockItemSubFormModal] = useState(false);
  const [godownSubFormModal, setGodownSubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const inputSellingPriceRef = useRef([]);
  const inputSellingCostRef = useRef([]);
  const inputGstRef = useRef([]);
  const inputVatRef = useRef([]);
  const inputGodownRef = useRef([]);
  const prevSellingPriceModal = useRef(false);
  const prevSellingCostModal = useRef(false);
  const prevGstModal = useRef(false);
  const prevVatModal = useRef(false);
  const prevGodownModal = useRef(false);
  const totalRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {

    // Utility function to format dates from YYYY-MM-DD to DD-MMM-YYYY
    const formatDateForDisplay = (date) => {
      if (!date) return '';
    
      const [year, month, day] = date.split('-'); // Change to '-' for typical date format
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      return `${day.padStart(2, '0')}-${monthNames[parseInt(month, 10) - 1]}-${year}`;
    };

    // Utility function to format numerical values using Indian Number Format
    const numberFormatValue = (value) => {
      if (!value || isNaN(value)) return value; // Handle invalid values
      return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };

    const percentageFormatForDisplay = (value) => {
      if (value === null || value === undefined) return ''; // Check for null or undefined
    
      // Convert value to a number
      const rawValue = Number(value);
    
      // Check if the value is a valid number
      if (isNaN(rawValue)) return '';
    
      // Format the number as percentage with two decimal places
      return `${rawValue}%`;
    };
    
    // Function to format opening balance quantity
    const unitFormatFetch = (value, unit) => {
      if (value === null || value === undefined) return '';
      const numericValue = Number(value);
      if (isNaN(numericValue)) return ''; // Return empty string if value is not a number
      return `${numericValue} ${unit || ''}`; // Use unit passed in or empty string if not available
    };

    const loadStockItems = async () => {
        try {
          const result = await getSpecificStockItemName(datas);
          console.log('API-Response', result.data);

          const {
            stockItemCode = '',
            stockItemName = '',
            under = '',
            category = '',
            units = '',
            standardSellingPrice = '',
            standardSellingPriceSubForm,
            standardSellingCost = '',
            standardSellingCostSubForm,
            gstApplicable = '',
            gstStockItemSubForm,
            vatApplicable = '',
            vatStockItemSubForm,
            openingBalanceQuantity = '',
            godownSubForm,
            totalQuantity = '',
            totalNetAmount = '',
            openingBalanceRate = '',
            openingBalanceUnit = '',
            openingBalanceValue = '',
          } = result.data;

          let fetchedSellingPriceSubForm = [ 
            {
              sellingPriceDate: '',
              sellingPriceRate: '',
              sellingPricePercentage: '',
              sellingPriceNetRate: '',
              sellingPriceStatus: '',
            }
          ];

          let fetchedSellingCostSubForm = [
            {
              sellingCostDate: '',
              sellingCostRate: '',
              sellingCostPercentage: '',
              sellingCostNetRate: '',
              sellingCostStatus: '',
            }
          ];

          let fetchedGstStockItemSubForm = [
            {
              gstDate: '',
              hsnCode: '',
              gstPercentage: '',
              gstStatus: '',
            }
          ];

          let fetchedVatStockItemSubForm = [
            {
              vatDate: '',
              vatCode: '',
              vatPercentage: '',
              vatStatus: '',
            }
          ];

          let fetchedGodownSubForm = [
            {
              godownName: '',
              batchName: '',
              quantity: '',
              rateAmount: '',
              perUnit: '',
              netAmount: '',
            }
          ]

          if (Array.isArray(standardSellingPriceSubForm) && standardSellingPriceSubForm.length > 0){
            fetchedSellingPriceSubForm = standardSellingPriceSubForm.map((price) => ({
              sellingPriceDate: price.sellingPriceDate || '',
              formattedSellingPriceDate: formatDateForDisplay(price.sellingPriceDate),
              sellingPriceRate: numberFormatValue(price.sellingPriceRate),
              sellingPricePercentage: percentageFormatForDisplay(price.sellingPricePercentage),
              sellingPriceNetRate: numberFormatValue(price.sellingPriceNetRate),
              sellingPriceStatus: price.sellingPriceStatus || '',
            }));
          }

          if (Array.isArray(standardSellingCostSubForm) && standardSellingCostSubForm.length > 0){
            fetchedSellingCostSubForm = standardSellingCostSubForm.map((cost) => ({
              sellingCostDate: cost.sellingCostDate || '',
              formattedSellingCostDate: formatDateForDisplay(cost.sellingCostDate),
              sellingCostRate: numberFormatValue(cost.sellingCostRate),
              sellingCostPercentage: percentageFormatForDisplay(cost.sellingCostPercentage),
              sellingCostNetRate: numberFormatValue(cost.sellingCostNetRate),
              sellingCostStatus: cost.sellingCostStatus || '',
            }));
          }

          if (Array.isArray(gstStockItemSubForm) && gstStockItemSubForm.length > 0){
            fetchedGstStockItemSubForm = gstStockItemSubForm.map((gst) => ({
              gstDate: gst.gstDate || '',
              formattedGstDate: formatDateForDisplay(gst.gstDate),
              hsnCode: gst.hsnCode || '',
              gstPercentage: percentageFormatForDisplay(gst.gstPercentage),
              gstStatus: gst.gstStatus || '',
            }));
          }

          if (Array.isArray(vatStockItemSubForm) && vatStockItemSubForm.length > 0){
            fetchedVatStockItemSubForm = vatStockItemSubForm.map((vat) => ({
              vatDate: vat.vatDate || '',
              formattedVatDate: formatDateForDisplay(vat.vatDate),
              vatCode: vat.vatCode || '',
              vatPercentage: percentageFormatForDisplay(vat.vatPercentage),
              vatStatus: vat.vatStatus || '',
            }));
          }

          if (Array.isArray(godownSubForm) && godownSubForm.length > 0){
            fetchedGodownSubForm = godownSubForm.map((godown) => ({
              godownName: godown.godownName || '',
              batchName: godown.batchName || '',
              quantity: godown.quantity || '',
              rateAmount: numberFormatValue(godown.rateAmount),
              perUnit: godown.perUnit || '',
              netAmount: numberFormatValue(godown.netAmount),
            }));
          }

          // Set the state with the updated values
          setStockItem({
            stockItemCode,
            stockItemName,
            under,
            category,
            units,
            standardSellingPrice,
            standardSellingPriceSubForm: fetchedSellingPriceSubForm,
            standardSellingCost,
            standardSellingCostSubForm: fetchedSellingCostSubForm,
            gstApplicable,
            gstStockItemSubForm: fetchedGstStockItemSubForm,
            vatApplicable,
            vatStockItemSubForm: fetchedVatStockItemSubForm,
            openingBalanceQuantity: unitFormatFetch(openingBalanceQuantity, units),
            godownSubForm: fetchedGodownSubForm,
            totalQuantity,
            totalNetAmount: numberFormatValue(totalNetAmount),
            openingBalanceRate: numberFormatValue(openingBalanceRate),
            openingBalanceUnit,
            openingBalanceValue: numberFormatValue(openingBalanceValue),
          });     
        } catch (error) {
            console.error(error);
        }
    }
    loadStockItems();
  }, [datas]);

  useEffect(() => {
    // Utility function to find the index of the input based on its name and focus on it
    const focusInputByName = (inputName) => {
      const inputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === inputName
      );
      if (inputIndex !== -1 && inputRefs.current[inputIndex]) {
        inputRefs.current[inputIndex].focus();
      }
    };
  
    // Set initial focus if the input exists
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  
    // Handle focus when specific modals open
    if (standardSellingPriceModal && inputSellingPriceRef.current[0]) {
      inputSellingPriceRef.current[0].focus();
    } else if (standardSellingCostModal && inputSellingCostRef.current[0]) {
      inputSellingCostRef.current[0].focus();
    } else if (gstStockItemSubFormModal && inputGstRef.current[0]){
      inputGstRef.current[0].focus();
    } else if (vatStockItemSubFormModal && inputVatRef.current[0]){
      inputVatRef.current[0].focus();
    } else if (godownSubFormModal && inputGodownRef.current[0]) {
      inputGodownRef.current[0].focus();
    }
  
    // Handle focus when specific modals close
    if (prevSellingPriceModal.current && !standardSellingPriceModal) {
      focusInputByName('standardSellingCost');
    }
  
    if (prevSellingCostModal.current && !standardSellingCostModal) {
      focusInputByName('gstApplicable');
    }

    if (prevGstModal.current && !gstStockItemSubFormModal){
      focusInputByName('openingBalanceQuantity');
    }

    if (prevVatModal.current && !vatStockItemSubFormModal){
      focusInputByName('openingBalanceQuantity');
    }
  
    if (prevGodownModal.current && !godownSubFormModal) {
      focusInputByName('openingBalanceRate');
    }
  
    // Update the previous modal state values
    prevSellingPriceModal.current = standardSellingPriceModal;
    prevSellingCostModal.current = standardSellingCostModal;
    prevGstModal.current = gstStockItemSubFormModal;
    prevVatModal.current = vatStockItemSubFormModal;
    prevGodownModal.current = godownSubFormModal;
  }, [standardSellingPriceModal, standardSellingCostModal, gstStockItemSubFormModal, vatStockItemSubFormModal, godownSubFormModal]);  

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefs.current.length) {
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
        } else if (e.target.name === 'openingBalanceValue') {
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            navigate(-1);
          } else {
            e.preventDefault();
          }
        }

        // Specific handling for 'standardsellingprice' input
        if (e.target.name === 'standardSellingPrice' && e.target.value.trim() === 'yes') {
          setStandardSellingPriceModal(true);
        } else if (e.target.name === 'standardSellingCost' && e.target.value.trim() === 'yes') {
          setStandardSellingCostModal(true);
        } else if (e.target.name === 'gstApplicable' && e.target.value.trim() === 'yes'){
          setGstStockItemSubFormModal(true);
        } else if (e.target.name === 'vatApplicable' && e.target.value.trim() === 'yes'){
          setVatStockItemSubFormModal(true);
        } else if (e.target.name === 'openingBalanceQuantity' && e.target.value.trim() !== '') {
          setGodownSubFormModal(true);
        }
      }
    } else if (key === 'Backspace') {
      if (e.target.value.trim() !== '' && index > 0) {
        e.preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'standardSellingPrice') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        standardSellingPrice: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'standardSellingCost') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        standardSellingCost: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'gstApplicable'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        gstApplicable: value,
      })
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'vatApplicable'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        vatApplicable: value,
      })
    } else if (key === 'Escape') {
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleKeyDownSellingPrice = (e, rowIndex, colIndex) => {
    const key = e.key;
    const inputName = e.target.name;
  
    // Find all status inputs
    const statusInputs = inputSellingPriceRef.current.filter(input => input?.name === 'sellingPriceStatus');
    const isLastStatusInput = statusInputs.length - 1 === rowIndex; // Check if it's the last status input
  
    const totalColumns = 5; // Number of columns in the subform
    const nextCell = rowIndex * totalColumns + colIndex + 1;
    const prevCell = rowIndex * totalColumns + colIndex - 1;
    const nextRowCell = (rowIndex + 1) * totalColumns + colIndex;
    const prevRowCell = (rowIndex - 1) * totalColumns + colIndex;
  
    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
  
      // If the input is 'sellingPriceStatus' and not empty
      if (inputName === 'sellingPriceStatus' && e.target.value.trim() !== '') {
        // Only show the confirmation on the last 'sellingPriceStatus' input
        if (isLastStatusInput) {
          const confirmationClose = window.confirm('Do you want to close this subform?');
          if (confirmationClose) {
            setStandardSellingPriceModal(false);
            setStockItem((prev) => ({ ...prev, standardSellingPrice: 'no' }));
            inputRefs.current[6]?.focus();  // Focus outside the subform after closing
            return;
          } else {
            inputSellingPriceRef.current[rowIndex * totalColumns + colIndex]?.focus(); // Refocus if user chooses not to close
            return;
          }
        }
      }
  
      // Move to the next cell
      if (inputSellingPriceRef.current[nextCell]) {
        inputSellingPriceRef.current[nextCell].focus(); // Focus on the next input
      }
    } 
    else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        if (inputSellingPriceRef.current[prevCell] && prevCell >= 0) {
          inputSellingPriceRef.current[prevCell]?.focus();
          inputSellingPriceRef.current[prevCell]?.setSelectionRange(0, 0); // Set cursor to the beginning
        }
      }
    } 
    else if (key === 'ArrowRight') {
      // Move focus to the next input
      e.preventDefault();
      if (inputSellingPriceRef.current[nextCell]) {
        inputSellingPriceRef.current[nextCell]?.focus();
      }
    } 
    else if (key === 'ArrowLeft') {
      // Move focus to the previous input
      e.preventDefault();
      if (inputSellingPriceRef.current[prevCell] && prevCell >= 0) {
        inputSellingPriceRef.current[prevCell]?.focus();
      }
    } 
    else if (key === 'ArrowDown') {
      // Move to the input directly below in the next row
      e.preventDefault();
      if (inputSellingPriceRef.current[nextRowCell]) {
        inputSellingPriceRef.current[nextRowCell]?.focus();
      }
    } 
    else if (key === 'ArrowUp') {
      // Move to the input directly above in the previous row
      e.preventDefault();
      if (inputSellingPriceRef.current[prevRowCell] && prevRowCell >= 0) {
        inputSellingPriceRef.current[prevRowCell]?.focus();
      }
    } 
    else if (key === 'Escape') {
      // Close the modal on Escape key
      setStandardSellingPriceModal(false);
      setStockItem((prev) => ({ ...prev, standardSellingPrice: 'no' }));
    }
  };      

  const handleKeyDownSellingCost = (e, rowIndex, colIndex) => {
    const key = e.key;
    const inputName = e.target.name;
  
    // Find all 'sellingCostStatus' inputs
    const statusInputs = inputSellingCostRef.current.filter(input => input?.name === 'sellingCostStatus');
    const isLastStatusInput = statusInputs.length - 1 === rowIndex; // Check if it's the last 'sellingCostStatus' input
  
    const totalColumns = 5; // Number of columns in the subform
    const nextCell = rowIndex * totalColumns + colIndex + 1;
    const prevCell = rowIndex * totalColumns + colIndex - 1;
    const nextRowCell = (rowIndex + 1) * totalColumns + colIndex;
    const prevRowCell = (rowIndex - 1) * totalColumns + colIndex;
  
    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior
  
      // If the input is 'sellingCostStatus' and not empty
      if (inputName === 'sellingCostStatus' && e.target.value.trim() !== '') {
        // Show confirmation only on the last 'sellingCostStatus' input
        if (isLastStatusInput) {
          const confirmationClose = window.confirm('Do you want to close this subform?');
          if (confirmationClose) {
            setStandardSellingCostModal(false);
            setStockItem((prev) => ({ ...prev, standardSellingCost: 'no' }));
            inputRefs.current[7]?.focus();  // Focus outside the subform after closing
            return;
          } else {
            inputSellingCostRef.current[rowIndex * totalColumns + colIndex]?.focus(); // Refocus if user chooses not to close
            return;
          }
        }
      }
  
      // Move to the next cell
      if (inputSellingCostRef.current[nextCell]) {
        inputSellingCostRef.current[nextCell]?.focus(); // Focus on the next input
      }
    } 
    else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        if (inputSellingCostRef.current[prevCell] && prevCell >= 0) {
          inputSellingCostRef.current[prevCell]?.focus();
          inputSellingCostRef.current[prevCell]?.setSelectionRange(0, 0); // Set cursor to the beginning
        }
      }
    } 
    else if (key === 'ArrowRight') {
      // Move focus to the next input
      e.preventDefault();
      if (inputSellingCostRef.current[nextCell]) {
        inputSellingCostRef.current[nextCell]?.focus();
      }
    } 
    else if (key === 'ArrowLeft') {
      // Move focus to the previous input
      e.preventDefault();
      if (inputSellingCostRef.current[prevCell] && prevCell >= 0) {
        inputSellingCostRef.current[prevCell]?.focus();
      }
    } 
    else if (key === 'ArrowDown') {
      // Move to the input directly below in the next row
      e.preventDefault();
      if (inputSellingCostRef.current[nextRowCell]) {
        inputSellingCostRef.current[nextRowCell]?.focus();
      }
    } 
    else if (key === 'ArrowUp') {
      // Move to the input directly above in the previous row
      e.preventDefault();
      if (inputSellingCostRef.current[prevRowCell] && prevRowCell >= 0) {
        inputSellingCostRef.current[prevRowCell]?.focus();
      }
    } 
    else if (key === 'Escape') {
      // Close the modal on Escape key
      setStandardSellingCostModal(false);
      setStockItem((prev) => ({ ...prev, standardSellingCost: 'no' }));
    }
  };
  
  const handleKeyDownGstSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;
    const inputName = e.target.name;

    const statsInputs = inputGstRef.current.filter(input => input?.name === 'gstStatus');
    const isLastStatusInput = statsInputs.length - 1 === rowIndex;

    const totalColumns = 4;
    const nextCell = rowIndex * totalColumns + colIndex + 1;
    const prevCell = rowIndex * totalColumns + colIndex - 1;
    const nextRowCell = (rowIndex + 1) * totalColumns + colIndex;
    const prevRowCell = (rowIndex - 1) * totalColumns + colIndex;

    if (key === 'Enter') {
      e.preventDefault();

      if (inputName === 'gstStatus' && e.target.value.trim() !== ''){
        if (isLastStatusInput){
          const confirmationClose = window.confirm('Do you want to close this submit?');
          if (confirmationClose) {
            setGstStockItemSubFormModal(false);
            setStockItem((prev) => ({ ...prev, gstApplicable: 'no' }));
            inputRefs.current[9]?.focus();
            return;
          } else {
            inputGstRef.current[rowIndex * totalColumns + colIndex]?.focus();   // Refocus if user chooses not to close
            return;
          }
        }
      }

      // Move to the next input field
      if (inputGstRef.current[nextCell]) {
        inputGstRef.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous field if the current field is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        if (inputGstRef.current[prevCell] && prevCell >= 0){
          inputGstRef.current[prevCell]?.focus();
          inputGstRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'ArrowRight'){
      // Move focus to the next field
      e.preventDefault();
      if (inputGstRef.current[nextCell]){
        inputGstRef.current[nextCell]?.focus();
      }
    } else if (key === 'ArrowLeft'){
      e.preventDefault();
      if (inputGstRef.current[prevCell] && prevCell >= 0){
        inputGstRef.current[prevCell]?.focus();
      }
    } else if (key === 'ArrowDown'){
      e.preventDefault();
      if (inputGstRef.current[nextRowCell]){
        inputGstRef.current[nextRowCell]?.focus();
      }
    } else if (key === 'ArrowUp'){
      e.preventDefault();
      if (inputGstRef.current[prevRowCell] && prevRowCell >= 0){
        inputGstRef.current[prevRowCell]?.focus();
      }
    } else if (key === 'Escape') {
      // Close the subform modal on Escape key press
      setGstStockItemSubFormModal(false);
      setStockItem(prev => ({ ...prev, gstApplicable: 'no' }));
    }
  };

  const handleKeyDownVatSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;
    const inputName = e.target.name;

    const statsInputs = inputVatRef.current.filter(input => input?.name === 'vatStatus');
    const isLastStatusInput = statsInputs.length - 1 === rowIndex;

    const totalColumns = 4; // Adjust for the number of columns in the Vat form
    const nextCell = rowIndex * totalColumns + colIndex + 1;
    const prevCell = rowIndex * totalColumns + colIndex - 1;
    const nextRowCell = (rowIndex + 1) * totalColumns + colIndex;
    const prevRowCell = (rowIndex - 1) * totalColumns + colIndex;

    if (key === 'Enter') {
      e.preventDefault();

      if (inputName === 'vatStatus' && (e.target.value.trim() !== '' || e.target.value.trim() === '')) {
        if (isLastStatusInput) {
          const confirmationClose = window.confirm('Do you want to close this subform?');
          if (confirmationClose) {
            setVatStockItemSubFormModal(false);
            setStockItem(prev => ({ ...prev, vatApplicable: 'no' }));
            inputRefs.current[10]?.focus(); // Focus on the next input after closing
            return;
          } else {
            inputVatRef.current[rowIndex * totalColumns + colIndex]?.focus();   // Refocus if user chooses not to close
            return;
          }
        }
      }

      // Move to the next input field
      if (inputVatRef.current[nextCell]) {
        inputVatRef.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous field if the current field is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        if (inputVatRef.current[prevCell] && prevCell >= 0) {
          inputVatRef.current[prevCell]?.focus();
          inputVatRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'ArrowRight') {
      // Move focus to the next field
      e.preventDefault();
      if (inputVatRef.current[nextCell]) {
        inputVatRef.current[nextCell]?.focus();
      }
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      if (inputVatRef.current[prevCell] && prevCell >= 0) {
        inputVatRef.current[prevCell]?.focus();
      }
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      if (inputVatRef.current[nextRowCell]) {
        inputVatRef.current[nextRowCell]?.focus();
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      if (inputVatRef.current[prevRowCell] && prevRowCell >= 0) {
        inputVatRef.current[prevRowCell]?.focus();
      }
    } else if (key === 'Escape') {
      // Close the subform modal on Escape key press
      setVatStockItemSubFormModal(false);
      setStockItem(prev => ({ ...prev, vatApplicable: 'no' }));
    }
  };

  // Handle key navigation for the godownSubForm inputs
  const handleKeyDownGodownSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;
    const totalColumns = 6; // Adjust this based on the actual number of columns
    const currentCellIndex = rowIndex * totalColumns + colIndex;

    if (key === 'Enter' || key === 'ArrowRight') {
      e.preventDefault();
      const nextCellIndex = currentCellIndex + 1;
      if (inputGodownRef.current[nextCellIndex]) {
        inputGodownRef.current[nextCellIndex].focus();
      } else {
        totalRefs.current[0]?.focus(); // Focus total if out of bounds
      }
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      const prevCellIndex = currentCellIndex - 1;
      if (inputGodownRef.current[prevCellIndex] && prevCellIndex >= 0) {
        inputGodownRef.current[prevCellIndex].focus();
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      const prevRowCellIndex = currentCellIndex - totalColumns;
      if (inputGodownRef.current[prevRowCellIndex] && prevRowCellIndex >= 0) {
        inputGodownRef.current[prevRowCellIndex].focus();
      }
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      const nextRowCellIndex = currentCellIndex + totalColumns;
      if (inputGodownRef.current[nextRowCellIndex] && nextRowCellIndex < inputGodownRef.current.length) {
        inputGodownRef.current[nextRowCellIndex].focus();
      }
    } else if (key === 'Backspace' && e.target.value.trim() === '') {
      e.preventDefault();
      const prevCellIndex = currentCellIndex - 1;
      if (inputGodownRef.current[prevCellIndex] && prevCellIndex >= 0) {
        inputGodownRef.current[prevCellIndex].focus();
        inputGodownRef.current[prevCellIndex].setSelectionRange(0, 0);
      }
    } else if (key === 'Escape') {
      setGodownSubFormModal(false); // Close modal on Escape
    }
  };

  const handleKeyDownTotal = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();
      const nextIndex = index +1;
      if (totalRefs.current[nextIndex]){
        totalRefs.current[nextIndex].focus();
      } else if (e.target.name === 'totalNetAmount'){
        const userConfirmed = window.confirm('Do you want to confirm this submit?');
        if (userConfirmed){
          setGodownSubFormModal(false);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    setStockItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <>
      <div className="flex">
        <LeftSideMenu />
        <form
          action=""
          className="border border-slate-500 w-[42.5%] h-[42vh] absolute left-[47.5%]"
        >
          <div className="text-sm flex mt-2 ml-2">
            <label htmlFor="stockItemCode" className="w-[40%]">
              Product Item Code
            </label>
            <span>:</span>
            <input
              type="text"
              name="stockItemCode"
              value={stockItem.stockItemCode}
              ref={input => (inputRefs.current[0] = input)}
              onKeyDown={e => handleKeyDown(e, 0)}
              readOnly
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="stockItemName" className="w-[40%]">
              Product Item Name
            </label>
            <span>:</span>
            <input
              type="text"
              name="stockItemName"
              ref={input => (inputRefs.current[1] = input)}
              value={stockItem.stockItemName}
              onKeyDown={e => handleKeyDown(e, 1)}
              readOnly
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="category" className="w-[40%]">
              Stock Category
            </label>
            <span>:</span>
            <input
              type="text"
              name="category"
              ref={input => (inputRefs.current[2] = input)}
              value={stockItem.category}
              readOnly
              onKeyDown={e => handleKeyDown(e, 2)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="under" className="w-[40%]">
              Stock Group
            </label>
            <span>:</span>
            <input
              type="text"
              name="under"
              ref={input => (inputRefs.current[3] = input)}
              value={stockItem.under}
              readOnly
              onKeyDown={e => handleKeyDown(e, 3)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="units" className="w-[40%]">
              Unit of Measurement (UOM)
            </label>
            <span>:</span>
            <input
              type="text"
              name="units"
              ref={input => (inputRefs.current[4] = input)}
              value={stockItem.units}
              onKeyDown={e => handleKeyDown(e, 4)}
              readOnly
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="standardSellingPrice" className="w-[40%]">
              Standard Selling Price
            </label>
            <span>:</span>
            <input
              type="text"
              name="standardSellingPrice"
              ref={input => (inputRefs.current[5] = input)}
              value={stockItem.standardSellingPrice}
              onKeyDown={e => handleKeyDown(e, 5)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>

          {standardSellingPriceModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div className="h-[470px] overflow-y-scroll">
                  <div className="text-sm ml-5 mt-2 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[25%]">
                      Allocations of Product
                    </label>
                    <span className='mr-3'>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className=''>Date</th>
                        <th className='pl-10'>Rate</th>
                        <th className='pl-6'>
                          Percentage <span>(%)</span>
                        </th>
                        <th className='pl-20'>Net-Rate</th>
                        <th className='w-[50px]'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.standardSellingPriceSubForm.map((row, index) => (
                        <tr key={index} className="leading-4">
                          {/* date Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPriceDate"
                              value={row.formattedSellingPriceDate}
                              readOnly
                              ref={input => (inputSellingPriceRef.current[0 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingPrice(e, index, 0)}
                              className="w-[100px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* rate Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPriceRate"
                              value={row.sellingPriceRate}
                              readOnly
                              ref={input => (inputSellingPriceRef.current[1 + index * 5] = input)}
                              onKeyDown={e => {handleKeyDownSellingPrice(e, index, 1)}}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              
                              autoComplete="off"
                            />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPricePercentage"
                              value={row.sellingPricePercentage}
                              readOnly
                              ref={input => (inputSellingPriceRef.current[2 + index * 5] = input)}
                              onKeyDown={(e) => {handleKeyDownSellingPrice(e, index, 2)}}
                              className="w-[40px] h-5 pl-1 ml-20 text-right font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* net-rate Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPriceNetRate"
                              value={row.sellingPriceNetRate}
                              readOnly
                              ref={input => (inputSellingPriceRef.current[3 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingPrice(e, index, 3)}
                              className="w-[150px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              
                              autoComplete="off"
                            />
                          </td>

                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPriceStatus"
                              value={row.sellingPriceStatus}
                              readOnly
                              ref={input => (inputSellingPriceRef.current[4 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingPrice(e, index, 4)}
                              className="w-[70px] h-5 pl-1 ml-5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="text-sm flex ml-2">
            <label htmlFor="standardSellingCost" className="w-[40%]">
              Standard Selling Cost
            </label>
            <span>:</span>
            <input
              type="text"
              name="standardSellingCost"
              ref={input => (inputRefs.current[6] = input)}
              value={stockItem.standardSellingCost}
              onKeyDown={e => handleKeyDown(e, 6)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>

          {standardSellingCostModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div className="h-[470px] overflow-y-scroll">
                  <div className="text-sm ml-5 mt-2 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[25%]">
                      Allocations of Product
                    </label>
                    <span className='mr-3'>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th>Date</th>
                        <th className='pl-10'>Rate</th>
                        <th className='pl-6'>
                          Percentage <span>(%)</span>
                        </th>
                        <th className='pl-20'>Net-Rate</th>
                        <th className='w-[50px]'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.standardSellingCostSubForm.map((row, index) => (
                        <tr key={index} className="leading-4">
                          {/* date Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostDate"
                              value={row.formattedSellingCostDate}
                              ref={input => (inputSellingCostRef.current[0 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingCost(e, index, 0)}
                              readOnly
                              className="w-[100px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* rate Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostRate"
                              value={row.sellingCostRate}
                              readOnly
                              ref={input => (inputSellingCostRef.current[1 + index * 5] = input)}
                              onKeyDown={(e) => {handleKeyDownSellingCost(e, index, 1)}}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              
                              autoComplete="off"
                            />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostPercentage"
                              value={row.sellingCostPercentage}
                              readOnly
                              ref={input => (inputSellingCostRef.current[2 + index * 5] = input)}
                              onKeyDown={(e) => {handleKeyDownSellingCost(e, index, 2)}}
                              className="w-[40px] h-5 pl-1 font-medium text-[12px] text-right ml-16 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* net-rate Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostNetRate"
                              value={row.sellingCostNetRate}
                              readOnly
                              ref={input => (inputSellingCostRef.current[3 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingCost(e, index, 3)}
                              className="w-[150px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              
                              autoComplete="off"
                            />
                          </td>

                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostStatus"
                              value={row.sellingCostStatus}
                              readOnly
                              ref={input => (inputSellingCostRef.current[4 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingCost(e, index, 4)}
                              className="w-[70px] h-5 pl-1 ml-7 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="text-sm flex ml-2">
            <label htmlFor="gstApplicable" className="w-[40%]">
              GST Applicable
            </label>
            <span>:</span>
            <input
              type="text"
              name="gstApplicable"
              value={stockItem.gstApplicable}
              ref={input => (inputRefs.current[7] = input)}
              onKeyDown={e => handleKeyDown(e, 7)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          {gstStockItemSubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 z-10 flex justify-center items-center">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div>
                  <div className="text-sm ml-5 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[25%]">
                      Allocations of Product
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 border-collapse w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className='pr-16'>Date</th>
                        <th className='w-[60px] pr-5'>HSN Code</th>
                        <th>
                          Percentage <span>(%)</span>
                        </th>
                        <th className='w-[50px] pr-7'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.gstStockItemSubForm.map((row, index) => (
                        <tr>
                          {/* date Input */}
                          <td>
                            <input
                              type="text"
                              name="gstDate"
                              value={row.formattedGstDate}
                              ref={input => (inputGstRef.current[0 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 0)}
                              className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* hsn code Input */}
                          <td>
                            <input
                              type="text"
                              name="hsnCode"
                              value={row.hsnCode}
                              ref={input => (inputGstRef.current[1 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 1)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="gstPercentage"
                              value={row.gstPercentage}
                              ref={input => (inputGstRef.current[2 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 2)}
                              className="w-[40px] h-5 pl-1 ml-36 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="gstStatus"
                              value={row.gstStatus}
                              ref={input => (inputGstRef.current[3 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 3)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="text-sm flex ml-2">
            <label htmlFor="vatApplicable" className="w-[40%]">
              VAT Applicable
            </label>
            <span>:</span>
            <input
              type="text"
              name="vatApplicable"
              value={stockItem.vatApplicable}
              ref={input => (inputRefs.current[8] = input)}
              onKeyDown={e => handleKeyDown(e, 8)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          {vatStockItemSubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 z-10 opacity-90 flex justify-center items-center">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div>
                  <div className="text-sm ml-5 mt-2 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[25%]">
                      Allocations of Product
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 border-collapse w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className='pr-16'>Date</th>
                        <th className='w-[60px] pr-5'>VAT Code</th>
                        <th>
                          Percentage <span>(%)</span>
                        </th>
                        <th className='w-[50px] pr-7'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.vatStockItemSubForm.map((row, index) => (
                        <tr>
                          {/* date Input */}
                          <td>
                            <input
                              type="text"
                              name="vatDate"
                              value={row.formattedVatDate}
                              ref={input => (inputVatRef.current[0 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 0)}
                              className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* vat code Input */}
                          <td>
                            <input
                              type="text"
                              name="vatCode"
                              value={row.vatCode}
                              ref={input => (inputVatRef.current[1 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 1)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="vatPercentage"
                              value={row.vatPercentage}
                              ref={input => (inputVatRef.current[2 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 2)}
                              className="w-[40px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="vatStatus"
                              value={row.vatStatus}
                              ref={input => (inputVatRef.current[3 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 3)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center text-sm font-bold mt-2">
            <p className="ml-[267px]">Quantity</p>
            <p className="ml-12">Rate</p>
            <p className="ml-8">Unit</p>
            <p className="ml-[70px]">Value</p>
          </div>
          <div className="text-sm flex mt-1 ml-2 mb-1">
            <p className="w-[40%]">Opening Balance</p>
            <span>:</span>
            <label htmlFor="openingBalanceQuantity" className=""></label>
            <input
              type="text"
              name="openingBalanceQuantity"
              value={stockItem.openingBalanceQuantity}
              
              ref={input => (inputRefs.current[9] = input)}
              onKeyDown={e => {handleKeyDown(e, 9);
              }}
              className="w-[75px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceRate" className=""></label>
            <input
              type="text"
              name="openingBalanceRate"
              value={stockItem.openingBalanceRate}
              readOnly
              ref={input => (inputRefs.current[10] = input)}
              onKeyDown={e => handleKeyDown(e, 10)}
              
              className="w-[76px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceUnit" className=""></label>
            <input
              type="text"
              name="openingBalanceUnit"
              value={stockItem.openingBalanceUnit}
              readOnly
              ref={input => (inputRefs.current[11] = input)}
              onKeyDown={e => handleKeyDown(e, 11)}
              
              className="w-[50px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceValue" className=""></label>
            <input
              type="text"
              name="openingBalanceValue"
              value={stockItem.openingBalanceValue}
              ref={input => (inputRefs.current[12] = input)}
              onKeyDown={e => handleKeyDown(e, 12)}
              
              className="w-[100px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
          </div>
          {/* Conditional rendering of the subform */}
          {godownSubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 z-10 flex justify-center items-center">
              <div className="bg-white w-[700px] h-[500px] border border-black relative">
                <div className="">
                  <div className="text-sm ml-5 mt-2 flex">
                    <label htmlFor="allocationsOf" className="w-[21%]">
                      Allocations of Product
                    </label>
                    <span className='mr-3'>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <div className="text-sm ml-5 flex">
                    <label htmlFor="for" className="w-[21%]">
                      For
                    </label>
                    <span className='mr-3'>:</span>
                    <input
                      type="text"
                      name="for"
                      value={stockItem.openingBalanceQuantity}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className='w-[20%]'>Location</th>
                        <th>Batch</th>
                        <th className='pl-6'>Quantity</th>
                        <th className='pr-2'>Uom</th>
                        <th className='pl-8'>Rate</th>
                        <th className='pl-24'>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.godownSubForm.map((row, index) => (
                        <tr key={index} className="leading-4">
                          {/* godown Input */}
                          <td>
                            <input
                              type="text"
                              name="godownName"
                              value={row.godownName}
                              ref={input => (inputGodownRef.current[0 + index * 6] = input)}
                              onKeyDown={e => handleKeyDownGodownSubForm(e, index, 0)}
                              className="w-[130px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* batch Input */}
                          <td>
                            <input
                              type="text"
                              name="batchName"
                              value={row.batchName}
                              ref={input => (inputGodownRef.current[1 + index * 6] = input)}
                              onKeyDown={e => handleKeyDownGodownSubForm(e, index, 1)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                              readOnly
                            />
                          </td>

                          {/* quantity Input */}
                          <td>
                            <input
                              type="text"
                              name="quantity"
                              value={row.quantity}
                              ref={input => (inputGodownRef.current[2 + index * 6] = input)}
                              readOnly
                              onKeyDown={(e) => {handleKeyDownGodownSubForm(e, index, 2)}}
                              className="w-[60px] h-5 pl-1 ml-4 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* unit Input */}
                          <td>
                            <input
                              type="text"
                              name="perUnit"
                              value={row.perUnit}
                              ref={input => (inputGodownRef.current[3 + index * 6] = input)}
                              readOnly
                              onKeyDown={e => handleKeyDownGodownSubForm(e, index, 3)}
                              className="w-[50px] h-5 pl-1 ml-3 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>

                          {/* rate-amount Input */}
                          <td>
                            <input
                              type="text"
                              name="rateAmount"
                              value={row.rateAmount}
                              ref={input => (inputGodownRef.current[4 + index * 6] = input)}
                              readOnly
                              onKeyDown={(e) => {handleKeyDownGodownSubForm(e, index, 4)}}
                              className="w-[70px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        
                              autoComplete="off"
                            />
                          </td>

                          {/* netAmount Input */}
                          <td>
                            <input
                              type="text"
                              name="netAmount"
                              value={row.netAmount}
                              ref={input => (inputGodownRef.current[5 + index * 6] = input)}
                              readOnly
                              onKeyDown={e => handleKeyDownGodownSubForm(e, index, 5)}
                              className="w-full h-5 pl-1 font-medium text-[12px] text-right pr-1 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex absolute top-[468px] left-[275px] border border-double border-t border-slate-400 border-l-0 border-r-0'>
                  <p className='text-sm mt-1'>Total</p>
                  <span className='ml-1'>:</span>
                  <div>
                    <label htmlFor=""></label>
                    <input type="text" name='totalQuantity' value={stockItem.totalQuantity} ref={(input) => (totalRefs.current[0] = input)} onKeyDown={e => handleKeyDownTotal(e, 0)} className="w-[50px] h-5 pl-1 ml-4 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"  autoComplete="off" readOnly />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input type="text" name='totalPerUnit' value={stockItem.units} ref={(input) => (totalRefs.current[1] = input)} onKeyDown={e => handleKeyDownTotal(e, 1)} className="w-[40px] h-5 pl-1 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"  autoComplete="off" readOnly />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input type="text" name='totalNetAmount' value={stockItem.totalNetAmount} ref={(input) => (totalRefs.current[2] = input)} onKeyDown={e => handleKeyDownTotal(e, 2)} className="w-[110px] h-5 pl-1 ml-[163px] font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"  autoComplete="off" readOnly />
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

export default StockItemDisplay