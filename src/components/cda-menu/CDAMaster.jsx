import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';

const CDAMaster = () => {

    const { type } = useParams();

    const menuItem = [
        {label : 'Create', path : `/${type}/create`, highlightChar : 'c'},
        {label : 'Display', path : `/${type}/display`, highlightChar : 'd'},
        {label : 'Alter', path : `/${type}/alter`, highlightChar : 'a'},
    ];

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(parseInt(localStorage.getItem('activeIndex')) || 0);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'ArrowUp' && activeIndex > 0){
                setActiveIndex(prev => prev - 1);
            } else if (event.key === 'ArrowDown' && activeIndex < menuItem.length - 1){
                setActiveIndex(prev => prev + 1);
            } else if (event.key === 'Enter'){
                navigate(menuItem[activeIndex].path);
            } else if (/^[cC]$/.test(event.key)){
                navigate('create');
            } else if (/^[aA]$/.test(event.key)){
                navigate('alter');
            } else if (/^[dD]$/.test(event.key)){
                navigate('display')
            } 
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeIndex, navigate]);

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.clear();
        });
    },[]);

    useEffect(() => {
        localStorage.setItem('activeIndex', activeIndex);
    },[activeIndex]);
  return (
    <>
        <div className='container flex'>
            <div className='w-[96%] flex h-[93.3vh]'>
                {/* left side */}
                <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
                {/* right side */}
                <div className='w-1/2 bg-slate-100 flex justify-center items-center border border-l-blue-400'>
                    <div className='w-[300px] h-96 border border-blue-400 text-sm bg-[#def]'>
                        <h2 className='text-left text-white bg-[#2a67b1] px-16'>Gateway of Domss</h2>
                        <div>
                            <h2 className='py-1 ml-16 mt-5 text-[11px] text-[#2a67b1]'>MASTERS</h2>
                            <ul>
                                {menuItem.slice(0,3).map((item,index) => (
                                    <li key={item.path} className={`${activeIndex === index ? 'bg-yellow-500 text-black' : ''} cursor-pointer w-full text-[13px] font-semibold h-[18px]`}>
                                        <Link to={item.path} className='pl-16'>
                                            {item.label.split('').map((char,idx) => (
                                                <React.Fragment key={idx}>
                                                    {char !== ' ' ? (
                                                        <span className={`${char.toLowerCase() === item.highlightChar ? activeIndex === index ? 'text-black font-medium' : 'font-medium text-[#2a67b1]' : 'text-black'}`}>{char}</span>
                                                    ) : (
                                                        <span>&nbsp;</span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <RightSideButton />
        </div>
    </>
  )
}

export default CDAMaster