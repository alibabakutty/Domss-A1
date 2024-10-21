import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';
import { getSpecificPriceCategoryName } from '../services/MasterService';


const PriceCategoryDisplay = () => {
  const { datas } = useParams();
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

  
  const [priceCategorySubFormModal, setPriceCategorySubFormModal] = useState(false);
  const inputRefs = useRef([]);
  const inputRetailRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    if (priceCategorySubFormModal && inputRetailRef.current[0]){
      inputRetailRef.current[0].focus();
      inputRetailRef.current[0].setSelectionRange(0, 0);
    }

    
  }, [priceCategorySubFormModal]);

  useEffect(() => {
    // Utility function to format numerical values using Indian Number Format
    const numberFormatValue = (value) => {
      if (!value || isNaN(value)) return value;
      return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(value);
    }

    // Utility function to format numerical values using percentage Format
    const percentageFormatForDisplay = (value) => {
      if (value === null || value === undefined) return '';   // check for null or undefine

      // Convert value to a number
      const rawValue = Number(value);

      // Check if the value is a valid number
      if (isNaN(rawValue)) return '';

      // Format the number as percentage with two decimal places
      return `${rawValue}%`;
    };

    const loadPriceCategories = async () => {
      try {
        const result = await getSpecificPriceCategoryName(datas);
        console.log(result.data);

        const {
          priceCategoryName = '',
          priceCategorySubForm,
        } = result.data;

        let fetchedPriceCategorySubForm = [
          {
            serialNumber: '',
            productCode: '',
            productName: '',
            productMrp: '',
            productRate: '',
            productDiscount: '',
          }
        ]

        if (Array.isArray(priceCategorySubForm) && priceCategorySubForm.length > 0){
          fetchedPriceCategorySubForm = priceCategorySubForm.map((price) => ({
            serialNumber: price.serialNumber || '',
            productCode: price.productCode || '',
            productName: price.productName || '',
            productMrp: numberFormatValue(price.productMrp),
            productRate: numberFormatValue(price.productRate),
            productDiscount: percentageFormatForDisplay(price.productDiscount),
          }));
        };

        // Set the state with the updated values
        setPriceCategory({
          priceCategoryName,
          priceCategorySubForm: fetchedPriceCategorySubForm,
        })
      } catch (error) {
        console.error(error);
      }
    }

    loadPriceCategories();
  }, [datas]);


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

  const handleKeyDownRetail = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstSerialNumber = 0;
    const inputsPerRow = 6; // Number of inputs per row
  
    // Handle Enter key
    if (key === 'Enter') {
      e.preventDefault();
  
  
      // If the current Serial Number is empty and it's not the first row, ask for confirmation to exit
      if (colIndex === firstSerialNumber && e.target.value.trim() === '' && rowIndex > 0) {
        const confirmation = window.confirm('Do you want to close this subform?');
        if (confirmation) {
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

  return (
    <>
      <div className="flex">
        <LeftSideMenu />
        <form className="border border-slate-500 w-[42.5%] h-[10vh] relative">
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
                              
                              onKeyDown={e => handleKeyDownproductCode(e, index, 1)}
                              className="w-[130px] h-5 pl-1 ml-6 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off"
                            />
                            
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
                              
                              onKeyDown={e => handleKeyDownRetail(e, index, 4)}
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
                              
                              onKeyDown={e => handleKeyDownRetail(e, index, 5)}
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

export default PriceCategoryDisplay;
