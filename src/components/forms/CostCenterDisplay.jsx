import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificCostCenter } from '../services/MasterService';

const costCenterDisplay = () => {

    const { datas } = useParams();
  const [costCenter, setCostCenter] = useState({
    costCenterName: '',
    costCategoryName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadCostCenter = async () => {
      try {
        const result = await getSpecificCostCenter(datas);
        console.log(result.data);
        setCostCenter(result.data);
      } catch (error) {
        
      }
    }

    loadCostCenter();

    // Event listener for Escape key to go back to the previous page
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-1); // Go back to the previous page
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[datas,navigate]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'Enter') {
      e.preventDefault();    // Prevent default form submission on Enter

      if (e.target.value.trim() !== '') {
        const nextField = index + 1;

        if (nextField < inputRefs.current.length){
          // Move to the next field if the current field is not the last one
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
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
    }
  };

  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>    
        <form action="" className='border border-slate-500 w-[36%] h-[15vh] absolute left-[54%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="costCenterName" className='w-[30%]'>Cost Center Name</label>
            <span>:</span>
            <input type="text" id='costCenterName' name='costCenterName' value={costCenter.costCenterName}  ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e,0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="costCategoryName" className='w-[29.3%]'>Under</label>
            <span>:</span>
            <input type="text" id='costCategoryName' name='costCategoryName' value={costCenter.costCategoryName} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default costCenterDisplay