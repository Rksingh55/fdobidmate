import { useState, useEffect } from 'react';
import TenderCard from '@/components/cards/tendercard';
import Filter from '@/components/cards/filtercard';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Frontheader from '@/components/front/Navbar';
import Header from '@/components/front/Pageheader';
import { BiSliderAlt, BiSolidServer } from 'react-icons/bi';
import { IoGridSharp } from 'react-icons/io5';
import Footer from '@/components/Layouts/Footer';

interface Tender {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  region: string;
  amount: string;
  entity: string;
  department: string;
}

const tendersData: Tender[] = [
  {
    id: 'TDR-000001',
    title: 'Supply of HID Cards',
    description: '1 Supply of HID Cards as per below specifications...',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    region: 'Middle East',
    amount: '$100',
    entity: 'rk',
    department: 'pencil'
  },

  {
    id: 'TDR-000002',
    title: 'Supply of HID Cards',
    description: '1 Supply of HID Cards as per below specifications...',
    startDate: '2023-02-13',
    endDate: '2023-2-22',
    region: 'Middle East',
    amount: '$100',
    entity: 'Entity',
    department: 'pen'
  },
  {
    id: 'TDR-000003',
    title: 'Supply of HID Cards',
    description: '1 Supply of HID Cards as per below specifications...',
    startDate: '2023-09-2',
    endDate: '2023-05-11',
    region: 'Middle East',
    amount: '$100',
    entity: 'Entity',
    department: 'univercity'
  },
  {
    id: 'TDR-000004',
    title: 'Supply of HID Cards',
    description: '1 Supply of HID Cards as per below specifications...',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    region: 'Middle East',
    amount: '$100',
    entity: 'Entity',
    department: 'college'
  },
];

const tendorlist = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Partial<{
    tenderId: any;
    department: any;
    startDate: any;
    endDate: any;
    entity: any;
  }>>({});
  const [filteredTenders, setFilteredTenders] = useState<Tender[]>(tendersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'mostRecent' | string>('mostRecent');
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    let tempTenders = [...tendersData];
    if (filters?.tenderId) {
      tempTenders = tempTenders.filter(tender => tender.id.includes(filters.tenderId));
    }
    if (filters?.department) {
      tempTenders = tempTenders.filter(tender => tender.department.includes(filters.department));
    }
    if (filters?.startDate) {
      tempTenders = tempTenders.filter(tender => new Date(tender.startDate) >= new Date(filters.startDate));
    }
    if (filters?.endDate) {
      tempTenders = tempTenders.filter(tender => new Date(tender.endDate) <= new Date(filters.endDate));
    }
    if (filters?.entity) {
      tempTenders = tempTenders.filter(tender => tender.entity.includes(filters.entity));
    }
    if (sortBy === 'mostRecent') {
      tempTenders.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }

    setFilteredTenders(tempTenders);
  }, [filters, sortBy]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const Tenderdatasearch = filteredTenders?.filter(tender => {
    return `${tender.id} ${tender.title} ${tender.region} ${tender.entity} ${tender.department}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Frontheader />
      <Header heading="Tender Preview" />
      <div className='w-[90%] m-auto py-3'>
        <div className="flex justify-between md:flex-row flex-col gap-2 items-center mb-4 bg-white p-3 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search by (Tender Id, Tender Title, Tender Type)"
            className="p-2  w-2/3 outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center space-x-4   ">
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="p-2 border max-sm:hidden">
              <option value="mostRecent">Most Recent</option>
              <option value="mostRecent">Most Recent</option>
              <option value="mostRecent">Most Recent</option>
            </select>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 ${showFilter ? 'bg-[#FC8404] flex gap-2 font-bold text-white' : 'border flex gap-2 font-bold'}`}
            >
              <BiSliderAlt className='text-lg ' />Filter
            </button>
            <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-blue-500 text-white' : 'border'}`}><IoGridSharp className='text-lg ' /></button>
            <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'border'}`}><BiSolidServer className='text-lg ' />
            </button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col">
          <div className={showFilter ? "md:w-[70%] w-full" : "md:w-[90%] w-full"}>
            <div className={`flex ${view === 'grid' ? 'grid md:grid-cols-3 ' : 'flex-col'} gap-2`}>
              {Tenderdatasearch.length > 0 ? (
                Tenderdatasearch.map(tender => (
                  <TenderCard key={tender.id} tender={tender} view={view} />
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

      </div>
      <Footer />
    </>
  );
};

tendorlist.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default tendorlist;
