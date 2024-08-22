import React, { useEffect, useRef, useState } from 'react'
import { getSpecificLocation } from '../services/MasterService';
import RightSideButton from '../right-side-button/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';

const LocationDisplay = () => {

  const { datas } = useParams();
  const [location, setLocation] = useState({
    godownName: ''
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRefs.current[0]){
      inputRefs.current[0].focus();
    }

    const loadLocation = async () => {
      try {
        const result = await getSpecificLocation(datas);
        console.log(result.data);
        setLocation(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadLocation();

    // Event listener for Escape key to go back to the previous page
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-1); // Go back to the previous page
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[datas, navigate]);
  return (
    <>
      <div className='flex'>
        <div className='bg-slate-400 w-[54%] h-[92.9vh] border border-r-blue-400'></div>
        <form action="" className='border border-slate-500 w-[36%] h-[10vh] absolute left-[54%]'>
          <div className='text-sm p-3 flex'>
            <label htmlFor="godownName" className='w-[30%]'>Godown Name</label>
            <span>:</span>
            <input type="text" id='godownName' name="godownName" value={location.godownName} ref={(input) => (inputRefs.current[0] = input)} className='w-[300px] ml-2 h-5 pl-1 font-medium text-sm uppercase focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border' autoComplete='off' readOnly />
          </div>
        </form>
        <RightSideButton />
      </div>
    </>
  )
}

export default LocationDisplay