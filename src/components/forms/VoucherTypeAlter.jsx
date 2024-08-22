import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificPreDefinedVoucher, getSpecificVoucher, updateVoucherTypeMaster } from '../services/MasterService';
import VoucherMenu from '../../assets/VoucherMenu';
import RightSideButton from '../right-side-button/RightSideButton';
const VoucherTypeAlter = () => {
    const { datas } = useParams();
    const navigate = useNavigate();

    const [voucher, setVoucher] = useState({
        voucherTypeName: '',
        voucherType: '',
        startingNumber: '',
        widthOfNumericalPart: '',
        prefillWithZero: '',
        restartNumberingApplicationForm: '',
        restartNumberingStartingNumber: '',
        restartNumberingPeriodicity: '',
        prefixDetailsApplicationForm: '',
        prefixDetailsParticulars: '',
        suffixDetailsApplicationForm: '',
        suffixDetailsParticulars: '',
        voucherDate: '',
        voucherNumber: ''
    });
    
  const [voucherTypeFocused, setVoucherTypeFocused] = useState(false);
  const [highlightedSuggestionVoucherType, setHighlightedSuggestionVoucherType] = useState(0);
  const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState(VoucherMenu);
  const [periodicityFocused, setPeriodicityFocused] = useState(false);
  const [highlightedSuggestionPeriodicity, setHighlightedSuggestionPeriodicity] = useState(0);
  const [periodicitySuggestions] = useState(['Daily', 'Monthly', 'Never', 'Weekly', 'Yearly']);
  const inputRefs = useRef([]);
  const optionsRef = useRef(null);
  const periodicityRef = useRef(null);

  useEffect(() => {
    const focusAndPulseCursor = () => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
            inputRefs.current[0].setSelectionRange(0, 0);
        }
    }

    setTimeout(focusAndPulseCursor, 100);

    loadVoucherTypeName();

    loadPreDefinedVoucherTypeName();
  }, []);

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setVoucher({ ...voucher, [name]: capitalizedValue });

    if (name === 'voucherType') {
      const filtered = VoucherMenu.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setVoucherTypeSuggestions(filtered);
      setVoucherTypeFocused(true);
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    // check if the current input is 'prefillwithzero'
    if (e.target.name === 'prefillWithZero') {
      if (key === 'y') {
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          prefillWithZero: 'Yes',
        }));
        e.preventDefault(); // Prevent default action
      } else if (key === 'n') {
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          prefillWithZero: 'No',
        }));
        e.preventDefault();
      }
    }

    if (key === 'Enter') {
      if (voucherTypeFocused && voucherTypeSuggestions.length > 0){
        // select the highlighted suggestions
        const selectedItem = voucherTypeSuggestions[highlightedSuggestionVoucherType];
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          voucherType: selectedItem.label,
        }));
        setVoucherTypeFocused(false);    // Hide suggestions after selection
      } else if (periodicityFocused && periodicitySuggestions.length > 0){
        const selectedPeriodicity = periodicitySuggestions[highlightedSuggestionPeriodicity];
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          restartNumberingPeriodicity: selectedPeriodicity,
        }));
        setPeriodicityFocused(false);    // Hide suggestions after selection
      } else if (e.target.value.trim() !== '') {
        const nextField = index + 1;
        if (nextField < inputRefs.current.length) {
          inputRefs.current[nextField].focus();
          inputRefs.current[nextField].setSelectionRange(0,0);
        } else {
          handleSubmit(e); // Call handleSubmit if it's the last field
        }
      } else {
        e.preventDefault();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input field if the current field is empty
      const input = inputRefs.current[index];
      const value = input.value;
      const cursorPosition = input.selectionStart;

      if (cursorPosition === 0 && value.length !== 0){
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();      // ?. ----- optional chaining operator (null or undefined)  
          inputRefs.current[prevField].setSelectionRange(0,0);
          e.preventDefault();
        }
      } else if (e.target.value !== ''){
        return;
      } else{
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField].focus();
          inputRefs.current[prevField].setSelectionRange(0,0);
          e.preventDefault();
        }
      }
    } else if (key === 'ArrowDown'){
      //  arrow down for available suggestions items
      e.preventDefault();
      if (voucherTypeFocused){
        setHighlightedSuggestionVoucherType(prevIndex => 
          Math.min(prevIndex + 1, voucherTypeSuggestions.length - 1),
        );
      } else if (periodicityFocused){
        setHighlightedSuggestionPeriodicity(prevIndex => 
          Math.min(prevIndex + 1, periodicitySuggestions.length - 1),
        );
      }
    } else if (key === 'ArrowUp'){
      //  arrow up for available suggestions items
      e.preventDefault();
      if (voucherTypeFocused){
        setHighlightedSuggestionVoucherType(prevIndex =>
          Math.max(prevIndex - 1, 0),
        )
      } else if (periodicityFocused){
        setHighlightedSuggestionPeriodicity(prevIndex => 
          Math.max(prevIndex - 1, 0),
        )
      } else if (key === 'Tab'){
        //  tab for available suggestions items
        setVoucherTypeFocused(false);
        setPeriodicityFocused(false);
      }
    } else if (key === 'Escape'){
      navigate(-1);
    }
  };

  useEffect(() => {
    if (optionsRef.current){
      optionsRef.current.scrollTop = highlightedSuggestionVoucherType * 30;   // Adjust scroll position
    }
  },[highlightedSuggestionVoucherType]);

  useEffect(() => {
    if (periodicityRef.current){
      periodicityRef.current.scrollTop = highlightedSuggestionPeriodicity * 30; // Adjust scroll position
    }
  },[highlightedSuggestionPeriodicity]);

  const handleSuggestionClick = item => {
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      voucherType: item.label,
    }));
    setVoucherTypeFocused(false);    // Hide the suggestions after selection
  }

  const handlePeriodicityClick = periodicity => {
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      restartNumberingPeriodicity: periodicity,
    }));
    setPeriodicityFocused(false);    // Hide the suggestions after selection
  };

  // Function to format date input
  const formatDateInput = value => {
    const datePattern = /(\d{1,2})[./-](\d{1,2})[./-](\d{2})/;
    const match = value.match(datePattern);

    if (match){
      const day = match[1];
      const month = match[2];
      const year = match[3];

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const formattedMonth = months[parseInt(month,10) - 1];

      if (formattedMonth){
        return `${day}-${formattedMonth}-20${year}`;
      }
    }
      
    return value;
   
  };

  // Handle date input change
  const handleDateInputChange = e => {
    const {name,value} = e.target;

    //  Format the input value using formatDateInput function
    const formattedValue = formatDateInput(value);

    setVoucher(prevVoucher => ({
      ...prevVoucher,
      [name]: formattedValue,
    }))
  };

  const loadVoucherTypeName = async () => {
    try {
      const result = await getSpecificVoucher(datas);
      console.log(result.data);
      setVoucher(result.data);
    } catch (error) {
      console.error('Error fetching voucher type name data:', error);
    }
  };

  const loadPreDefinedVoucherTypeName = async () => {
    try{
      const result = await getSpecificPreDefinedVoucher(datas);
      console.log(result.data);
      setVoucher(result.data);
    } catch (error) {
      console.error('Error fetching predefined voucher type name data:', error);
      
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want confirm this submit!');
    if (userConfirmed){
        try{
            const response = await updateVoucherTypeMaster(voucher.voucherTypeName, voucher);
            console.log('Voucher altered successfully!', response.data);

            // Reset the form fields
            setVoucher({
                voucherTypeName: '',
                voucherType: '',
                startingNumber: '',
                widthOfNumericalPart: '',
                prefillWithZero: '',
                restartNumberingApplicationForm: '',
                restartNumberingStartingNumber: '',
                restartNumberingPeriodicity: '',
                prefixDetailsApplicationForm: '',
                prefixDetailsParticulars: '',
                suffixDetailsApplicationForm: '',
                suffixDetailsParticulars: '',
                voucherDate: '',
                voucherNumber: ''
            });
    
            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }catch(error){
            console.error('Error creating voucher type master:', error);    
        }
    }
    navigate(`${type}/alter`);
  };

  const handleVoucherNumberInputChange = e => {
    const {name,value} = e.target;

    setVoucher(prevState => {
      const updatedState = { ...prevState, [name]: value };

      const { prefixDetailsParticulars, startingNumber, suffixDetailsParticulars } = updatedState;
      const concatenatedValue = `${prefixDetailsParticulars}${startingNumber}${suffixDetailsParticulars}`;

      return {
        ...updatedState,
        voucherNumber: concatenatedValue,
      }
    })
  };
  

  return (
    <>
      <div className="#FFF5E1 w-[90%] h-[80vh]">
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-white">
            <div className="mt-2 w-[1100px] h-[80vh]">
              <div className="w-full h-20">
                <div className="float-left w-[50%] ml-1 mt-2">
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="voucherTypeName" className="w-[30%] text-sm">
                      Voucher Type Name
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="voucherTypeName"
                      name="voucherTypeName"
                      value={voucher.voucherTypeName}
                      ref={input => (inputRefs.current[0] = input)}
                      onChange={handleInputChange}
                      onKeyDown={e => handleKeyDown(e, 0)}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="voucherType" className="w-[30%] text-sm">
                      Under
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="voucherType"
                      name="voucherType"
                      value={voucher.voucherType}
                      onChange={handleInputChange}
                      ref={input => (inputRefs.current[1] = input)}
                      onFocus={() => { setVoucherTypeFocused(true) }}
                      onBlur={() => setVoucherTypeFocused(false)}
                      onKeyDown={e => handleKeyDown(e, 1)}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                    {voucherTypeFocused && voucherTypeSuggestions.length > 0 && (
                      <div
                        className="w-[20%] h-[92.5vh] border border-gray-500 bg-[#CAF4FF] z-10"
                        style={{ position: 'absolute', top: '42px', left: '958px' }}
                      >
                        <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                          <p>List of Voucher Types</p>
                        </div>
                        <ul
                          className="suggestions w-full h-[86vh] text-left text-sm mt-2 overflow-y-scroll"
                          ref={optionsRef}
                        >
                          {voucherTypeSuggestions.map((item, index) => (
                            <li
                              key={item}
                              tabIndex={0}
                              className={`pl-2 cursor-pointer hover:bg-yellow-200 ${
                                highlightedSuggestionVoucherType === index ? 'bg-yellow-200 ' : ''
                              }`}
                              onClick={() => handleSuggestionClick(item)}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="float-right w-[40%] absolute left-[650px] top-[50px]">
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="startingNumber" className="w-[40%] text-sm">
                      Starting Number
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="startingNumber"
                      name="startingNumber"
                      value={voucher.startingNumber}
                      onChange={handleVoucherNumberInputChange}
                      ref={input => (inputRefs.current[2] = input)}
                      onKeyDown={e => handleKeyDown(e, 2)}
                      className="w-[60px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="widthOfNumericalPart" className="w-[40%] text-sm">
                      Width of Numerical Part
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="widthOfNumericalPart"
                      name="widthOfNumericalPart"
                      value={voucher.widthOfNumericalPart}
                      onChange={handleInputChange}
                      ref={input => (inputRefs.current[3] = input)}
                      onKeyDown={e => handleKeyDown(e, 3)}
                      className="w-[60px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="flex ml-2 leading-6">
                    <label htmlFor="prefillWithZero" className="w-[40%] text-sm">
                      Prefill with Zero
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="prefillWithZero"
                      name="prefillWithZero"
                      value={voucher.prefillWithZero}
                      onChange={handleInputChange}
                      ref={input => (inputRefs.current[4] = input)}
                      onKeyDown={e => handleKeyDown(e, 4)}
                      className="w-[60px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly text-center border border-gray-400 w-[1228px] h-[78.4vh] ml-[1px]">
                <div className="w-[400px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p className='text-sm'>Restart Numbering</p>
                  </div>
                  <div className="flex justify-between border border-b-gray-400">
                    <p className='text-sm ml-1'>Applicable From</p>
                    <p className='text-sm'>Starting Number</p>
                    <p className='text-sm mr-1'>Periodicity</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="restartNumberingApplicationForm"></label>
                      <input
                        type="text"
                        id="restartNumberingApplicationForm"
                        name="restartNumberingApplicationForm"
                        value={voucher.restartNumberingApplicationForm}
                        ref={input => (inputRefs.current[5] = input)}
                        onChange={handleDateInputChange}
                        onKeyDown={e => handleKeyDown(e, 5)}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                    <div>
                      <label htmlFor="restartNumberingStartingNumber"></label>
                      <input
                        type="text"
                        id="restartNumberingStartingNumber"
                        name="restartNumberingStartingNumber"
                        value={voucher.restartNumberingStartingNumber}
                        ref={input => (inputRefs.current[6] = input)}
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 6)}
                        className="w-[100px] ml-2 h-5 capitalize text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                    <div>
                      <label htmlFor="restartNumberingPeriodicity"></label>
                      <input
                        type="text"
                        id="restartNumberingPeriodicity"
                        name="restartNumberingPeriodicity"
                        value={voucher.restartNumberingPeriodicity}
                        ref={input => (inputRefs.current[7] = input)}
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 7)}
                        onFocus={() => setPeriodicityFocused(true)
                        }
                        onBlur={() => setPeriodicityFocused(false)}
                        className="w-[100px] ml-2 h-5 capitalize text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                      {periodicityFocused && periodicitySuggestions.length > 0 && (
                        <div ref={periodicityRef}
                          className="w-[130px] h-[23vh] border border-gray-500 bg-[#CAF4FF]"
                          style={{ position: 'absolute', top: '158px', left: '388px' }}
                        >
                          <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                            <p>List of Periodicities</p>
                          </div>
                          <ul className="suggestions w-full h-[20vh] text-left text-sm mt-2">
                            {periodicitySuggestions.map((periodicity, index) => (
                              <li
                                key={periodicity}
                                className={`pl-2 ${
                                  highlightedSuggestionPeriodicity === index ? 'bg-yellow-200' : ''
                                }`}
                                onClick={() => handlePeriodicityClick(periodicity)}
                                onMouseDown={() => handlePeriodicityClick(periodicity)}
                              >
                                {periodicity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[330px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p className='text-sm'>Prefix Details</p>
                  </div>
                  <div className="flex justify-between border border-b-gray-400">
                    <p className='text-sm ml-1'>Application From</p>
                    <p className='text-sm mr-1'>Particulars</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="prefixDetailsApplicationForm"></label>
                      <input
                        type="text"
                        id="prefixDetailsApplicationForm"
                        name="prefixDetailsApplicationForm"
                        value={voucher.prefixDetailsApplicationForm}
                        ref={input => (inputRefs.current[8] = input)}
                        onChange={handleDateInputChange}
                        onKeyDown={e => handleKeyDown(e, 8)}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                    <div>
                      <label htmlFor="prefixDetailsParticulars"></label>
                      <input
                        type="text"
                        id="prefixDetailsParticulars"
                        name="prefixDetailsParticulars"
                        value={voucher.prefixDetailsParticulars}
                        ref={input => (inputRefs.current[9] = input)}
                        onChange={handleVoucherNumberInputChange}
                        onKeyDown={e => handleKeyDown(e, 9)}
                        className="w-[100px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[330px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p className='text-sm'>Suffix Details</p>
                  </div>
                  <div className="flex justify-between border border-b-gray-400">
                    <p className='text-sm ml-1'>Application From</p>
                    <p className='text-sm mr-1'>Particulars</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="suffixDetailsApplicationForm"></label>
                      <input
                        type="text"
                        id="suffixDetailsApplicationForm"
                        name="suffixDetailsApplicationForm"
                        value={voucher.suffixDetailsApplicationForm}
                        ref={input => (inputRefs.current[10] = input)}
                        onChange={handleDateInputChange}
                        onKeyDown={e => handleKeyDown(e, 10)}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                    <div>
                      <label htmlFor="suffixDetailsParticulars"></label>
                      <input
                        type="text"
                        id="suffixDetailsParticulars"
                        name="suffixDetailsParticulars"
                        value={voucher.suffixDetailsParticulars}
                        onChange={handleVoucherNumberInputChange}
                        ref={input => (inputRefs.current[11] = input)}
                        
                        onKeyDown={e => {
                          handleKeyDown(e, 11);
                        }}
                        className="w-[100px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                </div>
                <div className='w-[299px] border'>
                  <div className='border border-b-slate-400'>
                    <p className='text-sm'>Voucher Details</p>
                  </div>
                  <div className='flex justify-between border border-b-gray-400'>
                    <p className='text-sm ml-1'>Voucher Date</p>
                    <p className='text-sm mr-1'>Voucher No</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className=''>
                      <label htmlFor="voucherDate"></label>
                      <input type="text" id='voucherDate' name='voucherDate' value={voucher.voucherDate} ref={input => (inputRefs.current[12] = input)} onKeyDown={e => handleKeyDown(e, 12)} onChange={handleDateInputChange} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                    </div>
                    <div>
                      <label htmlFor="voucherNumber"></label>
                      <input type="text" id='voucherNumber' name='voucherNumber' value={voucher.voucherNumber}  onChange={handleVoucherNumberInputChange} className='w-[100px] ml-2 h-5 uppercase font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  );
};

export default VoucherTypeAlter;