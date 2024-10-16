import React, { useEffect, useRef, useState } from 'react'
import LeftSideMenu from '../left-side-menu/LeftSideMenu'
import RightSideButton from '../right-side-button/RightSideButton'
import { useNavigate } from 'react-router-dom';
import UQC from '../../assets/UQC'
import { createUnitMaster } from '../services/MasterService';

const UnitCreate = () => {

  const [unit, setUnit] = useState({
    unitTypeName: 'simple',
    unitSymbolName: '',
    formalName: '',
    unitQuantityCode: '',
    numberOfDecimalPlaces: 0
  });

  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [unitCodeFocused, setUnitCodeFocused] = useState(false);
  const [highlightedSuggestionUnitCode, setHighlightedSuggestionUnitCode] = useState(0);
  const inputRefs = useRef([]);
  const optionsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
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
        } else if (e.target.name === 'formalName'){
          // Show confirmation dialog only if numberOfDecimalPlaces is filled
          const userConfirmed = window.confirm('Do you want to confirm this submit?');
          if (userConfirmed) {
            handleSubmit(e);
          } else {
            e.preventDefault();
          }
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
    }
  };

  const handleKeyDownUQC = (e) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();

      if (filteredSuggestion.length > 0){
        // Select the highlighted suggestion
        const selectedSuggestion = filteredSuggestion[highlightedSuggestionUnitCode];
        handleSuggestionClick(selectedSuggestion);
        inputRefs.current[1].blur();   // Blur the input after selection
      }

    } else if (key === 'ArrowDown'){
      if (filteredSuggestion.length > 0){
        e.preventDefault();
        setHighlightedSuggestionUnitCode((prev) => 
          Math.min(prev + 1, filteredSuggestion.length - 1)
        );
      }
    } else if (key === 'ArrowUp'){
      if (filteredSuggestion.length > 0){
        e.preventDefault();
        setHighlightedSuggestionUnitCode((prev) =>
        Math.max(prev - 1, 0)
        );
      }
    } else if (key === 'Escape'){
      // Close the dropdown on Escape key
      setFilteredSuggestion([]);
      inputRefs.current[1].blur();   // Optionally blur the input field
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setUnit((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'unitQuantityCode') {
      // Filter UQC suggestions
      const filtered = UQC.filter((item) =>
        item.unitCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestion(filtered);
      setHighlightedSuggestionUnitCode(0); // Reset highlighted suggestion
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUnit((prevState) => ({
      ...prevState,
      unitQuantityCode: suggestion.unitCode,
    }));
    setFilteredSuggestion([]);

     // Focus on the next input field (numberOfDecimalPlaces)
     inputRefs.current[2]?.focus();   // Assuming the next input is numberOfDecimalPlaces
  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    try {
      const response = await createUnitMaster(unit);
      console.log(response.data);
      // After the submit
      setUnit({
        unitTypeName: 'simple',
        unitSymbolName: '',
        formalName: '',
        unitQuantityCode: '',
        numberOfDecimalPlaces: 0
      })
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex'>
        <LeftSideMenu />
        <form action="" className='border border-slate-500 w-[45.5%] h-[20vh] absolute left-[44.5%]' onSubmit={handleSubmit}>
          <div className='text-sm flex mt-2 ml-2'>
            <label htmlFor="unitTypeName" className='w-[30%]'>UOM Type</label>
            <span>:</span>
            <input type="text" name='unitTypeName' value={unit.unitTypeName} ref={(input) => (inputRefs.current[0] = input)} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={handleInputChange} className='w-[100px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='flex ml-2 text-sm'>
            <label htmlFor="unitQuantityCode" className='w-[30%]'>Unit Quantity Code (UQC)</label>
            <span>:</span>
            <input type="text" name='unitQuantityCode' value={unit.unitQuantityCode} ref={(input) => (inputRefs.current[1] = input)} onKeyDown={(e) => handleKeyDownUQC(e, 1)} onChange={handleInputChange} onFocus={(e) => {setUnitCodeFocused(true); handleInputChange(e);}} onBlur={() => setUnitCodeFocused(false)} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
            {unitCodeFocused && filteredSuggestion.length > 0 && (
              <div className='w-[40%] h-[86vh] border border-gray-500 bg-[#CAF4FF] absolute top-[40px] left-[372px]'>
                <div className='text-left bg-[#003285] text-[13.5px] text-white pl-2'>
                  <p>List of UQC</p>
                </div>
                  <ul className='suggestions w-full h-[80vh] text-left text-sm mt-2 uppercase overflow-y-scroll' ref={optionsRef}>
                    {filteredSuggestion.map((suggestion, index) => (
                      <li
                        tabIndex={0}
                        key={suggestion.id}
                        className={`pl-2 cursor-pointer hover:bg-yellow-200 ${highlightedSuggestionUnitCode === index ? 'bg-yellow-200' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.unitCode}
                      </li>
                    ))}
                  </ul>
              </div>
            )}
          </div>
          <div className='flex ml-2 text-sm'>
            <label htmlFor="numberOfDecimalPlaces" className='w-[30%]'>Number of decimal places</label>
            <span>:</span>
            <input type="text" name='numberOfDecimalPlaces' value={unit.numberOfDecimalPlaces} ref={(input) => (inputRefs.current[2] = input)} onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, 2)} className='w-[20px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="unitSymbolName" className='w-[30%]'>Printing Symbol</label>
            <span>:</span>
            <input type="text" name='unitSymbolName' value={unit.unitSymbolName} ref={(input) => (inputRefs.current[3] = input)} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={handleInputChange} className='w-[60px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
          <div className='text-sm flex ml-2'>
            <label htmlFor="formalName" className='w-[30%]'>Printing Formal Name</label>
            <span>:</span>
            <input type="text" name='formalName' value={unit.formalName} ref={(input) => (inputRefs.current[4] = input)} onKeyDown={(e) => handleKeyDown(e, 4)} onChange={handleInputChange} className='w-[200px] ml-2 h-5 pl-1 font-medium text-sm capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent' autoComplete='off' />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default UnitCreate;
