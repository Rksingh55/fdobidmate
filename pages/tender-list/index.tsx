import { useState, useEffect } from 'react';
import TenderCard from '@/components/cards/tendercard';
import Filter from '@/components/cards/filtercard';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Frontheader from '@/components/front/Navbar';
import Header from '@/components/front/Pageheader';
import { BiSliderAlt, BiSolidServer } from 'react-icons/bi';
import { IoGridSharp } from 'react-icons/io5';
import Footer from '@/components/Layouts/Footer';
import { fetchTenderList } from '../../Reducer/tenderlistSlice';
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonCard from '@/components/cards/SkeletonCard';
import { GrPowerReset } from 'react-icons/gr';
import { GridIcon, ListIcon } from '@/public/icons';

const TenderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tenderlist = useSelector((state: RootState) => state.Tenderlist.list);
  const status = useSelector((state: RootState) => state.Tenderlist.status);
  const error = useSelector((state: RootState) => state.Tenderlist.error);
  useEffect(() => {
    dispatch(fetchTenderList());
  }, [dispatch]);

  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Partial<{
    encrypt_id: any;
    tenderId: any;
    department: any;
    code: any;
    company: any;
    curr_code: any;
    close_date: any;
    tenderfeeamount: string;
    publish_date: any;
  }>>({});

  const [filteredTenders, setFilteredTenders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'mostRecent' | string>('mostRecent');
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!Array.isArray(tenderlist)) {
      console.error('Tenderlist is not an array', tenderlist);
      return;
    }
    let tempTenders = [...tenderlist];
    if (filters?.encrypt_id) {
      tempTenders = tempTenders.filter(tender => tender.encrypt_id.includes(filters.encrypt_id));
    }
    if (filters?.code) {
      tempTenders = tempTenders.filter(tender => tender.code.includes(filters.code));
    }
    if (filters?.department) {
      tempTenders = tempTenders.filter(tender => tender.department.includes(filters.department));
    }
    if (filters?.publish_date) {
      tempTenders = tempTenders.filter(tender => new Date(tender.publish_date) >= new Date(filters.publish_date));
    }
    if (filters?.close_date) {
      tempTenders = tempTenders.filter(tender => new Date(tender.close_date) <= new Date(filters.close_date));
    }
    if (filters?.company) {
      tempTenders = tempTenders.filter(tender => tender.company.includes(filters.company));
    }
    if (sortBy === 'mostRecent') {
      tempTenders.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
    }

    setFilteredTenders(tempTenders);
  }, [filters, sortBy, tenderlist]);

  useEffect(() => {
    let searchFilteredTenders = [...filteredTenders];
    searchFilteredTenders = searchFilteredTenders.filter(tender => {
      return `${tender.code} ${tender.encrypt_id} ${tender.title} ${tender.publish_date} ${tender.curr_code} ${tender.tenderfeeamount} ${tender.company} ${tender.department}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    setFilteredTenders(searchFilteredTenders);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Frontheader />
      <Header heading="Tender Preview" />
      <div className='w-[90%] m-auto py-3 h-auto'>
        <div className="flex justify-between md:flex-row flex-col gap-2 items-center mb-4 bg-white p-3 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search by (Tender Id, Tender Title, Tender Type)"
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
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {status === 'failed' && <div className="text-red-500 text-center mt-12 font-bold">  {error}</div>}
        {status === 'succeeded' && (
          <div className="flex md:flex-row flex-col">
            <div className={showFilter ? "md:w-[70%] w-full" : "md:w-[90%] w-full"}>
              <div className={`flex ${view === 'grid' ? 'grid md:grid-cols-3' : 'flex-col'} gap-2`}>
                {filteredTenders.length > 0 ? (
                  filteredTenders.map(tender => (
                    <TenderCard key={tender.code} tender={tender} view={view} />
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
      </div>
      {/* <Footer /> */}
    </>
  );
};

TenderListPage.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default TenderListPage;
