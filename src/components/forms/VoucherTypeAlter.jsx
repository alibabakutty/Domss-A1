import React, { useEffect, useRef, useState } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificPreDefinedVoucher, getSpecificVoucher, updateVoucherTypeMaster } from '../services/MasterService';
const VoucherTypeAlter = () => {
    const { type } = useParams();

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
    });
    
  const inputRefs = useRef([]);

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

  useEffect(() => {
    const focusAndPulseCursor = () => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
            pulseCursor(inputRefs.current[0]);
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
        } else {
          handleSubmit(e); // Call handleSubmit if it's the last field
        }
      } else {
        e.preventDefault();
      }
    } else if (key === 'Backspace') {
      // Move focus to the previous input field if the current field is empty
      if ((e.target.value.trim() === '') || (e.target.value.trim() !== '')) {
        const prevField = index - 1;
        if (prevField >= 0) {
          inputRefs.current[prevField].focus();
          pulseCursor(inputRefs.current[prevField]);
        }
      }
    } else if (key === 'Delete'){
        // Clear the value of the current input field
        e.target.value='';
        setVoucher(prevVoucher => ({
            ...prevVoucher,
            [e.target.name]: '', // Ensure the state is updated
        }));
        e.preventDefault();
    }
  };

  const loadVoucherTypeName = async () => {
    try {
      const result = await getSpecificVoucher(type);
      console.log(result.data);
      setVoucher(result.data);
    } catch (error) {
      console.error('Error fetching voucher type name data:', error);
    }
  };

  const loadPreDefinedVoucherTypeName = async () => {
    try{
      const result = await getSpecificPreDefinedVoucher(type);
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
            });
    
            // Optionally, focus the first input field after reset
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }catch(error){
            console.error('Error creating voucher type master:', error);    
        }
    }
    navigate('/voucher/alter');
  };
  

  return (
    <>
      <div className="#FFF5E1 w-[90%] h-[80vh]">
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-white">
            <div className="mt-2 w-[1100px] h-[80vh]">
              <div className="w-full h-20">
                <div className="float-left w-[50%] ml-16">
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="voucherTypeName" className="w-[30%] text-sm font-medium">
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
                      onFocus={() => pulseCursor(inputRefs.current[0])}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="voucherType" className="w-[30%] text-sm font-medium">
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
                      onFocus={() => pulseCursor(inputRefs.current[1])}
                      onKeyDown={e => handleKeyDown(e, 1)}
                      className="w-[250px] ml-2 h-5 font-medium capitalize pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                </div>

                <div className="float-right w-[40%] absolute left-[600px] top-[50px]">
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="startingNumber" className="w-[40%] text-sm font-medium">
                      Starting Number
                    </label>
                    <span>:</span>
                    <input
                      type="text"
                      id="startingNumber"
                      name="startingNumber"
                      value={voucher.startingNumber}
                      onChange={handleInputChange}
                      ref={input => (inputRefs.current[2] = input)}
                      
                      onKeyDown={e => handleKeyDown(e, 2)}
                      onFocus={() => pulseCursor(inputRefs.current[2])}
                      className="w-[80px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="ml-2 flex leading-6">
                    <label htmlFor="widthOfNumericalPart" className="w-[40%] text-sm font-medium">
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
                      
                      onFocus={() => pulseCursor(inputRefs.current[3])}
                      className="w-[80px] ml-2 h-5 font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                  <div className="flex ml-2 leading-6">
                    <label htmlFor="prefillWithZero" className="w-[40%] text-sm font-medium">
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
                      onFocus={() => pulseCursor(inputRefs.current[4])}
                      className="w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                      autoComplete="off" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly text-center border border-gray-400 w-[1229px] h-[75vh] ml-[1px]">
                <div className="w-[420px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p>Restart Numbering</p>
                  </div>
                  <div className="flex justify-evenly border border-b-gray-400">
                    <p>Applicable Form</p>
                    <p>Starting Number</p>
                    <p>Periodicity</p>
                  </div>
                  <div className="flex justify-evenly">
                    <div>
                      <label htmlFor="restartNumberingApplicationForm"></label>
                      <input
                        type="text"
                        id="restartNumberingApplicationForm"
                        name="restartNumberingApplicationForm"
                        value={voucher.restartNumberingApplicationForm}
                        ref={input => (inputRefs.current[5] = input)}
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 5)}
                        onFocus={() => pulseCursor(inputRefs.current[5])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                        onFocus={() => pulseCursor(inputRefs.current[6])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                        onFocus={() =>
                          pulseCursor(inputRefs.current[7])
                        }
                        
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[420px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p>Prefix Details</p>
                  </div>
                  <div className="flex justify-evenly border border-b-gray-400">
                    <p>Application Form</p>
                    <p>Particulars</p>
                  </div>
                  <div className="flex justify-evenly">
                    <div>
                      <label htmlFor="prefixDetailsApplicationForm"></label>
                      <input
                        type="text"
                        id="prefixDetailsApplicationForm"
                        name="prefixDetailsApplicationForm"
                        value={voucher.prefixDetailsApplicationForm}
                        ref={input => (inputRefs.current[8] = input)}
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 8)}
                        onFocus={() => pulseCursor(inputRefs.current[8])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 9)}
                        onFocus={() => pulseCursor(inputRefs.current[9])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[420px] border border-r-slate-400">
                  <div className="border border-b-slate-400">
                    <p>Suffix Details</p>
                  </div>
                  <div className="flex justify-evenly border border-b-gray-400">
                    <p>Application Form</p>
                    <p>Particulars</p>
                  </div>
                  <div className="flex justify-evenly">
                    <div>
                      <label htmlFor="suffixDetailsApplicationForm"></label>
                      <input
                        type="text"
                        id="suffixDetailsApplicationForm"
                        name="suffixDetailsApplicationForm"
                        value={voucher.suffixDetailsApplicationForm}
                        ref={input => (inputRefs.current[10] = input)}
                        onChange={handleInputChange}
                        onKeyDown={e => handleKeyDown(e, 10)}
                        onFocus={() => pulseCursor(inputRefs.current[10])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
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
                        onChange={handleInputChange}
                        ref={input => (inputRefs.current[11] = input)}
                        
                        onKeyDown={e => {
                          handleKeyDown(e, 11);
                        }}
                        onFocus={() => pulseCursor(inputRefs.current[11])}
                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <RightSideButton />
    </>
  );
};

export default VoucherTypeAlter;