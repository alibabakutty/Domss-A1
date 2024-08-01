import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';

const AlterMasterFilter = () => {
    const masterItems = [
        { id: 1, name: 'Company Voucher Type Master',
            subItems: [
                { id: 2, name: 'Company Voucher Type'},
            ]
        },
        { id: 3, name: 'Accounting Info Master', 
            subItems: [
                { id: 4, name: 'Account Group', path: '/alter/alterGroupFilter' },
                { id: 5, name: 'Account Ledger', path: '/alter/createLedger' }
            ] 
        },
        { id: 6, name: 'Inventory Info Master',
            subItems: [
                { id: 7, name: 'Stock Group'},
                { id: 8, name: 'Stock Category'},
                { id: 9, name: 'Stock Item'},
                { id: 10, name: 'UOM'},
            ]
         },
        { id: 11, name: 'Supplier Master' ,
            subItems: [
                { id: 12, name: 'Sundry Creditors'}
            ]
        },
        { id: 13, name: 'Customer Master',
            subItems: [
                { id: 14, name: 'Sundry Debtors'}
            ]
        },
        { id: 15, name: 'Department Master', 
            subItems: [
                { id: 16, name: 'Department Name'}
            ]
        },
        { id: 17, name: 'Location Master',
            subItems: [
                { id: 18, name: 'Godown Name'}
            ]
        },
        { id: 19, name: 'Head Office Category', 
            subItems: [
                { id: 20, name: 'Head Office'}
            ]
        },
        { id: 21, name: 'Branch Office Category',
            subItems: [
                { id: 22, name: 'Branch Office'}
            ]
        },
        { id: 23, name: 'Revenue Category Master', 
            subItems: [
                { id: 24, name: 'Revenue Category'},
                { id: 25, name: 'Revenue Centre'},
            ]
        },
        { id: 26, name: 'Cost Category Master', 
            subItems: [
                { id: 27, name: 'Cost Category'},
                { id: 28, name: 'Cost Centre'},
            ]
        },
        { id: 29, name: 'Batch Master', 
            subItems: [
                { id: 30, name: 'Batch Master - Color'},
                { id: 31, name: 'Batch Master - Serial No'},
                { id: 32, name: 'Batch Master - Size'},
                { id: 33, name: 'Batch Master - Category'}
            ]
        }
    ];


    // { id: 23, name: 'Company Tally Group Master',
    //     subItems: [
    //         { id: 24, name: 'Import Purchase'},
    //         { id: 25, name: 'Export Sales'},
    //         { id: 26, name: 'Production Expenses'},
    //         { id: 27, name: 'Staff Salary and Welfare Cost'},
    //         { id: 28, name: 'Administrative Expenses'},
    //         { id: 29, name: 'Selling and Distribution Cost'},
    //         { id: 30, name: 'Finance and Other Charges'}
    //     ]
    // }

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(2);
    const [filter, setFilter] = useState('');
    const [remainingItemsCount, setRemainingItemsCount] = useState(0);
    const inputRef = useRef(null);
    const itemRefs = useRef([]);
    const ITEMS_PER_PAGE = 20;

    const filteredItems = masterItems.flatMap(item =>
        item.subItems
        ? [{...item, isMainItem: true}, ...item.subItems.map(subItem => ({...subItem, isSubItem: true}))]
        : [{...item, isMainItem: true}]
    ).filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

    useEffect (() => {
        if (inputRef.current){
            inputRef.current.focus();
        }

        if (filter){
            setActiveIndex(1);
        } else {
            setActiveIndex(2);
        }
    },[filter]);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'ArrowUp') {
                setActiveIndex(prev => {
                    const newIndex = Math.max(0, prev - 1);
                    if (itemRefs.current[newIndex]) {
                        itemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (event.key === 'ArrowDown') {
                setActiveIndex(prev => {
                    const newIndex = Math.min(filteredItems.length, prev + 1);
                    if (itemRefs.current[newIndex]) {
                        itemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (event.key === 'Enter') {
                if (activeIndex === 0) {
                    navigate('/changeCompany');
                } else if (filteredItems[activeIndex - 1]?.path) {
                    navigate(filteredItems[activeIndex - 1].path);
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[activeIndex, filteredItems, navigate]);

    const handleItemClick = (index,path) => {
        setActiveIndex(index);
        localStorage.setItem('activeIndex', index);
        if (path){
            navigate(path);
        }
    };

    useEffect (() => {
        const hiddenItemsCount = filteredItems.length > ITEMS_PER_PAGE ? filteredItems.length - ITEMS_PER_PAGE : 0;
        setRemainingItemsCount(hiddenItemsCount);
    },[filteredItems]);

    useEffect(() => {
        const newRemainingItemsCount = Math.max(0, remainingItemsCount - activeIndex);
        setRemainingItemsCount(newRemainingItemsCount);
    }, [activeIndex, remainingItemsCount]);

  return (
    <>
    <div className="container flex">
        <div className='w-[96%] h-[93.3vh] flex'>
             <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
             <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                    <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                        Master Alteration
                    </p>
                    <input
                        type="text"
                        id="masterName"
                        name="masterName"
                        ref={inputRef}
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                </div>
                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                        List of Masters
                    </h2>
                    <div className='border border-b-slate-400'>
                        <Link to={'/changeCompany'}><p className={`text-[13px] font-semibold text-right pr-3 mt-5 ${activeIndex === 0 ? 'bg-yellow-500' : ''}`}>Change Company</p></Link>
                    </div>
                    <div className='overflow-y-scroll h-[73vh]'>
                        {filteredItems.map((item, index) => (
                            <div key={item.id} ref={el => itemRefs.current[index + 1] = el}>
                                <p className={`text-[13px] font-bold pl-3 ${item.isSubItem ? 'text-left pl-10 font-semibold' : ''} ${filteredItems[activeIndex - 1]?.id === item.id ? 'bg-yellow-500' : ''}`} onClick={() => handleItemClick(index + 1, item.path)}>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* <div className='w-[350px] text-center p-2 bg-[#2a67b1] text-white text-[13px] absolute left-[55.3%] top-[94.2vh]'>
                        Remaining: {remainingItemsCount} items
                    </div> */}
                </div>
             </div>
        </div>
        <RightSideButton />
    </div>
    </>
  )
}

export default AlterMasterFilter;
