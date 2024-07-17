import BlankLayout from '@/components/Layouts/BlankLayout';
import Header from '@/components/front/Pageheader';
import Frontheader from '@/components/front/Navbar';
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Layouts/Footer';
import { TDRicon, OMRicon, Tenderdepartmenticon, OMrtransectionIcon } from '../../../public/icons';
import { MdCloudDownload, MdOutlineDateRange } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { GiDatabase } from 'react-icons/gi';
import { PiBuildingOfficeDuotone } from 'react-icons/pi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
function TenderPreview() {
    const router = useRouter();

    const array = [
        {}, {}, {}, {}
    ]

    let u_name = "";
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);
    const [name, setName] = useState(u_name ?? "");
    const handletenderapply = () => {
        if (!name) {
            toast.error('You must be logged in to apply tender, Please Login');
            setTimeout(() => {
                router.push("/auth/login")
            }, 3000);
            return;
        }else{
            router.push("/dashboard")
        }
    };


    return (
        <>      <ToastContainer />

            <Frontheader />
            <Header heading="Tender Preview" />
            <div className='w-[90%] m-auto'>
                <div className='flex gap-2 mt-3 md:flex-row flex-col'>
                    <div className='basis-[70%] p-2 bg-white rounded-md'>
                        <div className="max-w-4xl mx-auto md:p-3 p-1">
                            <div className='flex justify-between py-2'>
                                <div className="text-2xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div> CEO Tender</div>
                                <button className=' bg-[#FC8404] text-white font-semibold rounded-sm px-4 shadow-md'>5 Days to go</button>
                            </div>
                            <div className='flex md:flex-row justify-between gap-2 py-2 max-sm:flex-wrap'>
                                <div className="py-2 flex justify-center items-center gap-2">
                                    <TDRicon />
                                    <span>TDR-000014</span>
                                </div>
                                <div className="py-2 flex justify-center items-center gap-2">
                                    <OMRicon />
                                    <span>OMR</span>
                                </div>
                                <div className="py-2 flex justify-center items-center gap-2">
                                    <Tenderdepartmenticon />
                                    <span>Department</span>
                                </div>
                                <div className="py-2 flex justify-center items-center gap-2">
                                    <OMrtransectionIcon />
                                    <span>XXXXX OMR</span>
                                </div>

                            </div>

                            <div className="py-10">
                                <h2 className="text-2xl font-semibold mb-2 text-[#00A9E2]">Brief Information</h2>
                                <p className='py-2'>
                                    Design And Construction Of Elevated Metro Viaduct Of Length 17.624 Km Between Ch.21256.814 To Ch.38881.7 Including Railway Spans Of Length 79m & 100m And 6-Lane Double-Decker Portion With Vehicular Underpass (Vup) From Ch. 25755.211 To 26895.211 For A Total Length Of 1.14km In Reach-1a Of Nmrp Phase-2
                                </p>
                            </div>

                            <div className='mt-3'>
                                <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Tender Dates</h3>
                                <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                    <thead className=''>
                                        <tr className=''>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Date</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        <tr>
                                            <td className='p-2'>Tender Float Date</td>
                                            <td className='p-2'>25 May, 2024</td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>Bid Submission Date</td>
                                            <td className='p-2'>28 May, 2024</td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>Clarification End Date</td>
                                            <td className='p-2'>29 May, 2024</td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>Tender End Date</td>
                                            <td className='p-2'>3 June, 2024</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='mt-12'>
                                <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Applicable Fees</h3>
                                <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                    <thead>
                                        <tr className='bg-[#F4F7FF]'>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='p-2'>Bid Bond Fees</td>
                                            <td className='p-2'>34323</td>
                                        </tr>
                                        <tr>
                                            <td className='p-2'>Tender Fees</td>
                                            <td className='p-2'>786786</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='mt-12'>
                                <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Tender Documents</h3>
                                <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                    <thead>
                                        <tr className='bg-[#F4F7FF]'>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Sr. No</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>File Name</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Size</th>
                                            <th className='p-2 bg-[#00A9E2] text-white md:flex md:justify-center'>Download</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='p-2'>1</td>
                                            <td className='p-2'>Document Name</td>
                                            <td className='p-2'>PDF</td>
                                            <td className='p-2'>55kb</td>
                                            <td className='p-2 flex justify-center'><MdCloudDownload className='text-[#00A9E2] text-xl' /></td>

                                        </tr>
                                        <tr>
                                            <td className='p-2'>2</td>
                                            <td className='p-2'>Document Name</td>
                                            <td className='p-2'>PNG</td>
                                            <td className='p-2'>7mb</td>
                                            <td className='p-2 flex justify-center'><FaLock /></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h1 className='text-2xl font-semibold mt-12 text-[#00A9E2]'>Item List</h1>
                            <div className='max-sm:overflow-scroll'>
                                <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                    <thead>
                                        <tr className='bg-[#F4F7FF]'>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Sr. No.</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Category</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Item Name</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>UOM</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='p-2'>1</td>
                                            <td className='p-2'>Procurement_Category</td>
                                            <td className='p-2'>Lab Supply Agreement</td>
                                            <td className='p-2'>PCS</td>
                                            <td className='p-2'>300</td>
                                        </tr>

                                        <tr>
                                            <td className='p-2'>3</td>
                                            <td className='p-2'>Procurement_Category</td>
                                            <td className='p-2'>Mouse</td>
                                            <td className='p-2'>DOJEN</td>
                                            <td className='p-2'>100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='p-10 flex justify-center'>
                            <button onClick={handletenderapply} className='bg-[#00A9E2] text-white px-4 py-2 rounded-sm'>Apply Now</button>
                        </div>

                    </div>
                    <div className='basis-[30%] h-[900px]  p-1 bg-white rounded-md'>
                        <div className='bg-[#00A9E2] text-white flex gap-2 items-center  p-3 font-bold text-xl ' style={{ borderRadius: "5px 5px 0px 0px" }}>
                            <div className='h-[40px] w-[5px] bg-[#FC8404]'></div>
                            Recent Tenders</div>
                        <div>
                            <div className="">
                                {array?.map(() => (
                                    <Link href="/tender-list/tender-preview">
                                        <div className="cursor-pointer  mt-2  border-2 rounded-md  bg-white border-[#FC8404]  relative md:p-9 p-3  hover:shadow-md">
                                            <h3 className="text-xl font-semibold py-1 text-[#00A9E2]">Supply of HID Cards</h3>
                                            <p className='py-2'><strong>Tender ID :</strong>      TDR-000003</p>

                                            <div className='flex flex-wrap justify-between gap-3 py-2'  >
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><MdOutlineDateRange className=' text-lg' /> </span> Start Date</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><MdOutlineDateRange className=' text-lg' /> </span>End Date</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><HiLocationMarker className=' text-lg' /> </span>Middle East</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><BiSolidPurchaseTag className=' text-lg' /> </span>$100</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><GiDatabase className=' text-lg' /> </span>Entity</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1  text-[#4b4949]' ><span className='text-[#00A9E2] '><PiBuildingOfficeDuotone className=' text-lg' /> </span>department</p>
                                                </div>

                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

TenderPreview.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default TenderPreview;
