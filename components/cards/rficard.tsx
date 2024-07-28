import React from 'react';
import { MdKeyboardArrowRight,} from 'react-icons/md';
import { OMRIcon, StartdateIcon, TenderDepartmentIcon, TenderEntityIcon, TenderfeesIcon, TenderidIcon } from '../../public/icons';
import Link from 'next/link';
interface TenderCardProps {
    tender: {
        encrypt_id: string;
        code: string;
        title: string;
        description: string;
        publish_date: string;
        close_date: string;
        curr_code: string;
        tenderfeeamount: string;
        company: string;
        department: string;
        entity: string;
    };
    view: 'list' | 'grid';
}

const TenderCard: React.FC<TenderCardProps> = ({ tender, view }) => {

    return (
        <>
            <div className={`${view === 'grid' ? 'w-full  ' : 'w-full'} `}>
                <div className="  mt-2  border-2 rounded-md  bg-white border-[#1E3567] hover:border-[#FC8404]  relative md:p-9 p-3  hover:shadow-md">
                    <h3 className="text-2xl py-1 text-[#00A9E2] font-bold">{tender.title}</h3>
                    <p className='py-2 flex gap-2'><TenderidIcon /><strong>Tender ID </strong> {tender.code}</p>
                    <p className='py-2 '><strong>Description :</strong> {tender.description}</p>
                    <div className={`${view === 'grid' ? 'flex flex-wrap justify-between gap-3 py-2' : 'flex justify-between  max-sm:flex-col max-sm:gap-2 py-2'} `} >
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949] ' >
                                <span className='text-[#00A9E2] '>
                                    <StartdateIcon />
                                </span>
                                <div className='flex    flex-col '>
                                    <label className='font-bold'>Start Date  </label>
                                    {tender.publish_date}
                                </div>
                            </p>
                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <StartdateIcon />
                                </span>

                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Close Date  </label>
                                    {tender.close_date}
                                </div>
                            </p>

                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <OMRIcon />
                                </span>
                                <div className='flex    flex-col'>

                                    <label className='font-bold'>Currency  </label>
                                    {tender.curr_code}
                                </div>
                            </p>
                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <TenderfeesIcon />
                                </span>
                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Tender Fees </label>
                                    {tender.tenderfeeamount}
                                </div>

                            </p>
                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>

                                    <TenderEntityIcon />
                                </span>
                                <div className='flex     flex-col'>
                                    <label className='font-bold'>Entity  </label>
                                    {tender?.company}
                                </div>

                            </p>
                        </div>

                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <TenderDepartmentIcon />
                                </span>
                                <div className='flex    flex-col'>

                                    <label className='font-bold'>Department </label>
                                    {tender.department}
                                </div>

                            </p>
                        </div>

                    </div>
                    <Link href={`/rfi/rfi-preview/${tender.encrypt_id}`} key={tender.encrypt_id} className='flex justify-end py-2 '>
                        <button className={`${view === 'grid' ? ' text-[#00A9E2] font-bold flex gap-2' : ' font-bold rounded-md mt-2 absolute md:top-[10%] max-sm:bottom-[5%] right-[-2%] bg-[#00A9E2] hover:bg-[#FC8404] text-white py-2 px-3 flex gap-2'} `} >More Details <MdKeyboardArrowRight className=' text-xl' />
                        </button>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default TenderCard;
