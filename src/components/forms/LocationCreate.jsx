import React, { useEffect, useRef, useState } from 'react'
import { createLocationMaster } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';

const LocationCreate = () => {

  const [location, setLocation] = useState({
    godownName: ''
  });

  const inputRefs = useRef([]);

  const handleInputChange = e => {
    const {name,value} = e.target;
    setLocation({
      ...location,
    [name]: value,    
  })
  };

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();

    try{
      const response = await createLocationMaster(location);
      console.log(response.data);

      setLocation({
        godownName: ''
      });
      if (inputRefs.current[0]){
        inputRefs.current[0].focus();
      }

    }catch(error){
      console.error(error);
    }
  }

  const handleKeyDown = (e,index) => {
    const key = e.key;

    if (key === 'Enter'){
      e.preventDefault();      // Prevent default form submission on Enter
      // Show confirmation prompt
      const userConfirmed = window.confirm('Do you want to confirm this submit?');
      
      if(userConfirmed){
        // Check if the current input has a value
      if(e.target.value.trim() !== ''){
        // Check if it's the last input field
        if(index === inputRefs.current.length -1){
          // Submit the form
          handleSubmit(e);
        }else {
          // Move focus to the next input
          inputRefs.current[index + 1].focus();
        }
      }
      }
    }
  }
  return (
    <>
      <form action="" className='border border-slate-500 w-[50%] h-[10vh]' onSubmit={handleSubmit}>
        <div className='text-sm p-3 flex'>
          <label htmlFor="godownName">Godown Name</label>
          <span>:</span>
          <input type="text" id='godownName' name="godownName" value={location.godownName} onChange={handleInputChange} ref={(input) => (inputRefs.current[0] = input)} onKeyDown={e => handleKeyDown(e, 0)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default LocationCreate