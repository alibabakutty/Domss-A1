import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import { createPriceCategoryMaster, listOfStockItems } from '../services/MasterService';

const PriceCategoryCreate = () => {
  const [priceCategory, setPriceCategory] = useState({
    priceCategoryName: '',
    priceCategorySubForm: [
      {
        serialNumber: '',
        productCode: '',
        productName: '',
        productMrp: '',
        productRate: '',
        productDiscount: '',
      },
    ]
  });

  const [productItemSuggestion, setProductItemSuggestion] = useState([]);
  const [filteredProductCode, setFilteredProductCode] = useState([]);
  const [productCodeFocused, setproductCodeFocused] = useState(false);
  const [highlightedProductCode, setHighlightedProductCode] = useState(0);
  const [priceCategorySubFormModal, setPriceCategorySubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const inputRetailRef = useRef([]);
  const inputProductCodeRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    if (priceCategorySubFormModal && inputRetailRef.current[0]){
      inputRetailRef.current[0].focus();
      inputRetailRef.current[0].setSelectionRange(0, 0);
    }

    listOfStockItems()
      .then(response => {
        console.log(response.data);
        setProductItemSuggestion(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [priceCategorySubFormModal]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPriceCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault(); // Prevent default form submission on Enter

      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefs.current.length) {
          // Move to the next field if the current field is not the last one
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
        }

        // Specific handling for input
        if (e.target.name === 'priceCategoryName' && e.target.value.trim() !== '') {
          setPriceCategorySubFormModal(true);
        }
      }
    } else if (key === 'Backspace') {
      const input = inputRefs.current[index];
      const value = input.value;
      const cursorPosition = input.selectionStart;
      if (cursorPosition === 0 && value.length !== 0) {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      } else if (e.target.value !== '') {
        return;
      } else {
        const prevField = index - 1;
        if (inputRefs.current[prevField]) {
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
          e.preventDefault();
        }
      }
    } else if (key === 'Escape') {
      navigate('/');
    }
  };

  // add new row function
  const addNewRetail = () => {
    setPriceCategory(prevState => {
      const newRowRetail = {
        serialNumber: '',
        productCode: '',
        productName: '',
        productMrp: '',
        productRate: '',
        productDiscount: '',
      };
      return {
        ...prevState,
        priceCategorySubForm: [...prevState.priceCategorySubForm, newRowRetail],
      };
    });
  };

  const handleKeyDownRetail = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstSerialNumber = 0;
    const inputsPerRow = 6; // Number of inputs per row
  
    // Handle Enter key
    if (key === 'Enter') {
      e.preventDefault();
  
      // If the first column (Serial Number) is empty, alert user and keep focus
      if (rowIndex === 0 && colIndex === firstSerialNumber && e.target.value.trim() === '') {
        alert('Please enter the serial number before proceeding.');
        inputRetailRef.current[rowIndex * inputsPerRow + colIndex]?.focus();
        inputRetailRef.current[rowIndex * inputsPerRow + colIndex].setSelectionRange(0, 0);
        return;
      }
  
      // If the current Serial Number is empty and it's not the first row, ask for confirmation to exit
      if (colIndex === firstSerialNumber && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmation = window.confirm('Do you want to close this subform?');
        if (confirmation) {
          handleSubmit(e);
          navigate(-1);
        } else {
          inputRetailRef.current[rowIndex * inputsPerRow + colIndex]?.focus();
          inputRetailRef.current[rowIndex * inputsPerRow + colIndex].setSelectionRange(0, 0);
          return;
        }
      }
  
      const isLastColumn = colIndex === inputsPerRow - 1; // Check if it's the last column
      const isLastRow = rowIndex === priceCategory.priceCategorySubForm.length - 1;
  
      // If on the last column (Discount) and the last row, add a new row on Enter
      if (isLastColumn && isLastRow && e.target.value.trim() !== '') {
        addNewRetail();
        setTimeout(() => {
          inputRetailRef.current[(rowIndex + 1) * inputsPerRow]?.focus();
        }, 0);
        return;
      }
  
      // Move focus to the next cell (if it exists)
      const nextCell = rowIndex * inputsPerRow + colIndex + 1;
      if (inputRetailRef.current[nextCell]) {
        inputRetailRef.current[nextCell].focus();
        inputRetailRef.current[nextCell].setSelectionRange(0, 0);
      }
    }
  
    // Handle Backspace key
    else if (key === 'Backspace') {
      // If the input is empty, move focus to the previous cell
      if (e.target.value.trim() !== '') {
        e.preventDefault();
        const prevCell = rowIndex * inputsPerRow + colIndex - 1;
        if (inputRetailRef.current[prevCell] && prevCell >= 0) {
          inputRetailRef.current[prevCell].focus();
          inputRetailRef.current[prevCell].setSelectionRange(0, 0);
        }
      }
    }
  
    // Handle Escape key to navigate back
    else if (key === 'Escape') {
      navigate(-1);
    }
  };
  
  const handleKeyDownproductCode = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();
      if (filteredProductCode.length > 0){
        const selectedProductCode = filteredProductCode[highlightedProductCode];
        handleproductCodeSuggestionClick(selectedProductCode, index);
        inputRetailRef.current[index * 6].blur();
      }
    } else if (key === 'ArrowDown'){
      if (filteredProductCode.length > 0){
        e.preventDefault();
        setHighlightedProductCode(prev => Math.min(prev + 1, filteredProductCode.length - 1));
      }
    } else if (key === 'ArrowUp'){
      if (filteredProductCode.length > 0){
        e.preventDefault();
        setHighlightedProductCode(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const handleInputChangeRetail = (e, index) => {
    const { name, value } = e.target;
    setPriceCategory(prevState => {
      const updatedForm = [...prevState.priceCategorySubForm];
      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      if (name === 'productCode') {
        const filtered = productItemSuggestion.filter(product =>
          product.stockItemCode.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredProductCode(filtered);
        setproductCodeFocused(true);
        setHighlightedProductCode(0);
      }
      return {
        ...prevState,
        priceCategorySubForm: updatedForm, // update the subform
      };
    });
  };

  const handleproductCodeSuggestionClick = (selectedProductCode, index) => {
    setPriceCategory(prevState => {
      const updatedForm = [...prevState.priceCategorySubForm];
  
      // Set the selected stock item details
      updatedForm[index] = {
        ...updatedForm[index],
        productCode: selectedProductCode.stockItemCode,
        productName: selectedProductCode.stockItemPrintingName,
        productMrp: selectedProductCode.stockItemMrp, // Set the stockItemMrp first
      };
  
      return {
        ...prevState,
        priceCategorySubForm: updatedForm, // Update the form with selected stock item
      };
    });
  
    // Call numberFormat to format the productMrp after it's set
    numberFormat({
      target: {
        name: "productMrp",
        value: selectedProductCode.stockItemMrp.toString(), // Ensure value is string
      }
    }, index, 'priceCategorySubForm');
  
    // Close the productCode suggestion dropdown
    setproductCodeFocused(false);
  
    // Optionally move focus to the next input field if needed
    const nextInputIndex = index * 6 + 4; // Adjust the index based on the column
    if (inputRetailRef.current[nextInputIndex]) {
      inputRetailRef.current[nextInputIndex].focus();
      inputRetailRef.current[nextInputIndex].setSelectionRange(0, 0);
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
      setPriceCategory(prevPriceCategory => {
        const updatedSubForm = prevPriceCategory[formType].map((item, i) =>
          i === index ? { ...item, [name]: formattedValue } : item,
        );
        return {
          ...prevPriceCategory,
          [formType]: updatedSubForm,
        };
      });
    } else {
      // Otherwise, update the main stock item field
      setPriceCategory(prevPriceCategory => ({
        ...prevPriceCategory,
        [name]: formattedValue,
      }));
    }
  };

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
      setPriceCategory(prevPriceCategory => {
        const updatedSubForm = prevPriceCategory[formType].map((item, i) =>
          i === index ? { ...item, [name]: formattedValue } : item,
        );
        return {
          ...prevPriceCategory,
          [formType]: updatedSubForm,
        };
      });
    } else {
      // Otherwise, update the main stock item field
      setPriceCategory(prevPriceCategory => ({
        ...prevPriceCategory,
        [name]: formattedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim the priceCategoryName and check if it's empty
    const trimmedPriceCategoryName = priceCategory.priceCategoryName.trim();

    if (!trimmedPriceCategoryName) {
        console.error("Price Category Name is required.");
        // Optionally, you can set an error state to display an error message in your UI
        return; // Prevent form submission
    }

    try {
      const sanitizedPriceCategory = {
        ...priceCategory,
        priceCategoryName: trimmedPriceCategoryName,
        priceCategorySubForm: priceCategory.priceCategorySubForm
        .filter(price => price.serialNumber.trim() !== '')
        .map(price => ({
          ...price,
          serialNumber: isNaN(parseInt(price.serialNumber.replace(/,/g, ''))) ? 0 : parseFloat(price.serialNumber.replace(/,/g, '')),
          productMrp: parseFloat(price.productMrp.replace(/,/g, '')) || 0,
          productRate: parseFloat(price.productRate.replace(/,/g, '')) || 0,
          productDiscount: parseFloat(price.productDiscount.replace(/,/g, '')) || 0,
        })) 
      }

      const response = await createPriceCategoryMaster(sanitizedPriceCategory);
      console.log(response.data);

      // Reset form fields after successful submission
      setPriceCategory({
        priceCategoryName: '',
        priceCategorySubForm: [
          {
            serialNumber: '',
            productCode: '',
            productName: '',
            productMrp: '',
            productRate: '',
            productDiscount: '',
          },
        ]
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <LeftSideMenu />
        <form className="border border-slate-500 w-[48.5%] h-[10vh] relative" onSubmit={handleSubmit}>
          <div className="text-sm pl-3 mt-2 flex">
            <label htmlFor="priceCategoryName" className="w-[25%]">
              Price Category
            </label>
            <span>:</span>
            <input
              type="text"
              id="priceCategoryName"
              name="priceCategoryName"
              value={priceCategory.priceCategoryName}
              ref={input => (inputRefs.current[0] = input)}
              onChange={handleInputChange}
              onKeyDown={e => handleKeyDown(e, 0)}
              className="w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border"
              autoComplete="off"
            />
          </div>
          {priceCategorySubFormModal && (
            <div className="fixed top-[44px] right-[137px] bottom-0 left-0 bg-slate-300 bg-opacity-90 z-10 flex justify-center items-center">
              <div className="bg-white w-[700px] h-[500px] border border-black">
                <div>
                  <div className="text-sm ml-5 mt-2 mb-1">
                    <label htmlFor="priceCategoryName">Price Category</label>
                    <span className='ml-1'>:</span>
                    <input type="text" name='priceCategory' value={priceCategory.priceCategoryName} className="w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border"
                    autoComplete="off"
                    />
                  </div>
                  <table className="table-fixed w-full">
                    <thead className="text-[12px]">
                      <tr className="border-b border-t border-slate-400">
                        <th className="w-[40px] pr-5">S.No</th>
                        <th className="w-[100px]">Product Code</th>
                        <th className="w-[105px]">Product Name</th>
                        <th className="w-[80px]">Product MRP</th>
                        <th className="w-[80px]">Rate</th>
                        <th className="w-[50px]">
                          Discount <span>(%)</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceCategory.priceCategorySubForm.map((row, index) => (
                        <tr key={index}>
                          {/* Serial number input */}
                          <td>
                            <input
                              type="text"
                              name="serialNumber"
                              value={row.serialNumber}
                              ref={input => (inputRetailRef.current[0 + index * 6] = input)}
                              onChange={e => handleInputChangeRetail(e, index)}
                              onKeyDown={e => handleKeyDownRetail(e, index, 0)}
                              className="w-[50px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* Product code input */}
                          <td>
                            <input
                              type="text"
                              name="productCode"
                              value={row.productCode}
                              ref={input => (inputRetailRef.current[1 + index * 6] = input)}
                              onChange={e => handleInputChangeRetail(e, index)}
                              onKeyDown={e => handleKeyDownproductCode(e, index, 1)}
                              onFocus={e => {
                                setproductCodeFocused(true);
                                handleInputChangeRetail(e, index);
                              }}
                              onBlur={() => setproductCodeFocused(false)}
                              className="w-[130px] h-5 pl-1 ml-6 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                            {/* Product code suggestion dropdown */}
                            {productCodeFocused && filteredProductCode.length > 0 && (
                            <div
                              className="absolute w-[250px] h-[92.6vh] border border-gray-500 bg-[#CAF4FF] top-[0px] left-[978.5px] overflow-y-auto z-10"
                              onMouseDown={e => e.preventDefault()}
                            >
                              <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                                <p>List of Product Codes</p>
                              </div>
                              <ul className="suggestions w-full text-left text-[12px] mt-2" ref={inputProductCodeRef}>
                                {filteredProductCode.map((product, productIndex) => (
                                  <li
                                    key={productIndex}
                                    tabIndex={0}
                                    className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${
                                      highlightedProductCode === productIndex ? 'bg-yellow-200' : ''
                                    }`}
                                    onClick={() =>
                                      handleproductCodeSuggestionClick(product, index)
                                    }
                                  >
                                    {product.stockItemCode}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                            
                          </td>
                          {/* Product name input */}
                          <td>
                            <input
                              type="text"
                              name="productName"
                              value={row.productName}
                              ref={input => (inputRetailRef.current[2 + index * 6] = input)}
                              onKeyDown={e => handleKeyDownRetail(e, index, 2)}
                              className="w-[130px] h-5 pl-1 ml-6 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" readOnly
                            />
                          </td>
                          {/* Product MRP input */}
                          <td>
                            <input
                              type="text"
                              name="productMrp"
                              value={row.productMrp}
                              ref={input => (inputRetailRef.current[3 + index * 6] = input)}
                              onKeyDown={e => handleKeyDownRetail(e, index, 3)}
                              onBlur={e => {
                                numberFormat(e, index, 'priceCategorySubForm');
                              }}
                              className="w-[80px] h-5 pl-1 ml-4 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" readOnly
                            />
                          </td>
                          {/* Product rate input */}
                          <td>
                            <input
                              type="text"
                              name="productRate"
                              value={row.productRate}
                              ref={input => (inputRetailRef.current[4 + index * 6] = input)}
                              onChange={e => handleInputChangeRetail(e, index)}
                              onKeyDown={e => handleKeyDownRetail(e, index, 4)}
                              onBlur={e => numberFormat(e, index, 'priceCategorySubForm')}
                              className="w-[80px] h-5 pl-1 font-medium text-right text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                          </td>
                          {/* Product discount input */}
                          <td>
                            <input
                              type="text"
                              name="productDiscount"
                              value={row.productDiscount}
                              ref={input => (inputRetailRef.current[5 + index * 6] = input)}
                              onChange={e => handleInputChangeRetail(e, index)}
                              onKeyDown={e => handleKeyDownRetail(e, index, 5)}
                              onBlur={e => percentageFormat(e, index, 'priceCategorySubForm')}
                              className="w-[45px] h-5 pl-1 ml-3 font-medium text-[12px] text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
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

        </form>
        <RightSideButton />
      </div>
    </>
  );
};

export default PriceCategoryCreate;
