import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const RightSideButton = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
   // Check if the current path is '/'
   const isRootPath = location.pathname === '/';

   useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey){
        if (e.key === 'c' || e.key === 'C'){
          e.preventDefault();
          if (!isRootPath){
            navigate(`/menu/${type}`);
          }
        } else if (e.key === 'd' || e.key === 'D'){
          e.preventDefault();
          if (!isRootPath){
            navigate(`/${type}/display`);
          }
        } else if (e.key === 'a' || e.key === 'A'){
          e.preventDefault();
          if (!isRootPath){
            navigate(`/${type}/alter`);
          }
        }
      }
    };
    window.addEventListener('keydown',handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
   },[])
  return (
    <>
        <div className='w-[10%] h-[93vh] bg-[#def1fc] border border-blue-400 absolute top-[7%] left-[90%]'>
          {!isRootPath && (
            <div className='mt-2 ml-[8px]'>
              <Link to={isRootPath ? '#' : `/menu/${type}`}>
                <input type="button" value={'Create'} className={`mb-1 w-28 pl-[8px] border border-gray-400 bg-white text-sm cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} /> <span className='text-sm font-medium absolute left-[28px] top-[11px]'>C:</span>
              </Link> 
              <Link to={isRootPath ? '#' : `/${type}/display`}>
                <input type="button" value={'Display'} className={`mb-1 w-28 pl-[12px] border border-gray-400 bg-white text-sm cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} /> <span className='text-sm font-medium absolute left-[28px] top-[39px]'>D:</span>
              </Link>
              <Link to={isRootPath ? '#' : `/${type}/alter`}>
                <input type="button" value={'Alter'} className={`w-28 border border-gray-400 bg-white text-sm cursor-pointer shadow-md ${isRootPath ? 'text-gray-600 cursor-not-allowed' : ''}`} /> <span className='text-sm font-medium absolute left-[28.5px] top-[67px]'>A:</span>
              </Link>
            </div>
          )}
        </div>
    </>
  )
}

export default RightSideButton