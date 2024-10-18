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
                { id: 6, name: 'Account Group', path: 'menu/groupName' },
                { id: 7, name: 'Account Ledger', path: 'menu/ledger' }
            ] 
        },
        { id: 8, name: 'Inventory Info Master',
            subItems: [
                { id: 9, name: 'Stock UOM', path: 'menu/unit'},
                { id: 10, name: 'Stock Category', path: 'menu/stockCategory'},
                { id: 11, name: 'Stock Group', path: 'menu/stockGroup'},
                { id: 12, name: 'Price Category', path: 'menu/priceCategory'},
                { id: 13, name: 'Stock Item', path: 'menu/stockItem'},
                
            ]
         },
        { id: 14, name: 'Supplier Master' ,
            subItems: [
                { id: 15, name: 'Sundry Creditors', path: 'menu/sundryCreditor'}
            ]
        },
        { id: 16, name: 'Customer Master',
            subItems: [
                { id: 17, name: 'Sundry Debtors', path: 'menu/sundryDebtor'}
            ]
        },
        { id: 18, name: 'Department Master', 
            subItems: [
                { id: 19, name: 'Department Name', path: 'menu/department'}
            ]
        },
        { id: 20, name: 'Location Master',
            subItems: [
                { id: 21, name: 'Godown Name', path: 'menu/godown'}
            ]
        },
        { id: 22, name: 'Head Office Category', 
            subItems: [
                { id: 23, name: 'Head Office', path: 'menu/headOffice'}
            ]
        },
        { id: 24, name: 'Branch Office Category',
            subItems: [
                { id: 25, name: 'Branch Office', path: 'menu/branchOffice'}
            ]
        },
        { id: 26, name: 'Revenue Category Master', 
            subItems: [
                { id: 27, name: 'Revenue Category', path: 'menu/revenueCategory'},
                { id: 28, name: 'Revenue Center', path: 'menu/revenueCenter'},
            ]
        },
        { id: 29, name: 'Cost Category Master', 
            subItems: [
                { id: 30, name: 'Cost Category', path: 'menu/costCategory'},
                { id: 31, name: 'Cost Center', path: 'menu/costCenter'},
            ]
        },
        { id: 32, name: 'Batch Master', 
            subItems: [
                { id: 33, name: 'Batch Master - Category', path: 'menu/batchCategory'},
                { id: 34, name: 'Batch Master - Serial No', path: 'menu/batchSerialNumber'},
                { id: 35, name: 'Batch Master - Color', path: 'menu/batchColor'},
                { id: 36, name: 'Batch Master - Size', path: 'menu/batchSize'},
                
            ]
        },
        { id: 37, name: 'Project Category Master', 
            subItems: [
                { id: 38, name: 'Project Category', path: 'menu/projectCategory'},
                { id: 39, name: 'Project Name', path: 'menu/projectName'},
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

        // Reset to the first item when filter changes
        setActiveIndex(filteredItems.length > 0 ? 0 : -1);   // Ensure valid index or -1 if no items
    }, [filter]);

    useEffect(() => {
        const handleKeyDown = event => {
            const projectMasterIndex = filteredItems.findIndex(item => item.name === 'Project Name');
    
            if (event.key === 'ArrowUp') {
                setActiveIndex(prev => {
                    let newIndex = Math.max(prev - 1, -1);  // Prevent index from going below -1
                    while (newIndex >= 0 && !filteredItems[newIndex].isSubItem) {
                        newIndex--;
                    }
                    if (itemRefs.current[newIndex]) {
                        itemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex; // Ensure activeIndex is at least -1
                });
            } else if (event.key === 'ArrowDown') {
                setActiveIndex(prev => {
                    let newIndex = Math.min(prev + 1, filteredItems.length - 1);   // Prevent index from exceeding the filtered length
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
            <div className='w-[97%] h-[92.9vh] flex'>
                 <div className='w-[49%] bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
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