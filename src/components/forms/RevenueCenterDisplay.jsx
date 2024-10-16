import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificRevenueCenter } from '../services/MasterService';

const RevenueCentreDisplay = () => {

  const { datas } = useParams();
  const [revenueCenter, setRevenueCenter] = useState({
    revenueCenterName: '',
    revenueCategoryName: ''
  });
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

   const loadRevenueCenters = async () => {
    try {
      const result = await getSpecificRevenueCenter(datas);
      console.log(result.data);
      setRevenueCenter(result.data);
    } catch (error) {
      console.error(error);
    }
   }
   loadRevenueCenters();

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
  }, [datas, navigate]);

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
      } else if (revenueCategoryFocused && filteredSuggestion.length > 0){
        // If suggestions are focused, select the highlighted suggestion
        const selectedItem = filteredSuggestion[highlightedSuggestionRevenueCategory];
        setRevenueCenter(prev => ({
          ...prev,
          revenueCategoryName: selectedItem.revenueCategoryName
        }));
        setRevenueCategoryFocused(false);
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
        <div className='bg-slate-400 w-[50%] h-[92.9vh] border border-r-blue-400'></div>
        <form className='border border-slate-500 w-[40%] h-[15vh] absolute left-[50%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="revenueCenterName" className='w-[30%]'>Revenue Center Name</label>
            <span>:</span>
            <input type="text" id='revenueCenterName' name='revenueCenterName' value={revenueCenter.revenueCenterName} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' autoComplete='off' readOnly />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="revenueCategoryName" className='w-[29.3%]'>Under</label>
            <span>:</span>
            <input type="text" id='revenueCategoryName' name='revenueCategoryName' value={revenueCenter.revenueCategoryName} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCentreDisplay;
