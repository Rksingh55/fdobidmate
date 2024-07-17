import { useState, useEffect } from 'react';
import Link from 'next/link';
import Herosectionleftimage from "../../public/assets/images/herosection_left_image.png";
import Fdomainlogo from "../../public/assets/images/fdo_main_logo.png";
import Image from 'next/image'
interface SearchPopupProps {
    onClose: () => void;
    isSearchOpen: boolean;
}

interface DataItem {
    id: string;
    name: string;
}

const jsonData: DataItem[] = [
    { id: '1', name: 'John Doe' },
    { id: '1', name: 'Jane Smith' },
    { id: '1', name: 'Alice Johnson' },
    // Add more data as needed
];

const SearchPopup: React.FC<SearchPopupProps> = ({ onClose, isSearchOpen }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DataItem[]>([]);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isSearchOpen) {
            setAnimationClass('fade-in-enter');
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (query) {
            const filteredResults = jsonData.filter(item => item.id.includes(query));
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className={`fixed  inset-0 bg-[#E0F4FB] z-[1000]    opacity-[30%] flex items-start  justify-center transition-opacity duration-200 ease-in-out ${animationClass}`}>
            <div className="  p-8 rounded-lg   max-w-md w-full">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Search</h2>
                    <button onClick={onClose} className="text-grey-400 text-[30px]">&times;</button>
                </div>
                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-input ps-10 placeholder:text-white-dark rounded-full py-3 border-[#FC8404]"
                    placeholder="Enter ID to search"
                />
                <div className="mt-4 text-center">
                    {results.length > 0 ? (
                        <ul className="text-gray-800">
                            {results.map((result) => (
                                <li key={result.id} className=" p-2">
                                    <Link href={`/details/${result.id}`}>
                                        <p className="text-blue-500 hover:underline">{result.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        query && <p className="text-gray-500">No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
