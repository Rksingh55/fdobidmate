import React from 'react';
import { MdKeyboardArrowRight, } from 'react-icons/md';
import { OMRIcon, RfiCompanycodeIcon, RfidepartmentIcon, RfiprojectidIcon, TenderidIcon } from '../../public/icons';
import Link from 'next/link';
interface RfiCardProps {
    rfi: {
        encrypt_id: any;
        RfiDev_id: any;
        code: any;
        message: any;
        r_f_idevlopment: any;
        need: any;
        description: any;
        project: any;
        curr_code: any;
        company: any;
        id:any;
        req_id:any;
    };
    view: 'list' | 'grid';
}

const TenderCard: React.FC<RfiCardProps> = ({ rfi, view }) => {

    return (
        <>
            <div className={`${view === 'grid' ? 'w-full  ' : 'w-full'} `}>
                <div className="  mt-2  border-2 rounded-md  bg-white border-[#1E3567] hover:border-[#FC8404]  relative md:p-9 p-3  hover:shadow-md">
                    <h3 className="text-2xl py-1 text-[#00A9E2] font-bold flex gap-2 items-center"><TenderidIcon /><strong> </strong> {rfi?.req_id || "N/A"}</h3>
                    <p className='py-2 '><strong>Description :</strong> {rfi?.message || "N/A"}</p>
                    <div className={`${view === 'grid' ? 'flex flex-wrap justify-between gap-3 py-2' : 'flex justify-between  max-sm:flex-col max-sm:gap-2 py-2'} `} >
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949] ' >
                                <span className='text-[#00A9E2] '>
                                    <RfiCompanycodeIcon />
                                </span>
                                <div className='flex    flex-col '>
                                    <label className='font-bold'>Company Code   </label>
                                    {rfi?.company?.code || "N/A"}
                                </div>
                            </p>
                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <RfiprojectidIcon />
                                </span>

                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Project Id  </label>
                                    {rfi?.r_f_idevlopment?.need?.project?.code || "N/A"}
                                </div>
                            </p>

                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                    <RfidepartmentIcon />
                                </span>
                                <div className='flex    flex-col'>

                                    <label className='font-bold'>Department </label>
                                    {rfi?.r_f_idevlopment?.need?.department?.name || "N/A"}
                                </div>
                            </p>
                        </div>
                        <div>
                            <p className='flex gap-1 font-bold text-[#4b4949]' >
                                <span className='text-[#00A9E2] font-bold'>
                                <OMRIcon />
                                </span>
                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Currency </label>
                                    {rfi?.r_f_idevlopment?.need?.currency?.code || "N/A"}
                                </div>

                            </p>
                        </div>


                    </div>
                    <Link href={`/rfi/rfi-preview/${rfi?.id}`} key={rfi.encrypt_id} className='flex justify-end py-2 '>
                        <button className={`${view === 'grid' ? ' text-[#00A9E2] font-bold flex gap-2' : ' font-bold rounded-md mt-2 absolute md:top-[10%] max-sm:bottom-[5%] right-[-2%] bg-[#00A9E2] hover:bg-[#FC8404] text-white py-2 px-3 flex gap-2'} `} >More Details <MdKeyboardArrowRight className=' text-xl' />
                        </button>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default TenderCard;
