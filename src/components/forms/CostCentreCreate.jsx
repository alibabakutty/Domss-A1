import React, { useEffect, useRef, useState } from 'react'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import { createCostCenterMaster, listOfCostCategories } from '../services/MasterService';
import LeftSideMenu from '../left-side-menu/LeftSideMenu';

const CostCentreCreate = () => {
  const [costCenter, setCostCenter] = useState({
    costCenterName: '',
    costCategoryName: ''
  });
  const [costCategorySuggestion, setCostCategorySuggestion] = useState([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [costCategoryFocused, setCostCategoryFocused] = useState(false);
  const [highlightedSuggestionCostCategory, setHighlightedSuggestionCostCategory] = useState(0);
  const inputRefs = useRef([]);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    listOfCostCategories()
      .then(response => {
        console.log(response.data);
        setCostCategorySuggestion(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostCenter((prev) => ({ ...prev, [name]: value }));

    if (name === 'costCategoryName') {
      const filtered = costCategorySuggestion.filter(costCategory =>
        costCategory.costCategoryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestion(filtered);
      setCostCategoryFocused(true);
      setHighlightedSuggestionCostCategory(0); // Reset highlighted suggestion index
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCostCenter(prev => ({
      ...prev,
      costCategoryName: suggestion.costCategoryName
    }));
    setCostCategoryFocused(false);
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
        } else if (e.target.name === 'costCategoryName'){
          // Show confirmation dialog only if costCategoryName is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            if (index === inputRefs.current.length - 1){
              handleSubmit(e);
            }
          } else{
            e.preventDefault();
          }
        }
      } else if (costCategoryFocused && filteredSuggestion.length > 0){
        // If suggestions are focused, select the highlighted suggestion
        const selectedItem = filteredSuggestion[highlightedSuggestionCostCategory];
        setCostCenter(prev => ({
          ...prev,
          costCategoryName: selectedItem.costCategoryName
        }));
        setCostCategoryFocused(false);
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
    } else if (key === 'ArrowDown' && costCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionCostCategory((prevIndex) =>
        prevIndex === filteredSuggestion.length - 1 ? 0 : prevIndex + 1
      );
    } else if (key === 'ArrowUp' && costCategoryFocused) {
      e.preventDefault();
      setHighlightedSuggestionCostCategory((prevIndex) =>
        prevIndex === 0 ? filteredSuggestion.length - 1 : prevIndex - 1
      );
    } else if (key === 'Tab') {
      e.preventDefault();
      setCostCategoryFocused(false);
    } else if (key === 'Escape') {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCostCenterMaster(costCenter);
      console.log(response.data);
      // After the submit
      setCostCenter({ costCenterName: '', costCategoryName: '' });
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
        <form className='border border-slate-500 w-[45.5%] h-[12vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm pl-3 mt-3 flex'>
            <label htmlFor="costCenterName" className='w-[25%]'>Cost Center Name</label>
            <span>:</span>
            <input type="text" id='costCenterName' name='costCenterName' value={costCenter.costCenterName} onChange={handleInputChange} ref={input => inputRefs.current[0] = input} onKeyDown={(e) => handleKeyDown(e, 0)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' autoComplete='off' />
          </div>
          <div className='text-sm flex pl-3'>
            <label htmlFor="costCategoryName" className='w-[25%]'>Under</label>
            <span>:</span>
            <input type="text" id='costCategoryName' name='costCategoryName' value={costCenter.costCategoryName} onChange={handleInputChange} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDown(e, 1)} onFocus={(e) => {setCostCategoryFocused(true); handleInputChange(e);}} onBlur={() => setCostCategoryFocused(false)} className='w-[400px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 border-transparent focus:border' />
            {costCategoryFocused && filteredSuggestion.length > 0 && (
              <div className='w-[40%] h-[92.7vh] border border-gray-500 bg-[#CAF4FF] z-10 absolute left-[372px] top-0'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of Cost Categories</p>
                </div>
                <ul className='suggestions w-full h-[87vh] text-left text-sm mt-2 overflow-y-scroll' ref={optionsRef}>
                  {filteredSuggestion.map((costCategory, index) => (
                    <li key={index} tabIndex={0} className={`pl-2 capitalize cursor-pointer hover:bg-yellow-200 ${highlightedSuggestionCostCategory === index ? 'bg-yellow-200' : ''}`} onClick={() => handleSuggestionClick(costCategory)} onMouseDown={(e) => e.preventDefault()}>
                      {costCategory.costCategoryName}
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

export default CostCentreCreate;
