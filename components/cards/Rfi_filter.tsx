import { OMRIcon,  RfiCompanycodeIcon, RfidepartmentIcon, RfiprojectidIcon,  TenderidIcon } from '@/public/icons';
import React, { ChangeEvent } from 'react';
import { GrPowerReset } from 'react-icons/gr';

interface FilterProps {
    filters: Partial<{
        tenderId: string;
        department: string;
        startDate: string;
        endDate: string;
        entity: string;
    }>;
    setFilters: React.Dispatch<React.SetStateAction<Partial<{
        tenderId: string;
        department: string;
        startDate: string;
        endDate: string;
        entity: string;
    }>>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-2 ml-7 border-2 rounded-lg border-[#00A9E2] w-full bg-white mt-2">
            <div className='bg-[#00A9E2] text-white flex gap-2 items-center p-3 font-bold text-xl' style={{ borderRadius: "5px 5px 0px 0px" }}>
                <div className='h-[40px] w-[5px] bg-[#FC8404]'></div>
                Filter By
            </div>
            <div className='p-2 flex flex-col gap-2 border-[#00A9E2]'>
                <button onClick={() => setFilters({})} className="text-[#00A9E2] gap-2 font-bold flex justify-end"><GrPowerReset className='mt-[2px]' /></button>
                <div className="relative text-white-dark">
                    <input
                        type="text"
                        name="RFI ID"
                        placeholder="RFI ID"
                        value={filters.tenderId || ''}
                        onChange={handleChange}
                        className="border-2 border-[#FC8404] w-full py-3 px-5 "
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <TenderidIcon />
                    </span>
                </div>
                <div className="form-group form-float relative">
                    <select
                        id="Company"
                        className="form-input form-select cursor-pointer  border-2 rounded-none border-[#FC8404] w-full py-3 px-5"
                    >
                        <option value="" disabled selected>
                            Company Code
                        </option>
                        <option value="code2" >Company Code 2</option>
                        <option value="code3" >Company Code 3</option>
                        <option value="code1" >Company Code 1</option>
                    </select>
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <RfiCompanycodeIcon />
                    </span>
                </div>
                <div className="form-group form-float relative">
                    <select
                        id="Company"
                        className="form-input form-select cursor-pointer  border-2 rounded-none border-[#FC8404] w-full py-3 px-5"
                    >
                        <option value="" disabled selected>
                            Project Id
                        </option>
                        <option value="code2" >Company Code 2</option>
                        <option value="code3" >Company Code 3</option>
                        <option value="code1" >Company Code 1</option>
                    </select>
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <RfiprojectidIcon />
                    </span>
                </div>
                <div className="form-group form-float relative">
                    <select
                        id="Company"
                        className="form-input form-select cursor-pointer  border-2 rounded-none border-[#FC8404] w-full py-3 px-5"
                    >
                        <option value="" disabled selected>
                            Department
                        </option>
                        <option value="code2" >Company Code 2</option>
                        <option value="code3" >Company Code 3</option>
                        <option value="code1" >Company Code 1</option>
                    </select>
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <RfidepartmentIcon />
                    </span>
                </div>

                <div className="form-group form-float relative">
                    <select
                        id="Company"
                        className="form-input form-select cursor-pointer  border-2 rounded-none border-[#FC8404] w-full py-3 px-5"
                    >
                        <option value="" disabled selected>
                            Currency
                        </option>
                        <option value="code2" >Company Code 2</option>
                        <option value="code3" >Company Code 3</option>
                        <option value="code1" >Company Code 1</option>
                    </select>
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <OMRIcon />
                    </span>
                </div>


            </div>
        </div>
    );
};

export default Filter;
