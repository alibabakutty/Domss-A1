import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createStockItemMaster, listOfStockCategories, listOfStockGroups, listOfUnits } from '../services/MasterService';

const StockItemCreate = () => {

  const [stockItem, setStockItem] = useState({
    stockItemCode: '',
    stockItemName: '',
    under: '♦ primary',
    category: '♦ not applicable',
    units: '♦ not applicable',
    standardSellingPrice: 'no',
    standardSellingPriceSubForm: [
      {
        sellingPriceDate: '',
        sellingPriceRate: '',
        sellingPricePercentage: '',
        sellingPriceNetRate: '',
        sellingPriceStatus: '',
      }
    ],
    standardSellingCost: 'no',
    standardSellingCostSubForm: [
      {
        sellingCostDate: '',
        sellingCostRate: '',
        sellingCostPercentage: '',
        sellingCostNetRate: '',
        sellingCostStatus: '',
      },
    ],
    openingBalanceQuantity: '',
    openingBalanceRate: '',
    openingBalanceUnit: '',
    openingBalanceValue: ''
  });

  const [stockGroupSuggestion, setStockGroupSuggestion] = useState([]);
  const [stockCategorySuggestion, setStockCategorySuggestion] = useState([]);
  const [unitSuggestion, setUnitSuggestion] = useState([]);
  const [filteredStockGroup, setFilteredStockGroup] = useState([]);
  const [filteredStockCategory, setFilteredStockCategory] = useState([]);
  const [filteredUnit, setFilteredUnit] = useState([]);
  const [underFocused, setUnderFocused] = useState(false);
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [unitsFocused, setUnitsFocused] = useState(false);
  const [highlightedStockGroup, setHighlightedStockGroup] = useState(0);
  const [highlightedStockCategory, setHighlightedStockCategory] = useState(0);
  const [highlightedUnit, setHighlightedUnit] = useState(0);
  const [standardSellingPriceModal, setStandardSellingPriceModal] = useState(false);
  const [standardSellingCostModal, setStandardSellingCostModal] = useState(false);
  const inputRefs = useRef([]);
  const stockGroupOptionsRef = useRef(null);
  const stockCategoryOptionsRef = useRef(null);
  const unitOptionsRef = useRef(null);
  const inputSellingPriceRef = useRef([]);
  const inputSellingCostRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial focus if the input exists
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    if(standardSellingPriceModal && inputSellingPriceRef.current[0]){
      inputSellingPriceRef.current[0].focus();
    }

    if(standardSellingCostModal && inputSellingCostRef.current[0]){
      inputSellingCostRef.current[0].focus();
    }

    // Fetch stock categories and units concurrently
    const fetchData = async () => {
      try {
        const [stockGroupResponse, stockCategoryResponse, unitResponse] = await Promise.all([
          listOfStockGroups(),
          listOfStockCategories(),
          listOfUnits()
        ]);

        setStockGroupSuggestion(stockGroupResponse.data);
        setStockCategorySuggestion(stockCategoryResponse.data);
        setUnitSuggestion(unitResponse.data);
        
        // Optional: Remove console logs if not necessary
        console.log('Stock Groups:', stockGroupResponse.data);
        console.log('Stock Categories:', stockCategoryResponse.data);
        console.log('Units:', unitResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Optionally, you can return a cleanup function if needed
    return () => {
      // Clean up code here
    };
    
  }, [standardSellingPriceModal, standardSellingCostModal]);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      (e).preventDefault();
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
        } else if (e.target.name === 'openingBalanceValue'){
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed){
            handleSubmit(e);
          } else {
            (e).preventDefault();
          }
        }

        // Specific handling for 'standardsellingprice' input
        if (e.target.name === 'standardSellingPrice' && e.target.value.trim() === 'yes'){
          setStandardSellingPriceModal(true);
        } else if (e.target.name === 'standardSellingCost' && e.target.value.trim() === 'yes'){
          setStandardSellingCostModal(true);
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'standardSellingPrice'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        standardSellingPrice: value,
      });
    } else if (['y', 'n', 'Y', 'N'].includes(key) && e.target.name === 'standardSellingCost'){
      e.preventDefault();
      const value = key.toLowerCase() === 'y' ? 'yes' : 'no';
      setStockItem({
        ...stockItem,
        standardSellingCost: value,
      })
    } else if (key === 'Escape'){
      (e).preventDefault();
      navigate(-1);
    }
  };

  const handleKeyDownGroup = (e) => {
    const key = e.key;
  
    if (key === 'Enter') {
      e.preventDefault();
      if (filteredStockGroup.length > 0) {
        // Select the highlighted suggestion for stock group
        const selectedGroup = filteredStockGroup[highlightedStockGroup];
        handleStockGroupSuggestionClick(selectedGroup); // Define this function for handling the selection
        inputRefs.current[0].blur(); // Blur the input after selection
      }
    } else if (key === 'ArrowDown') {
      if (filteredStockGroup.length > 0) {
        e.preventDefault();
        setHighlightedStockGroup((prev) =>
          Math.min(prev + 1, filteredStockGroup.length - 1)
        );
      }
    } else if (key === 'ArrowUp') {
      if (filteredStockGroup.length > 0) {
        e.preventDefault();
        setHighlightedStockGroup((prev) =>
          Math.max(prev - 1, 0)
        );
      }
    } else if (key === 'Escape') {
      // Close the dropdown on Escape key
      setFilteredStockGroup([]);
      inputRefs.current[0].blur(); // Optionally blur the input field
    }
  };
  
  const handleKeyDownCategory = (e) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();
      if (filteredStockCategory.length > 0){
        // Select the highlighted suggestion for stock group
        const selectedCategory = filteredStockCategory[highlightedStockCategory];

        handleStockCategorySuggestionClick(selectedCategory);   // Define this function for handling the selection
        inputRefs.current[1].blur(); // Blur the input after selection
      }
    } else if (key === 'ArrowDown'){
      if (filteredStockCategory.length > 0){
        e.preventDefault();
        setHighlightedStockCategory((prev) =>
        Math.min(prev + 1, filteredStockCategory.length - 1)
        );
      }
    } else if (key === 'ArrowUp'){
      if (filteredStockCategory.length > 0){
        e.preventDefault();
        setHighlightedStockCategory((prev) =>
        Math.max(prev - 1, 0)
        );
      }
    } else if (key === 'Escape'){
      // Close the dropdown on Escape key
      setFilteredStockCategory([]);
      inputRefs.current[1].blur(); // Optionally blur the input field
    }
  }

  const handleKeyDownUnit = (e) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();
      if (filteredUnit.length > 0){
        // Select the highlighted suggestion for unit
        const selectedUnit = filteredUnit[highlightedUnit];
        handleUnitSuggestionClick(selectedUnit);   // Define this function for handling the selection
        inputRefs.current[2].blur(); // Blur the input after selection
      }
    } else if (key === 'ArrowDown'){
      if (filteredUnit.length > 0){
        e.preventDefault();
        setHighlightedUnit((prev) =>
          Math.min(prev + 1, filteredUnit.length - 1)
        );
      }
    } else if (key === 'ArrowUp'){
      if (filteredUnit.length > 0){
        e.preventDefault();
        setHighlightedUnit((prev) =>
          Math.max(prev - 1, 0)
        );
      }
    } else if (key === 'Escape'){
      // Close the dropdown on Escape key
      setFilteredUnit([]);
      inputRefs.current[2].blur(); // Optionally blur the input field
    }
  };

  // add new row function
  const addNewRowSellingPrice = () => {
    setStockItem((prevState) => {
      // Define the structure of a new row with conditional status based on status value
      const newRow = {
        sellingPriceDate: '',
        sellingPriceRate: '',
        sellingPricePercentage: '',
        sellingPriceNetRate: '',
        sellingPriceStatus: '',
      };
      return {
        ...prevState,
        standardSellingPriceSubForm: [...prevState.standardSellingPriceSubForm, newRow],
      }
    })
  };

  // add new row function
  const addNewRowSellingCost = () => {
    setStockItem((prevState) => {
      // Define the structure of a new row with conditional status based on status value
      const newRow = {
        sellingCostDate: '',
        sellingCostRate: '',
        sellingCostPercentage: '',
        sellingCostNetRate: '',
        sellingCostStatus: '',
      };
      return{
        ...prevState,
        standardSellingCostSubForm: [...prevState.standardSellingCostSubForm, newRow],
      }
    })
  };

  const handleKeyDownSellingPrice = (e, rowIndex, colIndex) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();   // Prevent default Enter key behavior

      // Check if the current field is sellingpricestatus and its value is not empty
      const isSellingPriceStatus = e.target.name === 'sellingPriceStatus';
      const isLastRowSelingPriceStatus = rowIndex === stockItem.standardSellingPriceSubForm.length - 1;

      // Add a new row when Enter is pressed on the last row sellingpricestatus with a value
      if (isSellingPriceStatus && e.target.value.trim() !== '' && isLastRowSelingPriceStatus){
        addNewRowSellingPrice();
        setTimeout(() => {
          inputSellingPriceRef.current[(rowIndex + 1) * 5]?.focus();
        }, 0);
        return;
      }

      // Move to the next cell
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (inputSellingPriceRef.current[nextCell] && nextCell < inputSellingPriceRef.current.length){
        inputSellingPriceRef.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace'){
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === ''){
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingPriceRef.current[prevCell] && prevCell >= 0){
          inputSellingPriceRef.current[prevCell].focus();
          inputSellingPriceRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      setStandardSellingPriceModal(false);
    }
  };

  const handleKeyDownSellingCost = (e, rowIndex, colIndex) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();    // Prevent default Enter key behavior

      // Check if the current field is sellingcoststatus and its value is not empty
      const isSellingCostStatus = e.target.name === 'sellingCostStatus';
      const isLastRowSelingCostStatus = rowIndex === stockItem.standardSellingCostSubForm.length - 1;

      // Add a new row when Enter is pressed on the last row sellingpricestatus with a value
      if (isSellingCostStatus && e.target.value.trim() !== '' && isLastRowSelingCostStatus){
        addNewRowSellingCost();
        setTimeout(() => {
          inputSellingCostRef.current[(rowIndex + 1) * 5]?.focus();
        }, 0);
        return;
      }

      // Move to the next cell
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (inputSellingCostRef.current[nextCell] && nextCell < inputSellingCostRef.current.length){
        inputSellingCostRef.current[nextCell]?.focus();
      }
    } else if (key === 'Backspace'){
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === ''){
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingCostRef.current[prevCell] && prevCell >= 0){
          inputSellingCostRef.current[prevCell].focus();
          inputSellingPriceRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      setStandardSellingCostModal(false);
    }
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    setStockItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'under'){
      const filtered = stockGroupSuggestion.filter(group => 
        group.stockGroupName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStockGroup(filtered);
      setUnderFocused(true);
      setHighlightedStockGroup(0);  // Reset highlighted suggestion index
    } else if (name === 'category'){
      const filtered = stockCategorySuggestion.filter(category =>
        category.stockCategoryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStockCategory(filtered);
      setCategoryFocused(true);
      setHighlightedStockCategory(0);  // Reset highlighted suggestion index
    } else if (name === 'units'){
      const filtered = unitSuggestion.filter(unit =>
        unit.unitSymbolName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUnit(filtered);
      setUnitsFocused(true);
      setHighlightedUnit(0);  // Reset highlighted suggestion index
    }
  };

  // Handle input changes for Standard Selling Price Subform
  const handleInputSellingPriceChange = (e, index) => {
    const { name,value } = e.target;

    setStockItem((prevState) => {
      const updatedSubForm = [...prevState.standardSellingPriceSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        [name]: value,    // Update the specific field (name) with the new value
      };
      return {
        ...prevState,
        standardSellingPriceSubForm: updatedSubForm,    // Update the subform array in the state
      }
    })
  };

  // Handle input changes for Standard Selling Cost Subform
  const handleInputSellingCostChange = (e, index) => {
    const { name,value } = e.target;

    setStockItem((prevState) => {
      const updatedSubForm = [...prevState.standardSellingCostSubForm];
      updatedSubForm[index] = {
        ...updatedSubForm[index],
        [name]: value,    // Update the specific field (name) with the new value
      };
      return {
        ...prevState,
        standardSellingCostSubForm: updatedSubForm,   // Update the subform array in the state
      }
    })
  };

  const handleStockCategorySuggestionClick = (stockCategory) => {
    setStockItem(prev => ({
      ...prev,
      category: stockCategory.stockCategoryName
    })
    );
    setCategoryFocused(false);

    // focus next input after selection
    inputRefs.current[3].focus();
    inputRefs.current[3].setSelectionRange(0, 0);
  };

  const handleStockGroupSuggestionClick = (stockGroup) => {
    setStockItem(prev => ({
      ...prev,
      under: stockGroup.stockGroupName
    }));
    setUnderFocused(false);

    // focus next input after selection
    inputRefs.current[4].focus();
    inputRefs.current[4].setSelectionRange(0, 0);
  };

  const handleUnitSuggestionClick = (unit) => {
    setStockItem(prev => ({
      ...prev,
      units: unit.unitSymbolName,
      openingBalanceUnit: unit.unitSymbolName  // Set the selected unit to openingBalanceUnit
    }));
    setUnitsFocused(false);

    // focus next input after selection
    inputRefs.current[5].focus();
    inputRefs.current[5].setSelectionRange(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if sundryCreditorName is filled
    if (!stockItem.stockItemName.trim()){
      alert("Please fill in the stock item name");
      // Optionally focus on the sundryCreditorName input field
      inputRefs.current[0].focus();
      return;  // stop the form submission
    }
    try {

      // Sanitize stockItem values to remove commas and ensure proper formatting
      const sanitizedStockItem = {
        ...stockItem,
        openingBalanceQuantity: parseFloat(stockItem.openingBalanceQuantity.replace(/,/g, '')) || 0,
        openingBalanceRate: parseFloat(stockItem.openingBalanceRate.replace(/,/g, '')) || 0,
        openingBalanceValue: parseFloat(stockItem.openingBalanceValue.replace(/,/g, '')) || 0
      };

      const response = await createStockItemMaster(sanitizedStockItem);
      console.log(response.data);
      // After the submit
      setStockItem({
        stockItemCode: '',
        stockItemName: '',
        under: '♦ primary',
        category: '♦ not applicable',
        units: '♦ not applicable',
        standardSellingPrice: 'no',
        standardSellingPriceSubForm: [
          {
            sellingPriceDate: '',
            sellingPriceRate: '',
            sellingPricePercentage: '',
            sellingPriceNetRate: '',
            sellingPriceStatus: '',
          }
        ],
        standardSellingCost: 'no',
        standardSellingCostSubForm: [
          {
            sellingCostDate: '',
            sellingCostRate: '',
            sellingCostPercentage: '',
            sellingCostNetRate: '',
            sellingCostStatus: '',
          },
        ],
        openingBalanceQuantity: '',
        openingBalanceRate: '',
        openingBalanceUnit: '',
        openingBalanaceValue: '',
      });
      if (inputRefs.current[0]){
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
      setStockItem((prevStockItem) => {
        const updatedSubForm = prevStockItem[formType].map((item, i) =>
          i === index ? { ...item, [name]: formattedValue } : item
        );
        return {
          ...prevStockItem,
          [formType]: updatedSubForm,
        };
      });
    } else {
      // Otherwise, update the main stock item field
      setStockItem((prevStockItem) => ({
        ...prevStockItem,
        [name]: formattedValue,
      }));
    }
  };  


  // useEffect to update openingBalanceValue whenever quantity or rate changes
  useEffect(() => {
    const quantity = parseFloat(stockItem.openingBalanceQuantity.replace(/,/g, '')) || 0;
    const rate = parseFloat(stockItem.openingBalanceRate.replace(/,/g, '')) || 0;
    const value = quantity * rate;

    // Format the value with commas
    const formattedValue = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    setStockItem((prevState) => ({
      ...prevState,
      openingBalanceValue: formattedValue,
    }));
  }, [stockItem.openingBalanceQuantity, stockItem.openingBalanceRate]);

  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[35vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
        <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="stockItemCode" className='w-[40%]'>Product Item Code</label>
            <span>:</span>
            <input type="text" name='stockItemCode' value={stockItem.stockItemCode} ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="stockItemName" className='w-[40%]'>Product Item Name</label>
            <span>:</span>
            <input type="text" name='stockItemName' ref={(input) => (inputRefs.current[1] = input)} value={stockItem.stockItemName} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="category" className='w-[40%]'>Stock Category</label>
            <span>:</span>
            <input type="text" name='category' ref={(input) => (inputRefs.current[2] = input)} value={stockItem.category} onKeyDown={(e) => handleKeyDownCategory(e, 2)} onChange={handleInputChange} onFocus={(e) => {setCategoryFocused(true); handleInputChange(e);}} onBlur={() => setCategoryFocused(false)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            {categoryFocused && filteredStockCategory.length > 0 && (
              <div className='w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Categories</p>
                </div>
                <ul className='suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize' ref={stockCategoryOptionsRef}>
                  {filteredStockCategory.map((stockCategory, index) => (
                    <li key={index} tabIndex={0} className={`pl-2 cursor-pointer hover:bg-yellow-200 ${highlightedStockCategory === index ? 'bg-yellow-200' : ''}`} onClick={() => handleStockCategorySuggestionClick(stockCategory)} onMouseDown={(e) => e.preventDefault()}>
                      {stockCategory.stockCategoryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[40%]'>Stock Group</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[3] = input)} value={stockItem.under} onKeyDown={(e) => handleKeyDownGroup(e, 3)} onChange={handleInputChange} onFocus={(e) => {setUnderFocused(true); handleInputChange(e);}} onBlur={() => setUnderFocused(false)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            {underFocused && filteredStockGroup.length > 0 && (
              <div className='w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Groups</p>
                </div>
                <ul className='suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize' ref={stockGroupOptionsRef}>
                  {filteredStockGroup.map((stockGroup, index) => (
                    <li key={index} tabIndex={0} className={`pl-2 cursor-pointer hover:bg-yellow-200 ${highlightedStockGroup === index ? 'bg-yellow-200' : ''}`} onClick={() => handleStockGroupSuggestionClick(stockGroup)} onMouseDown={(e) => e.preventDefault()}>
                      {stockGroup.stockGroupName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="units" className='w-[40%]'>Unit of Measurement (UOM)</label>
            <span>:</span>
            <input type="text" name='units' ref={(input) => (inputRefs.current[4] = input)} value={stockItem.units} onKeyDown={(e) => handleKeyDownUnit(e, 4)} onChange={handleInputChange} onFocus={(e) => {setUnitsFocused(true); handleInputChange(e);}} onBlur={() => setUnitsFocused(false)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
            {unitsFocused && filteredUnit.length > 0 && (
              <div className='w-[40%] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Units</p>
                </div>
                <ul className='suggestions w-full h-[75vh] text-left text-sm mt-2 capitalize' ref={unitOptionsRef}>
                  {filteredUnit.map((unit, index) => (
                    <li key={index} tabIndex={0} className={`pl-2  cursor-pointer hover:bg-yellow-200 ${highlightedUnit === index ? 'bg-yellow-200' : ''}`} onClick={() => handleUnitSuggestionClick(unit)} onMouseDown={(e) => e.preventDefault()}>
                      {unit.unitSymbolName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="standardSellingPrice" className='w-[40%]'>Standard Selling Price</label>
            <span>:</span>
            <input type="text" name='standardSellingPrice' ref={(input) => (inputRefs.current[5] = input)} value={stockItem.standardSellingPrice} onKeyDown={(e) => handleKeyDown(e, 5)} onChange={handleInputChange} className='w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>

          {standardSellingPriceModal && (
            <div className='fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10'>
              <div className='bg-white w-[650px] h-[500px] border border-black'>
                <div className='h-[470px] overflow-y-scroll'>
                  <div className='text-sm ml-5 mt-2 flex'>
                    <label htmlFor="allocationsOf" className='w-[15%]'>Allocations of</label>
                    <span>:</span>
                    <input type="text" name='allocationsOf' value={stockItem.stockItemName} className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                  </div>
                  <div className='text-sm ml-5 flex'>
                    <label htmlFor="for" className='w-[15%]'>for</label>
                    <span>:</span>
                    <input type="text" className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                  </div>
                  <table className='border border-slate-400 border-collapse w-full table-fixed'>
                    <thead className='text-[12px]'>
                      <tr className='border-t border-b border-slate-400'>
                        <th>Date</th>
                        <th>Rate</th>
                        <th>Percentage <span>(%)</span></th>
                        <th>Net-Rate</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.standardSellingPriceSubForm.map((row,index) => (
                        <tr key={index} className='leading-4'>
                          {/* date Input */}
                          <td>
                            <input type="text" name='sellingPriceDate' value={row.sellingPriceDate} onChange={(e) => handleInputSellingPriceChange(e, index)} ref={(input) => (inputSellingPriceRef.current[0 + index * 5] = input)} onKeyDown={e => handleKeyDownSellingPrice(e, index, 0)} className="w-[80px] h-5 pl-1 ml-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>

                          {/* rate Input */}
                          <td>
                            <input type="text" name='sellingPriceRate' value={row.sellingPriceRate} onChange={(e) => handleInputSellingPriceChange(e, index)} ref={(input) => (inputSellingPriceRef.current[1 + index * 5] = input)} onKeyDown={e => handleKeyDownSellingPrice(e, index, 1)} className="w-[80px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all" onBlur={(e) => {numberFormat(e, index, 'standardSellingPriceSubForm')}}  autoComplete="off" />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input type="text" name='sellingPricePercentage' value={row.sellingPricePercentage} onChange={(e) => handleInputSellingPriceChange(e, index)} ref={(input) => (inputSellingPriceRef.current[2 + index * 5] = input)} onKeyDown={e => handleKeyDownSellingPrice(e, index, 2)} className="w-[30px] h-5 pl-1 ml-11 text-right font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>

                          {/* net-rate Input */}
                          <td>
                            <input type="text" name='sellingPriceNetRate' value={row.sellingPriceNetRate} onChange={(e) => handleInputSellingPriceChange(e, index)} ref={(input) => (inputSellingPriceRef.current[3 + index * 5] = input)} onKeyDown={e => handleKeyDownSellingPrice(e, index, 3)} className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all" onBlur={(e) => {numberFormat(e, index, 'standardSellingPriceSubForm')}}  autoComplete="off" />
                          </td>

                          {/* status Input */}
                          <td>
                            <input type="text" name='sellingPriceStatus' value={row.sellingPriceStatus} onChange={(e) => handleInputSellingPriceChange(e, index)} ref={(input) => (inputSellingPriceRef.current[4 + index * 5] = input)} onKeyDown={e => handleKeyDownSellingPrice(e, index, 4)} className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize text-right pr-1 focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className='text-sm flex ml-2'>
            <label htmlFor="standardSellingCost" className='w-[40%]'>Standard Selling Cost</label>
            <span>:</span>
            <input type="text" name='standardSellingCost' ref={(input) => (inputRefs.current[6] = input)} value={stockItem.standardSellingCost} onKeyDown={(e) => handleKeyDown(e, 6)} onChange={handleInputChange} className='w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>

          {standardSellingCostModal && (
            <div className='fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10'>
              <div className='bg-white w-[650px] h-[500px] border border-black'>
                <div className='h-[470px] overflow-y-scroll'>
                  <div className='text-sm ml-5 mt-2 flex'>
                    <label htmlFor="allocationsOf" className='w-[15%]'>Allocations of</label>
                    <span>:</span>
                    <input type="text" name='allocationsOf' value={stockItem.stockItemName} className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                  </div>
                  <div className='text-sm ml-5 flex'>
                    <label htmlFor="for" className='w-[15%]'>for</label>
                    <span>:</span>
                    <input type="text" className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                  </div>
                  <table className='border border-slate-400 border-collapse w-full table-fixed'>
                    <thead className='text-[12px]'>
                      <tr className='border-t border-b border-slate-400'>
                        <th>Date</th>
                        <th>Rate</th>
                        <th>Percentage <span>(%)</span></th>
                        <th>Net-Rate</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.standardSellingCostSubForm.map((row,index) => (
                        <tr key={index} className='leading-4'>
                          {/* date Input */}
                          <td>
                            <input type="text" name='sellingCostDate' value={row.sellingCostDate} onChange={(e) => handleInputSellingCostChange(e, index)} ref={(input) => (inputSellingCostRef.current[0 + index * 5] = input)} onKeyDown={(e) => handleKeyDownSellingCost(e, index, 0)} className="w-[80px] h-5 pl-1 ml-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>

                          {/* rate Input */}
                          <td>
                            <input type="text" name='sellingCostRate' value={row.sellingCostRate} onChange={(e) => handleInputSellingCostChange(e, index)} ref={(input) => (inputSellingCostRef.current[1 + index * 5] = input)} onKeyDown={(e) => handleKeyDownSellingCost(e, index, 1)} className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all" onBlur={(e) => {numberFormat(e, index, 'standardSellingCostSubForm')}}  autoComplete="off" />
                          </td>

                          {/* percentage Input */}
                          <td>
                            <input type="text" name='sellingCostPercentage' value={row.sellingCostPercentage} onChange={(e) => handleInputSellingCostChange(e, index)} ref={(input) => (inputSellingCostRef.current[2 + index * 5] = input)} onKeyDown={(e) => handleKeyDownSellingCost(e, index, 2)} className="w-[30px] h-5 pl-1 font-medium text-[12px] text-right ml-11 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>

                          {/* net-rate Input */}
                          <td>
                            <input type="text" name='sellingCostNetRate' value={row.sellingCostNetRate} onChange={(e) => handleInputSellingCostChange(e, index)} ref={(input) => (inputSellingCostRef.current[3 + index * 5] = input)} onKeyDown={(e) => handleKeyDownSellingCost(e, index, 3)} className="w-[90px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all" onBlur={(e) => {numberFormat(e, index, 'standardSellingCostSubForm')}}  autoComplete="off" />
                          </td>

                          {/* status Input */}
                          <td>
                            <input type="text" name='sellingCostStatus' value={row.sellingCostStatus} onChange={(e) => handleInputSellingCostChange(e, index)} ref={(input) => (inputSellingCostRef.current[4 + index * 5] = input)} onKeyDown={(e) => handleKeyDownSellingCost(e, index, 4)} className="w-[90px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className='flex items-center text-sm font-bold mt-2'>
            <p className='ml-[284px]'>Quantity</p>
            <p className='ml-12'>Rate</p>
            <p className='ml-8'>Unit</p>
            <p className='ml-[50px]'>Value</p>
          </div>
          <div className='text-sm flex mt-1 ml-2 mb-1'>
            <p className='w-[40%]'>Opening Balance</p>
            <span>:</span>
            <label htmlFor="openingBalanceQuantity" className=''></label>
            <input type="text" name='openingBalanceQuantity' value={stockItem.openingBalanceQuantity} onChange={handleInputChange} ref={(input) => (inputRefs.current[7] = input)} onKeyDown={(e) => handleKeyDown(e, 7)} className='w-[75px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />

            <label htmlFor="openingBalanceRate" className=''></label>
            <input type="text" name='openingBalanceRate' value={stockItem.openingBalanceRate} onChange={handleInputChange} ref={(input) => (inputRefs.current[8] = input)} onKeyDown={(e) => handleKeyDown(e, 8)} onBlur={numberFormat} className='w-[76px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />

            <label htmlFor="openingBalanceUnit" className=''></label>
            <input type="text" name='openingBalanceUnit' value={stockItem.openingBalanceUnit} onChange={handleInputChange} ref={(input) => (inputRefs.current[9] = input)} onKeyDown={(e) => handleKeyDown(e, 9)} onBlur={numberFormat} className='w-[50px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />

            <label htmlFor="openingBalanceValue" className=''></label>
            <input type="text" name='openingBalanceValue' value={stockItem.openingBalanceValue} onChange={handleInputChange} ref={(input) => (inputRefs.current[10] = input)} onKeyDown={(e) => handleKeyDown(e, 10)} onBlur={numberFormat} className='w-[80px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default StockItemCreate