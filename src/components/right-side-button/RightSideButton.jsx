import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const RightSideButton = () => {
  const { type } = useParams();
  const location = useLocation();
   // Check if the current path is '/'
   const isRootPath = location.pathname === '/';
  return (
    <>
        <div className='w-[10%] h-[93vh] bg-[#def1fc] border border-blue-400 absolute top-[7%] left-[90%]'>
          {!isRootPath && (
            <div className='ml-[6px] mt-2'>
              <Link to={isRootPath ? '#' : `/menu/${type}`}>
                <input type="button" value={'Create'} className={`mb-1 px-10 border border-gray-400 bg-white text-sm text-left cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} />
              </Link> 
              <Link to={isRootPath ? '#' : `/${type}/display`}>
                <input type="button" value={'Display'} className={`mb-1 px-[38px] border border-gray-400 bg-white text-sm text-left cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} />
              </Link>
              <Link to={isRootPath ? '#' : `/${type}/alter`}>
                <input type="button" value={'Alter'} className={`px-[45.5px] border border-gray-400 bg-white text-sm text-left cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} />
              </Link>
            </div>
          )}
        </div>
    </>
  )
}

export default RightSideButton