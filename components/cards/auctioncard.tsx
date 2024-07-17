import React, { useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { FcCurrencyExchange } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import Countdown from 'react-countdown';
import { BiDollarCircle, BiSolidCategoryAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useAppDispatch } from '../../store/hooks';
import { addCard } from '../../Reducer/clickedCardsSlice';

import { LuArrowRightLeft } from 'react-icons/lu';
import { OMRicon, TenderidIcon } from '@/public/icons';
dayjs.extend(isBetween);

function AuctionCard() {
    const router = useRouter();

    const cars = [
        {
            id: "000003",
            Name: 'KIA',
            model: 'Sorento',
            year: 2014,
            imageUrl: 'https://img.freepik.com/free-photo/yellow-car-gas-station_23-2150697544.jpg?t=st=1717741403~exp=1717745003~hmac=b12a164652bf5a44bc7c6a228e72d2457832c6fc74604d05aeaeca33bde8bf84&w=900',
            currentBid: 876.00,
            bids: 30,
            buyNow: 50000,
            AuctionType: 'Forward',
            publishDate: 'May 10 2024'
        },
        {
            id: "000004",
            Name: 'KIA',
            model: 'Suzuki Swift',
            year: 2022,
            imageUrl: 'https://img.freepik.com/free-photo/front-wheel-blue-vintage-sedan_114579-6115.jpg?t=st=1717741420~exp=1717745020~hmac=b53eaa336feed7766426dc6aff1652050268631ae989938fae6083ce004fe34e&w=900',
            currentBid: 876.00,
            bids: 20,
            buyNow: 4000,
            AuctionType: 'Reverse',
            publishDate: 'Jun 18 2024'
        },
        {
            id: "000006",
            Name: 'KIA',
            model: 'Kia Seltos',
            year: 2023,
            imageUrl: 'https://d3nn873nee648n.cloudfront.net/900x600/20487/300-PK1047952.jpg',
            currentBid: 876.00,
            bids: 30,
            buyNow: 12400,
            AuctionType: 'Reverse',
            publishDate: 'Aug 20 2024'
        },

    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const dispatch = useAppDispatch();
    const handleBid = (auctionType: any, car: any, id: any) => {
        dispatch(addCard(car));
        router.push({
            pathname: '/auction/auction-preview',
            query: { id, auctionType },
        });
    };




    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const filteredCars = cars?.filter(car => {
        const carPublishDate = dayjs(car?.publishDate, 'DD/MM/YYYY');
        const isWithinDateRange = startDate && endDate ? carPublishDate.isBetween(dayjs(startDate), dayjs(endDate), null, '[]') : true;
        return isWithinDateRange && `${car?.year} ${car?.Name} ${car?.model} ${car?.AuctionType} `.toLowerCase().includes(searchQuery?.toLowerCase());
    });

    return (
        <>
            <div className='my-3 rounded-md flex justify-between flex-col md:flex-row bg-white' >
                <input
                    type='search'
                    className=' outline-none py-2.5 px-10 md:w-[350px] rounded'
                    placeholder='Search here by name, model and year '
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className='flex items-center justify-center gap-2 bg-[#00A9E2] p-2 rounded'>
                    <DatePicker
                        selected={startDate}
                        placeholderText='Start Date'
                        onChange={(date) => setStartDate(date)}
                        dateFormat='dd/MM/yyyy'
                        className='border px-2 py-2 rounded cursor-pointer w-24'
                    />
                    <span><LuArrowRightLeft className='text-white' /></span>
                    <DatePicker
                        placeholderText='End Date'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat='dd/MM/yyyy'
                        className='border px-2 py-2 rounded cursor-pointer w-24'
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCars?.length > 0 ? (
                    filteredCars?.map((car) => (
                        <div data-aos="zoom-in" className="border-[#FC8404] border-2  rounded-md max-w-sm w-full bg-white my-3 overflow-hidden  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100">
                            <div className='flex justify-end absolute right-2 top-8'>
                                <button key={car.id}
                                    onClick={() => handleBid(car?.AuctionType, car, car?.id)} className="bg-[#00A9E2] rounded-md text-white px-4 font-bold py-2 mt-1">Bid Now</button>
                            </div>
                            <div className='p-4 '>
                                <img className="w-full object-cover rounded-md" src={car.imageUrl} alt={car.model} />
                            </div>
                            <div className="p-6">
                                <h2 className="text-gray-800 text-xl font-bold">{car.model}, {car.year}</h2>
                                <div className='py-2 flex justify-between'>
                                    <p className='font-semibold text-[#00A9E2] flex gap-2'><TenderidIcon />Auction ID :  <span className="text-black"> {car.id}</span></p>
                                    <p className='font-semibold text-[#00A9E2] flex gap-2'><BiSolidCategoryAlt  className='mt-[2px]'/>
                                    AuctionType : <span className="text-black ">{car.AuctionType}</span></p>
                                </div>
                                <div className='flex justify-center items-center gap-2 text-[#00A9E2]'>
                                <OMRicon /> <span className='text-2xl font-bold'>xxxxx</span>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className='flex gap-2 items-center'>
                                        <div className='flex items-center justify-center'>
                                            <RiAuctionFill className='text-2xl text-[#00A9E2]' />
                                        </div>
                                        <span className=" font-bold text-center">Current Bid $ {car.currentBid}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className="text-red-500 font-bold text-center">+$2.00 shipping</span>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center justify-between   py-3">
                                    <span className="font-bold">Bids: {car.bids}</span>
                                    <span className="font-bold">Time Left:
                                        <Countdown date={Date.now() + 1000000000} />
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-1 md:col-span-2 lg:col-span-3">
                        <p className="text-red-500 text-lg py-4 ">No data found matching your criteria.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default AuctionCard;
