import { Link, useNavigate, useParams } from 'react-router-dom';
import RightSideButton from '../right-side-button/RightSideButton';
import { useEffect, useRef, useState } from 'react';
import { listOfCurrencies, listOfDepartments, listOfLocations, listOfPreDefinedVouchers, listOfVouchers } from '../services/MasterService';
import NameValues from '../../assets/NameValues';

const DisplayFilter = () => {
    const { type } = useParams();
    const [voucherTypeSuggestions, setVoucherTypeSuggestions] = useState([]);
    const [preDefinedVoucherTypeSuggestions, setPreDefinedVoucherTypeSuggestions] = useState([]);
    const [currencySuggestions, setCurrencySuggestions] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [filterInput, setFilterInput] = useState('');
    const inputRef = useRef(null);
    const listItemRefs = useRef([]);
    const navigate = useNavigate();
    const typeNames = {
        currency: 'Currencies',
        voucher: 'Vouchers',
        department: 'Departments',
        location: 'Locations'
      };

    const formatType = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (type === 'voucher') {
            Promise.all([listOfVouchers(), listOfPreDefinedVouchers()])
                .then(([customResponse, predefinedResponse]) => {
                    setVoucherTypeSuggestions(customResponse.data);
                    setPreDefinedVoucherTypeSuggestions(predefinedResponse.data);
                })
                .catch(error => console.error(error));
        } else if (type === 'currency') {
            listOfCurrencies()
                .then(response => {
                    setCurrencySuggestions(response.data);
                })
                .catch(error => console.error(error));
        } else if (type === 'department'){
            listOfDepartments()
            .then(response => {
                setDepartmentSuggestions(response.data);
            })
            .catch(error => console.error(error));
        } else if (type === 'location'){
            listOfLocations()
            .then(response => {
                setLocationSuggestions(response.data);
            })
            .catch(error => console.error(error));
        }
    }, [type]);

    const handleInputChange = (e) => {
        setFilterInput(e.target.value);
        setSelectedIndex(2); // Reset focus to the first item on input change
    };

    const filteredVoucherTypes = voucherTypeSuggestions.filter(voucher =>
        voucher.voucherTypeName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredPreDefinedVoucherTypes = preDefinedVoucherTypeSuggestions.filter(voucher =>
        voucher.voucherType.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredCurrencies = currencySuggestions.filter(currency =>
        currency.forexCurrencyName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredDepartments = departmentSuggestions.filter(department => 
        department.departmentName.toLowerCase().includes(filterInput.toLowerCase())
    );

    const filteredLocations = locationSuggestions.filter(location =>
        location.godownName.toLowerCase().includes(filterInput.toLowerCase())
    );

    // Logic to determine if the scrollbar should be shown based on the type
    let shouldShowScroll;
    
    if (type === 'voucher') {
        shouldShowScroll = (filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length > 20);
    } else if (type === 'currency'){
        shouldShowScroll = (filteredCurrencies.length > 20);
    } else if (type === 'department'){
        shouldShowScroll = (filteredDepartments.length > 20);
    } else if (type === 'location'){
        shouldShowScroll = (filteredLocations.length > 20);
    } else{
        shouldShowScroll = false;
    }

    const filteredNameValues = NameValues.filter(item => item.value.toLowerCase().includes(type.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e) => {
            let totalItems = 0;
            if (type === 'currency') {
                totalItems = filteredCurrencies.length;
            } else if (type === 'voucher') {
                totalItems = filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length;
            } else if (type === 'department'){
                totalItems = filteredDepartments.length;
            } else if (type === 'location'){
                totalItems = filteredLocations.length;
            }

            if (e.key === 'ArrowDown') {
                setSelectedIndex(prev => {
                    const newIndex = Math.min(prev + 1, totalItems + 1); // Ensures the focus doesn't exceed the list length
                    listItemRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prev => {
                    const newIndex = Math.max(prev - 1, 0); // Ensures the focus doesn't go below 0
                    listItemRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    return newIndex;
                });
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate(`/menu/${type}`);
                } else if (selectedIndex === 1) {
                    navigate('/');
                } else if (type === 'voucher') {
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredVoucherTypes.length) {
                        const selectedVoucher = filteredVoucherTypes[selectedIndex - 2];
                        if (selectedVoucher) {
                            navigate(`/voucherTypeMasterApi/display/${selectedVoucher.voucherTypeName}`);
                        }
                    } else if (selectedIndex >= 2 + filteredVoucherTypes.length && selectedIndex < 2 + filteredVoucherTypes.length + filteredPreDefinedVoucherTypes.length) {
                        const selectedPreDefinedVoucher = filteredPreDefinedVoucherTypes[selectedIndex - 2 - filteredVoucherTypes.length];
                        if (selectedPreDefinedVoucher) {
                            navigate(`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${selectedPreDefinedVoucher.voucherType}`);
                        }
                    }
                } else if (type === 'currency') {
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredCurrencies.length) {
                        const selectedCurrency = filteredCurrencies[selectedIndex - 2];
                        if (selectedCurrency) {
                            navigate(`/currencyMasterApi/displayCurrency/${selectedCurrency.forexCurrencySymbol}`);
                        }
                    }
                } else if (type === 'department'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredDepartments.length){
                        const selectedDepartment = filteredDepartments[selectedIndex - 2];
                        if (selectedDepartment) {
                            navigate(`/departmentMasterApi/displayDepartment/${selectedDepartment.departmentName}`);
                        }
                    }
                } else if (type === 'location'){
                    if (selectedIndex >= 2 && selectedIndex < 2 + filteredLocations.length){
                        const selectedLocation = filteredLocations[selectedIndex - 2];
                        if (selectedLocation) {
                            navigate(`/locationMasterApi/displayGodown/${selectedLocation.godownName}`);
                        }
                    }
                }
            } else if (e.key === 'Escape') {
                navigate(`/menu/${type}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, filteredVoucherTypes, filteredPreDefinedVoucherTypes, filteredCurrencies, filteredDepartments, filteredLocations, navigate, type]);

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };
    

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
                            {filteredNameValues.map(({ id, value }) => (
                                <input
                                    key={id}
                                    type="text"
                                    id={value}
                                    name={value}
                                    value={filterInput}
                                    onChange={handleInputChange}
                                    ref={inputRef}
                                    className="w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                    autoComplete="off"
                                />
                            ))}
                        </div>
                        <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                            <h2 className="p-1 bg-[#2a67b1] text-white text-left text-[13px] pl-3">
                                List of {typeNames[type] || 'Items'}
                            </h2>
                            <div className='border border-b-slate-400'>
                                <div className={`w-full ${selectedIndex === 0 ? 'bg-yellow-200' : ''}`}>
                                    <Link to={`/menu/${type}`} className=''>
                                        <p className={`ml-[295px] text-sm`}>Create</p>
                                    </Link>
                                </div>
                                <div className={`w-full ${selectedIndex === 1 ? 'bg-yellow-200' : ''}`}>
                                    <Link to={`/`} className=''>
                                        <p className={`ml-[296px] text-sm`}>Home</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={`h-[70vh] ${shouldShowScroll ? 'overflow-y-scroll' : ''}`}>
                                <div>
                                    {type === 'voucher' && (
                                        <>
                                            <ul className=''>
                                                {filteredVoucherTypes.map((voucher, index) => (
                                                    <li
                                                        key={index}
                                                        className={`text-sm ${selectedIndex === index + 2 ? '' : ''}`}
                                                        ref={el => listItemRefs.current[index + 2] = el}
                                                    >
                                                        <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`}>
                                                            <p className='text-sm capitalize pl-3 font-medium'>{voucher.voucherType}</p>
                                                        </Link>
                                                        <Link
                                                            to={`/voucherTypeMasterApi/display/${voucher.voucherTypeName}`}
                                                            className={`pl-4 ${selectedIndex === index + 2 ? 'bg-yellow-200 block' : ''}`}
                                                        >
                                                            {capitalizeWords(voucher.voucherTypeName)}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className=''>
                                                {filteredPreDefinedVoucherTypes.map((voucher, index) => (
                                                    <li
                                                        key={index + filteredVoucherTypes.length}
                                                        className={`text-sm capitalize font-medium pl-3 ${selectedIndex === index + filteredVoucherTypes.length + 2 ? 'bg-yellow-200' : ''}`}
                                                        ref={el => listItemRefs.current[index + filteredVoucherTypes.length + 2] = el}
                                                    >
                                                        <Link to={`/preDefinedVoucherTypeApi/displayPreDefinedVoucher/${voucher.voucherType}`}>
                                                            <p className='text-sm capitalize font-medium'>{voucher.voucherType}</p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                    {type === 'currency' && (
                                        <ul className=''>
                                            {filteredCurrencies.map((currency, index) => (
                                                <li
                                                    key={index}
                                                    className={`text-sm capitalize ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`}
                                                    ref={el => listItemRefs.current[index + 2] = el}
                                                >
                                                    <Link to={`/currencyMasterApi/displayCurrency/${currency.forexCurrencySymbol}`}>
                                                        <p className='text-sm uppercase font-medium pl-3'>{currency.forexCurrencySymbol} - {currency.forexCurrencyName}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {type === 'department' && (
                                        <ul>
                                            {filteredDepartments.map((department,index) => (
                                                <li key={index} className={`text-sm capitalize ${selectedIndex === index + 2 ? 'bg-yellow-200' : ''}`} ref={el => listItemRefs.current[index + 2] = el}
                                                >
                                                    <p className='text-sm capitalize font-medium pl-3'>{department.departmentName}</p>
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
    );
};

export default DisplayFilter;
