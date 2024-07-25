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
                {/* <button onClick={() => setFilters({})} className="text-[#00A9E2] gap-2 font-bold flex justify-end">Reset Filter <GrPowerReset className='mt-[2px]' /></button> */}
                <input
                    type="text"
                    name="tenderId"
                    placeholder="Tender ID"
                    value={filters.tenderId || ''}
                    onChange={handleChange}
                    className="border-2 border-[#FC8404] w-full py-3 px-2"
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={filters.department || ''}
                    onChange={handleChange}
                    className="border-2 border-[#FC8404] w-full py-3 px-2"
                />
                <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={filters.startDate || ''}
                    onChange={handleChange}
                    className="border-2 border-[#FC8404] w-full py-3 px-2"
                />
                <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={filters.endDate || ''}
                    onChange={handleChange}
                    className="border-2 border-[#FC8404] w-full py-3 px-2"
                />
                <input
                    type="text"
                    name="entity"
                    placeholder="Entity"
                    value={filters.entity || ''}
                    onChange={handleChange}
                    className="border-2 border-[#FC8404] w-full py-3 px-2"
                />
            </div>
        </div>
    );
};

export default Filter;
