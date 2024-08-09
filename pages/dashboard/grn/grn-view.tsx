// import Link from 'next/link';
import { useEffect, useState } from 'react';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb";
import AnimateHeight from 'react-animate-height';
import IconCaretDown from '@/components/Icon/IconCaretDown';
// import { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';


function GRNview() {
    const tableDetail = [
        {
            line_no:'001',
            item_no:'IT001',
            category: 'categoryname',
            Unit: 'pcs',
            Ordered_Quantity: '25',
            Remaining_Quantity:'02',
            Received_Quantity:'',
            Reminder_Quantity: 'Tax Group',
            Price: '2500.01',
            Amount: '250',
            Action: '200',
        },
        {
            line_no:'002',
            item_no:'IT001',
            category: 'categoryname',
            Unit: 'pcs',
            Ordered_Quantity: '25',
            Remaining_Quantity:'02',
            Received_Quantity:'',
            Reminder_Quantity: 'Tax Group',
            Price: '2500.01',
            Amount: '250',
            Action: '200',
        },
    ];
    const [codeArr, setCodeArr] = useState<string[]>([]);
    // const toggleCode = (name: string) => {
    //     if (codeArr.includes(name)) {
    //         setCodeArr((value) => value.filter((d) => d !== name));
    //     } else {
    //         setCodeArr([...codeArr, name]);
    //     }
    // };
    const [active, setActive] = useState<string>('2');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    return (
        <div>
            <Dashboardbredcrumb />
            <div className="flex justify-end my-2 gap-2">
                <button type="button" className="bg-blue-500 rounded-2 btn-sm hover:bg-blue-700 text-white font-bold py-2 px-4  ">Create GRN</button>
                <button type="button" className="bg-blue-500 rounded-2 btn-sm hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
                <button type="button" className="bg-blue-500 rounded-2 btn-sm hover:bg-blue-700 text-white font-bold py-2 px-4  ">Save</button>
            </div>
            <div className="panel" id="basic">
                <div className="mb-5">
                    <div className="space-y-2 font-semibold">
                        <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                            <button
                                type="button"
                                className={`flex w-full items-center text-lg px-4 py-2 text-white-dark dark:bg-[#1b2e4b] ${active === '1' ? '!text-primary' : ''}`}
                                onClick={() => togglePara('1')}>Purchase Order
                                <div className={`ltr:ml-auto rtl:mr-auto ${active === '1' ? 'rotate-180' : ''}`}>
                                    <IconCaretDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                    <div className="space-y-2 border-t border-[#d3d3d3] p-4 text-[13px] text-white-dark dark:border-[#1b2e4b]">
                                        <div className='grid grid-cols-4'>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Purchase Order</h1>
                                                <p>PO-122013</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Purchase Order Date</h1>
                                                <p>20-02-2024</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Vendor Account</h1>
                                                <p>VA-02130</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Vendor Name</h1>
                                                <p>Assaddfs</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Delivery Date</h1>
                                                <p>20-03-2024</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Site</h1>
                                                <p>TS0213</p>
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Warehouse</h1>
                                                <p>TS-AI-Aadharesh</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                        <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                            <button
                                type="button"
                                className={`flex w-full text-lg items-center px-4 py-2 text-white-dark dark:bg-[#1b2e4b] ${active === '2' ? '!text-primary' : ''}`}onClick={() => togglePara('2')}>Receipt Details
                                <div className={`ltr:ml-auto rtl:mr-auto ${active === '2' ? 'rotate-180' : ''}`}>
                                    <IconCaretDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                    <div className="border-t border-[#d3d3d3] p-4 text-[13px] dark:border-[#1b2e4b]">
                                        <div className='grid grid-cols-4 gap-3'>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Product Receipt <span className='text-danger'>*</span></h1>
                                                <input type="text" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Booking Date <span className='text-danger'>*</span></h1>
                                                <input type="date" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Document Date <span className='text-danger'>*</span></h1>
                                                <input type="date" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Delivery Date <span className='text-danger'>*</span></h1>
                                                <input type="date" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Receiving Date <span className='text-danger'>*</span></h1>
                                                <input type="date" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Comment <span className='text-danger'>*</span></h1>
                                                <input type="text" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <h1 className='font-bold'>Attachments <span className='text-danger'>*</span></h1>
                                                <input type="file" className='form-control' />
                                            </div>
                                        </div>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                        <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                            <button
                                type="button"
                                className={`flex w-full text-lg items-center px-4 py-2 text-white-dark dark:bg-[#1b2e4b] ${active === '3' ? '!text-primary' : ''}`}onClick={() => togglePara('3')}>Lines
                                <div className={`ltr:ml-auto rtl:mr-auto ${active === '3' ? 'rotate-180' : ''}`}>
                                    <IconCaretDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                                    <div className="border-t border-[#d3d3d3] p-4 text-[13px] dark:border-[#1b2e4b]">
                                        <PerfectScrollbar className="perfect-scrollbar relative ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                                            <table className="table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="whitespace-nowrap">Line No.</th>
                                                        <th className="whitespace-nowrap">Category</th>
                                                        <th className="whitespace-nowrap">Item Number</th>
                                                        <th className="whitespace-nowrap">Unit</th>
                                                        <th className="whitespace-nowrap">Ordered Quantity</th>
                                                        <th className="whitespace-nowrap">Remaining Quantity</th>
                                                        <th className="whitespace-nowrap">Received Quantity</th>
                                                        <th className="whitespace-nowrap">Reminder Quantity</th>
                                                        <th className="whitespace-nowrap">Price</th>
                                                        <th className="whitespace-nowrap">Amount</th>
                                                        <th className="whitespace-nowrap">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableDetail.map((data) => {
                                                        return (
                                                            <tr key={data.line_no}>
                                                                <td className="whitespace-nowrap">{data.line_no}</td>
                                                                <td className="whitespace-nowrap">{data.item_no}</td>
                                                                <td className="whitespace-nowrap">{data.category}</td>
                                                                <td className="whitespace-nowrap">{data.Unit}</td>
                                                                <td className="whitespace-nowrap">{data.Ordered_Quantity}</td>
                                                                <td className="whitespace-nowrap">{data.Remaining_Quantity}</td>
                                                                <td className="whitespace-nowrap">{data.Received_Quantity}</td>
                                                                <td className="whitespace-nowrap">{data.Reminder_Quantity}</td>
                                                                <td className="whitespace-nowrap">{data.Price}</td>
                                                                <td className="whitespace-nowrap">{data.Amount}</td>
                                                                <td className="whitespace-nowrap">{data.Action}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </PerfectScrollbar>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GRNview;
