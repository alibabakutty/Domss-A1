import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createRevenueCenterMaster, listOfRevenueCategories } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const RevenueCentreCreate = () => {
  const [revenueCenter, setRevenueCenter] = useState({
    revenueCenterName: '',
    revenueCategoryName: ''
  });
  const [revenueCategorySuggestion, setRevenueCategorySuggestion] = useState([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [revenueCategoryFocused, setRevenueCategoryFocused] = useState(false);
  const [highlightedSuggestionRevenueCategory, setHighlightedSuggestionRevenueCategory] = useState(0);
  const inputRefs = useRef([]);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    listOfRevenueCategories()
      .then(response => {
        console.log(response.data);
        setRevenueCategorySuggestion(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRevenueCenter((prev) => ({ ...prev, [name]: value }));

    if (name === 'revenueCategoryName') {
      const filtered = revenueCategorySuggestion.filter(revenueCategory =>
        revenueCategory.revenueCategoryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestion(filtered);
      setRevenueCategoryFocused(true);
      setHighlightedSuggestionRevenueCategory(0); // Reset highlighted suggestion index
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setRevenueCenter(prev => ({
      ...prev,
      revenueCategoryName: suggestion.revenueCategoryName
    }));
    setRevenueCategoryFocused(false);
  };

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
        } else if (e.target.name === 'revenueCategoryName'){
          // Show confirmation dialog only if revenueCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            if (index === inputRefs.current.length - 1){
              handleSubmit(e);
            }
          } else{
            e.preventDefault();
          }
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
    } else if (key === 'ArrowDown' && revenueCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionRevenueCategory((prevIndex) =>
        prevIndex === filteredSuggestion.length - 1 ? 0 : prevIndex + 1
      );
    } else if (key === 'ArrowUp' && revenueCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionRevenueCategory((prevIndex) =>
        prevIndex === 0 ? filteredSuggestion.length - 1 : prevIndex - 1
      );
    } else if (key === 'Tab') {
      e.preventDefault();
      setRevenueCategoryFocused(false);
    } else if (key === 'Escape') {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRevenueCenterMaster(revenueCenter);
      console.log(response.data);
      // After the submit
      setRevenueCenter({ revenueCenterName: '', revenueCategoryName: '' });
      if (inputRefs.current[0]) {
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
        <form className='border border-slate-500 w-[45.5%] h-[15vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm pl-3 mt-3 flex'>
            <label htmlFor="revenueCenterName" className='w-[29.3%]'>Revenue Center Name</label>
            <span>:</span>
            <input type="text" id='revenueCenterName' name='revenueCenterName' value={revenueCenter.revenueCenterName} onChange={handleInputChange} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="revenueCategoryName" className='w-[29.3%]'>Under</label>
            <span>:</span>
            <input type="text" id='revenueCategoryName' name='revenueCategoryName' value={revenueCenter.revenueCategoryName} onChange={handleInputChange} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} onFocus={(e) => {setRevenueCategoryFocused(true); handleInputChange(e);}} onBlur={() => setRevenueCategoryFocused(false)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' />
            {revenueCategoryFocused && filteredSuggestion.length > 0 && (
              <div className='w-[40%] h-[92.7vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Revenue Categories</p>
                </div>
                <ul className='suggestions w-full h-[87vh] text-left text-sm mt-2' ref={optionsRef}>
                  {filteredSuggestion.map((revenueCategory, index) => (
                    <li key={index} tabIndex={0} className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${highlightedSuggestionRevenueCategory === index ? 'bg-yellow-200' : ''}`} onClick={() => handleSuggestionClick(revenueCategory)} onMouseDown={(e) => e.preventDefault()}>
                      {revenueCategory.revenueCategoryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default RevenueCentreCreate;
