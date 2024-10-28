import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificPreDefinedVoucher, getSpecificVoucher } from '../services/MasterService';
const VoucherTypeDisplay = () => {
    const { datas } = useParams();
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

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
      pulseCursor(inputRefs.current[0]);
    }

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
    
    loadVoucherTypeName();
    
    loadPreDefinedVoucherTypeName();
  }, [datas]);

  const pulseCursor = input => {
    const value = input.value;
    if (value) {
      input.value = '';
      setTimeout(() => {
        input.value = value.charAt(0).toUpperCase() + value.slice(1);
        input.setSelectionRange(0, 0);
      }, 0);
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
       if (e.target.value.trim() !== '') {
        const nextField = index + 1;
        if (nextField < inputRefs.current.length) {
          inputRefs.current[nextField].focus();
          pulseCursor(inputRefs.current[nextField]);
        }
      } else {
        e.preventDefault();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input field if the current field is empty
      if (e.target.value.trim() === '' || e.target.value.trim() !== '') {
        const prevField = index - 1;
        if (prevField >= 0) {
          inputRefs.current[prevField].focus();
          pulseCursor(inputRefs.current[prevField]);
        }
      }
    } else if (key === 'Escape'){
      navigate(-1);
    }
  };
  

  return (
    <>
      <div className="#FFF5E1 w-[90%] h-[80vh]">
        <form action="">
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
                      
                      onKeyDown={e => handleKeyDown(e, 0)}
                      onFocus={() => pulseCursor(inputRefs.current[0])}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                      autoComplete="off" readOnly
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
                      onFocus={() => pulseCursor(inputRefs.current[1])}
                      onKeyDown={e => handleKeyDown(e, 1)}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                      autoComplete="off" readOnly
                    />
                  </div>
                </div>

                <div className="float-right w-[40%] absolute left-[750px] top-[50px]">
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
                      
                      onKeyDown={e => handleKeyDown(e, 2)}
                      onFocus={() => pulseCursor(inputRefs.current[2])}
                      className="w-[80px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                      autoComplete="off" readOnly
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
                      
                      onFocus={() => pulseCursor(inputRefs.current[3])}
                      className="w-[80px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                      autoComplete="off" readOnly
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
                      
                      onKeyDown={e => handleKeyDown(e, 4)}
                      onFocus={() => pulseCursor(inputRefs.current[4])}
                      className="w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                      autoComplete="off" readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly text-center border border-gray-400 w-[1364px] h-[78.2vh] ml-[1px]">
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
                        
                        onKeyDown={e => handleKeyDown(e, 5)}
                        onFocus={() => pulseCursor(inputRefs.current[5])}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                        
                        onKeyDown={e => handleKeyDown(e, 6)}
                        onFocus={() => pulseCursor(inputRefs.current[6])}
                        className="w-[100px] ml-2 h-5 capitalize text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                        
                        onKeyDown={e => handleKeyDown(e, 7)}
                        onFocus={() =>
                          pulseCursor(inputRefs.current[7])
                        }
                        
                        className="w-[100px] ml-2 h-5 capitalize text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[330px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p className='text-sm'>Prefix Details</p>
                  </div>
                  <div className="flex justify-between border border-b-gray-400">
                    <p className='ml-1 text-sm'>Application From</p>
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
                        
                        onKeyDown={e => handleKeyDown(e, 8)}
                        onFocus={() => pulseCursor(inputRefs.current[8])}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                        
                        onKeyDown={e => handleKeyDown(e, 9)}
                        onFocus={() => pulseCursor(inputRefs.current[9])}
                        className="w-[100px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                        
                        onKeyDown={e => handleKeyDown(e, 10)}
                        onFocus={() => pulseCursor(inputRefs.current[10])}
                        className="w-[100px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                        
                        onKeyDown={e => {
                          handleKeyDown(e, 11);
                        }}
                        onFocus={() => pulseCursor(inputRefs.current[11])}
                        className="w-[100px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent"
                        autoComplete="off" readOnly
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
                    <div>
                      <label htmlFor="voucherDate"></label>
                      <input type="text" id='voucherDate' name='voucherDate' value={voucher.voucherDate} ref={input => (inputRefs.current[12] = input)} onKeyDown={e => handleKeyDown(e, 12)} className='w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent' autoComplete='off' readOnly />
                    </div>
                    <div>
                      <label htmlFor="voucherNumber"></label>
                      <input type="text" id='voucherNumber' name='voucherNumber' value={voucher.voucherNumber} ref={input => inputRefs.current[13] = input} onKeyDown={e => handleKeyDown(e, 13)}  className='w-[150px] ml-2 h-5 uppercase text-right mr-1 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none border-transparent' autoComplete='off' readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VoucherTypeDisplay;