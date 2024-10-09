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
  const [godownSubFormModal, setGodownSubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const inputSellingPriceRef = useRef([]);
  const inputSellingCostRef = useRef([]);
  const inputGodownRef = useRef([]);
  const prevSellingPriceModal = useRef(false);
  const prevSellingCostModal = useRef(false);
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
            console.log('fetched selling price subform:', fetchedSellingPriceSubForm);
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
            console.log('fetched selling cost subform:', fetchedSellingCostSubForm);
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
            console.log('fetched godown subform:', godownSubForm);
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
    } else if (godownSubFormModal && inputGodownRef.current[0]) {
      inputGodownRef.current[0].focus();
    }
  
    // Handle focus when specific modals close
    if (prevSellingPriceModal.current && !standardSellingPriceModal) {
      focusInputByName('standardSellingCost');
    }
  
    if (prevSellingCostModal.current && !standardSellingCostModal) {
      focusInputByName('openingBalanceQuantity');
    }
  
    if (prevGodownModal.current && !godownSubFormModal) {
      focusInputByName('openingBalanceRate');
    }
  
    // Update the previous modal state values
    prevSellingPriceModal.current = standardSellingPriceModal;
    prevSellingCostModal.current = standardSellingCostModal;
    prevGodownModal.current = godownSubFormModal;
  }, [standardSellingPriceModal, standardSellingCostModal, godownSubFormModal]);  

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
            inputSellingPriceRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus if user chooses not to close
            return;
          }
        }
      }
  
      // Move to the next cell
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (
        inputSellingPriceRef.current[nextCell] &&
        nextCell < inputSellingPriceRef.current.length
      ) {
        inputSellingPriceRef.current[nextCell]?.focus(); // Focus on the next input
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingPriceRef.current[prevCell] && prevCell >= 0) {
          inputSellingPriceRef.current[prevCell]?.focus();
          inputSellingPriceRef.current[prevCell]?.setSelectionRange(0, 0); // Set cursor to the beginning
        }
      }
    } else if (key === 'Escape') {
      // Close the modal on Escape key
      setStandardSellingPriceModal(false);
    }
  };    

  const handleKeyDownSellingCost = (e, rowIndex, colIndex) => {
    const key = e.key;
    const inputName = e.target.name;
  
    // Find all 'sellingCostStatus' inputs
    const statusInputs = inputSellingCostRef.current.filter(input => input?.name === 'sellingCostStatus');
    const isLastStatusInput = statusInputs.length - 1 === rowIndex; // Check if it's the last 'sellingCostStatus' input
  
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
            inputSellingCostRef.current[rowIndex * 5 + colIndex]?.focus(); // Refocus if user chooses not to close
            return;
          }
        }
      }
  
      // Move to the next cell
      const nextCell = rowIndex * 5 + colIndex + 1;
      if (
        inputSellingCostRef.current[nextCell] &&
        nextCell < inputSellingCostRef.current.length
      ) {
        inputSellingCostRef.current[nextCell]?.focus(); // Focus on the next input
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input if the current input is empty
      if (e.target.value.trim() === '') {
        e.preventDefault();
        const prevCell = rowIndex * 5 + colIndex - 1;
        if (inputSellingCostRef.current[prevCell] && prevCell >= 0) {
          inputSellingCostRef.current[prevCell]?.focus();
          inputSellingCostRef.current[prevCell]?.setSelectionRange(0, 0); // Set cursor to the beginning
        }
      }
    } else if (key === 'Escape') {
      // Close the modal on Escape key
      setStandardSellingCostModal(false);
    }
  };  

  const handleKeyDownGodownSubForm = (e, rowIndex, colIndex) => {
    const key = e.key;

    if (key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior

      // Move to the next cell
      const nextCell = rowIndex * 6 + colIndex + 1;
      if (inputGodownRef.current[nextCell] && nextCell < inputGodownRef.current.length) {
        inputGodownRef.current[nextCell]?.focus();
      } else {
        totalRefs.current[0]?.focus();
      }
    } else if (key === 'Backspace') {
      // Remove the current row when Backspace is pressed on the last row
      if (e.target.value.trim() === '') {
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
          className="border border-slate-500 w-[42.5%] h-[35vh] absolute left-[47.5%]"
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
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />
          </div>

          {standardSellingPriceModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div className="h-[470px] overflow-y-scroll">
                  <div className="text-sm ml-5 mt-2 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[15%]">
                      Allocations of
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                        <th className='pl-8'>Net-Rate</th>
                        <th>Status</th>
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
                              className="w-[100px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              
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
                              onBlur={e => {
                                percentageFormat(e, index, 'standardSellingPriceSubForm')
                              }}
                              className="w-[40px] h-5 pl-1 ml-11 text-right font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[190px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              
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
                              className="w-[70px] h-5 pl-1 ml-3 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              className="w-[40px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />
          </div>

          {standardSellingCostModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 flex justify-center items-center z-10">
              <div className="bg-white w-[600px] h-[500px] border border-black">
                <div className="h-[470px] overflow-y-scroll">
                  <div className="text-sm ml-5 mt-2 mb-1 flex">
                    <label htmlFor="allocationsOf" className="w-[15%]">
                      Allocations of
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 border-collapse w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th>Date</th>
                        <th className='pl-10'>Rate</th>
                        <th className='pl-6'>
                          Percentage <span>(%)</span>
                        </th>
                        <th className='pl-8'>Net-Rate</th>
                        <th>Status</th>
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
                              className="w-[100px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize text-right focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              
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
                              onBlur={e => {
                                percentageFormat(e, index, 'standardSellingCostSubForm')
                              }}
                              className="w-[40px] h-5 pl-1 font-medium text-[12px] text-right ml-11 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[190px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                              
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
                              className="w-[70px] h-5 pl-1 ml-6 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
              value={stockItem.openingBalanceQuantity}
              
              ref={input => (inputRefs.current[7] = input)}
              onKeyDown={e => {handleKeyDown(e, 7);
              }}
              // onBlur={(e) => unitFormat(e)}
              className="w-[75px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceRate" className=""></label>
            <input
              type="text"
              name="openingBalanceRate"
              value={stockItem.openingBalanceRate}
              readOnly
              ref={input => (inputRefs.current[8] = input)}
              onKeyDown={e => handleKeyDown(e, 8)}
              
              className="w-[76px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceUnit" className=""></label>
            <input
              type="text"
              name="openingBalanceUnit"
              value={stockItem.openingBalanceUnit}
              readOnly
              ref={input => (inputRefs.current[9] = input)}
              onKeyDown={e => handleKeyDown(e, 9)}
              
              className="w-[50px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
              autoComplete="off"
            />

            <label htmlFor="openingBalanceValue" className=""></label>
            <input
              type="text"
              name="openingBalanceValue"
              value={stockItem.openingBalanceValue}
              ref={input => (inputRefs.current[10] = input)}
              onKeyDown={e => handleKeyDown(e, 10)}
              
              className="w-[100px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    <label htmlFor="allocationsOf" className="w-[15%]">
                      Allocations of
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="allocationsOf"
                      value={stockItem.stockItemName}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                      autoComplete="off"
                    />
                  </div>
                  <div className="text-sm ml-5 flex">
                    <label htmlFor="for" className="w-[15%]">
                      for
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      name="for"
                      value={stockItem.openingBalanceQuantity}
                      className="w-[200px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                      autoComplete="off"
                    />
                  </div>
                  <table className="border border-slate-400 w-full">
                    <thead className="text-[12px]">
                      <tr className="border-t border-b border-slate-400">
                        <th className='w-[20%]'>Location</th>
                        <th>Batch</th>
                        <th>Quantity</th>
                        <th>Uom</th>
                        <th>Rate</th>
                        <th>Amount</th>
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
                              className="w-[130px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-full h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[60px] h-5 pl-1 ml-4 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[50px] h-5 pl-1 ml-3 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                              className="w-[70px] h-5 pl-1 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
                        
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
                              className="w-full h-5 pl-1 font-medium text-[12px] text-right pr-1 capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"
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
                    <input type="text" name='totalQuantity' value={stockItem.totalQuantity} ref={(input) => (totalRefs.current[0] = input)} onKeyDown={e => handleKeyDownTotal(e, 0)} className="w-[50px] h-5 pl-1 ml-4 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" readOnly />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input type="text" name='totalPerUnit' value={stockItem.units} ref={(input) => (totalRefs.current[1] = input)} onKeyDown={e => handleKeyDownTotal(e, 1)} className="w-[40px] h-5 pl-1 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" readOnly />
                  </div>
                  <div>
                    <label htmlFor=""></label>
                    <input type="text" name='totalNetAmount' value={stockItem.totalNetAmount} ref={(input) => (totalRefs.current[2] = input)} onKeyDown={e => handleKeyDownTotal(e, 2)} className="w-[110px] h-5 pl-1 ml-[163px] font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all"  autoComplete="off" readOnly />
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