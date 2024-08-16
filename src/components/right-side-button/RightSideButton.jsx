import React from 'react'
import { Link, useParams } from 'react-router-dom'

const RightSideButton = () => {
  const { type } = useParams();
  return (
    <>
        <div className='w-[10%] h-[93vh] bg-[#def1fc] border border-blue-400 absolute top-[7%] left-[90%]'>
          <div className='ml-[6px] mt-2'>
            <Link to={`/${type}/create`}>
              <input type="button" value={'Create'} className='mb-1 px-10 border border-gray-400 bg-white text-sm text-left cursor-pointer' />
            </Link> 
            <Link to={`/${type}/display`}>
              <input type="button" value={'Display'} className='mb-1 px-[38px] border border-gray-400 bg-white text-sm text-left cursor-pointer' />
            </Link>
            <Link to={`/${type}/alter`}>
              <input type="button" value={'Alter'} className='px-[45.5px] border border-gray-400 bg-white text-sm text-left cursor-pointer' />
            </Link>
          </div>
        </div>
    </>
  )
}

export default RightSideButton