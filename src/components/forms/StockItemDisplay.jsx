import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificStockItemName } from '../services/MasterService';

const StockItemDisplay = () => {

  const { datas } = useParams();
  const [stockItem, setStockItem] = useState({
    stockItemName: '',
    under: '♦ primary',
    category: '♦ not applicable',
    units: '♦ not applicable',
    openingBalanceQuantity: '',
    openingBalanceRate: '',
    openingBalanceUnit: '',
    openingBalanceValue: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial focus if the input exists
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    const loadStockItems = async () => {
        try {
            const result = await getSpecificStockItemName(datas);

            // Assuming result.data is your stock item data
            const fetchedData = result.data;

             // Format the numeric fields before setting them in the state
            setStockItem({
                ...fetchedData,
                openingBalanceQuantity: numberFormat(fetchedData.openingBalanceQuantity),
                openingBalanceRate: numberFormat(fetchedData.openingBalanceRate),
                openingBalanceValue: numberFormat(fetchedData.openingBalanceValue)
            });
            console.log(fetchedData);
        } catch (error) {
            console.error(error);
        }
    }
    loadStockItems();
  }, [datas]);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      (e).preventDefault();
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0, 0);
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
    }
  };

  const handleInputChange = (e) => {
    const {name,value} = e.target;

    setStockItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const numberFormat = (value) => {
    if (!value || isNaN(value)) return '';

    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[25vh] absolute left-[47.5%]'>
          <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="stockItemName" className='w-[40%]'>Name</label>
            <span>:</span>
            <input type="text" name='stockItemName' ref={(input) => (inputRefs.current[0] = input)} value={stockItem.stockItemName} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="under" className='w-[40%]'>Under</label>
            <span>:</span>
            <input type="text" name='under' ref={(input) => (inputRefs.current[1] = input)} value={stockItem.under} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="category" className='w-[40%]'>Category</label>
            <span>:</span>
            <input type="text" name='category' ref={(input) => (inputRefs.current[2] = input)} value={stockItem.category} onKeyDown={(e) => handleKeyDown(e, 2)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="units" className='w-[40%]'>Units</label>
            <span>:</span>
            <input type="text" name='units' ref={(input) => (inputRefs.current[3] = input)} value={stockItem.units} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
          <div className='flex items-center text-sm font-bold mt-2'>
            <p className='ml-[271px]'>Quantity</p>
            <p className='ml-12'>Rate</p>
            <p className='ml-8'>Unit</p>
            <p className='ml-[50px]'>Value</p>
          </div>
          <div className='text-sm flex mt-1 ml-2 mb-1'>
            <p className='w-[40%]'>Opening Balance</p>
            <span>:</span>
            <label htmlFor="openingBalanceQuantity" className=''></label>
            <input type="text" name='openingBalanceQuantity' value={stockItem.openingBalanceQuantity} onChange={handleInputChange} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} onBlur={numberFormat} className='w-[75px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />

            <label htmlFor="openingBalanceRate" className=''></label>
            <input type="text" name='openingBalanceRate' value={stockItem.openingBalanceRate} onChange={handleInputChange} ref={(input) => (inputRefs.current[5] = input)} onKeyDown={(e) => handleKeyDown(e, 5)} onBlur={numberFormat} className='w-[76px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />

            <label htmlFor="openingBalanceUnit" className=''></label>
            <input type="text" name='openingBalanceUnit' value={stockItem.openingBalanceUnit} onChange={handleInputChange} ref={(input) => (inputRefs.current[6] = input)} onKeyDown={(e) => handleKeyDown(e, 6)} className='w-[50px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />

            <label htmlFor="openingBalanceValue" className=''></label>
            <input type="text" name='openingBalanceValue' value={stockItem.openingBalanceValue} onChange={handleInputChange} ref={(input) => (inputRefs.current[7] = input)} onKeyDown={(e) => handleKeyDown(e, 7)} onBlur={numberFormat} className='w-[80px] h-5 ml-2 pl-1 font-medium text-sm text-right capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent transition-all' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default StockItemDisplay