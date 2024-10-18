import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { listOfStockItems } from '../services/MasterService';

const PriceCategoryCreate = () => {

  const [priceCategory, setPriceCategory] = useState({
    priceCategoryForm : [
        {
            serialNumber: '',
            productCode: '',
            productName: '',
            productMrp: '',
            productRate: '',
            productDiscount: '',
        },
    ],
  });

  const [productItemSuggestion, setProductItemSuggestion] = useState([]);
  const [filteredProductCode, setFilteredProductCode] = useState([]);
  const [filteredProductName, setFilteredProductName] = useState([]);
  const [filteredProductMrp, setFilteredProductMrp] = useState([]);
  const [productCodeFocused, setProductCodeFocused] = useState(false);
  const [productNameFocused, setProductNameFocused] = useState(false);
  const [productMrpFocused, setProductMrpFocused] = useState(false);
  const [highlightedProductCode, setHighlightedProductCode] = useState(0);
  const [highlightedProductName, setHighlightedProductName] = useState(0);
  const [highlightedProductMrp, setHighlightedProductMrp] = useState(0);
  const inputRefs = useRef([]);
  const inputProductCodeRef = useRef([]);
  const inputProductNameRef = useRef([]);
  const inputProductMrpRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    listOfStockItems()
    .then(response => {
        console.log(response.data);
        setProductItemSuggestion(response.data);
    })
    .catch(error => {
        console.error(error);
    })
  }, []);

    // add new row function
    const addNewRow = () => {
        setPriceCategory(prevState => {
            const newRow = {
                serialNumber: '',
                productCode: '',
                productName: '',
                productMrp: '',
                productRate: '',
                productDiscount: '',
            };
            return {
                ...prevState,
                priceCategoryForm: [...prevState.priceCategoryForm, newRow],
            };
        })
    };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    const key = e.key;
    const firstSerialNumber = 0;

    if (key === 'Enter'){
        e.preventDefault();

        if (rowIndex === 0 && colIndex === firstSerialNumber && e.target.value.trim() === ''){
            alert('Please enter the serial number before proceeding.');
            inputRefs.current[rowIndex * 6 + colIndex]?.focus();
            inputRefs.current[rowIndex * 6 + colIndex].setSelectionRange(0, 0);
            return;
        }

        if (colIndex === firstSerialNumber && e.target.value.trim() === '' && rowIndex > 0){
            const confirmation = window.confirm('Do you want to close this subform?');
            if (confirmation){
                navigate(-1);
            } else {
                inputRefs.current[rowIndex * 6 + colIndex]?.focus();
                inputRefs.current[rowIndex * 6 + colIndex].setSelectionRange(0, 0);
                return;
            }
        }

        const isProductDiscount = e.target.name === 'productDiscount';
        const isLastRow = rowIndex === priceCategory.priceCategoryForm.length - 1;

        if (isProductDiscount && isLastRow && e.target.value.trim() !== ''){
            addNewRow();
            setTimeout(() => {
                inputRefs.current[(rowIndex + 1) * 6]?.focus();
            }, 0);
            return;
        }

        const nextCell = rowIndex * 6 + colIndex + 1;
        if (inputRefs.current[nextCell] && nextCell < inputRefs.current.length){
            inputRefs.current[nextCell].focus();
            inputRefs.current[nextCell].setSelectionRange(0, 0);
        }
    } else if (key === 'Backspace'){
        if (e.target.value.trim() === ''){
            e.preventDefault();
            const prevCell = rowIndex * 6 + colIndex - 1;
            if (inputRefs.current[prevCell] && prevCell >= 0){
                inputRefs.current[prevCell].focus();
                inputRefs.current[prevCell].setSelectionRange(0, 0);
            }
        }
    } else if (key === 'Escape'){
        navigate(-1);
    }
  };

  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    setPriceCategory(prevState => {
        const updatedForm = [...prevState.priceCategoryForm];
        updatedForm[index] = {
            ...updatedForm[index],
            [name]: value,
        };

        if (name === 'productCode'){
            const filtered = productItemSuggestion.filter(productItem => 
                productItem.productItemCode.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProductCode(filtered);
            setProductCodeFocused(true);
            setHighlightedProductCode(0);
        }
        return {
            ...prevState,
            priceCategoryForm: updatedForm,    // update the subform
        }
    })
  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    try {
      const response = await createpriceCategoryMaster(priceCategory);
      console.log(response.data);
      // After the submit
      setPriceCategory({
        priceCategoryName: '',
        under: '♦ Primary'
      });
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[92.6vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <table>
            <thead className='text-[12px]'>
                <tr className='border-b border-t border-slate-400'>
                    <th className='pr-5'>S.No</th>
                    <th className='pr-16'>Product Code</th>
                    <th className='pr-20'>Product Name</th>
                    <th>Product MRP</th>
                    <th>Rate</th>
                    <th>Discount <span>(%)</span></th>
                </tr>
            </thead>
            <tbody>
                {priceCategory.priceCategoryForm.map((row, index) => (
                    <tr key={index}>
                        {/* serial number input */}
                        <td>
                            <input type="text" name='serialNumber' value={row.serialNumber} ref={(input) => (inputRefs.current[0 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 0)} className="w-[50px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                        {/* product code input */}
                        <td>
                            <input type="text" name='productCode' value={row.productCode} ref={(input) => (inputRefs.current[1 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 1)} className="w-[150px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                        {/* product name input */}
                        <td>
                            <input type="text" name='productName' value={row.productName} ref={(input) => (inputRefs.current[2 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 2)} className="w-[170px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                        {/* product mrp input */}
                        <td>
                            <input type="text" name='productMrp' value={row.productMrp} ref={(input) => (inputRefs.current[3 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 3)} className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                        {/* product rate input */}
                        <td>
                            <input type="text" name='productRate' value={row.productRate} ref={(input) => (inputRefs.current[4 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 4)} className="w-[80px] h-5 pl-1 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                        {/* product discount input */}
                        <td>
                            <input type="text" name='productDiscount' value={row.productDiscount} ref={(input) => (inputRefs.current[5 + index * 6] = input)} onChange={(e) => handleInputChange(e, index)} onKeyDown={e => handleKeyDown(e, index, 5)} className="w-[45px] h-5 pl-1 ml-7 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                              autoComplete="off" />
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default PriceCategoryCreate