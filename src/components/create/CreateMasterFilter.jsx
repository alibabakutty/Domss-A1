import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const CreateMasterFilter = () => {
    const masterItems = [
        { id: 1, name: 'Accounting Info Master', 
            subItems: [
                { id: 2, name: 'Group', path: '/create/createGroup' },
                { id: 3, name: 'Ledger', path: '/create/createLedger' },
                { id: 4, name: 'Voucher Type', path: '/create/createVoucherType' }
            ] 
        },
        { id: 5, name: 'Inventory Info Master' },
        { id: 6, name: 'Supplier Master' },
        { id: 7, name: 'Customer Master'},
        { id: 8, name: 'Department Master'},
        { id: 9, name: 'Location Master Category'},
        { id: 10, name: 'Location Master'},
        { id: 11, name: 'Head Office Category'},
        { id: 12, name: 'Head Office'},
        { id: 13, name: 'Branch Office Category'},
        { id: 14, name: 'Branch Office'},
        { id: 15, name: 'Godown/Location Master'}
    ];

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(parseInt(localStorage.getItem('activeIndex')) || 0);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'ArrowUp' && activeIndex > 0){
                setActiveIndex(prev => prev - 1);
            } else if (event.key === 'ArrowDown' && activeIndex < masterItems.length - 1){
                setActiveIndex(prev => prev + 1);
            } else if (event.key === 'Enter'){
                navigate(masterItems[activeIndex].path);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[activeIndex]);

  return (
    <>
    <div className="container flex">
        <div className='w-[96%] h-[93.3vh] flex'>
             {/* left side */}
             <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
             {/* right side */}
             <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                    <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                        Master Creation
                    </p>
                    <input
                        type="text"
                        id="masterName"
                        name="masterName"
                        className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                    List of Masters
                </h2>
                <div className='border border-b-slate-400'>
                    <Link><p className='text-[13px] font-semibold text-right mr-3 mt-5'>Change Company</p></Link>
                </div>
                <div>
                   {masterItems.map((item,index) => (
                    <div key={index} className=''>
                        <Link>
                            <p className='text-[13px] font-semibold pl-3'>{item.name}</p>
                        </Link>
                        {item.subItems && (
                            <div className=''>
                                {item.subItems.map((subItem,subIndex) => (
                                    <Link to={subItem.path}>
                                        <p key={subIndex} className={`${activeIndex === subItem.id ? 'bg-yellow-500' : ''} text-[13px] font-semibold pl-5`}
                                        >{subItem.name}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                   ))}
                </div>
                </div>
             </div>
        </div>
        <div className='w-[10%] h-[95.8vh] bg-[#def1fc] border border-blue-400 absolute top-[4.25%] left-[90%]'></div>
    </div>
    </>
  )
}

export default CreateMasterFilter