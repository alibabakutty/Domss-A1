import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { createStockCategoryMaster, getSpecificStockCategoryName, updateStockCategoryMaster } from '../services/MasterService';
import { useNavigate, useParams } from 'react-router-dom';

const StockCategoryAlter = () => {
  
  const { datas } = useParams();
  const [stockCategory, setStockCategory] = useState({
    stockCategoryName: '',
    under: '♦ Primary'
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadStockCategories = async () => {
        try {
            const result = await getSpecificStockCategoryName(datas);
            console.log(result.data);
            setStockCategory(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    loadStockCategories();
  }, []);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      (e).preventDefault();

      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField]?.setSelectionRange(0, 0);
        } else if (e.target.name === 'under'){
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            handleSubmit(e);
          } else {
            (e).preventDefault();
          }
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        (e).preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField]?.setSelectionRange(0, 0);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setStockCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    try {
      const response = await updateStockCategoryMaster(datas, stockCategory);
      console.log(response.data);
      // After the submit
      setStockCategory({
        stockCategoryName: '',
        under: '♦ Primary'
      });
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      };
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[12vh] absolute left-[47.5%]' onSubmit={handleSubmit}>
          <div className='text-sm flex mt-2 ml-2 mb-1'>
            <label htmlFor="stockCategoryName" className='w-[15%]'>Name</label>
            <span>:</span>
            <input type="text" name='stockCategoryName' ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} value={stockCategory.stockCategoryName} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[15%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 1)} value={stockCategory.under} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default StockCategoryAlter