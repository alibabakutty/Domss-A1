import React, { useEffect, useRef, useState } from 'react';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import {
  createStockItemMaster,
  listOfBatchSerialNumbers,
  listOfLocations,
  listOfStockCategories,
  listOfStockGroups,
  listOfUnits,
} from '../services/MasterService';

const StockItemCreate = () => {
  const [stockItem, setStockItem] = useState({
    stockItemCode: '',
    stockItemName: '',
    stockItemPrintingName: '',
    under: '',
    category: '',
    units: '',
    standardSellingPrice: 'no',
    standardSellingPriceSubForm: [
      {
        sellingPriceDate: '',
        sellingPriceRate: '',
        sellingPricePercentage: '',
        sellingPriceNetRate: '',
        sellingPriceStatus: 'active',
      },
    ],
    standardSellingCost: 'no',
    standardSellingCostSubForm: [
      {
        sellingCostDate: '',
        sellingCostRate: '',
        sellingCostPercentage: '',
        sellingCostNetRate: '',
        sellingCostStatus: 'active',
      },
    ],
    stockItemMrp: '',
    gstApplicable: 'no',
    gstStockItemSubForm: [
      {
        gstDate: '',
        hsnCode: '',
        gstPercentage: '',
        gstStatus: 'active',
      },
    ],
    vatApplicable: 'no',
    vatStockItemSubForm: [
      {
        vatDate: '',
        vatCode: '',
        vatPercentage: '',
        vatStatus: 'active',
      },
    ],
    batchApplicable: 'no',
    stockItemAccountingLedger: 'no',
    accountingLedgerSubForm: [
      {
        accountingLedgerPurchase: '',
        accountingLedgerSales: '',
        accountingLedgerCreditNote: '',
        accountingLedgerDebitNote: '',
      },
    ],
    openingBalanceQuantity: '',
    openingBalanceQuantityDisplay: '',
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

  const [stockGroupSuggestion, setStockGroupSuggestion] = useState([]);
  const [stockCategorySuggestion, setStockCategorySuggestion] = useState([]);
  const [unitSuggestion, setUnitSuggestion] = useState([]);
  const [godownSuggestion, setGodownSuggestion] = useState([]);
  const [batchSuggestion, setBatchSuggestion] = useState([]);
  const [filteredStockGroup, setFilteredStockGroup] = useState([]);
  const [filteredStockCategory, setFilteredStockCategory] = useState([]);
  const [filteredUnit, setFilteredUnit] = useState([]);
  const [filteredGodown, setFilteredGodown] = useState([]);
  const [filteredBatch, setFilteredBatch] = useState([]);
  const [underFocused, setUnderFocused] = useState(false);
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [unitsFocused, setUnitsFocused] = useState(false);
  const [godownFocused, setGodownFocused] = useState(false);
  const [batchFocused, setBatchFocused] = useState(false);
  const [highlightedStockGroup, setHighlightedStockGroup] = useState(0);
  const [highlightedStockCategory, setHighlightedStockCategory] = useState(0);
  const [highlightedUnit, setHighlightedUnit] = useState(0);
  const [highlightedGodown, setHighlightedGodown] = useState(0);
  const [highlightedBatch, setHighlightedBatch] = useState(0);
  const [standardSellingPriceModal, setStandardSellingPriceModal] = useState(false);
  const [standardSellingCostModal, setStandardSellingCostModal] = useState(false);
  const [gstStockItemSubFormModal, setGstStockItemSubFormModal] = useState(false);
  const [vatStockItemSubFormModal, setVatStockItemSubFormModal] = useState(false);
  const [accountingLedgerSubFormModal, setAccountingLedgerSubFormModal] = useState(false);
  const [godownSubFormModal, setGodownSubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const stockGroupOptionsRef = useRef(null);
  const stockCategoryOptionsRef = useRef(null);
  const unitOptionsRef = useRef(null);
  const godownRef = useRef(null);
  const batchRef = useRef(null);
  const inputSellingPriceRef = useRef([]);
  const inputSellingCostRef = useRef([]);
  const inputGstRef = useRef([]);
  const inputVatRef = useRef([]);
  const inputAccountLedgerRef = useRef([]);
  const inputGodownRef = useRef([]);
  const prevSellingPriceModal = useRef(false);
  const prevSellingCostModal = useRef(false);
  const prevGstModal = useRef(false);
  const prevVatModal = useRef(false);
  const prevAccountLedgerModal = useRef(false);
  const prevGodownModal = useRef(false);
  const totalRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial focus if the input exists
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
      inputRefs.current[0].setSelectionRange(0, 0);
    }

    if (standardSellingPriceModal && inputSellingPriceRef.current[0]) {
      inputSellingPriceRef.current[0].focus();
      inputSellingPriceRef.current[0].setSelectionRange(0, 0);
    }

    if (standardSellingCostModal && inputSellingCostRef.current[0]) {
      inputSellingCostRef.current[0].focus();
      inputSellingCostRef.current[0].setSelectionRange(0, 0);
    }

    if (gstStockItemSubFormModal && inputGstRef.current[0]) {
      inputGstRef.current[0].focus();
      inputGstRef.current[0].setSelectionRange(0, 0);
    }

    if (vatStockItemSubFormModal && inputVatRef.current[0]) {
      inputVatRef.current[0].focus();
      inputVatRef.current[0].setSelectionRange(0, 0);
    }

    if (accountingLedgerSubFormModal && inputAccountLedgerRef.current[0]){
      inputAccountLedgerRef.current[0].focus();
      inputAccountLedgerRef.current[0].setSelectionRange(0, 0);
    }

    if (godownSubFormModal && inputGodownRef.current[0]) {
      inputGodownRef.current[0].focus();
      inputGodownRef.current[0].setSelectionRange(0, 0);
    }

    // Detect if the sellingpriceSubFormModal is closed
    if (prevSellingPriceModal.current && !standardSellingPriceModal) {
      // Focus on the standard selling cost input when standardsellingpriceModal closes
      const sellingCostInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'standardSellingCost',
      );
      if (sellingCostInputIndex !== -1 && inputRefs.current[sellingCostInputIndex]) {
        inputRefs.current[sellingCostInputIndex].focus();
        inputRefs.current[sellingCostInputIndex].setSelectionRange(0, 0);
      }
    }

    // Detect if the sellingcostSubFormModal is closed
    if (prevSellingCostModal.current && !standardSellingCostModal) {
      // Focus on the standard selling price input when standardsellingcostModal closes
      const sellingPriceInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'gstApplicable',
      );
      if (sellingPriceInputIndex !== -1 && inputRefs.current[sellingPriceInputIndex]) {
        inputRefs.current[sellingPriceInputIndex].focus();
        inputRefs.current[sellingPriceInputIndex].setSelectionRange(0, 0);
      }
    }

    if (prevGstModal.current && !gstStockItemSubFormModal) {
      const gstInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'openingBalanceQuantity',
      );
      if (gstInputIndex !== -1 && inputRefs.current[gstInputIndex]) {
        inputRefs.current[gstInputIndex].focus();
        inputRefs.current[gstInputIndex].setSelectionRange(0, 0);
      }
    }

    if (prevVatModal.current && !vatStockItemSubFormModal) {
      const vatInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'stockItemAccountingLedger',
      );
      if (vatInputIndex !== -1 && inputRefs.current[vatInputIndex]) {
        inputRefs.current[vatInputIndex].focus();
        inputRefs.current[vatInputIndex].setSelectionRange(0, 0);
      }
    }

    if (prevAccountLedgerModal.current && !accountingLedgerSubFormModal){
      const accountLedgerInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'openingBalanceQuantity',
      );
      if (accountLedgerInputIndex !== -1 && inputRefs.current[accountLedgerInputIndex]){
        inputRefs.current[accountLedgerInputIndex].focus();
        inputRefs.current[accountLedgerInputIndex].setSelectionRange(0, 0);
      }
    }

    // Detect if the godownSubFormModal is closed
    if (prevGodownModal.current && !godownSubFormModal) {
      // Focus on the standard selling price input when godownSubFormModal closes
      const godownInputIndex = inputRefs.current.findIndex(
        ref => ref && ref.name === 'openingBalanceRate',
      );
      if (godownInputIndex !== -1 && inputRefs.current[godownInputIndex]) {
        inputRefs.current[godownInputIndex].focus();
        inputRefs.current[godownInputIndex].setSelectionRange(0, 0);
      }
    }

    // Update the previous state value
    prevSellingPriceModal.current = standardSellingPriceModal;
    prevSellingCostModal.current = standardSellingCostModal;
    prevGstModal.current = gstStockItemSubFormModal;
    prevVatModal.current = vatStockItemSubFormModal;
    prevGodownModal.current = godownSubFormModal;

    // Fetch stock categories and units concurrently
    const fetchData = async () => {
      try {
        const [
          stockGroupResponse,
          stockCategoryResponse,
          unitResponse,
          godownResponse,
          batchResponse,
        ] = await Promise.all([
          listOfStockGroups(),
          listOfStockCategories(),
          listOfUnits(),
          listOfLocations(),
          listOfBatchSerialNumbers(),
        ]);

        setStockGroupSuggestion(stockGroupResponse.data);
        setStockCategorySuggestion(stockCategoryResponse.data);
        setUnitSuggestion(unitResponse.data);
        setGodownSuggestion(godownResponse.data);
        setBatchSuggestion(batchResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Optionally, you can return a cleanup function if needed
    return () => {
      // Clean up code here
    };
  }, [
    standardSellingPriceModal,
    standardSellingCostModal,
    godownSubFormModal,
    gstStockItemSubFormModal,
    vatStockItemSubFormModal,
  ]);

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
            handleSubmit(e);
          } else {
            e.preventDefault();
          }
        }

        // Specific handling for 'standardsellingprice' input
        if (e.target.name === 'standardSellingPrice' && e.target.value.trim() === 'yes') {
          setStandardSellingPriceModal(true);
        } else if (e.target.name === 'standardSellingCost' && e.target.value.trim() === 'yes') {
          setStandardSellingCostModal(true);
        } else if (e.target.name === 'gstApplicable' && e.target.value.trim() === 'yes') {
          setGstStockItemSubFormModal(true);
        } else if (e.target.name === 'vatApplicable' && e.target.value.trim() === 'yes') {
          setVatStockItemSubFormModal(true);
        } else if (
          e.target.name === 'stockItemAccountingLedger' &&
          e.target.value.trim() === 'yes'
        ) {
          setAccountingLedgerSubFormModal(true);
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
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'gstApplicable') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        gstApplicable: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'vatApplicable') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        vatApplicable: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'batchApplicable') {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        batchApplicable: value,
      });
    } else if (
      ['y', 'n', 'Y', 'N'].includes(key) &&
      e.target.name === 'stockItemAccountingLedger'
    ) {
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        stockItemAccountingLedger: value,
      });
    } else if (key === 'Escape') {
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleKeyDownGroup = e => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (filteredStockGroup.length >= 0) {
        // Select the highlighted suggestion for stock group
        const selectedGroup = filteredStockGroup[highlightedStockGroup];
        handleStockGroupSuggestionClick(selectedGroup); // Define this function for handling the selection
        inputRefs.current[0].blur(); // Blur the input after selection
      }
    } else if (key === 'Backspace') {
      e.preventDefault();
      const currentInputIndex = 4;
      const currentInputValue = inputRefs.current[currentInputIndex].value;
      if (currentInputValue !== '' && currentInputIndex > 0) {
        inputRefs.current[currentInputIndex - 1].focus();
        inputRefs.current[currentInputIndex - 1].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      if (filteredStockGroup.length > 0) {
        e.preventDefault();
        setHighlightedStockGroup(prev => Math.min(prev + 1, filteredStockGroup.length - 1));
      }
    } else if (key === 'ArrowUp') {
      if (filteredStockGroup.length > 0) {
        e.preventDefault();
        setHighlightedStockGroup(prev => Math.max(prev - 1, 0));
      }
    } else if (key === ' ') {
      e.preventDefault();
      inputRefs.current[3].value = ''; // Clear the input field
    } else if (key === 'Escape') {
      // Close the dropdown on Escape key
      setFilteredStockGroup([]);
      inputRefs.current[0].blur(); // Optionally blur the input field
    }
  };

  const handleKeyDownCategory = e => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (filteredStockCategory.length >= 0) {
        // Select the highlighted suggestion for stock group
        const selectedCategory = filteredStockCategory[highlightedStockCategory];

        handleStockCategorySuggestionClick(selectedCategory); // Define this function for handling the selection
        inputRefs.current[2].blur(); // Blur the input after selection
      }
    } else if (key === 'Backspace') {
      e.preventDefault();
      const currentInputIndex = 3;
      const currentInputValue = inputRefs.current[currentInputIndex].value;
      if (currentInputValue !== '' && currentInputIndex > 0) {
        inputRefs.current[currentInputIndex - 1].focus();
        inputRefs.current[currentInputIndex - 1].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      if (filteredStockCategory.length > 0) {
        e.preventDefault();
        setHighlightedStockCategory(prev => Math.min(prev + 1, filteredStockCategory.length - 1));
      }
    } else if (key === 'ArrowUp') {
      if (filteredStockCategory.length > 0) {
        e.preventDefault();
        setHighlightedStockCategory(prev => Math.max(prev - 1, 0));
      }
    } else if (key === ' ') {
      e.preventDefault();
      inputRefs.current[2].value = ''; // Clear the input field
    } else if (key === 'Escape') {
      // Close the dropdown on Escape key
      setFilteredStockCategory([]);
      inputRefs.current[1].blur(); // Optionally blur the input field
    }
  };

  const handleKeyDownUnit = e => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (filteredUnit.length >= 0) {
        // Select the highlighted suggestion for unit
        const selectedUnit = filteredUnit[highlightedUnit];
        handleUnitSuggestionClick(selectedUnit); // Define this function for handling the selection
        inputRefs.current[3].blur(); // Blur the input after selection
      }
    } else if (key === 'Backspace') {
      e.preventDefault();
      const currentInputIndex = 5;
      const currentInputValue = inputRefs.current[currentInputIndex].value;
      if (currentInputValue !== '' && currentInputIndex > 0) {
        inputRefs.current[currentInputIndex - 1].focus();
        inputRefs.current[currentInputIndex - 1].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      if (filteredUnit.length > 0) {
        e.preventDefault();
        setHighlightedUnit(prev => Math.min(prev + 1, filteredUnit.length - 1));
      }
    } else if (key === 'ArrowUp') {
      if (filteredUnit.length > 0) {
        e.preventDefault();
        setHighlightedUnit(prev => Math.max(prev - 1, 0));
      }
    } else if (key === ' ') {
      e.preventDefault();
      inputRefs.current[4].value = ''; // Clear the input field
    } else if (key === 'Escape') {
      // Close the dropdown on Escape key
      setFilteredUnit([]);
      inputRefs.current[2].blur(); // Optionally blur the input field
    }
  };

  const handleKeyDownGodown = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (filteredGodown.length > 0) {
        // Select the highlighted suggestion for godown
        const selectedGodown = filteredGodown[highlightedGodown];
        handleGodownSuggestionClick(selectedGodown, index); // Define this function for handling the selection
        inputGodownRef.current[index * 6].blur(); // Blur the input after selection
      }
    } else if (key === 'ArrowDown') {
      if (filteredGodown.length > 0) {
        e.preventDefault();
        setHighlightedGodown(prev => Math.min(prev + 1, filteredGodown.length - 1));
      }
    } else if (key === 'ArrowUp') {
      if (filteredGodown.length > 0) {
        e.preventDefault();
        setHighlightedGodown(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const handleKeyDownBatch = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      if (filteredBatch.length > 0) {
        // Select the highlighted suggestion for batch
        const selectedBatch = filteredBatch[highlightedBatch];
        handleBatchSuggestionClick(selectedBatch, index); // Define this function for handling the selection
        inputGodownRef.current[index * 6].blur(); // Blur the input after selection
      }
    } else if (key === 'ArrowDown') {
      if (filteredBatch.length > 0) {
        e.preventDefault();
        setHighlightedBatch(prev => Math.min(prev + 1, filteredBatch.length - 1));
      }
    } else if (key === 'ArrowUp') {
      if (filteredBatch.length > 0) {
        e.preventDefault();
        setHighlightedBatch(prev => Math.max(prev - 1, 0));
      }
    }
  };

  // add new row function
  const addNewRowSellingPrice = () => {
    setStockItem(prevState => {
      // Define the structure of a new row with conditional status based on status value
      const newRow = {
        sellingPriceDate: '',
        sellingPriceRate: '',
        sellingPricePercentage: '',
        sellingPriceNetRate: '',
        sellingPriceStatus: 'active',
      };
      return {
        ...prevState,
        standardSellingPriceSubForm: [...prevState.standardSellingPriceSubForm, newRow],
      };
    });
  };

  const handleKeyDownSellingPrice = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstSellingPriceDate = 0;

    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior

      if (rowIndex === 0 && colIndex === firstSellingPriceDate && e.target.value.trim() === '') {
        alert('Please enter the selling price date before proceeding');
        inputSellingPriceRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus on the empty sellingpricedate field
        inputSellingPriceRef.current[rowIndex * 5 + colIndex].setSelectionRange(0, 0);
        return;
      }

      if (colIndex === firstSellingPriceDate && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmationClose = window.confirm('Do you want to close this subform?');
        if (confirmationClose) {
          setStandardSellingPriceModal(false);
          setStockItem(prev => ({ ...prev, standardSellingPrice: 'no' }));
          inputRefs.current[6]?.focus();
          inputRefs.current[6].setSelectionRange(0, 0);
          return;
        } else {
          inputSellingPriceRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus if they choose not to close
          inputSellingPriceRef.current[rowIndex * 5 + colIndex].setSelectionRange(0, 0);
          return;
        }
      }

      const isSellingPriceStatus = e.target.name === 'sellingPriceStatus';
      const isLastRowSelingPriceStatus =
        rowIndex === stockItem.standardSellingPriceSubForm.length - 1;

      if (isSellingPriceStatus && e.target.value.trim() !== '' && isLastRowSelingPriceStatus) {
        addNewRowSellingPrice();
        setTimeout(() => {
          inputSellingPriceRef.current[(rowIndex + 1) * 5]?.focus();
        }, 0);
        return;
      }

      const nextCell = rowIndex * 5 + colIndex + 1;
      if (
        inputSellingPriceRef.current[nextCell] &&
        nextCell < inputSellingPriceRef.current.length
      ) {
        inputSellingPriceRef.current[nextCell]?.focus();
        inputSellingPriceRef.current[nextCell].setSelectionRange(0, 0);
      }
    } else if (key === 'Backspace') {
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingPriceRef.current[prevCell] && prevCell >= 0) {
          inputSellingPriceRef.current[prevCell].focus();
          inputSellingPriceRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape') {
      setStandardSellingPriceModal(false);
      setStockItem(prev => ({ ...prev, standardSellingPrice: 'no' }));
    } else if (key === 'a' || key === 'A') {
      if (e.target.name === 'sellingPriceStatus') {
        e.preventDefault();
        const newRow = [...stockItem.standardSellingPriceSubForm];
        newRow[rowIndex].sellingPriceStatus = 'active'; // Update the status in the row
        setStockItem({ ...stockItem, standardSellingPriceSubForm: newRow });
      }
    } else if (key === 'i' || key === 'I') {
      if (e.target.name === 'sellingPriceStatus') {
        e.preventDefault();
        const newRow = [...stockItem.standardSellingPriceSubForm];
        newRow[rowIndex].sellingPriceStatus = 'Inactive'; // Update the status in the row
        setStockItem({ ...stockItem, standardSellingPriceSubForm: newRow });
      }
    } else if (key === 'ArrowUp') {
      // Move focus to the cell above (previous row, same column)
      const prevRow = (rowIndex - 1) * 5 + colIndex;
      if (inputSellingPriceRef.current[prevRow] && rowIndex > 0) {
        inputSellingPriceRef.current[prevRow].focus();
        inputSellingPriceRef.current[prevRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      // Move focus to the cell below (next row, same column)
      const nextRow = (rowIndex + 1) * 5 + colIndex;
      if (
        inputSellingPriceRef.current[nextRow] &&
        rowIndex < stockItem.standardSellingPriceSubForm.length - 1
      ) {
        inputSellingPriceRef.current[nextRow].focus();
        inputSellingPriceRef.current[nextRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowLeft') {
      // Move focus to the cell on the left (same row, previous column)
      e.preventDefault();
      const prevCell = rowIndex * 5 + colIndex - 1;
      if (inputSellingPriceRef.current[prevCell] && prevCell >= 0) {
        inputSellingPriceRef.current[prevCell].focus();
        inputSellingPriceRef.current[prevCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowRight') {
      // Prevent default behavior of ArrowRight
      e.preventDefault();

      // Calculate the next cell index
      const nextCell = rowIndex * 5 + colIndex + 1;

      // Check if the next cell exists within the current row (colIndex < 4)
      if (inputSellingPriceRef.current[nextCell] && colIndex < 4) {
        // Focus on the next input
        inputSellingPriceRef.current[nextCell].focus();
      } else if (colIndex === 4 && rowIndex < stockItem.standardSellingPriceSubForm.length - 1) {
        // Move to the first column of the next row if we are at the last column
        const firstCellOfNextRow = (rowIndex + 1) * 5;
        inputSellingPriceRef.current[firstCellOfNextRow]?.focus();
        inputSellingPriceRef.current[firstCellOfNextRow].setSelectionRange(0, 0);
      }
    } else if (key === ' ') {
      // Clear value when Spacebar is pressed in sellingPriceRate or sellingPricePercentage input
      if (e.target.name === 'sellingPriceRate' || e.target.name === 'sellingPricePercentage') {
        e.preventDefault(); // Prevent default spacebar behavior
        const updatedRows = [...stockItem.standardSellingPriceSubForm];
        updatedRows[rowIndex][e.target.name] = ''; // Clear the input value
        setStockItem({ ...stockItem, standardSellingPriceSubForm: updatedRows });
      }
    }
  };

  // add new row function
  const addNewRowSellingCost = () => {
    setStockItem(prevState => {
      // Define the structure of a new row with conditional status based on status value
      const newRow = {
        sellingCostDate: '',
        sellingCostRate: '',
        sellingCostPercentage: '',
        sellingCostNetRate: '',
        sellingCostStatus: 'active',
      };
      return {
        ...prevState,
        standardSellingCostSubForm: [...prevState.standardSellingCostSubForm, newRow],
      };
    });
  };

  const handleKeyDownSellingCost = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstSellingCostDate = 0;

    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior

      // Check if the current input is the first sellingCostDate and ensure it has a value
      if (rowIndex === 0 && colIndex === firstSellingCostDate && e.target.value.trim() === '') {
        alert('The Selling Cost Date field must have a value before proceeding.');
        inputSellingCostRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus on the empty sellingCostDate field
        inputSellingCostRef.current[rowIndex * 5 + colIndex].setSelectionRange(0, 0);
        return;
      }

      // If it's not the first row, and the sellingCostDate is empty, confirm to close the subform
      if (colIndex === firstSellingCostDate && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmationClose = window.confirm('Do you want to close this subform?');
        if (confirmationClose) {
          setStandardSellingCostModal(false);
          setStockItem(prev => ({ ...prev, standardSellingCost: 'no' }));
          inputRefs.current[7]?.focus();
          inputRefs.current[7].setSelectionRange(0, 0);
          return;
        } else {
          inputSellingCostRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus if they choose not to close
          inputSellingCostRef.current[rowIndex * 5 + colIndex].setSelectionRange(0, 0);
          return;
        }
      }

      // Check if the current field is sellingCostStatus and its value is not empty
      const isSellingCostStatus = e.target.name === 'sellingCostStatus';
      const isLastRowSellingCostStatus =
        rowIndex === stockItem.standardSellingCostSubForm.length - 1;

      // Add a new row when Enter is pressed on the last row sellingCostStatus with a value
      if (isSellingCostStatus && e.target.value.trim() !== '' && isLastRowSellingCostStatus) {
        addNewRowSellingCost();
        setTimeout(() => {
          inputSellingCostRef.current[(rowIndex + 1) * 5]?.focus();
          inputSellingCostRef.current[(rowIndex + 1) * 5].setSelectionRange(0, 0);
        }, 0);
        return;
      }

      // Move to the next cell
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (inputSellingCostRef.current[nextCell] && nextCell < inputSellingCostRef.current.length) {
        inputSellingCostRef.current[nextCell]?.focus();
        inputSellingCostRef.current[nextCell].setSelectionRange(0, 0);
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingCostRef.current[prevCell] && prevCell >= 0) {
          inputSellingCostRef.current[prevCell].focus();
          inputSellingCostRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape') {
      setStandardSellingCostModal(false);
      setStockItem(prev => ({ ...prev, standardSellingCost: 'no' }));
    } else if (key === 'a' || key === 'A') {
      if (e.target.name === 'sellingCostStatus') {
        e.preventDefault();
        const newRow = [...stockItem.standardSellingCostSubForm];
        newRow[rowIndex].sellingCostStatus = 'active';
        setStockItem({ ...stockItem, standardSellingCostSubForm: newRow });
      }
    } else if (key === 'i' || key === 'I') {
      if (e.target.name === 'sellingCostStatus') {
        e.preventDefault();
        const newRow = [...stockItem.standardSellingCostSubForm];
        newRow[rowIndex].sellingCostStatus = 'Inactive';
        setStockItem({ ...stockItem, standardSellingCostSubForm: newRow });
      }
    } else if (key === 'ArrowUp') {
      // Move focus to the cell above (previous row, same column)
      const prevRow = (rowIndex - 1) * 5 + colIndex;
      if (inputSellingCostRef.current[prevRow] && rowIndex > 0) {
        inputSellingCostRef.current[prevRow].focus();
        inputSellingCostRef.current[prevRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      // Move focus to the cell below (next row, same column)
      const nextRow = (rowIndex + 1) * 5 + colIndex;
      if (
        inputSellingCostRef.current[nextRow] &&
        rowIndex < stockItem.standardSellingCostSubForm.length - 1
      ) {
        inputSellingCostRef.current[nextRow].focus();
        inputSellingCostRef.current[nextRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowLeft') {
      // Move focus to the cell on the left (same row, previous column)
      e.preventDefault();
      const prevCell = rowIndex * 5 + colIndex - 1;
      if (inputSellingCostRef.current[prevCell] && prevCell >= 0) {
        inputSellingCostRef.current[prevCell].focus();
        inputSellingCostRef.current[prevCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowRight') {
      // Move focus to the cell on the right (same row, next column)
      e.preventDefault();
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (inputSellingCostRef.current[nextCell] && colIndex < 4) {
        // Focus on the next input in the same row
        inputSellingCostRef.current[nextCell].focus();
        inputSellingCostRef.current[nextCell].setSelectionRange(0, 0);
      } else if (colIndex === 4 && rowIndex < stockItem.standardSellingCostSubForm.length - 1) {
        // Move to the first column of the next row if we are at the last column
        const firstCellOfNextRow = (rowIndex + 1) * 5;
        inputSellingCostRef.current[firstCellOfNextRow]?.focus();
        inputSellingCostRef.current[firstCellOfNextRow]?.setSelectionRange(0, 0);
      }
    } else if (key === ' ') {
      if (e.target.name === 'sellingCostRate' || e.target.name === 'sellingCostPercentage') {
        e.preventDefault();
        const newRow = [...stockItem.standardSellingCostSubForm];
        newRow[rowIndex][e.target.name] = ''; // make value empty
        setStockItem({ ...stockItem, standardSellingCostSubForm: newRow });
      }
    }
  };

  // Function to add a new row
  const addNewRowGst = () => {
    setStockItem(prevState => {
      const newRowGst = {
        gstDate: '',
        hsnCode: '',
        gstPercentage: '',
        gstStatus: 'active',
      };
      return {
        ...prevState,
        gstStockItemSubForm: [...prevState.gstStockItemSubForm, newRowGst],
      };
    });
  };

  // Function to handle keydown events for GST subform
  const handleKeyDownGstSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstGstDate = 0;
    const lastGstStatusIndex = 3; // The index of gstStatus in the row (0-based index)

    if (key === 'Enter') {
      e.preventDefault();

      // Ensure GST Date is not empty in the first row
      if (rowIndex === 0 && colIndex === firstGstDate && e.target.value.trim() === '') {
        alert('The GST Date field must have a value before proceeding.');
        inputGstRef.current[rowIndex * 4 + colIndex]?.focus();
        return;
      }

      // Handle closing the form if GST Date is empty in subsequent rows
      if (colIndex === firstGstDate && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmationClose = window.confirm('Do you want to close this subform?');
        if (confirmationClose) {
          setGstStockItemSubFormModal(false);
          setStockItem(prev => ({ ...prev, gstApplicable: 'no' }));
          inputRefs.current[9]?.focus();
          return;
        } else {
          inputGstRef.current[rowIndex * 4 + colIndex]?.focus();
          inputGstRef.current[rowIndex * 4 + colIndex].setSelectionRange(0, 0);
          return;
        }
      }

      // Handle new row addition when pressing Enter on the last column (gstStatus)
      const isGstStatus = colIndex === lastGstStatusIndex;
      const isLastRow = rowIndex === stockItem.gstStockItemSubForm.length - 1;

      if (isGstStatus && isLastRow && e.target.value.trim() !== '') {
        addNewRowGst();
        setTimeout(() => {
          inputGstRef.current[(rowIndex + 1) * 4]?.focus(); // Focus on the first column of the new row
          inputGstRef.current[(rowIndex + 1) * 4].setSelectionRange(0, 0);
        }, 0);
        return;
      }

      // Move to the next input field
      const nextCell = rowIndex * 4 + colIndex + 1;
      if (inputGstRef.current[nextCell] && nextCell < inputGstRef.current.length) {
        inputGstRef.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous field if the current field is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 4 + colIndex - 1;
        if (inputGstRef.current[prevCell] && prevCell >= 0) {
          inputGstRef.current[prevCell]?.focus();
          inputGstRef.current[prevCell].setSelectionRange(0, 0); // Set cursor position
        }
      }
    } else if (key === 'Escape') {
      // Close the subform modal on Escape key press
      setGstStockItemSubFormModal(false);
      setStockItem(prev => ({ ...prev, gstApplicable: 'no' }));
    } else if (key === 'a' || key === 'A') {
      if (e.target.name === 'gstStatus') {
        e.preventDefault();
        const newRow = [...stockItem.gstStockItemSubForm];
        newRow[rowIndex].gstStatus = 'active';
        setStockItem({ ...stockItem, gstStockItemSubForm: newRow });
      }
    } else if (key === 'i' || key === 'I') {
      if (e.target.name === 'gstStatus') {
        e.preventDefault();
        const newRow = [...stockItem.gstStockItemSubForm];
        newRow[rowIndex].gstStatus = 'inactive';
        setStockItem({ ...stockItem, gstStockItemSubForm: newRow });
      }
    } else if (key === 'ArrowUp') {
      // Move focus to the previous row
      const prevRow = (rowIndex - 1) * 4 + colIndex;
      if (inputGstRef.current[prevRow] && rowIndex >= 0) {
        inputGstRef.current[prevRow]?.focus();
        inputGstRef.current[prevRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      // Move focus to the cell below (next row, same column)
      const nextRow = (rowIndex + 1) * 4 + colIndex;
      if (inputGstRef.current[nextRow] && rowIndex < stockItem.gstStockItemSubForm.length - 1) {
        inputGstRef.current[nextRow]?.focus();
        inputGstRef.current[nextRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowLeft') {
      // Move focus to the cell to the left (previous column)
      e.preventDefault();
      const prevCell = rowIndex * 4 + colIndex - 1;
      if (inputGstRef.current[prevCell] && prevCell >= 0) {
        inputGstRef.current[prevCell]?.focus();
        inputGstRef.current[prevCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowRight') {
      // Move focus to the cell to the right (next column)
      e.preventDefault();
      const nextCell = rowIndex * 4 + colIndex + 1;
      if (inputGstRef.current[nextCell] && colIndex < 3) {
        inputGstRef.current[nextCell]?.focus();
        inputGstRef.current[nextCell].setSelectionRange(0, 0);
      } else if (colIndex === 3 && rowIndex < stockItem.gstStockItemSubForm.length - 1) {
        // If we are at the last column, move focus to the first column of the next row
        const firstCellOfNextRow = (rowIndex + 1) * 4;
        inputGstRef.current[firstCellOfNextRow]?.focus();
        inputGstRef.current[firstCellOfNextRow].setSelectionRange(0, 0);
      }
    } else if (key === ' ') {
      if (
        e.target.name === 'gstDate' ||
        e.target.name === 'hsnCode' ||
        e.target.name === 'gstPercentage'
      ) {
        e.preventDefault();
        const newRow = [...stockItem.gstStockItemSubForm];
        newRow[rowIndex][e.target.name] = '';
        setStockItem({ ...stockItem, gstStockItemSubForm: newRow });
      }
    }
  };

  // add new row function
  const addNewRowVat = () => {
    setStockItem(prevState => {
      const newRowVat = {
        vatDate: '',
        vatCode: '',
        vatPercentage: '',
        vatStatus: 'active',
      };
      return {
        ...prevState,
        vatStockItemSubForm: [...prevState.vatStockItemSubForm, newRowVat],
      };
    });
  };

  const handleKeyDownVatSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstVatDate = 0;
    const lastVatStatusIndex = 3; // The index of vatstatus in the row

    if (key === 'Enter') {
      e.preventDefault();

      if (
        rowIndex === 0 &&
        colIndex === firstVatDate &&
        (e.target.value.trim() === '' || e.target.value.trim() !== '')
      ) {
        inputVatRef.current[rowIndex * 4 + colIndex]?.focus();
        inputVatRef.current[rowIndex * 4 + colIndex].setSelectionRange(0, 0);
        return;
      }

      if (colIndex === firstVatDate && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmationClose = window.confirm('Do you want to close this subform?');
        if (confirmationClose) {
          setVatStockItemSubFormModal(false);
          setStockItem(prev => ({ ...prev, vatApplicable: 'no' }));
          inputRefs.current[10]?.focus();
          inputRefs.current[10].setSelectionRange(0, 0);
          return;
        } else {
          inputVatRef.current[rowIndex * 4 + colIndex]?.focus();
          inputVatRef.current[rowIndex * 4 + colIndex].setSelectionRange(0, 0);
          return;
        }
      }

      const isVatStatus = colIndex === lastVatStatusIndex;
      const isLastVatStatus = rowIndex === stockItem.vatStockItemSubForm.length - 1;

      if (isVatStatus && isLastVatStatus && e.target.value.trim() !== '') {
        addNewRowVat();
        setTimeout(() => {
          inputVatRef.current[rowIndex * 4 + colIndex + 1]?.focus();
          inputVatRef.current[rowIndex * 4 + colIndex + 1].setSelectionRange(0, 0);
        }, 0);
        return;
      }

      const nextCell = rowIndex * 4 + colIndex + 1;
      if (inputVatRef.current[nextCell] && nextCell < inputVatRef.current.length) {
        inputVatRef.current[nextCell]?.focus();
        inputVatRef.current[nextCell].setSelectionRange(0, 0);
      }
    } else if (key === 'Backspace') {
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 4 + colIndex - 1;
        if (inputVatRef.current[prevCell] && prevCell >= 0) {
          inputVatRef.current[prevCell]?.focus();
          inputVatRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape') {
      setVatStockItemSubFormModal(false);
      setStockItem(prev => ({ ...prev, vatApplicable: 'no' }));
    } else if (key === 'a' || key === 'A') {
      if (e.target.name === 'vatStatus') {
        e.preventDefault();
        const newRow = [...stockItem.vatStockItemSubForm];
        newRow[rowIndex].vatStatus = 'active';
        setStockItem({ ...stockItem, vatStockItemSubForm: newRow });
      }
    } else if (key === 'i' || key === 'I') {
      if (e.target.name === 'vatStatus') {
        e.preventDefault();
        const newRow = [...stockItem.vatStockItemSubForm];
        newRow[rowIndex].vatStatus = 'inactive';
        setStockItem({ ...stockItem, vatStockItemSubForm: newRow });
      }
    } else if (key === 'ArrowUp') {
      const prevRow = (rowIndex - 1) * 4 + colIndex;
      if (inputVatRef.current[prevRow] && rowIndex > 0) {
        inputVatRef.current[prevRow]?.focus();
        inputVatRef.current[prevRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      const nextRow = (rowIndex + 1) * 4 + colIndex;
      if (inputVatRef.current[nextRow] && rowIndex < stockItem.vatStockItemSubForm.length - 1) {
        inputVatRef.current[nextRow]?.focus();
        inputVatRef.current[nextRow].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      const prevCell = rowIndex * 4 + colIndex - 1;
      if (inputVatRef.current[prevCell] && prevCell >= 0) {
        inputVatRef.current[prevCell]?.focus();
        inputVatRef.current[prevCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      const nextCell = rowIndex * 4 + colIndex + 1;
      if (inputVatRef.current[nextCell] && colIndex < 3) {
        inputVatRef.current[nextCell]?.focus();
        inputVatRef.current[nextCell].setSelectionRange(0, 0);
      } else if (colIndex === 3 && rowIndex < stockItem.vatStockItemSubForm.length - 1) {
        const firstCellOfNextRow = (rowIndex + 1) * 4;
        inputVatRef.current[firstCellOfNextRow]?.focus();
        inputVatRef.current[firstCellOfNextRow].setSelectionRange(0, 0);
      }
    } else if (key === ' ') {
      if (
        e.target.name === 'vatDate' ||
        e.target.name === 'vatCode' ||
        e.target.name === 'vatPercentage'
      ) {
        e.preventDefault();
        const newRow = [...stockItem.vatStockItemSubForm];
        newRow[rowIndex][e.target.name] = '';
        setStockItem({ ...stockItem, vatStockItemSubForm: newRow });
      }
    }
  };

  // add new row function
  const addNewRowGodown = () => {
    setStockItem(prevState => {
      // Define the structure of a new row with conditional net-amount based on status value
      const newRow = {
        godownName: '',
        batchName: '',
        quantity: '',
        rateAmount: '',
        perUnit: prevState.units || '',
        netAmount: '',
      };
      return {
        ...prevState,
        godownSubForm: [...prevState.godownSubForm, newRow],
      };
    });
  };

  const handleKeyDownGodownSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior

      // Check if the current field is net-amount and its value is not empty
      const isNetAmount = e.target.name === 'netAmount';
      const isLastRowNetAmount = rowIndex === stockItem.godownSubForm.length - 1;

      const openingBalanceQuantity = parseFloat(stockItem.openingBalanceQuantity) || 0;
      const totalQuantity = parseFloat(stockItem.totalQuantity) || 0;

      // Check if openingBalanceQuantity equals or exceeds totalQuantity
      const isQuantityEqual = openingBalanceQuantity === totalQuantity;
      const isQuantityExceeded = totalQuantity > openingBalanceQuantity;

      // Alert the user if the total quantity exceeds the opening balance quantity
      if (isNetAmount && isLastRowNetAmount && e.target.value.trim() !== '') {
        if (isQuantityExceeded) {
          alert('Total Quantity exceeds Opening Balance Quantity. Please correct the quantities.');
          return; // Prevent adding a new row
        }

        // Prevent adding a new row if openingBalanceQuantity equals totalQuantity
        if (isQuantityEqual) {
          alert('Cannot add a new row because total quantity equals opening balance quantity.');
          totalRefs.current[0].focus();
          totalRefs.current[0].setSelectionRange(0, 0);
          return; // Prevent adding a new row
        }

        // At this point, we know that the quantity is valid and we can add a new row
        addNewRowGodown();
        setTimeout(() => {
          inputGodownRef.current[(rowIndex + 1) * 6]?.focus();
          inputGodownRef.current[(rowIndex + 1) * 6].setSelectionRange(0, 0);
        }, 0);
        return;
      }

      // Move to the next cell if not in the last row's net amount
      const nextCell = rowIndex * 6 + colIndex + 1;
      if (inputGodownRef.current[nextCell] && nextCell < inputGodownRef.current.length) {
        inputGodownRef.current[nextCell]?.focus();
        inputGodownRef.current[nextCell].setSelectionRange(0, 0);
      }
    } else if (key === 'Backspace') {
      // Remove the current row when Backspace is pressed on the last row
      if (e.target.value.trim() !== '') {
        e.preventDefault();
        const prevCell = rowIndex * 6 + colIndex - 1;
        if (inputGodownRef.current[prevCell] && prevCell >= 0) {
          inputGodownRef.current[prevCell]?.focus();
          inputGodownRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape') {
      // Clear the current row when Escape is pressed
      setGodownSubFormModal(false);
    } else if (key === 'ArrowUp') {
      // Move focus to the cell above (previous row, same column)
      if (rowIndex > 0) {
        const prevRowCell = (rowIndex - 1) * 6 + colIndex;
        inputGodownRef.current[prevRowCell]?.focus();
        inputGodownRef.current[prevRowCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowDown') {
      // Move focus to the cell below (next row, same column)
      if (rowIndex < stockItem.godownSubForm.length - 1) {
        const nextRowCell = (rowIndex + 1) * 6 + colIndex;
        inputGodownRef.current[nextRowCell]?.focus();
        inputGodownRef.current[nextRowCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowLeft') {
      // Move focus to the cell on the left (same row, previous column)
      if (colIndex > 0) {
        const leftCell = rowIndex * 6 + colIndex - 1;
        inputGodownRef.current[leftCell]?.focus();
        inputGodownRef.current[leftCell].setSelectionRange(0, 0);
      }
    } else if (key === 'ArrowRight') {
      // Move focus to the cell on the right (same row, next column)
      if (colIndex < 5) {
        // Assuming there are 6 columns, index 0 to 5
        const rightCell = rowIndex * 6 + colIndex + 1;
        inputGodownRef.current[rightCell]?.focus();
        inputGodownRef.current[rightCell].setSelectionRange(0, 0);
      }
    } else if (key === ' ') {
      if (e.target.name === 'quantity' || e.target.name === 'rateAmount') {
        e.preventDefault();
        const newRow = [...stockItem.godownSubForm];
        newRow[rowIndex][e.target.name] = '';
        setStockItem({ ...stockItem, godownSubForm: newRow });
      }
    }
  };

  const handleKeyDownTotal = (e, index) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (totalRefs.current[nextIndex]) {
        totalRefs.current[nextIndex].focus();
        totalRefs.current[nextIndex].setSelectionRange(0, 0);
      } else if (e.target.name === 'totalNetAmount') {
        const userConfirmed = window.confirm('Do you want to confirm this submit?');
        if (userConfirmed) {
          setGodownSubFormModal(false);
        }
      }
    } else if (key === 'Backspace' && e.target.value !== '') {
      e.preventDefault();
      const prevIndex = index - 1;
      if (prevIndex >= 0 && totalRefs.current[prevIndex]) {
        totalRefs.current[prevIndex].focus();
        totalRefs.current[prevIndex].setSelectionRange(0, 0);
      }
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      let updatedState = {
        ...prevState,
        [name]: value,
      };

      // Update the display for openingBalanceQuantity when units change
      if (name === 'units') {
        const unit = value; // Get the updated unit value
        updatedState.openingBalanceQuantityDisplay = `${
          prevState.openingBalanceQuantity || ''
        } ${unit}`.trim();
      }

      return updatedState;
    });

    if (name === 'under') {
      const filtered = stockGroupSuggestion.filter(group =>
        group.stockGroupName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredStockGroup(filtered);
      setUnderFocused(true);
      setHighlightedStockGroup(0); // Reset highlighted suggestion index
    } else if (name === 'category') {
      const filtered = stockCategorySuggestion.filter(category =>
        category.stockCategoryName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredStockCategory(filtered);
      setCategoryFocused(true);
      setHighlightedStockCategory(0); // Reset highlighted suggestion index
    } else if (name === 'units') {
      const filtered = unitSuggestion.filter(unit =>
        unit.unitSymbolName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredUnit(filtered);
      setUnitsFocused(true);
      setHighlightedUnit(0); // Reset highlighted suggestion index
    }
  };

  // Handle input changes for Standard Selling Price Subform
  const handleInputSellingPriceChange = (e, index) => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      const updatedSubForm = [...prevState.standardSellingPriceSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        [name]: value, // Update the specific field (name) with the new value
      };
      return {
        ...prevState,
        standardSellingPriceSubForm: updatedSubForm, // Update the subform array in the state
      };
    });
  };

  // Handle input changes for Standard Selling Cost Subform
  const handleInputSellingCostChange = (e, index) => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      const updatedSubForm = [...prevState.standardSellingCostSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        [name]: value, // Update the specific field (name) with the new value
      };
      return {
        ...prevState,
        standardSellingCostSubForm: updatedSubForm, // Update the subform array in the state
      };
    });
  };

  // Handle input changes for gst Subform
  const handleInputGstChange = (e, index) => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      const updatedGstSubForm = [...prevState.gstStockItemSubForm];
      updatedGstSubForm[index] = {
        ...updatedGstSubForm[index],
        [name]: value,
      };
      return {
        ...prevState,
        gstStockItemSubForm: updatedGstSubForm, // update the subform
      };
    });
  };

  // Handle input changes for vat Subform
  const handleInputVatChange = (e, index) => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      const updatedVatSubForm = [...prevState.vatStockItemSubForm];
      updatedVatSubForm[index] = {
        ...updatedVatSubForm[index],
        [name]: value,
      };
      return {
        ...prevState,
        vatStockItemSubForm: updatedVatSubForm, // update the subform
      };
    });
  };

  // Handle input changes for quantity Subform
  const handleInputGodownSubFormChange = (e, index) => {
    const { name, value } = e.target;

    setStockItem(prevState => {
      const updatedSubForm = [...prevState.godownSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        [name]: value, // Update the specific field (name) with the new value
      };

      if (name === 'godownName' && godownSuggestion) {
        const filtered = godownSuggestion.filter(godown =>
          godown.godownName.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredGodown(filtered);
        setGodownFocused(true);
        setHighlightedGodown(0); // Reset highlighted suggestion index
      } else if (name === 'batchName' && batchSuggestion) {
        const filtered = batchSuggestion.filter(batch =>
          batch.batchSerialNumber.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredBatch(filtered);
        setBatchFocused(true);
        setHighlightedBatch(0); // Reset highlighted suggestion index
      }
      return {
        ...prevState,
        godownSubForm: updatedSubForm, // Update the subform array in the state
      };
    });
  };

  const handleStockCategorySuggestionClick = stockCategory => {
    setStockItem(prev => ({
      ...prev,
      category: stockCategory.stockCategoryName,
    }));
    setCategoryFocused(false);

    // focus next input after selection
    inputRefs.current[4].focus();
    inputRefs.current[4].setSelectionRange(0, 0);
  };

  const handleStockGroupSuggestionClick = stockGroup => {
    setStockItem(prev => ({
      ...prev,
      under: stockGroup.stockGroupName,
    }));
    setUnderFocused(false);

    // focus next input after selection
    inputRefs.current[5].focus();
    inputRefs.current[5].setSelectionRange(0, 0);
  };

  const handleUnitSuggestionClick = unit => {
    setStockItem(prev => ({
      ...prev,
      units: unit.unitSymbolName,
      openingBalanceUnit: unit.unitSymbolName, // Set the selected unit to openingBalanceUnit
      godownSubForm: prev.godownSubForm.map(godown => ({
        ...godown,
        perUnit: unit.unitSymbolName, //  Set perUnit value in godownSubForm
      })),
    }));
    setUnitsFocused(false);

    // focus next input after selection
    inputRefs.current[6].focus();
    inputRefs.current[6].setSelectionRange(0, 0);
  };

  const handleGodownSuggestionClick = (selectedGodown, index) => {
    setStockItem(prevState => {
      const updatedSubForm = [...prevState.godownSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        godownName: selectedGodown.godownName, // Set the selected godown's name
      };

      return {
        ...prevState,
        godownSubForm: updatedSubForm, // Update the subform array in the state
      };
    });

    // Close the godown suggestion dropdown
    setGodownFocused(false);

    // Conditionally set focus based on batchApplicable
    if (stockItem.batchApplicable === 'yes') {
      if (inputGodownRef.current[1 + index * 6]) {
        inputGodownRef.current[1 + index * 6].focus();
        inputGodownRef.current[1 + index * 6].setSelectionRange(0, 0);
      }
    } else {
      if (inputGodownRef.current[2 + index * 6]) {
        inputGodownRef.current[2 + index * 6].focus();
        inputGodownRef.current[2 + index * 6].setSelectionRange(0, 0);
      }
    }

    // Optionally move focus to the next input field if needed
    if (inputGodownRef.current[1 + index * 6]) {
      inputGodownRef.current[1 + index * 6].focus();
      inputGodownRef.current[1 + index * 6].setSelectionRange(0, 0);
    }
  };

  const handleBatchSuggestionClick = (selectedBatch, index) => {
    setStockItem(prevState => {
      const updatedSubForm = [...prevState.godownSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        batchName: selectedBatch.batchSerialNumber, // Set the selected batch's number
      };
      return {
        ...prevState,
        godownSubForm: updatedSubForm, // Update the subform array in the state
      };
    });

    // Close the godown suggestion dropdown
    setBatchFocused(false);

    // Optionally move focus to the next input field if needed
    if (inputGodownRef.current[2 + index * 6]) {
      inputGodownRef.current[2 + index * 6].focus();
      inputGodownRef.current[2 + index * 6].setSelectionRange(0, 0);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if sundryCreditorName is filled
    if (!stockItem.stockItemName.trim()) {
      alert('Please fill in the stock item name');
      // Optionally focus on the sundryCreditorName input field
      inputRefs.current[0].focus();
      return; // stop the form submission
    }
    try {
      // Sanitize stockItem values to remove commas and ensure proper formatting
      const sanitizedStockItem = {
        ...stockItem,
        openingBalanceQuantity:
          parseFloat(stockItem.openingBalanceQuantity?.replace(/,/g, '')) || 0,
        openingBalanceRate: parseFloat(stockItem.openingBalanceRate?.replace(/,/g, '')) || 0,
        openingBalanceValue: parseFloat(stockItem.openingBalanceValue?.replace(/,/g, '')) || 0,
        totalQuantity: stockItem.totalQuantity?.replace(/,/g, '') || 0,
        totalNetAmount: parseFloat(stockItem.totalNetAmount?.replace(/,/g, '')) || 0,
        standardSellingPriceSubForm: stockItem.standardSellingPriceSubForm
          .filter(price => price.sellingPriceDate.trim() !== '')
          .map(price => ({
            ...price,
            sellingPriceRate: parseFloat(price.sellingPriceRate.replace(/,/g, '')) || 0,
            sellingPricePercentage: parseFloat(price.sellingPricePercentage.replace(/,/g, '')) || 0,
            sellingPriceNetRate: parseFloat(price.sellingPriceNetRate.replace(/,/g, '')) || 0,
          })),
        standardSellingCostSubForm: stockItem.standardSellingCostSubForm
          .filter(cost => cost.sellingCostDate.trim() !== '')
          .map(cost => ({
            ...cost,
            sellingCostRate: parseFloat(cost.sellingCostRate.replace(/,/g, '')) || 0,
            sellingCostPercentage: parseFloat(cost.sellingCostPercentage.replace(/,/g, '')) || 0,
            sellingCostNetRate: parseFloat(cost.sellingCostNetRate.replace(/,/g, '')) || 0,
          })),
        gstStockItemSubForm: stockItem.gstStockItemSubForm
          .filter(gst => gst.gstDate && gst.gstDate.trim() !== '')
          .map(gst => ({
            ...gst,
            hsnCode: isNaN(parseInt(gst.hsnCode.replace(/,/g, '')))
              ? 0
              : parseInt(gst.hsnCode.replace(/,/g, '')),
            gstPercentage: isNaN(parseFloat(gst.gstPercentage.replace(/,/g, '')))
              ? 0
              : parseFloat(gst.gstPercentage.replace(/,/g, '')),
          })),

        vatStockItemSubForm: stockItem.vatStockItemSubForm
          .filter(vat => vat.vatDate && vat.vatDate.trim() !== '')
          .map(vat => ({
            ...vat,
            vatCode: isNaN(parseInt(vat.vatCode.replace(/,/g, '')))
              ? 0
              : parseInt(vat.vatCode.replace(/,/g, '')),
            vatPercentage: isNaN(parseFloat(vat.vatPercentage.replace(/,/g, '')))
              ? 0
              : parseFloat(vat.vatPercentage.replace(/,/g, '')),
          })),

        godownSubForm: stockItem.godownSubForm.map(godown => ({
          ...godown,
          quantity: parseInt(godown.quantity.replace(/,/g, '')) || 0,
          rateAmount: parseFloat(godown.rateAmount.replace(/,/g, '')) || 0,
          netAmount: parseFloat(godown.netAmount.replace(/,/g, '')) || 0,
        })),
      };

      const response = await createStockItemMaster(sanitizedStockItem);
      console.log(response.data);
      // After the submit
      setStockItem({
        stockItemCode: '',
        stockItemName: '',
        under: '',
        category: '',
        units: '',
        standardSellingPrice: 'no',
        standardSellingPriceSubForm: [
          {
            sellingPriceDate: '',
            sellingPriceRate: '',
            sellingPricePercentage: '',
            sellingPriceNetRate: '',
            sellingPriceStatus: 'active',
          },
        ],
        standardSellingCost: 'no',
        standardSellingCostSubForm: [
          {
            sellingCostDate: '',
            sellingCostRate: '',
            sellingCostPercentage: '',
            sellingCostNetRate: '',
            sellingCostStatus: 'active',
          },
        ],
        gstApplicable: 'no',
        gstStockItemSubForm: [
          {
            gstDate: '',
            hsnCode: '',
            gstPercentage: '',
            gstStatus: 'active',
          },
        ],
        vatApplicable: 'no',
        vatStockItemSubForm: [
          {
            vatDate: '',
            vatCode: '',
            vatPercentage: '',
            vatStatus: 'active',
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
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const numberFormat = (e, index = null, formType = null) => {
    const { name, value } = e.target;
    // Remove existing commas and parse the value
    const rawValue = value.replace(/,/g, '');

    // Check if the value is a valid number
    if (isNaN(rawValue) || rawValue === '') return;

    // Format the number with commas
    const formattedValue = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(rawValue));

    // If formType is provided, update the subform
    if (formType !== null && index !== null) {
      setStockItem(prevStockItem => {
        const updatedSubForm = prevStockItem[formType].map((item, i) =>
          i === index ? { ...item, [name]: formattedValue } : item,
        );
        return {
          ...prevStockItem,
          [formType]: updatedSubForm,
        };
      });
    } else {
      // Otherwise, update the main stock item field
      setStockItem(prevStockItem => ({
        ...prevStockItem,
        [name]: formattedValue,
      }));
    }
  };

  const unitFormat = e => {
    const { name, value } = e.target; // Destructure name and value from the input event
    const rawValue = value.trim(); // Trim whitespace from the input value

    // Check if the trimmed value is a valid number (allow decimals and negative numbers)
    if (isNaN(rawValue) || rawValue === '') return; // Return if it's not a valid number or empty

    // Update the stock item state
    setStockItem(prevStockItem => {
      // Get the unit from the state if it exists, or use an empty string
      const unit = prevStockItem.units || '';

      // Return the updated state
      return {
        ...prevStockItem,
        [name]: rawValue, // Store the raw numerical value
        [`${name}Display`]: `${rawValue} ${unit}`.trim(), // Store display value with unit (e.g., "100 kg")
      };
    });
  };

  const handleUnitFormattedChange = e => {
    const unitValue = e.target.value.trim(); // Get and trim the value from the input

    // Use a regular expression to extract the numeric part from the formatted string
    const numericValue = unitValue.replace(/[^0-9.-]/g, ''); // Allow numbers, '.', and '-' only

    // Update the stockItem state
    setStockItem(prevState => {
      const unit = prevState.units || ''; // Get the unit from the state if it exists

      return {
        ...prevState,
        openingBalanceQuantity: numericValue, // Store the raw numeric value (e.g., "100")
        openingBalanceQuantityDisplay: `${numericValue} ${unit}`.trim(), // Store formatted display value with unit (e.g., "100 kg")
      };
    });
  };

  const calculateSellingPriceNetRate = index => {
    // Parse rate and percentage inputs from the current row
    const rate =
      parseFloat(stockItem.standardSellingPriceSubForm[index].sellingPriceRate.replace(/,/g, '')) ||
      0;
    const percentage =
      parseFloat(
        stockItem.standardSellingPriceSubForm[index].sellingPricePercentage.replace(/,/g, ''),
      ) || 0;

    // Check if both rate and percentage are valid numbers
    if (rate > 0 && percentage >= 0) {
      // Calculate the percentage of the rate and subtract it from the rate
      const discountAmount = (rate * percentage) / 100;
      const netRate = rate - discountAmount;

      // Format the net rate with commas and 2 decimal places
      const formattedNetRate = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(netRate);

      // Update the state with the calculated net rate
      setStockItem(prevState => {
        const updatedForm = [...prevState.standardSellingPriceSubForm];
        updatedForm[index].sellingPriceNetRate = formattedNetRate; // Update the net rate in the correct row
        return {
          ...prevState,
          standardSellingPriceSubForm: updatedForm,
        };
      });
    } else {
      // If the input is invalid, clear the net rate field
      setStockItem(prevState => {
        const updatedForm = [...prevState.standardSellingPriceSubForm];
        updatedForm[index].sellingPriceNetRate = '';
        return {
          ...prevState,
          standardSellingPriceSubForm: updatedForm,
        };
      });
    }
  };

  const calculateSellingCostNetRate = index => {
    // Parse rate and percentage inputs from the current row
    const rate =
      parseFloat(stockItem.standardSellingCostSubForm[index].sellingCostRate.replace(/,/g, '')) ||
      0;
    const percentage =
      parseFloat(
        stockItem.standardSellingCostSubForm[index].sellingCostPercentage.replace(/,/g, ''),
      ) || 0;

    // Check if both rate and percentage are valid numbers
    if (rate > 0 && percentage >= 0) {
      // Calculate the percentage of the rate and subtract it from the rate
      const discountAmount = (rate * percentage) / 100;
      const netRate = rate - discountAmount;

      // Format the net rate with commas and 2 decimal places
      const formattedNetRate = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(netRate);

      // Update the state with the calculated net rate
      setStockItem(prevState => {
        const updatedForm = [...prevState.standardSellingCostSubForm];
        updatedForm[index].sellingCostNetRate = formattedNetRate; // update the rate in the correct row
        return {
          ...prevState,
          standardSellingCostSubForm: updatedForm,
        };
      });
    } else {
      // If the input is invalid, clear the net rate field
      setStockItem(prevState => {
        const updatedForm = [...prevState.standardSellingCostSubForm];
        updatedForm[index].sellingCostNetRate = '';
        return {
          ...prevState,
          standardSellingCostSubForm: updatedForm,
        };
      });
    }
  };

  // Function to calculate the net amount for a specific godown subform entry
  const calculatenetAmountForGodown = index => {
    const updatedGodownSubForm = [...stockItem.godownSubForm];

    // Parse and clean quantity and rateAmount inputs
    const quantity = parseFloat(updatedGodownSubForm[index].quantity.replace(/,/g, '')) || 0;
    const rateAmount = parseFloat(updatedGodownSubForm[index].rateAmount.replace(/,/g, '')) || 0;

    // Check if both quantity and rateAmount are valid numbers
    if (quantity > 0 && rateAmount > 0) {
      // Calculate the netAmount by multiplying quantity and rateAmount
      const netAmount = (quantity * rateAmount).toFixed(2);

      // Format the netAmount with commas and 2 decimal places
      const formattedNetAmount = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(netAmount);

      // Update the state with the calculated and formatted netAmount
      setStockItem(prevState => {
        const updatedForm = [...prevState.godownSubForm];
        updatedForm[index].netAmount = formattedNetAmount; // update the netAmount in the correct row
        return {
          ...prevState,
          godownSubForm: updatedForm,
        };
      });
    } else {
      // If the input is invalid, clear the netAmount field
      setStockItem(prevState => {
        const updatedSubForm = [...prevState.godownSubForm];
        updatedSubForm[index].netAmount = '';
        return {
          ...prevState,
          godownSubForm: updatedSubForm,
        };
      });
    }
  };

  // useEffect to calculate totals whenever the godownSubForm changes
  useEffect(() => {
    const totalQuantity = stockItem.godownSubForm.reduce((total, row) => {
      const quantity = parseFloat(row.quantity.replace(/,/g, '')) || 0;
      return total + quantity;
    }, 0);

    const totalNetAmount = stockItem.godownSubForm.reduce((total, row) => {
      const netAmount = parseFloat(row.netAmount.replace(/,/g, '')) || 0; // assuming netAmount is in the correct format
      return total + netAmount;
    }, 0);

    // Format the total values with commas and two decimal places
    const formattedTotalQuantity = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalQuantity);

    const formattedTotalNetAmount = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalNetAmount);

    // Calculate opening balance rate (if totalQuantity is non-zero)
    const openingBalanceRate = totalQuantity > 0 ? (totalNetAmount / totalQuantity).toFixed(2) : '';

    // Update the stockItem state with the calculated totals
    setStockItem(prevState => ({
      ...prevState,
      totalQuantity: formattedTotalQuantity,
      totalNetAmount: formattedTotalNetAmount,
      openingBalanceValue: formattedTotalNetAmount,
      openingBalanceRate: openingBalanceRate,
    }));
  }, [stockItem.godownSubForm]); // Depend on changes in godownSubForm

  const percentageFormat = (e, index = null, formType = null) => {
    const { name, value } = e.target;
    // Remove existing percentage symbol
    const rawValue = value.replace('%', '').trim();

    // Check if the value is a valid number
    if (isNaN(rawValue) || rawValue === '') return;

    // Format the number
    const formattedValue = `${parseFloat(rawValue)}%`; // Keep two decimal places and add %

    // If formType is provided, update the subform
    if (formType !== null && index !== null) {
      setStockItem(prevStockItem => {
        const updatedSubForm = prevStockItem[formType].map((item, i) =>
          i === index ? { ...item, [name]: formattedValue } : item,
        );
        return {
          ...prevStockItem,
          [formType]: updatedSubForm,
        };
      });
    } else {
      // Otherwise, update the main stock item field
      setStockItem(prevStockItem => ({
        ...prevStockItem,
        [name]: formattedValue,
      }));
    }
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

      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthIndex = parseInt(month) - 1;
      const formattedDisplayDate = `${day}-${monthNames[monthIndex]}-${year}`;
      const convertedDate = `${year}-${month}-${day}`;

      setStockItem(prevState => {
        const updatedForexSubForm = [...prevState.standardSellingPriceSubForm];
        updatedForexSubForm[index] = {
          ...updatedForexSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]:
            formattedDisplayDate, // Save the formatted date (DD-MMM-YYYY format)
        };
        return {
          ...prevState,
          standardSellingPriceSubForm: updatedForexSubForm,
        };
      });
    }
  };

  const handleFormattedDateChange = (e, index, fieldName) => {
    const dateValue = e.target.value;

    // Update the sundryCreditor state for the specific row and field (forexDate or dueDate)
    setStockItem(prevState => {
      const updatedForexSubForm = [...prevState.standardSellingPriceSubForm];
      updatedForexSubForm[index] = {
        ...updatedForexSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue,
      };
      return {
        ...prevState,
        standardSellingPriceSubForm: updatedForexSubForm,
      };
    });
  };

  const dateConvertForSellingCost = (e, index) => {
    const dateValue = e.target.value;
    const fieldName = e.target.name; // forexDate or dueDate

    // Validate and format date
    const datePattern = /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/;
    if (datePattern.test(dateValue)) {
      let [_, day, month, year] = datePattern.exec(dateValue);

      if (year.length === 2) year = `20${year}`;
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');

      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthIndex = parseInt(month) - 1;
      const formattedDisplayDate = `${day}-${monthNames[monthIndex]}-${year}`;
      const convertedDate = `${year}-${month}-${day}`;

      setStockItem(prevState => {
        const updatedCostSubForm = [...prevState.standardSellingCostSubForm];
        updatedCostSubForm[index] = {
          ...updatedCostSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]:
            formattedDisplayDate, // Save the formatted date (DD-MMM-YYYY format)
        };
        return {
          ...prevState,
          standardSellingCostSubForm: updatedCostSubForm,
        };
      });
    }
  };

  const handleFormattedDateChangeForSellingCost = (e, index, fieldName) => {
    const dateValue = e.target.value;

    // Update the standardSellingCostSubForm state for the specific row and field (forexDate or dueDate)
    setStockItem(prevState => {
      const updatedCostSubForm = [...prevState.standardSellingCostSubForm];
      updatedCostSubForm[index] = {
        ...updatedCostSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue,
      };
      return {
        ...prevState,
        standardSellingCostSubForm: updatedCostSubForm,
      };
    });
  };

  const dateConvertForGst = (e, index) => {
    const dateValue = e.target.value;
    const fieldName = e.target.name; // gstDate

    // Validate and format date
    const datePattern = /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/;
    if (datePattern.test(dateValue)) {
      let [_, day, month, year] = datePattern.exec(dateValue);

      if (year.length === 2) year = `20${year}`;
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');

      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthIndex = parseInt(month) - 1;
      const formattedDisplayDate = `${day}-${monthNames[monthIndex]}-${year}`;
      const convertedDate = `${year}-${month}-${day}`;

      setStockItem(prevState => {
        const updatedGstSubForm = [...prevState.gstStockItemSubForm];
        updatedGstSubForm[index] = {
          ...updatedGstSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]:
            formattedDisplayDate, // Save the formatted date (DD-MMM-YYYY format)
        };

        return {
          ...prevState,
          gstStockItemSubForm: updatedGstSubForm,
        };
      });
    }
  };

  const handleFormattedDateChangeForGst = (e, index, fieldName) => {
    const dateValue = e.target.value;

    // Update the gstStockItemSubForm state for the specific row and field (gstDate)
    setStockItem(prevState => {
      const updatedGstSubForm = [...prevState.gstStockItemSubForm];
      updatedGstSubForm[index] = {
        ...updatedGstSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue,
      };
      return {
        ...prevState,
        gstStockItemSubForm: updatedGstSubForm,
      };
    });
  };

  // VAT Date Conversion Function
  const dateConvertForVat = (e, index) => {
    const dateValue = e.target.value;
    const fieldName = e.target.name; // vatDate

    // Validate and format date
    const datePattern = /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/;
    if (datePattern.test(dateValue)) {
      let [_, day, month, year] = datePattern.exec(dateValue);

      if (year.length === 2) year = `20${year}`;
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');

      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthIndex = parseInt(month) - 1;
      const formattedDisplayDate = `${day}-${monthNames[monthIndex]}-${year}`;
      const convertedDate = `${year}-${month}-${day}`;

      setStockItem(prevState => {
        const updatedVatSubForm = [...prevState.vatStockItemSubForm];
        updatedVatSubForm[index] = {
          ...updatedVatSubForm[index],
          [fieldName]: convertedDate, // Save the converted date (YYYY-MM-DD format)
          [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]:
            formattedDisplayDate, // Save the formatted date (DD-MMM-YYYY format)
        };

        return {
          ...prevState,
          vatStockItemSubForm: updatedVatSubForm,
        };
      });
    }
  };

  // Handle formatted VAT date change
  const handleFormattedDateChangeForVat = (e, index, fieldName) => {
    const dateValue = e.target.value;

    // Update the vatStockItemSubForm state for the specific row and field (vatDate)
    setStockItem(prevState => {
      const updatedVatSubForm = [...prevState.vatStockItemSubForm];
      updatedVatSubForm[index] = {
        ...updatedVatSubForm[index],
        [`formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]: dateValue,
      };
      return {
        ...prevState,
        vatStockItemSubForm: updatedVatSubForm,
      };
    });
  };

  return (
    <>
      <div className="flex">
        <LeftSideMenu />
        <form
          action=""
          className="border border-slate-500 w-[48.5%] h-[55vh] relative"
          onSubmit={handleSubmit}
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
              onChange={handleInputChange}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              onChange={handleInputChange}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="stockItemPrintingName" className="w-[40%]">
              Product Printing Name
            </label>
            <span>:</span>
            <input
              type="text"
              name="stockItemPrintingName"
              ref={input => (inputRefs.current[2] = input)}
              value={stockItem.stockItemPrintingName}
              onKeyDown={e => handleKeyDown(e, 2)}
              onChange={handleInputChange}
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="category" className="w-[40%]">
              Product Category
            </label>
            <span>:</span>
            <input
              type="text"
              name="category"
              ref={input => (inputRefs.current[3] = input)}
              value={stockItem.category}
              onKeyDown={e => handleKeyDownCategory(e, 3)}
              onChange={handleInputChange}
              onFocus={e => {
                setCategoryFocused(true);
                handleInputChange(e);
              }}
              onBlur={() => setCategoryFocused(false)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
            {categoryFocused && filteredStockCategory.length >= 0 && (
              <div className="w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0">
                <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                  <p>List of Categories</p>
                </div>
                <ul
                  className="suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize"
                  ref={stockCategoryOptionsRef}
                >
                  {filteredStockCategory.map((stockCategory, index) => (
                    <li
                      key={index}
                      tabIndex={0}
                      className={`pl-2 cursor-pointer hover:bg-yellow-200 ${
                        highlightedStockCategory === index ? 'bg-yellow-200' : ''
                      }`}
                      onClick={() => handleStockCategorySuggestionClick(stockCategory)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {stockCategory.stockCategoryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="under" className="w-[40%]">
              Product Group
            </label>
            <span>:</span>
            <input
              type="text"
              name="under"
              ref={input => (inputRefs.current[4] = input)}
              value={stockItem.under}
              onKeyDown={e => handleKeyDownGroup(e, 4)}
              onChange={handleInputChange}
              onFocus={e => {
                setUnderFocused(true);
                handleInputChange(e);
              }}
              onBlur={() => setUnderFocused(false)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
            {underFocused && filteredStockGroup.length >= 0 && (
              <div className="w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0">
                <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                  <p>List of Groups</p>
                </div>
                <ul
                  className="suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize"
                  ref={stockGroupOptionsRef}
                >
                  {filteredStockGroup.map((stockGroup, index) => (
                    <li
                      key={index}
                      tabIndex={0}
                      className={`pl-2 cursor-pointer hover:bg-yellow-200 ${
                        highlightedStockGroup === index ? 'bg-yellow-200' : ''
                      }`}
                      onClick={() => handleStockGroupSuggestionClick(stockGroup)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {stockGroup.stockGroupName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="units" className="w-[40%]">
              Unit of Measurement (UOM)
            </label>
            <span>:</span>
            <input
              type="text"
              name="units"
              ref={input => (inputRefs.current[5] = input)}
              value={stockItem.units}
              onKeyDown={e => handleKeyDownUnit(e, 5)}
              onChange={handleInputChange}
              onFocus={e => {
                setUnitsFocused(true);
                handleInputChange(e);
              }}
              onBlur={() => setUnitsFocused(false)}
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
            {unitsFocused && filteredUnit.length >= 0 && (
              <div className="w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0">
                <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                  <p>List of Units</p>
                </div>
                <ul
                  className="suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize"
                  ref={unitOptionsRef}
                >
                  {filteredUnit.map((unit, index) => (
                    <li
                      key={index}
                      tabIndex={0}
                      className={`pl-2  cursor-pointer hover:bg-yellow-200 ${
                        highlightedUnit === index ? 'bg-yellow-200' : ''
                      }`}
                      onClick={() => handleUnitSuggestionClick(unit)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {unit.unitSymbolName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="standardSellingPrice" className="w-[40%]">
              Standard Selling Price
            </label>
            <span>:</span>
            <input
              type="text"
              name="standardSellingPrice"
              ref={input => (inputRefs.current[6] = input)}
              value={stockItem.standardSellingPrice}
              onKeyDown={e => handleKeyDown(e, 6)}
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
                    <span>:</span>
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
                        <th className="pl-10">Rate</th>
                        <th className="pl-6">
                          Percentage <span>(%)</span>
                        </th>
                        <th className="pl-20">Net-Rate</th>
                        <th className="w-[50px]">Status</th>
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
                              onChange={e =>
                                handleFormattedDateChange(e, index, 'sellingPriceDate')
                              }
                              ref={input => (inputSellingPriceRef.current[0 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingPrice(e, index, 0)}
                              onBlur={e => {
                                dateConvert(e, index);
                              }}
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
                              onChange={e => handleInputSellingPriceChange(e, index)}
                              ref={input => (inputSellingPriceRef.current[1 + index * 5] = input)}
                              onKeyDown={e => {
                                handleKeyDownSellingPrice(e, index, 1);
                                calculateSellingPriceNetRate(index);
                              }}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              onBlur={e => {
                                numberFormat(e, index, 'standardSellingPriceSubForm');
                              }}
                              autoComplete="off"
                            />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPricePercentage"
                              value={row.sellingPricePercentage}
                              onChange={e => {
                                handleInputSellingPriceChange(e, index);
                                calculateSellingPriceNetRate(index);
                              }}
                              ref={input => (inputSellingPriceRef.current[2 + index * 5] = input)}
                              onKeyDown={e => {
                                handleKeyDownSellingPrice(e, index, 2);
                                calculateSellingPriceNetRate(index);
                              }}
                              onBlur={e => {
                                percentageFormat(e, index, 'standardSellingPriceSubForm');
                              }}
                              className="w-[40px] h-5 pl-1 ml-11 text-right font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              onBlur={e => {
                                numberFormat(e, index, 'standardSellingPriceSubForm');
                              }}
                              autoComplete="off"
                            />
                          </td>

                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingPriceStatus"
                              value={row.sellingPriceStatus}
                              onChange={e => handleInputSellingPriceChange(e, index)}
                              ref={input => (inputSellingPriceRef.current[4 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingPrice(e, index, 4)}
                              className="w-[70px] h-5 pl-1 ml-3 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
              ref={input => (inputRefs.current[7] = input)}
              value={stockItem.standardSellingCost}
              onKeyDown={e => handleKeyDown(e, 7)}
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
                      Allocations of Prodcut
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
                        <th>Date</th>
                        <th className="pl-10">Rate</th>
                        <th className="pl-6">
                          Percentage <span>(%)</span>
                        </th>
                        <th className="pl-20">Net-Rate</th>
                        <th className="w-[50px]">Status</th>
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
                              onChange={e =>
                                handleFormattedDateChangeForSellingCost(e, index, 'sellingCostDate')
                              }
                              ref={input => (inputSellingCostRef.current[0 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingCost(e, index, 0)}
                              onBlur={e => {
                                dateConvertForSellingCost(e, index, 0);
                              }}
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
                              onChange={e => handleInputSellingCostChange(e, index)}
                              ref={input => (inputSellingCostRef.current[1 + index * 5] = input)}
                              onKeyDown={e => {
                                handleKeyDownSellingCost(e, index, 1);
                                calculateSellingCostNetRate(index);
                              }}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              onBlur={e => {
                                numberFormat(e, index, 'standardSellingCostSubForm');
                              }}
                              autoComplete="off"
                            />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostPercentage"
                              value={row.sellingCostPercentage}
                              onChange={e => {
                                handleInputSellingCostChange(e, index);
                                calculateSellingCostNetRate(index);
                              }}
                              ref={input => (inputSellingCostRef.current[2 + index * 5] = input)}
                              onKeyDown={e => {
                                handleKeyDownSellingCost(e, index, 2);
                                calculateSellingCostNetRate(index);
                              }}
                              onBlur={e => {
                                percentageFormat(e, index, 'standardSellingCostSubForm');
                              }}
                              className="w-[40px] h-5 pl-1 font-medium text-[12px] text-right ml-11 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              onBlur={e => {
                                numberFormat(e, index, 'standardSellingCostSubForm');
                              }}
                              autoComplete="off"
                            />
                          </td>

                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="sellingCostStatus"
                              value={row.sellingCostStatus}
                              onChange={e => handleInputSellingCostChange(e, index)}
                              ref={input => (inputSellingCostRef.current[4 + index * 5] = input)}
                              onKeyDown={e => handleKeyDownSellingCost(e, index, 4)}
                              className="w-[70px] h-5 pl-1 ml-6 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
            <label htmlFor="stockItemMrp" className="w-[40%]">
              Product MRP
            </label>
            <span>:</span>
            <input
              type="text"
              name="stockItemMrp"
              ref={input => (inputRefs.current[8] = input)}
              value={stockItem.stockItemMrp}
              onKeyDown={e => handleKeyDown(e, 8)}
              onChange={handleInputChange}
              className="w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="gstApplicable" className="w-[40%]">
              GST Applicable
            </label>
            <span>:</span>
            <input
              type="text"
              name="gstApplicable"
              value={stockItem.gstApplicable}
              ref={input => (inputRefs.current[9] = input)}
              onKeyDown={e => handleKeyDown(e, 9)}
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
                        <th className="pr-16">Date</th>
                        <th className="w-[60px] pr-5">HSN Code</th>
                        <th>
                          Percentage <span>(%)</span>
                        </th>
                        <th className="w-[50px] pr-7">Status</th>
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
                              onChange={e => handleFormattedDateChangeForGst(e, index, 'gstDate')}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 0)}
                              onBlur={e => dateConvertForGst(e, index, 0)}
                              className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* hsn code Input */}
                          <td>
                            <input
                              type="text"
                              name="hsnCode"
                              value={row.hsnCode}
                              ref={input => (inputGstRef.current[1 + index * 4] = input)}
                              onChange={e => handleInputGstChange(e, index)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 1)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="gstPercentage"
                              value={row.gstPercentage}
                              ref={input => (inputGstRef.current[2 + index * 4] = input)}
                              onChange={e => handleInputGstChange(e, index)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 2)}
                              onBlur={e => {
                                percentageFormat(e, index, 'gstStockItemSubForm');
                              }}
                              className="w-[40px] h-5 pl-1 ml-24 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="gstStatus"
                              value={row.gstStatus}
                              ref={input => (inputGstRef.current[3 + index * 4] = input)}
                              onChange={e => handleInputGstChange(e, index)}
                              onKeyDown={e => handleKeyDownGstSubForm(e, index, 3)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
            <label htmlFor="vatApplicable" className="w-[40%]">
              VAT Applicable
            </label>
            <span>:</span>
            <input
              type="text"
              name="vatApplicable"
              value={stockItem.vatApplicable}
              ref={input => (inputRefs.current[10] = input)}
              onKeyDown={e => handleKeyDown(e, 10)}
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
                        <th className="pr-16">Date</th>
                        <th className="w-[60px] pr-5">VAT Code</th>
                        <th>
                          Percentage <span>(%)</span>
                        </th>
                        <th className="w-[50px] pr-7">Status</th>
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
                              onChange={e => handleFormattedDateChangeForVat(e, index, 'vatDate')}
                              ref={input => (inputVatRef.current[0 + index * 4] = input)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 0)}
                              onBlur={e => dateConvertForVat(e, index, 0)}
                              className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* vat code Input */}
                          <td>
                            <input
                              type="text"
                              name="vatCode"
                              value={row.vatCode}
                              ref={input => (inputVatRef.current[1 + index * 4] = input)}
                              onChange={e => handleInputVatChange(e, index)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 1)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* percentage Input */}
                          <td>
                            <input
                              type="text"
                              name="vatPercentage"
                              value={row.vatPercentage}
                              ref={input => (inputVatRef.current[2 + index * 4] = input)}
                              onChange={e => handleInputVatChange(e, index)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 2)}
                              onBlur={e => {
                                percentageFormat(e, index, 'vatStockItemSubForm');
                              }}
                              className="w-[40px] h-5 pl-1 ml-24 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* status Input */}
                          <td>
                            <input
                              type="text"
                              name="vatStatus"
                              value={row.vatStatus}
                              ref={input => (inputVatRef.current[3 + index * 4] = input)}
                              onChange={e => handleInputVatChange(e, index)}
                              onKeyDown={e => handleKeyDownVatSubForm(e, index, 3)}
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
            <label htmlFor="batchApplicable" className="w-[40%]">
              Batch Applicable
            </label>
            <span>:</span>
            <input
              type="text"
              name="batchApplicable"
              value={stockItem.batchApplicable}
              ref={input => (inputRefs.current[11] = input)}
              onKeyDown={e => handleKeyDown(e, 11)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          <div className="text-sm flex ml-2">
            <label htmlFor="stockItemAccountingLedger" className="w-[40%]">
              Product Accounting Ledger
            </label>
            <span>:</span>
            <input
              type="text"
              name="stockItemAccountingLedger"
              value={stockItem.stockItemAccountingLedger}
              ref={input => (inputRefs.current[12] = input)}
              onKeyDown={e => handleKeyDown(e, 12)}
              onChange={handleInputChange}
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />
          </div>
          {accountingLedgerSubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 opacity-90 z-10 flex justify-center items-center">
              <div className="bg-white w-[700px] h-[500px] border border-black">
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
                  <table className='border border-slate-400 w-full'>
                    <thead className='text-[12px]'>
                      <tr className='border-t border-b border-slate-400'>
                        <th>Purchase</th>
                        <th>Sales</th>
                        <th>Credit Note</th>
                        <th>Debit Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.accountingLedgerSubForm.map((row, index) => (
                        <tr>
                          {/* purchase input */}
                          <td>
                            <input
                              type="text"
                              name='accountingLedgerPurchase'
                              value={row.accountingLedgerPurchase}
                              ref={(input) => (inputAccountLedgerRef.current[0 + index * 4] = input)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* sales input */}
                          <td>
                            <input
                              type="text"
                              name='accountingLedgerSales'
                              value={row.accountingLedgerSales}
                              ref={(input) => (inputAccountLedgerRef.current[1 + index * 4] = input)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* credit note input */}
                          <td>
                            <input
                              type="text"
                              name='accountingLedgerCreditNote'
                              value={row.accountingLedgerCreditNote}
                              ref={(input) => (inputAccountLedgerRef.current[2 + index * 4] = input)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* debit note input */}
                          <td>
                            <input
                              type="text"
                              name='accountingLedgerDebitNote'
                              value={row.accountingLedgerDebitNote}
                              ref={(input) => (inputAccountLedgerRef.current[3 + index * 4] = input)}
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
          <div className="flex items-center text-sm font-bold mt-2">
            <p className="ml-[284px]">Quantity</p>
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
              value={stockItem.openingBalanceQuantityDisplay}
              onChange={handleUnitFormattedChange}
              ref={input => (inputRefs.current[13] = input)}
              onKeyDown={e => {
                handleKeyDown(e, 13);
                if (e.key === 'Enter') {
                  inputRefs.current[14].focus(); // Adjust the index based on your input structure
                }
              }}
              onBlur={e => unitFormat(e)}
              className="w-[75px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceRate" className=""></label>
            <input
              type="text"
              name="openingBalanceRate"
              value={stockItem.openingBalanceRate}
              onChange={handleInputChange}
              ref={input => (inputRefs.current[14] = input)}
              onKeyDown={e => handleKeyDown(e, 14)}
              onBlur={numberFormat}
              className="w-[76px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceUnit" className=""></label>
            <input
              type="text"
              name="openingBalanceUnit"
              value={stockItem.openingBalanceUnit}
              onChange={handleInputChange}
              ref={input => (inputRefs.current[15] = input)}
              onKeyDown={e => handleKeyDown(e, 15)}
              onBlur={numberFormat}
              className="w-[50px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceValue" className=""></label>
            <input
              type="text"
              name="openingBalanceValue"
              value={stockItem.openingBalanceValue}
              onChange={handleInputChange}
              ref={input => (inputRefs.current[16] = input)}
              onKeyDown={e => handleKeyDown(e, 16)}
              onBlur={numberFormat}
              className="w-[100px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
          </div>
          {/* Conditional rendering of the subform */}
          {godownSubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 z-10 flex justify-center items-center">
              <div className="bg-white w-[700px] h-[500px] border border-black">
                <div className="">
                  <div className="text-sm ml-5 mt-2 flex">
                    <label htmlFor="allocationsOf" className="w-[22%]">
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
                  <div className="text-sm ml-5 flex">
                    <label htmlFor="for" className="w-[22%]">
                      For
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="for"
                      value={stockItem.openingBalanceQuantityDisplay}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className="pr-8">Location</th>
                        {stockItem.batchApplicable === 'yes' && <th>Batch</th>}
                        <th className="pl-6">Quantity</th>
                        <th>Uom</th>
                        <th className="pl-5">Rate</th>
                        <th className="pl-24">Amount</th>
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
                              onChange={e => handleInputGodownSubFormChange(e, index)}
                              onKeyDown={e => handleKeyDownGodown(e, index)}
                              onFocus={e => {
                                setGodownFocused(true);
                                handleInputGodownSubFormChange(e, index);
                              }}
                              onBlur={() => setGodownFocused(false)}
                              className="w-[130px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                            {/* godown Suggestion Dropdown */}
                            {godownFocused && filteredGodown.length > 0 && (
                              <div
                                className="w-[20%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[983px] top-0"
                                onMouseDown={e => e.preventDefault()}
                              >
                                <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                                  <p>List of Godowns</p>
                                </div>
                                <ul
                                  className="suggestions w-full h-[87vh] text-left text-[12px] mt-2"
                                  ref={godownRef}
                                >
                                  {filteredGodown.map((godown, godownIndex) => (
                                    <li
                                      key={godownIndex}
                                      tabIndex={0}
                                      className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${
                                        highlightedGodown === godownIndex ? 'bg-yellow-200' : ''
                                      }`}
                                      onClick={() => handleGodownSuggestionClick(godown, index)}
                                    >
                                      {godown.godownName}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </td>

                          {/* batch Input */}
                          {stockItem.batchApplicable === 'yes' && (
                            <td>
                              <input
                                type="text"
                                name="batchName"
                                value={row.batchName}
                                ref={input => (inputGodownRef.current[1 + index * 6] = input)}
                                onChange={e => handleInputGodownSubFormChange(e, index)}
                                onKeyDown={e => handleKeyDownBatch(e, index)}
                                onFocus={e => {
                                  setBatchFocused(true);
                                  handleInputGodownSubFormChange(e, index);
                                }}
                                onBlur={() => setBatchFocused(false)}
                                className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                                autoComplete="off"
                              />
                              {/* batch Suggestion Dropdown */}
                              {batchFocused && filteredBatch.length > 0 && (
                                <div
                                  className="w-[20%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[983px] top-0"
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                                    <p>List of Batches</p>
                                  </div>
                                  <ul
                                    className="suggestions w-full h-[87vh] text-left text-[12px] mt-2"
                                    ref={batchRef}
                                  >
                                    {filteredBatch.map((batch, batchIndex) => (
                                      <li
                                        key={batchIndex}
                                        tabIndex={0}
                                        className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${
                                          highlightedBatch === batchIndex ? 'bg-yellow-200' : ''
                                        }`}
                                        onClick={() => handleBatchSuggestionClick(batch, index)}
                                      >
                                        {batch.batchSerialNumber}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </td>
                          )}

                          {/* quantity Input */}
                          <td>
                            <input
                              type="text"
                              name="quantity"
                              value={row.quantity}
                              ref={input => (inputGodownRef.current[2 + index * 6] = input)}
                              onChange={e => {
                                handleInputGodownSubFormChange(e, index);
                              }}
                              onKeyDown={e => {
                                handleKeyDownGodownSubForm(e, index, 2);
                                calculatenetAmountForGodown(index);
                              }}
                              className="w-[50px] h-5 pl-1 ml-4 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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
                              onChange={e => handleInputGodownSubFormChange(e, index)}
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
                              onChange={e => {
                                handleInputGodownSubFormChange(e, index);
                                calculatenetAmountForGodown(index);
                              }}
                              onKeyDown={e => {
                                handleKeyDownGodownSubForm(e, index, 4);
                                calculatenetAmountForGodown(index);
                              }}
                              className="w-[70px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              onBlur={e => {
                                numberFormat(e, index, 'godownSubForm');
                              }}
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
                              onBlur={e => {
                                numberFormat(e, index, 'godownSubForm');
                              }}
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex absolute top-[498px] left-[543px] border border-double border-t border-slate-400 border-l-0 border-r-0">
                  <p className="text-sm mt-1">Total</p>
                  <span className="ml-1">:</span>
                  <div>
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      name="totalQuantity"
                      value={stockItem.totalQuantity}
                      ref={input => (totalRefs.current[0] = input)}
                      onKeyDown={e => handleKeyDownTotal(e, 0)}
                      className="w-[50px] h-5 pl-1 ml-4 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      name="totalPerUnit"
                      value={stockItem.units}
                      ref={input => (totalRefs.current[1] = input)}
                      onKeyDown={e => handleKeyDownTotal(e, 1)}
                      className="w-[50px] h-5 pl-1 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      name="totalNetAmount"
                      value={stockItem.totalNetAmount}
                      ref={input => (totalRefs.current[2] = input)}
                      onKeyDown={e => handleKeyDownTotal(e, 2)}
                      className="w-[100px] h-5 pl-1 ml-[163px] font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                      autoComplete="off"
                      readOnly
                    />
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

export default StockItemCreate;
