import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavCompany = () => {
  const createRef = useRef(null);
  const alterRef = useRef(null);
  const displayRef = useRef(null);
  const changeRef = useRef(null);
  const selectRef = useRef(null);
  const shutRef = useRef(null);

  const links = [
    createRef, alterRef, displayRef, changeRef, selectRef, shutRef
  ];

  const location= useLocation();

  useEffect(() => {
    // Unique session storage key for company nav
    const sessionKey = 'companyNavIndex';
    const savedFocusIndex = sessionStorage.getItem(sessionKey);
    if (savedFocusIndex !== null){
      const index = parseInt(savedFocusIndex, 10);
      if (links[index]?.current){
        links[index].current.focus();
      }
    } else {
       // Default focus on createRef if no saved index
       if (createRef.current){
        createRef.current.focus();
       }
    }
  },[location,links]);
  return (
    <>
      <div className='bg-[#def1fc] w-[15%] h-[40vh] border border-blue-400 absolute left-[188px] top-[28px]'>
        <ul className='text-left text-sm font-medium text-black mt-5'>
          <Link to={'/companyCreateForm'} ref={createRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Create</li></Link>
          <Link ref={alterRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Alter</li></Link>
          <Link ref={displayRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Display</li></Link>
          <Link ref={changeRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Change</li></Link>
          <Link ref={selectRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Select</li></Link>
          <Link ref={shutRef} className='block focus:bg-yellow-500 outline-none'><li className='pl-5'>Shut</li></Link>
        </ul>
      </div>
    </>
  )
}

export default NavCompany