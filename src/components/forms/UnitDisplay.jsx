import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificUnitSymbolName } from '../services/MasterService';

const UnitDisplay = () => {

    const { datas } = useParams();

  const [unit, setUnit] = useState({
    unitTypeName: 'simple',
    unitSymbolName: '',
    formalName: '',
    unitQuantityCode: '',
    numberOfDecimalPlaces: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadUnits = async () => {
        try {
            const result = await getSpecificUnitSymbolName(datas);
            console.log(result.data);
            setUnit(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    loadUnits();
  }, []);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();
      if (e.target.value.trim() !== ''){
        const nextField = index + 1;
        if (nextField < inputRefs.current.length){
          inputRefs.current[nextField]?.focus();
          inputRefs.current[nextField]?.setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Backspace'){
      if (e.target.value.trim() === '' && index > 0){
        e.preventDefault();
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0, 0);
        }
      }
    } else if (key === 'Escape'){
      e.preventDefault();
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setUnit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[42.5%] h-[20vh] absolute left-[47.5%]'>
          <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="unitTypeName" className='w-[30%]'>UOM Type</label>
            <span>:</span>
            <input type="text" name='unitTypeName' value={unit.unitTypeName} ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='flex ml-2 text-sm'>
            <label htmlFor="unitQuantityCode" className='w-[30%]'>Unit Quantity Code (UQC)</label>
            <span>:</span>
            <input type="text" name='unitQuantityCode' value={unit.unitQuantityCode} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='flex ml-2 text-sm'>
            <label htmlFor="numberOfDecimalPlaces" className='w-[30%]'>Number of decimal places</label>
            <span>:</span>
            <input type="text" name='numberOfDecimalPlaces' value={unit.numberOfDecimalPlaces} ref={(input) => (inputRefs.current[2] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[20px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="unitSymbolName" className='w-[30%]'>Printing Symbol</label>
            <span>:</span>
            <input type="text" name='unitSymbolName' value={unit.unitSymbolName} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={handleInputChange} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="formalName" className='w-[30%]'>Printing Formal Name</label>
            <span>:</span>
            <input type="text" name='formalName' value={unit.formalName} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default UnitDisplay;
