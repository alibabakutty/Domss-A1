import React, { useEffect, useRef } from 'react';
import RightSideButton from '../right-side-button/RightSideButton';

const CreateForm = () => {
  const fields = [
    {label: 'Company Name', name: 'companyName'},
    {label: 'Mailing Name', name: 'mailingName'},
    {label: 'Address 1', name: 'addressOne'},
    {label: 'Address 2', name: 'addressTwo'},
    {label: 'Address 3', name: 'addressThree'},
    {label: 'Address 4', name: 'addressFour'},
    {label: 'City', name: 'cityName'},
    {label: 'District', name: 'districtName'},
    {label: 'State', name: 'stateName'},
    {label: 'Country', name: 'countryName'},
    {label: 'Pincode', name: 'pincodeNumber'},
    {label: 'Telephone', name: 'telephoneNumber'},
    {label: 'Mobile No', name: 'mobileNumber'},
    {label: 'E-Mail', name: 'email'},
    {label: 'Website', name: 'website'},
    {label: 'GSTIN No', name: 'gstinNumber'},
    {label: 'PAN No', name: 'panNumber'},
    {label: 'MSME No', name: 'msmeNumber'},
    {label: 'FSSAI No', name: 'fssaiNumber'}
  ];

  const specialFields = [
    {label: 'Is this main company ?', name: 'isThisMainCompany'},
    {label: 'Is this division company ?', name: 'isThisDivisionCompany'},
    {label: 'Under', name: 'under'}
  ];

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  })

  const handleKeyDown = (e,index) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput){
        nextInput.focus();
      }
    } else if (e.key === 'Backspace'){
      e.preventDefault();
      const prevInput = inputRefs.current[index - 1];
      if (prevInput){
        prevInput.focus();
      }
    }
  };

  return (
    <>
      <div className='flex'>
        <form className='flex w-[95%]'>
          <div className='text-sm w-1/2 border-r'>
            {fields.map((field, index) => (
              <div key={index} className={`flex items-center p-1 leading-4 ${index === 0 ? 'mt-4' : ''}`}>
                <label htmlFor={field.name} className='w-[30%] ml-3'>{field.label}</label>
                <span className='mx-2'>:</span>
                <input type="text" name={field.name} ref={(input) => inputRefs.current[index] = input} onKeyDown={(e) => handleKeyDown(e, index)} className='w-[50%] h-5 pl-1 capitalize font-semibold outline-none focus:bg-yellow-200 focus:border border-blue-600' autoComplete='off' />
              </div>
            ))}
          </div>
          <div className='w-1/2 mt-4'>
            {specialFields.map((field, index) => (
              <div key={index + fields.length} className='flex items-center p-1 leading-4'>
                <label htmlFor={field.name} className='w-[35%] ml-3'>{field.label}</label>
                <span className='mx-2'>:</span>
                <input type="text" name={field.name} ref={(input) => inputRefs.current[index + fields.length] = input} onKeyDown={(e) => handleKeyDown(e, index + fields.length)} className='w-[20%] h-5 pl-1 capitalize font-semibold outline-none focus:bg-yellow-200 focus:border border-blue-600' autoComplete='off' />
              </div>
            ))}
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  );
}

export default CreateForm;
