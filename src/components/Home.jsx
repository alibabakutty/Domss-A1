import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RightSideButton from './right-side-button/RightSideButton';

const Home = () => {
    const masterItems = [
        { id: 1, name: 'Voucher Type Master',
            subItems: [
                { id: 2, name: 'Voucher Type', path: 'menu/voucher'},
            ]
        },
        { id: 3, name: 'Currency Master Info', 
            subItems: [
                { id: 4, name: 'Currency Master', path: 'menu/currency'},
            ]
        },
        { id: 5, name: 'Accounting Info Master', 
            subItems: [
                { id: 6, name: 'Account Group', path: 'menu/group' },
                { id: 7, name: 'Account Ledger', path: 'menu/ledger' }
            ] 
        },
        { id: 8, name: 'Inventory Info Master',
            subItems: [
                { id: 9, name: 'Stock Group', path: 'menu/stockGroup'},
                { id: 10, name: 'Stock Category', path: 'menu/stockCategory'},
                { id: 11, name: 'Stock Item', path: 'menu/stockItem'},
                { id: 12, name: 'UOM', path: 'menu/unit'},
            ]
         },
        { id: 13, name: 'Supplier Master' ,
            subItems: [
                { id: 14, name: 'Sundry Creditors', path: 'menu/sundryCreditors'}
            ]
        },
        { id: 15, name: 'Customer Master',
            subItems: [
                { id: 16, name: 'Sundry Debtors', path: 'menu/sundryDebtors'}
            ]
        },
        { id: 17, name: 'Department Master', 
            subItems: [
                { id: 18, name: 'Department Name', path: 'menu/department'}
            ]
        },
        { id: 19, name: 'Location Master',
            subItems: [
                { id: 20, name: 'Godown Name', path: 'menu/location'}
            ]
        },
        { id: 21, name: 'Head Office Category', 
            subItems: [
                { id: 22, name: 'Head Office', path: 'menu/headOffice'}
            ]
        },
        { id: 23, name: 'Branch Office Category',
            subItems: [
                { id: 24, name: 'Branch Office', path: 'menu/branchOffice'}
            ]
        },
        { id: 25, name: 'Revenue Category Master', 
            subItems: [
                { id: 26, name: 'Revenue Category', path: 'menu/revenueCategory'},
                { id: 27, name: 'Revenue Centre', path: 'menu/revenueCentre'},
            ]
        },
        { id: 28, name: 'Cost Category Master', 
            subItems: [
                { id: 29, name: 'Cost Category', path: 'menu/costCategory'},
                { id: 30, name: 'Cost Centre', path: 'menu/costCentre'},
            ]
        },
        { id: 31, name: 'Batch Master', 
            subItems: [
                { id: 32, name: 'Batch Master - Category', path: 'menu/batchMasterCategory'},
                { id: 33, name: 'Batch Master - Serial No', path: 'menu/batchMasterSerialNumber'},
                { id: 34, name: 'Batch Master - Color', path: 'menu/batchMasterColor'},
                { id: 35, name: 'Batch Master - Size', path: 'menu/batchMasterSize'},
                
            ]
        },
        { id: 36, name: 'Project Category Master', 
            subItems: [
                { id: 37, name: 'Project Category', path: 'menu/projectCategory'},
                { id: 38, name: 'Project Name', path: 'menu/projectName'},
            ]
        }
    ];

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [filter, setFilter] = useState('');
    const inputRef = useRef(null);
    const itemRefs = useRef([]);

    // Determine which items to show based on filter
    const filteredItems = filter
        ? masterItems.flatMap(item =>
            item.subItems
                .filter(subItem => subItem.name.toLowerCase().includes(filter.toLowerCase()))
                .map(subItem => ({...subItem, isSubItem: true, parentItem: item.name}))
          )
        : masterItems.flatMap(item =>
            [{...item, isMainItem: true}].concat(item.subItems ? item.subItems.map(subItem => ({...subItem, isSubItem: true, parentItem: item.name})) : [])
          );

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

         // Set activeIndex to 1 by default and 0 when filter is applied
        setActiveIndex(filter ? 0 : 1); // Reset to the first item when filter changes
    }, [filter]);

    useEffect(() => {
        const handleKeyDown = event => {
            const projectMasterIndex = filteredItems.findIndex(item => item.name === 'Project Name');
    
            if (event.key === 'ArrowUp') {
                setActiveIndex(prev => {
                    let newIndex = prev - 1;
                    while (newIndex >= 0 && !filteredItems[newIndex].isSubItem) {
                        newIndex--;
                    }
                    if (itemRefs.current[newIndex]) {
                        itemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return Math.max(-1, newIndex); // Ensure activeIndex is at least -1
                });
            } else if (event.key === 'ArrowDown') {
                setActiveIndex(prev => {
                    let newIndex = prev + 1;
                    while (newIndex < filteredItems.length && !filteredItems[newIndex].isSubItem) {
                        newIndex++;
                    }
                    // Restrict focus to not go beyond "Project Master"
                    if (projectMasterIndex >= 0 && newIndex > projectMasterIndex) {
                        newIndex = projectMasterIndex; // Focus on "Project Master"
                    }
                    if (itemRefs.current[newIndex]) {
                        itemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (event.key === 'Enter') {
                if (activeIndex === -1) {
                    navigate('/changeCompany');
                } else if (filteredItems[activeIndex]?.path) {
                    navigate(`/${filteredItems[activeIndex].path}`, {state: { preventConfirm: true }});
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, filteredItems, navigate]);

    return (
        <>
        <div className="container flex">
            <div className='w-[96%] h-[92.9vh] flex'>
                 <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
                 <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                    <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                        <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                            Masters
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
                            <Link to={'/changeCompany'}>
                                <p className={`text-[13px] font-semibold text-right pr-3 mt-5 ${activeIndex === -1 ? 'bg-yellow-500' : ''}`}>
                                    Change Company
                                </p>
                            </Link>
                        </div>
                        <div className='overflow-y-scroll h-[70vh]'>
                            {filteredItems.map((item, index) => (
                                <div key={item.id} ref={el => itemRefs.current[index] = el}>
                                    <Link to={`/${item.path}`}>
                                        <p className={`text-[13px] font-bold pl-3 ${item.isSubItem ? 'pl-8 font-semibold cursor-pointer' : ''} ${filteredItems[activeIndex]?.id === item.id ? 'bg-yellow-500' : ''}`}>
                                            {item.name}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            <RightSideButton />
        </div>
        </>
    );
}

export default Home;