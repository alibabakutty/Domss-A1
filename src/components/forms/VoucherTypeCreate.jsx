import React, { useEffect, useRef, useState } from 'react';
import { createVoucherTypeMaster } from '../services/MasterService';
import VoucherMenu from '../../assets/VoucherMenu';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate } from 'react-router-dom';

const VoucherTypeCreate = () => {
  const [voucher, setVoucher] = useState({
    voucherTypeName: '',
    voucherType: '',
    startingNumber: 1,
    widthOfNumericalPart: 0,
    prefillWithZero: 'no',
    restartNumberingApplicationForm: '1-Apr-2024',
    restartNumberingStartingNumber: 1,
    restartNumberingPeriodicity: 'yearly',
    prefixDetailsApplicationForm: '1-Apr-2024',
    prefixDetailsParticulars: '',
    suffixDetailsApplicationForm: '1-Apr-2024',
    suffixDetailsParticulars: '',
    voucherDate: '1-Apr-2024',
    voucherNumber: '',
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
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();

    }
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      [name]: value,
    }));

    if (name === 'voucherType') {
      const filtered = VoucherMenu.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase())
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
      if (voucherTypeFocused && voucherTypeSuggestions.length > 0) {
        // Select the highlighted suggestion
        const selectedItem = voucherTypeSuggestions[highlightedSuggestionVoucherType];
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          voucherType: selectedItem.label,
        }));
        setVoucherTypeFocused(false); // Hide suggestions after selection
      } else if (periodicityFocused && periodicitySuggestions.length > 0){
        const selectPeriodicity = periodicitySuggestions[highlightedSuggestionPeriodicity];
        setVoucher(prevVoucher => ({
          ...prevVoucher,
          restartNumberingPeriodicity: selectPeriodicity,
        }));
        setPeriodicityFocused(false); // Hide suggestions after selection
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
      const input = inputRefs.current[index];
        const value = input.value;
        const cursorPosition = input.selectionStart;
        
      if (cursorPosition === 0 && value.length !== 0) {
        // console.log("first")
        const prevField = index - 1;
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0,0);
          e.preventDefault();
        }
      } else if(e.target.value !== "") {
        // console.log("second")
        return
      }
        else {
        const prevField = index - 1;
        // console.log("three")
        if (inputRefs.current[prevField]){
          inputRefs.current[prevField]?.focus();
          inputRefs.current[prevField].setSelectionRange(0,0);
          e.preventDefault();
        }
      }
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      if (voucherTypeFocused) {
        setHighlightedSuggestionVoucherType(prevIndex =>
          Math.min(prevIndex + 1, voucherTypeSuggestions.length - 1),
        );
      } else if (periodicityFocused) {
        setHighlightedSuggestionPeriodicity(prevIndex =>
          Math.min(prevIndex + 1, periodicitySuggestions.length - 1),
        );
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      if (voucherTypeFocused) {
        setHighlightedSuggestionVoucherType(prevIndex => Math.max(prevIndex - 1, 0));
      } else if (periodicityFocused) {
        setHighlightedSuggestionPeriodicity(prevIndex => Math.max(prevIndex - 1, 0));
      }
    } else if (key === 'Tab') {
      setVoucherTypeFocused(false);
      setPeriodicityFocused(false);
    } else if (key === 'Escape'){
      navigate('/');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const userConfirmed = window.confirm('Do you want confirm this submit!');
    if (userConfirmed) {
      try {
        const response = await createVoucherTypeMaster(voucher);
        console.log('Voucher created successfully!', response.data);

        // Reset the form fields
        setVoucher({
          voucherTypeName: '',
          voucherType: '',
          startingNumber: 1,
          widthOfNumericalPart: 0,
          prefillWithZero: 'no',
          restartNumberingApplicationForm: '1-Apr-2024',
          restartNumberingStartingNumber: 1,
          restartNumberingPeriodicity: 'yearly',
          prefixDetailsApplicationForm: '1-Apr-2024',
          prefixDetailsParticulars: '',
          suffixDetailsApplicationForm: '1-Apr-2024',
          suffixDetailsParticulars: '',
          voucherDate: '1-Apr-2024',
          voucherNumber: '',
        });

        // Optionally, focus the first input field after reset
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } catch (error) {
        console.error('Error creating voucher type master:', error);
      }
    }
  };

  useEffect(() => {
    if (optionsRef.current) {
      optionsRef.current.scrollTop = highlightedSuggestionVoucherType * 30; // Adjust scroll position
    }
  }, [highlightedSuggestionVoucherType]);

  useEffect(() => {
    if (periodicityRef.current) {
      periodicityRef.current.scrollTop = highlightedSuggestionPeriodicity * 30;
    }
  }, [highlightedSuggestionPeriodicity]);

  const handleSuggestionClick = item => {
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      voucherType: item.label,
    }));
    setVoucherTypeFocused(false); // Hide suggestions after selection
  };

  const handlePeriodicityClick = periodicity => {
    setVoucher(prevVoucher => ({
      ...prevVoucher,
      restartNumberingPeriodicity: periodicity,
    }));
    setPeriodicityFocused(false);
  };

  // Function to format date input
  const formatDateInput = value => {
    const datePattern = /(\d{1,2})[./-](\d{1,2})[./-](\d{2})/;
    const match = value.match(datePattern);

    if (match) {
      const day = match[1];
      const month = match[2];
      const year = match[3];

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const formattedMonth = months[parseInt(month, 10) - 1];

      if (formattedMonth) {
        return `${day}-${formattedMonth}-20${year}`;
      }
    }

    return value;
  };

  // Handle Date Input Change
  const handleDateInputChange = e => {
    const { name, value } = e.target;

    // Format the input value using formatDateInput function
    const formattedValue = formatDateInput(value);

    setVoucher(prevVoucher => ({
      ...prevVoucher,
      [name]: formattedValue,
    }));
  };

  const handleVoucherNumberInputChange = e => {
    const { name, value } = e.target;

    setVoucher(prevState => {
      const updatedState = { ...prevState, [name]: value };

      const { prefixDetailsParticulars, startingNumber, suffixDetailsParticulars } = updatedState;
      const concatenatedValue = `${prefixDetailsParticulars}${startingNumber}${suffixDetailsParticulars}`;

      return {
        ...updatedState,
        voucherNumber: concatenatedValue,
      };
    });
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
                      ref={input => (inputRefs.current[1] = input)}
                      onChange={handleInputChange}
                      onKeyDown={e => handleKeyDown(e, 1)}
                      onFocus={(e) => { setVoucherTypeFocused(true) }}
                      onBlur={() => setVoucherTypeFocused(false)}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off"
                    />
                    {voucherTypeFocused && voucherTypeSuggestions.length > 0 && (
                      <div
                        className="w-[20%] h-[92.9vh] border border-gray-500 bg-[#CAF4FF] z-10"
                        style={{ position: 'absolute', top: '42px', left: '958px' }}
                      >
                        <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                          <p>List of Voucher Types</p>
                        </div>
                        <ul
                          className="suggestions w-full h-[87vh] text-left text-sm mt-2 overflow-y-scroll"
                          ref={optionsRef}
                        >
                          {voucherTypeSuggestions.map((item, index) => (
                            <li
                              key={index}
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
                      ref={input => (inputRefs.current[2] = input)}
                      onChange={handleVoucherNumberInputChange}
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
                      ref={input => (inputRefs.current[3] = input)}
                      onKeyDown={e => handleKeyDown(e, 3)}
                      onChange={handleInputChange}
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
                      ref={input => (inputRefs.current[4] = input)}
                      onChange={handleInputChange}
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
                    <p className='ml-1 text-sm'>Applicable From</p>
                    <p className='text-sm'>Starting Number</p>
                    <p className='mr-1 text-sm'>Periodicity</p>
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
                        className="w-[80px] ml-2 h-5 capitalize text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                        className="w-[100px] ml-2 h-5 text-right mr-1 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                      />
                      {periodicityFocused && periodicitySuggestions.length > 0 && (
                        <div
                          className="w-[130px] h-[23vh] border border-gray-500 bg-[#CAF4FF]"
                          style={{ position: 'absolute', top: '158px', left: '388px' }}
                        >
                          <div className="text-left bg-[#003285] text-[13.5px] text-white pl-2">
                            <p>List of Periodicities</p>
                          </div>
                          <ul ref={periodicityRef} className="suggestions w-full h-[20vh] text-left text-sm mt-2">
                            {periodicitySuggestions.map((periodicity, index) => (
                              <li
                                key={index}
                                tabIndex={0}
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
                    <p className='ml-1 text-sm'>Application From</p>
                    <p className='mr-1 text-sm'>Particulars</p>
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
                        className="w-[100px] ml-2 h-5 uppercase text-right mr-1 font-medium pr-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                    <p className='ml-1 text-sm'>Application From</p>
                    <p className='mr-1 text-sm'>Particulars</p>
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
                        ref={input => (inputRefs.current[11] = input)}
                        onChange={handleVoucherNumberInputChange}
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
                    <p className='ml-1 text-sm'>Voucher Date</p>
                    <p className='mr-1 text-sm'>Voucher No</p>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <label htmlFor="voucherDate"></label>
                      <input type="text" id='voucherDate' name='voucherDate' value={voucher.voucherDate} ref={input => (inputRefs.current[12] = input)} onKeyDown={e => handleKeyDown(e, 12)} onChange={handleDateInputChange} className='w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
                    </div>
                    <div>
                      <label htmlFor="voucherNumber"></label>
                      <input type="text" id='voucherNumber' name='voucherNumber' value={voucher.voucherNumber}  onChange={handleVoucherNumberInputChange}  className='w-[150px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' />
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

export default VoucherTypeCreate;
