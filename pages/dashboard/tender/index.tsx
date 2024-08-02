import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { PiDotsThreeOutlineVerticalLight, PiDotsThreeVerticalBold, PiFilePdfDuotone } from 'react-icons/pi';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { fetchTenderInterestList } from '@/Reducer/tenderInterestedSlice';
import FormSkeltonloader from "../../../components/cards/FormSkeletonloader"
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '@/localStorageUtil';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Dropdown';

const Quotations = () => {
    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/');
        }
    }, []);
    const dispatch = useDispatch<AppDispatch>();
    const TenderInterest = useSelector((state: RootState) => state.Tenderinterest.list);
    const status = useSelector((state: RootState) => state.Tenderinterest.status);
    const error = useSelector((state: RootState) => state.Tenderinterest.error);
    useEffect(() => {
        dispatch(fetchTenderInterestList());
    }, [dispatch]);

    const [initialRecords, setInitialRecords] = useState<any[]>(sortBy(TenderInterest));
    useEffect(() => {
        setInitialRecords(sortBy(TenderInterest));
    }, [TenderInterest]);

    console.log("TenderInterest", TenderInterest);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return TenderInterest.filter((item: any) => {
                return (
                    item.code.toLowerCase().includes(search.toLowerCase()) ||
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.purchase_type.toLowerCase().includes(search.toLowerCase()) ||
                    item.delivery_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.id.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const renderActions = (TenderInterest: any) => {
        return (
            <div className="dropdown z-[999]">
                <Dropdown
                    offset={[0, 5]}
                    placement="top-end"
                    button={<PiDotsThreeVerticalBold className="opacity-70 cursor-pointer" />}
                >
                    <div className='flex flex-col bg-white shadow-md rounded-md border-1'>
                        <Link href={`/dashboard/tender/tender-details/${TenderInterest?.id}`}>
                            <button className='bg-white p-2 rounded-md hover:text-blue-400  px-3' type="button" >View</button>
                        </Link>
                    </div>
                </Dropdown>
            </div>
        );
    };
    const handleAction = (rowData: any, action: string) => {
        console.log(`Performing action "${action}" on row with ID: ${rowData.id}`);
    };
    return (
        <>
            <Dashboardbredcrumb />
            {/* <div className="mb-4.5 flex flex-col gap-5 px-2 md:flex-row md:items-center">
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div> */}
            <div className="panel border-white-light px-0 dark:border-[#1b2e4b] mt-3 ">
                <div className="invoice-table">
                    <div className="datatables pagination-padding pago ">
                        {status === 'loading' && (
                            <div className="flex flex-wrap ml-4 gap-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <FormSkeltonloader />
                                ))}
                            </div>
                        )}
                        {status === 'succeeded' && (
                            <DataTable
                                className="table-hover whitespace-nowrap  "
                                records={records}
                                columns={[
                                    {
                                        accessor: 'Tender ID ',
                                        sortable: true,
                                        render: ({ code }: any) => (
                                            <div className="flex items-center font-semibold">
                                                <div>{`${code}`}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: ('title'),
                                        sortable: true,
                                        titleClassName: 'text-left',
                                        render: ({ title }) => <div className="text-left font-semibold">{`${title}`}</div>,
                                    },
                                    {
                                        accessor: 'Start Date',
                                        sortable: true,
                                        render: ({ publish_date }) => <div className="text-left font-semibold"> {`${publish_date}`}</div>,
                                    },
                                    {
                                        accessor: 'End Date',
                                        sortable: true,
                                        render: ({ close_date }) => <div className="text-left font-semibold">{`${close_date}`}</div>,
                                    },
                                    {
                                        accessor: 'Company',
                                        sortable: true,
                                        render: ({ company }) => <div className="text-left font-semibold">{`${company}`}</div>,
                                    },

                                    {
                                        accessor: 'Department',
                                        sortable: true,
                                        render: ({ department }) => <div className="text-left font-semibold">{`${department}`}</div>,
                                    },

                                    {
                                        accessor: 'action',
                                        title: 'Action',
                                        sortable: false,
                                        render: (rowData) => renderActions(rowData),
                                    },

                                ]}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                onSelectedRecordsChange={setSelectedRecords}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quotations;
