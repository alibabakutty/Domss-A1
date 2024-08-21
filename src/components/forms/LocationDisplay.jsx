import React, { useEffect, useRef, useState } from 'react'
import { getSpecificLocation } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useParams } from 'react-router-dom';

const LocationDisplay = () => {

  const { type } = useParams();
  const [location, setLocation] = useState({
    godownName: ''
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadLocation = async () => {
      try {
        const result = await getSpecificLocation(type);
        console.log(result.data);
        setLocation(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadLocation();
  },[]);
  return (
    <>
      <form action="" className='border border-slate-500 w-[50%] h-[10vh]'>
        <div className='text-sm p-3 flex'>
          <label htmlFor="godownName" className='w-[30%]'>Godown Name</label>
          <span>:</span>
          <input type="text" id='godownName' name="godownName" value={location.godownName} ref={(input) => (inputRefs.current[0] = input)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
        </div>
      </form>
      <RightSideButton />
    </>
  )
}

export default LocationDisplay