import React from 'react';
import { MdKeyboardArrowRight, MdOutlineDateRange } from 'react-icons/md';
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { GiDatabase } from "react-icons/gi";
import { PiBuildingOfficeDuotone } from 'react-icons/pi';
import {TenderidIcon} from '../../public/icons';

import Link from 'next/link';
interface TenderCardProps {
    tender: {
        encrypt_id:string;
        code: string;
        title: string;
        description: string;
        publish_date: string;
        close_date: string;
        curr_code: string;
        tenderfeeamount: string;
        company: string;
        department: string;
    };
    view: 'list' | 'grid';
}

const TenderCard: React.FC<TenderCardProps> = ({ tender, view }) => {
    console.log("hello", tender);
    return (
     <>
        <div className={`${view === 'grid' ? 'w-full  ' : 'w-full'} `}>
            <div className="  mt-2  border-2 rounded-md  bg-white border-[#FC8404]  relative md:p-9 p-3  hover:shadow-md">
                <h3 className="text-xl font-semibold py-1 text-[#00A9E2]">{tender.title}</h3>
                <p className='py-2 flex gap-2'><TenderidIcon/><strong>Tender ID :</strong> {tender.code}</p>
                <p className='py-2 '><strong>Description :</strong> {tender.description}</p>
                <div className={`${view === 'grid' ? 'flex flex-wrap justify-between gap-3 py-2' : 'flex justify-between max-sm:flex-col max-sm:gap-2 py-2'} `} >
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><MdOutlineDateRange className=' text-lg' /> </span> {tender.publish_date}</p>
                    </div>
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><MdOutlineDateRange className=' text-lg' /> </span>{tender.close_date}</p>
                    </div>
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><HiLocationMarker className=' text-lg' /> </span>{tender.curr_code}</p>
                    </div>
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><BiSolidPurchaseTag className=' text-lg' /> </span>{tender.tenderfeeamount}</p>
                    </div>
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><GiDatabase className=' text-lg' /> </span>{tender.tenderfeeamount}</p>
                    </div>
                    <div>
                        <p className='flex gap-1 font-bold text-[#4b4949]' ><span className='text-[#00A9E2] font-bold'><PiBuildingOfficeDuotone className=' text-lg' /> </span>{tender.department}</p>
                    </div>

                </div>
                {/* <Link href={`/tender-list/tender-preview/${tender.encrypt_id}`} className='flex justify-end py-2 '>
                    <button className={`${view === 'grid' ? ' text-[#00A9E2] font-bold flex gap-2' : ' font-bold rounded-md mt-2 absolute top-[10%] right-[-2%] bg-[#00A9E2] text-white py-2 px-3 flex gap-2'} `} >More Details <MdKeyboardArrowRight className=' text-xl' />
                    </button>
                </Link> */}
                <Link href={`/tender-list/tender-preview`} className='flex justify-end py-2 '>
                    <button className={`${view === 'grid' ? ' text-[#00A9E2] font-bold flex gap-2' : ' font-bold rounded-md mt-2 absolute top-[10%] right-[-2%] bg-[#00A9E2] text-white py-2 px-3 flex gap-2'} `} >More Details <MdKeyboardArrowRight className=' text-xl' />
                    </button>
                </Link>
            </div>
        </div>
     </>
    );
};

export default TenderCard;
