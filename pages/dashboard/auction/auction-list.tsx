import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
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


const AuctionList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            name: 'Laurie Fox',
            email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Paid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 2,
            invoice: '081452',
            name: 'Alexander Gray',
            email: 'alexGray3188@gmail.com',
            date: '20 Dec 2020',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Paid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 3,
            invoice: '081681',
            name: 'James Taylor',
            email: 'jamestaylor468@gmail.com',
            date: '27 Dec 2020',
            mobileno: '8987898765',
            // status: { tooltip: 'Pending', color: 'danger' },
            status: 'Paid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 4,
            invoice: '082693',
            name: 'Grace Roberts',
            email: 'graceRoberts@company.com',
            date: '31 Dec 2020',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 5,
            invoice: '084743',
            name: 'Donna Rogers',
            email: 'donnaRogers@hotmail.com',
            date: '03 Jan 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 6,
            invoice: '086643',
            name: 'Amy Diaz',
            email: 'amy968@gmail.com',
            date: '14 Jan 2020',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Paid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 7,
            invoice: '086773',
            name: 'Nia Hillyer',
            email: 'niahillyer666@comapny.com',
            date: '20 Jan 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Pending', color: 'danger' },
            status: 'Paid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 8,
            invoice: '087916',
            name: 'Mary McDonald',
            email: 'maryDonald007@gamil.com',
            date: '25 Jan 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Pending', color: 'danger' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 9,
            invoice: '089472',
            name: 'Andy King',
            email: 'kingandy07@company.com',
            date: '28 Jan 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 10,
            invoice: '091768',
            name: 'Vincent Carpenter',
            email: 'vincentcarpenter@gmail.com',
            date: '30 Jan 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 11,
            invoice: '095841',
            name: 'Kelly Young',
            email: 'youngkelly@hotmail.com',
            date: '06 Feb 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Pending', color: 'danger' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
        {
            id: 12,
            invoice: '098424',
            name: 'Alma Clarke',
            email: 'alma.clarke@gmail.com',
            date: '10 Feb 2021',
            mobileno: '8987898765',
            // status: { tooltip: 'Paid', color: 'success' },
            status: 'Unpaid',
            profile: 'profile-1.jpeg',
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
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
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.mobileno.toLowerCase().includes(search.toLowerCase())
                    //  ||
                    // item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSelectedRecords([]);
                setSearch('');
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSelectedRecords([]);
                setSearch('');
                setPage(1);
            }
        }
    };

    const exportTables = () => {
        window.print();
    };

    const header = ['id', 'name', 'email', 'date', 'mobileno', 'status'];
    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: items,
            },
        });
    }


    const col = ['id', 'name', 'email', 'date', 'mobileno', 'status'];
    const exportTable = (type: any) => {
        let columns: any = col;
        let records = items;
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
            head: [['ID', 'Invoice', 'Name', 'Email', 'Date', 'Mobile No', 'Status']],
            body: items?.map(item => [item?.id, item?.invoice, item?.name, item?.email, item?.date, item?.mobileno, item?.status])
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

                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="datatables pagination-padding pago">
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
                                    accessor: 'vendor name',
                                    sortable: true,
                                    render: ({ name, id }: any) => (
                                        <div className="flex items-center font-semibold">
                                            <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                                                <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                            </div>
                                            <div>{name}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'email',
                                    sortable: true,
                                },
                                {
                                    accessor: 'date',
                                    sortable: true,
                                },
                                {
                                    accessor: 'mobile no',
                                    sortable: true,
                                    titleClassName: 'text-right',
                                    render: ({ mobileno, id }) => <div className="text-right font-semibold">{`${mobileno}`}</div>,
                                },
                                {
                                    accessor: 'status',
                                    sortable: true,
                                    render: ({ status }) => <div className="text-left font-semibold">{`${status}`}</div>,
                                    // render: ({ status  }) => <span className={`badge badge-outline-${status?.color} `}>{status?.tooltip}</span>,
                                },
                                {
                                    accessor: 'action',

                                    title: 'Actions',
                                    render: ({ id }) => (
                                        <div className="mx-auto flex w-max items-center gap-4">
                                            <Link href="/dashboard/vendor/vendor-list/edit" className="flex hover:text-info">
                                                <IconEdit className="w-4.5 h-4.5" />
                                            </Link>
                                            <Link href="/dashboard/vendor/vendor-list/preview" className="flex hover:text-primary">
                                                <IconEye />
                                            </Link>
                                            <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                                <IconTrashLines />
                                            </button>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuctionList;
