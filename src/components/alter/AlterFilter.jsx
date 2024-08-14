import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import { listOfPreDefinedVouchers, listOfVouchers } from '../services/MasterService';
import NameValues from '../../assets/NameValues';

const AlterFilter = () => {

    const { type } = useParams();
    const [voucherTypeSuggestion, setVoucherTypeSuggestions] = useState([]);
    const [preDefinedVoucherTypeSuggestions, setPreDefinedVoucherTypeSuggestions] = useState([]);
    const [highlightedSuggestionVoucherType, setHighlightedSuggestionVoucherType] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [filterInput, setFilterInput] = useState('');
    const inputRef = useRef(null);
    const listItemRefs = useRef([]); // Ref array for list items
    const navigate = useNavigate();

    const formatType = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }

        // Only fetch data if the current path is '/voucher/display'
        if (type === 'voucher'){
            // Fetch both custom and predefined vouchers
            Promise.all([listOfVouchers(), listOfPreDefinedVouchers()])
            .then(([customResponse, predefinedResponse]) => {
                setVoucherTypeSuggestions(customResponse.data);
                setPreDefinedVoucherTypeSuggestions(predefinedResponse.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    },[type]);

    const handleInputChange = (e) => {
        setFilterInput(e.target.value);
        setSelectedIndex(2);  // Reset focus to the first item on input change
    };

    const filteredVoucherTypes = voucherTypeSuggestion.filter(voucher => 
        voucher.voucherTypeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredPreDefinedVoucherTypes = preDefinedVoucherTypeSuggestions.filter(voucher => 
        voucher.voucherType.toLowerCase().includes(filterInput.toLowerCase())
    );

    // Filter NameValues based on the type
    const filteredNameValues = NameValues.filter(item => item.value.toLowerCase().includes(type.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e) => {
            const totalItems = filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length + 2;
    
            if (e.key === 'ArrowDown') {
                setSelectedIndex((prev) => {
                    const newIndex = Math.min(prev + 1, totalItems - 1); // Ensure the index doesn't exceed the total items
                    setHighlightedSuggestionVoucherType(
                        newIndex - 2 >= 0 ? newIndex - 2 : -1
                    );
                    if (listItemRefs.current[newIndex]) {
                        listItemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex((prev) => {
                    const newIndex = Math.max(prev - 1, 0); // Ensure the index doesn't go below 0
                    setHighlightedSuggestionVoucherType(
                        newIndex - 2 >= 0 ? newIndex - 2 : -1
                    );
                    if (listItemRefs.current[newIndex]) {
                        listItemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate('/voucher/create');
                    e.preventDefault();
                } else if (selectedIndex === 1) {
                    navigate('/menu/voucher');
                } else if (selectedIndex >= 2 && selectedIndex < 2 + filteredVoucherTypes.length) {
                    const selectedVoucher = filteredVoucherTypes[selectedIndex - 2];
                    if (selectedVoucher) {
                        navigate(`/voucherTypeMasterApi/alterVoucherTypeMaster/${selectedVoucher.voucherTypeName}`);
                    }
                } else if (selectedIndex >= 2 + filteredVoucherTypes.length && selectedIndex < totalItems) {
                    const selectedPreDefinedVoucher = filteredPreDefinedVoucherTypes[selectedIndex - 2 - filteredVoucherTypes.length];
                    if (selectedPreDefinedVoucher) {
                        navigate(`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${selectedPreDefinedVoucher.voucherType}`);
                    }
                }
            } else if (e.key === 'Escape') {
                navigate('/menu/voucher');
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, highlightedSuggestionVoucherType, filteredVoucherTypes, filteredPreDefinedVoucherTypes, navigate]);

  return (
    <>
    <div className="container flex">
        <div className='w-[96%] h-[92.9vh] flex'>
             <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
             <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                    <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                        {formatType(type)} Alter
                    </p>
                    {filteredNameValues.map(({id, value}) => (
                        <input
                        key={id}
                        type="text"
                        id={value}
                        name={value}
                        value={filterInput}
                        onChange={handleInputChange}
                        ref={inputRef}
                        className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                    />
                    ))}
                </div>
                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                        List of Groups
                    </h2>
                    <div className='border border-b-slate-400'>
                        <div className={`w-full ${selectedIndex === 0 ? 'bg-yellow-200' : ''}`}>
                            <Link to={`/voucher/create`} className=''>
                                <p className={`ml-[295px] text-sm`}>Create</p>
                            </Link>
                        </div>
                        <div className={`w-full ${selectedIndex === 1 ? 'bg-yellow-200' : ''}`}>
                            <Link to={`/menu/voucher`} className=''>
                                <p className={`ml-[303px] text-sm `}>Back</p>
                            </Link>
                        </div>
                    </div>
                    <div className='overflow-y-scroll h-[73vh]'>
                        <div>
                            <ul className=''>
                                <p className='text-[16px] font-medium capitalize pl-2'>{`Customized ${type}`}</p>
                                {filteredVoucherTypes.map((voucher,index) => (
                                    <li 
                                        key={index} 
                                        className={`text-sm capitalize`}
                                        ref={el => listItemRefs.current[index + 2] = el} // Offset by 2 for Create and Back
                                    >
                                        <p className='text-sm capitalize pl-3 font-medium'>{voucher.voucherType}</p>
                                        <Link to={`/voucherTypeMasterApi/alterVoucherTypeMaster/${voucher.voucherTypeName}`} className={`${highlightedSuggestionVoucherType === index ? 'bg-yellow-200 block pl-4' : 'pl-4'}`}>{voucher.voucherTypeName}</Link>
                                        
                                    </li>
                                ))}
                            </ul>
                             {/* Conditionally render pre-defined items */}
                             <p className='text-[16px] font-medium capitalize pl-2'>{`Pre-Defined ${type}`}</p>
                            {type === 'voucher' && (
                                <ul className=''>
                                    {filteredPreDefinedVoucherTypes.map((voucher,index) => (
                                        <li 
                                            key={index} 
                                            className={`text-sm capitalize pl-4 ${highlightedSuggestionVoucherType === voucherTypeSuggestion.length + index ? 'bg-yellow-200' : ''}`}
                                            ref={el => listItemRefs.current[voucherTypeSuggestion.length + index + 2] = el} // Offset by 2 for Create and Back
                                        >
                                            <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`}>{voucher.voucherType}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
             </div>
        </div>
        <RightSideButton />
    </div>
    </>
  )
}

export default AlterFilter;