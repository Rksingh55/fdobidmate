import { TabGroup, TabPanels, TabPanel, TabList, Tab } from '@headlessui/react';
import { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"

const Purtable = () => {
    const tableOverview = [
        {
            line_no: '001',
            item_no: 'IT001',
            category: 'categoryname',
            product_name: 'Brother',
            quantity: '20',
            unit: 'Pcs',
            unit_price: '2010.01',
            tax_amount: '2010.00',
            total_amount: '40200.01',
        },
    ];
    const tableDetail = [
        {
            line_no: '001',
            item_no: 'IT001',
            category: 'categoryname',
            sales_tax_group: 'Tax Group',
            item_tax_group: 'Tax Group',
            grn_quantity: '250',
            invoice_quantity: '200',
        },
    ];


    return (
        <div>
            <Dashboardbredcrumb />

            <div className="panel p-4 border-white-light dark:border-[#1b2e4b] mt-3 ">
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Quotation Id*</h1>
                        <p>Quotation Id</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Quotation case *</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Delivery Date *</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Mode of Delivery *</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Terms of Delivery *</h1>
                        <p>Quotation Id </p>

                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Expiration Date *</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Title*</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Purchase Order Number*</h1>
                        <p>Quotation Id</p>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Currency*</h1>
                        <p>Quotation Id</p>

                    </div>
                </div>
            </div>
            <div className=" mt-4">
                <TabGroup>
                    <div className='flex justify-between items-center '>
                        <div>
                            <h1 className="font-bold text-xl text-[#00A9E2] flex items-center gap-2">Purchase Order Line</h1>
                        </div>
                        <div>
                            <TabList className="flex gap-2">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button className={`${selected ? 'border-b-2 !border-[#00A9E2] text-[#00A9E2] font-bold !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b-2 hover:border-[#00A9E2] hover:text-[#00A9E2]`}>Overview</button>
                                    )}
                                </Tab>

                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'border-b-2 !border-[#00A9E2] text-[#00A9E2] font-bold !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b-2 hover:border-[#00A9E2] hover:text-[#00A9E2]`}
                                        >Details</button>
                                    )}
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                    <div className='panel mt-2'>
                        <TabPanels>
                            <TabPanel>
                                <div className="active pt-4">
                                    <div>
                                        <PerfectScrollbar className="perfect-scrollbar relative ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                                            <table className="table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="whitespace-nowrap">Line No.</th>
                                                        <th className="whitespace-nowrap">Item Number</th>
                                                        <th className="whitespace-nowrap">Category</th>
                                                        <th className="whitespace-nowrap">Product Name</th>
                                                        <th className="whitespace-nowrap">Quantity</th>
                                                        <th className="whitespace-nowrap">Unit</th>
                                                        <th className="whitespace-nowrap">Unit Price</th>
                                                        <th className="whitespace-nowrap">Tax Amount</th>
                                                        <th className="whitespace-nowrap">Total Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableOverview.map((data) => {
                                                        return (
                                                            <tr key={data.line_no}>
                                                                <td>
                                                                    {data.line_no}
                                                                </td>
                                                                <td>{data.item_no}</td>
                                                                <td>{data.category}</td>
                                                                <td>{data.product_name}</td>
                                                                <td>{data.quantity}</td>
                                                                <td>{data.unit}</td>
                                                                <td>{data.unit_price}</td>
                                                                <td>{data.tax_amount}</td>
                                                                <td>{data.total_amount}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </PerfectScrollbar>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='pt-4'>
                                    <PerfectScrollbar className="perfect-scrollbar relative ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                                        <table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="whitespace-nowrap">Line No.</th>
                                                    <th className="whitespace-nowrap">Item Number</th>
                                                    <th className="whitespace-nowrap">Category</th>
                                                    <th className="whitespace-nowrap">Sales Tax Group</th>
                                                    <th className="whitespace-nowrap">Item Sales Tax Group</th>
                                                    <th className="whitespace-nowrap">GRN Remaining Quantity</th>
                                                    <th className="whitespace-nowrap">Invoice Remaining Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableDetail.map((data) => {
                                                    return (
                                                        <tr key={data.line_no}>
                                                            <td>{data.line_no}</td>
                                                            <td>{data.item_no}</td>
                                                            <td>{data.category}</td>
                                                            <td>{data.sales_tax_group}</td>
                                                            <td>{data.item_tax_group}</td>
                                                            <td>{data.grn_quantity}</td>
                                                            <td>{data.invoice_quantity}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </PerfectScrollbar>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </div>
                </TabGroup>
            </div>
        </div>
    );
};

export default Purtable;