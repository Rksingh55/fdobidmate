import { useState, useEffect } from 'react';
import RfiCard from '@/components/cards/rficard';
import Filter from '@/components/cards/Rfi_filter';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Frontheader from '@/components/front/Navbar';
import Header from '@/components/front/Pageheader';
import { BiSliderAlt, } from 'react-icons/bi';
import { fetchRFIList } from '../../Reducer/rfilistSlice';
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonCard from '@/components/cards/SkeletonCard';
import { GrPowerReset } from 'react-icons/gr';
import { GridIcon, ListIcon } from '@/public/icons';
import { MdNavigateNext } from 'react-icons/md';
import { IoChevronBackSharp } from 'react-icons/io5';

const RfiListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Rfilist = useSelector((state: RootState) => state.Rfilist.list || []);
  const status = useSelector((state: RootState) => state.Rfilist.status);
  const error = useSelector((state: RootState) => state.Rfilist.error);
  const pagination = useSelector((state: RootState) => state.Rfilist.pagination);

  const fetchRfiData = (page: number) => {
    dispatch(fetchRFIList(page));
  };

  useEffect(() => {
    fetchRfiData(1);
  }, [dispatch]);

  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Partial<{
    Rfid: any;
    department: any;
    code: any;
    company: any;
    curr_code: any;
    close_date: any;
    tenderfeeamount: string;
    publish_date: any;
  }>>({});

  const [filteredRfi, setFilteredRfi] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'mostRecent' | string>('mostRecent');

  useEffect(() => {
    if (!Array.isArray(Rfilist)) {
      console.error('Rfilist is not an array', Rfilist);
      return;
    }
    let tempRfi = [...Rfilist];
    if (filters?.code) {
      tempRfi = tempRfi.filter(rfi => rfi.code.includes(filters.code));
    }
    if (filters?.department) {
      tempRfi = tempRfi.filter(rfi => rfi.department.includes(filters.department));
    }
    if (filters?.publish_date) {
      tempRfi = tempRfi.filter(rfi => new Date(rfi.publish_date) >= new Date(filters.publish_date));
    }
    if (filters?.close_date) {
      tempRfi = tempRfi.filter(rfi => new Date(rfi.close_date) <= new Date(filters.close_date));
    }
    if (filters?.company) {
      tempRfi = tempRfi.filter(rfi => rfi.company.includes(filters.company));
    }
    if (sortBy === 'mostRecent') {
      tempRfi.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
    }

    setFilteredRfi(tempRfi);
  }, [filters, sortBy, Rfilist]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRfi(Rfilist);
      return;
    }
    const searchFilteredRfi = Rfilist.filter(Rfi => {
      const combinedText = `${Rfi.company.code} ${Rfi.req_id} ${Rfi?.r_f_idevlopment?.need?.department?.name} `;
      return combinedText.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredRfi(searchFilteredRfi);
  }, [searchQuery, Rfilist]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlePageChange = (page: number) => {
    fetchRfiData(page);
  };

  const { currentPage, lastPage } = pagination;

  // Generate an array of page numbers
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  return (
    <>
      <Frontheader />
      <Header heading="RFI List" />
      <div className='w-[90%] m-auto py-3 h-auto'>
        <div className="flex justify-between md:flex-row flex-col gap-2 items-center mb-4 bg-white p-3 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search by RFI ID, company code, department"
            className="p-2 w-2/3 outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center space-x-4">
            <button onClick={() => setFilters({})} className="text-[#00A9E2] gap-2 font-bold flex justify-end">Reset Filter <GrPowerReset className='mt-[2px]' /></button>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 ${showFilter ? 'bg-[#00A9E2] rounded-md flex gap-2 font-bold text-white' : 'border rounded-md flex gap-2 font-bold'}`}
            >
              <BiSliderAlt className='text-lg' />Filter
            </button>
            <button onClick={() => setView('grid')} className={` ${view === 'grid' ? '' : ''}`}>
              <GridIcon />
            </button>
            <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? '' : ''}`}>
              <ListIcon />
            </button>
          </div>
        </div>
        {status === 'loading' && (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {status === 'failed' && <div className="text-red-500 text-center mt-12 font-bold">  {error}</div>}
        {status === 'succeeded' && (
          <div className="flex md:flex-row flex-col">
            <div className={showFilter ? "md:w-[70%] w-full" : "md:w-[90%] w-full"}>
              <div className={`flex ${view === 'grid' ? 'grid md:grid-cols-3' : 'flex-col'} gap-2`}>
                {filteredRfi.length > 0 ? (
                  filteredRfi.map(rfi => (
                    <RfiCard key={rfi?.company?.code} rfi={rfi} view={view} />
                  ))
                ) : (
                  <div className="text-center col-span-1 md:col-span-2 lg:col-span-3">
                    <p className="text-red-500 text-lg py-4">No data found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
            {showFilter && (
              <div className="md:w-[28%] w-[90%]">
                <Filter filters={filters} setFilters={setFilters} />
              </div>
            )}
          </div>
        )}
        {/* ---------pagination code -------- */}
        {status === 'succeeded' && (
          <div className="mt-4 flex justify-end">
            <div className="flex gap-2">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <IoChevronBackSharp />
              </button>
              <div className="flex gap-2 flex-wrap">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 py-2 border rounded-md ${page === currentPage
                      ? 'bg-[#FC8404] text-white'
                      : 'bg-gray-200 hover:bg-[#FC8404] hover:text-white'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={pagination.currentPage === pagination.lastPage}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <MdNavigateNext className='text-xl' />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

RfiListPage.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default RfiListPage;
