import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb";
import { TabGroup, TabPanels, TabPanel, TabList, Tab } from '@headlessui/react';
import { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const rowData = [
    {
        grn_no: 'VI-00100',
        productReceipt: 'GRN0025',
        net_amount: '201023.02',
        grn_date: '20-02-2024',
        po_no: '201201',
        status: 'Open',
    },
    {
        grn_no: 'VI-00102',
        productReceipt: 'GRN0025',
        net_amount: '201023.02',
        grn_date: '20-02-2024',
        po_no: '201201',
        status: 'Open',
    },
];

function Verificationlist() {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [selectedId, setSelectedId] = useState<string | null>(null); // State to track selected checkbox
    const [showDetails, setShowDetails] = useState(false); // State to control the visibility of the Details tab

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.grn_no.toLowerCase().includes(search.toLowerCase()) ||
                    item.productReceipt.toLowerCase().includes(search.toLowerCase()) ||
                    item.net_amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.grn_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.po_no.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) 
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const tableGrnLine = [
        {
            Line_No:'01',
            Item_Number: '00132',
            Category: 'Computer',
            Product_Name: 'Laptop',
            Received_Quantity: '885',
            Net_Amount: '21145.02',
        },
    ];

    const handleCheckboxChange = (id: string) => {
        if (selectedId === id) {
            setSelectedId(null); // Deselect if already selected
            setShowDetails(false); // Hide details if deselecting
        } else {
            setSelectedId(id); // Select new checkbox
            setShowDetails(true); // Show details if selecting
        }
    };

    const renderActions = (rowData: any) => {
        return (
            <div>
                <input
                    type="checkbox"
                    checked={selectedId === rowData.grn_no}
                    onChange={() => handleCheckboxChange(rowData.grn_no)}
                    className=''
                />
            </div>
        );
    };

    return (
        <div>
            <Dashboardbredcrumb />
            <div className="text-end my-2">
                <button type="button" className="bg-blue-500 rounded-2 hover:bg-blue-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto">Create</button>
            </div>
            <div className="panel">
                <TabGroup>
                    <div className='flex justify-between items-center '>
                        <h1 className="font-semibold text-xl text-[#00A9E2] flex items-center gap-2">GRN List</h1>
                        <div>
                            <TabList className="flex gap-2">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-secondary hover:text-secondary`}>Overview</button>
                                    )}
                                </Tab>
                                
                                {showDetails && (
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-secondary hover:text-secondary`}
                                            >Details</button>
                                        )}
                                    </Tab>
                                )}
                            </TabList>
                        </div>
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <div className="active pt-3">
                                <div>
                                    <div className="mb-3 flex flex-col gap-5 md:flex-row md:items-center">
                                        <div className="ltr:ml-auto rtl:mr-auto">
                                            <input
                                                type="text"
                                                className="form-input w-auto"
                                                placeholder="Search..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="datatables">
                                        <DataTable
                                            highlightOnHover
                                            className="table-hover whitespace-nowrap"
                                            records={recordsData}
                                            columns={[
                                                {
                                                    accessor: '',
                                                    sortable: false,
                                                    render: (rowData) => renderActions(rowData),
                                                },
                                                {
                                                    accessor: 'grn_no', 
                                                    title: 'GRN No', 
                                                    sortable: true,
                                                },
                                                { accessor: 'productReceipt', title: 'Product Receipt', sortable: true },
                                                { accessor: 'net_amount', title: 'Net Amount', sortable: true },
                                                { accessor: 'grn_date', title: 'GRN Date', sortable: true },
                                                { accessor: 'po_no', title: 'PO No', sortable: true },
                                                { accessor: 'status', title: 'Status', sortable: true },
                                            ]}
                                            totalRecords={initialRecords.length}
                                            recordsPerPage={pageSize}
                                            page={page}
                                            onPageChange={(p) => setPage(p)}
                                            recordsPerPageOptions={PAGE_SIZES}
                                            onRecordsPerPageChange={setPageSize}
                                            sortStatus={sortStatus}
                                            onSortStatusChange={setSortStatus}
                                            minHeight={200}
                                            paginationText={({ from, to, totalRecords }) =>
                                                `Showing ${from} to ${to} of ${totalRecords} entries`
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        {showDetails && (
                            <TabPanel>
                                <div className='pt-3'>
                                    <PerfectScrollbar className="perfect-scrollbar relative ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                                        <table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="whitespace-nowrap">Line No</th>
                                                    <th className="whitespace-nowrap">Item Number</th>
                                                    <th className="whitespace-nowrap">Category</th>
                                                    <th className="whitespace-nowrap">Product Name</th>
                                                    <th className="whitespace-nowrap">Received Quantity</th>
                                                    <th className="whitespace-nowrap">Net Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableGrnLine.map((data) => {
                                                    return (
                                                        <tr key={data.Line_No}>
                                                            <td>{data.Line_No}</td>
                                                            <td>{data.Item_Number}</td>
                                                            <td>{data.Category}</td>
                                                            <td>{data.Product_Name}</td>
                                                            <td>{data.Received_Quantity}</td>
                                                            <td>{data.Net_Amount}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </PerfectScrollbar>
                                </div>
                            </TabPanel>
                        )}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}

export default Verificationlist;
