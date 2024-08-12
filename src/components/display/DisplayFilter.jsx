import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import { listOfPreDefinedVouchers, listOfVouchers } from '../services/MasterService';
import NameValues from '../../assets/NameValues';

const DisplayFilter = () => {
    const { type } = useParams();
    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState([]);
    const [preDefinedVoucherTypeSuggestions, setPreDefinedVoucherTypeSuggestions] = useState([]);
    const [highlightedSuggestionVoucherType, setHighlightedSuggestionVoucherType] = useState(0); // Set default to -1
    const [selectedIndex, setSelectedIndex] = useState(2);
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

        if (type === 'voucher'){
            // Fetch both custom and predefined vouchers
            Promise.all([listOfVouchers(), listOfPreDefinedVouchers()])
                .then(([customResponse, predefinedResponse]) => {
                    setVoucherTypeSuggestions(customResponse.data);
                    setPreDefinedVoucherTypeSuggestions(predefinedResponse.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [type]);

    const filteredNameValues = NameValues.filter(item => item.value.toLowerCase().includes(type.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'ArrowDown'){
                setSelectedIndex(prev => {
                    const newIndex = Math.min(prev + 1, voucherTypeSuggestions.length + preDefinedVoucherTypeSuggestions.length + 1);
                    setHighlightedSuggestionVoucherType(
                        newIndex - 2 >= 0 ? newIndex - 2 : -1
                    );
                    if (listItemRefs.current[newIndex]) {
                        listItemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp'){
                setSelectedIndex(prev => {
                    const newIndex = Math.max(prev - 1, 0);
                    setHighlightedSuggestionVoucherType(
                        newIndex - 2 >= 0 ? newIndex - 2 : -1
                    );
                    if (listItemRefs.current[newIndex]) {
                        listItemRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    return newIndex;
                });
            } else if (e.key === "Enter"){
                if (selectedIndex === 0){
                    navigate('/voucher/create');
                    e.preventDefault();
                } else if (selectedIndex === 1){
                    navigate('/menu/voucher');
                } else if (voucherTypeSuggestions[selectedIndex - 2]){
                    // Navigate to the selected voucher type
                    navigate(`/voucherTypeMasterApi/display/${voucherTypeSuggestions[selectedIndex - 2].voucherTypeName}`);
                } else if (preDefinedVoucherTypeSuggestions[selectedIndex - voucherTypeSuggestions.length - 2]){
                    navigate(`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${preDefinedVoucherTypeSuggestions[selectedIndex - voucherTypeSuggestions.length - 2].voucherType}`);
                }
            } else if (e.key === 'Escape'){
                navigate('/menu/voucher');
            };
        }
        window.addEventListener('keydown',handleKeyDown);
        return () => window.removeEventListener('keydown',handleKeyDown);
    },[selectedIndex, highlightedSuggestionVoucherType, voucherTypeSuggestions, preDefinedVoucherTypeSuggestions, navigate]);

    return (
        <>
        <div className="container flex">
            <div className='w-[96%] h-[92.9vh] flex'>
                <div className='w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]'></div>
                <div className='w-1/2 bg-slate-100 border border-l-blue-400 flex justify-center flex-col items-center'>
                    <div className="w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 ">
                        <p className="text-[13px] font-semibold underline underline-offset-4 decoration-gray-400">
                            {formatType(type)} Display
                        </p>
                        {filteredNameValues.map(({id, value}) => (
                            <input
                                key={id}
                                type="text"
                                id={value}
                                name={value}
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
                                    <p className='text-sm font-medium capitalize pl-2'>{`Customized ${type}`}</p>
                                    {voucherTypeSuggestions.map((voucher,index) => (
                                        <li 
                                            key={index} 
                                            className={`text-sm capitalize`}
                                            ref={el => listItemRefs.current[index + 2] = el} // Offset by 2 for Create and Back
                                        >
                                            <p className='text-[11px] text-[#2a67b1] capitalize pl-2 font-medium'>{voucher.voucherType}</p>
                                            <Link to={`/voucherTypeMasterApi/display/${voucher.voucherTypeName}`} className={`${highlightedSuggestionVoucherType === index ? 'bg-yellow-200 block pl-2' : 'pl-2'}`}>{voucher.voucherTypeName}</Link>
                                            
                                        </li>
                                    ))}
                                </ul>
                                <p className='text-sm font-medium capitalize pl-2'>{`Pre-Defined ${type}`}</p>
                                {preDefinedVoucherTypeSuggestions.map((voucher,index) => (
                                    <li 
                                        key={index} 
                                        className={`text-sm capitalize pl-2 list-none ${highlightedSuggestionVoucherType === voucherTypeSuggestions.length + index ? 'bg-yellow-200' : ''}`}
                                        ref={el => listItemRefs.current[voucherTypeSuggestions.length + index + 2] = el} // Offset by 2 for Create and Back
                                    >
                                        <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`}>{voucher.voucherType}</Link>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightSideButton />
        </div>
        </>
    );
}

export default DisplayFilter;
