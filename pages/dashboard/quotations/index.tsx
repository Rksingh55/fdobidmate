import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import IconFile from '@/components/Icon/IconFile';
import IconPrinter from '@/components/Icon/IconPrinter';
import { downloadExcel } from 'react-export-table-to-excel';
import { GrDocumentExcel } from 'react-icons/gr';
import { PiFilePdfDuotone } from 'react-icons/pi';
import { BsFiletypeTxt } from 'react-icons/bs';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { fetchQuatationList } from '../../../Reducer/quatationSlice';
import FormSkeltonloader from "../../../components/cards/FormSkeletonloader"
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '@/localStorageUtil';
import { useRouter } from 'next/router';

const Quotations = () => {
    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/');
        }
    }, []);

    const dispatch = useDispatch<AppDispatch>();
    const quotation = useSelector((state: RootState) => state.quotation.list);
    const status = useSelector((state: RootState) => state.quotation.status);
    const error = useSelector((state: RootState) => state.quotation.error);

    useEffect(() => {
        dispatch(fetchQuatationList());
    }, [dispatch]);
    const [initialRecords, setInitialRecords] = useState<any[]>(sortBy(quotation));
    useEffect(() => {
        setInitialRecords(sortBy(quotation));
    }, [quotation]);

    console.log("quotation", quotation);

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
            return quotation.filter((item) => {
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

    const exportTables = () => {
        window.print();
    };
    const header = ['Quotation', 'Title', 'Purchase type', 'Date', 'Date', 'Status', 'Action'];
    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: quotation,
            },
        });
    }
    const col = ['Quotation', 'Title', 'Purchase type', 'Date', 'Date', 'Status', 'Action'];
    const exportTable = (type: any) => {
        let columns: any = col;
        let records = quotation;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';
            records.map((item: any) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const exportTableinPdf = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Quotation', 'Title', 'Purchase type', 'Date', 'Date', 'Status', 'Action']],
            body: quotation?.map(item => [item?.code, item?.title, item?.purchase_type, item?.delivery_date, item?.status])
        });
        doc.save('Vendor_list.pdf');
    };
    return (
        <>
            <Dashboardbredcrumb />
            <div className="panel border-white-light px-0 dark:border-[#1b2e4b] mt-3 ">

                <div className="invoice-table">
                    <div className="mb-4.5 flex flex-col gap-5 px-2 md:flex-row md:items-center">
                        <div className="flex flex-wrap items-center">
                            <button type="button" onClick={exportTableinPdf} className="btn btn-primary btn-sm m-1">
                                <PiFilePdfDuotone className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                PDF
                            </button>
                            <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                                <BsFiletypeTxt className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                TXT
                            </button>

                            <button onClick={handleDownloadExcel} type="button" className="btn btn-primary btn-sm m-1" >
                                <GrDocumentExcel className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                EXCEL
                            </button>

                            <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => exportTables()}>
                                <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                                PRINT
                            </button>

                        </div>

                        {/* <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div> */}
                    </div>

                    <div className="datatables pagination-padding pago">
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
                                    // {
                                    //     accessor: 'invoice',
                                    //     sortable: true,
                                    //     render: ({ invoice }) => (
                                    //         <Link href="/dashboard/vendor-list/preview">
                                    //             <div className="font-semibold text-primary underline hover:no-underline">{`#${invoice}`}</div>
                                    //         </Link>
                                    //     ),
                                    // },
                                    {
                                        accessor: 'Quotation',
                                        sortable: true,
                                        render: ({ code, id }: any) => (
                                            <div className="flex items-center font-semibold">
                                                <div>{code}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: ('title'),
                                        sortable: true,
                                        titleClassName: 'text-left',
                                        render: ({ title, id }) => <div className="text-left font-semibold">{`${title}`}</div>,
                                    },
                                    {
                                        accessor: 'Purchase Type',
                                        sortable: true,
                                        render: ({ purchase_type, id }) => <div className="text-left font-semibold">{`${purchase_type}`}</div>,
                                    },
                                    {
                                        accessor: 'date',
                                        sortable: true,
                                        render: ({ delivery_date, id }) => <div className="text-left font-semibold">{`${delivery_date}`}</div>,
                                    },
                                    {
                                        accessor: 'status',
                                        sortable: true,
                                        render: ({ status }) => <div className="text-left font-semibold">{`${status}`}</div>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Actions',
                                        render: ({ id }) => (
                                            <div className="mx-auto flex w-max items-center gap-4">
                                                <Link href="/dashboard/vendor/vendor-list/edit" className="flex hover:text-info">
                                                    <IconEdit className="w-4.5 h-4.5" />
                                                </Link>
                                                <Link href="/dashboard/quotations/view" className="flex hover:text-primary">
                                                    <IconEye />
                                                </Link>

                                            </div>
                                        ),
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
