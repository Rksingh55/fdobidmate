import React, { useEffect, useState } from 'react';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { useAppSelector } from '../../../store/hooks';
import { useRouter } from 'next/router';
function InterestCards() {
    const clickedCards = useAppSelector(state => state.clickedCards.clickedCards);
    const router = useRouter();

    const handleBid = (auctionType,id) => {
        router.push({
            pathname: '/auction/auction-preview',
            query: { id,auctionType },
        });
    };

    return (

        <>
            <Dashboardbredcrumb />
            <div className="overflow-x-auto mt-4">
                {clickedCards.length > 0 ? (
                    <table className="min-w-full ">
                        <thead>
                            <tr>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product Image                      </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Current Bid
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Auction Type
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Publish date
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Bidders
                                </th>
                                <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clickedCards.map((card) => (
                                <tr key={card.id} className=''>
                                    <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{card.id}</p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <img className='w-[50px] h-[50px] rounded-full' src={card.imageUrl
                                        } />
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">    {card.Name} {card.model} {card.year}</p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            $ {card.currentBid
                                            }
                                        </p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {card.AuctionType

                                            }
                                        </p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {card.
                                                publishDate

                                            }
                                        </p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {card.
                                                bids

                                            }
                                        </p>
                                    </td>
                                    <td className="px-4 py-1 border-b border-gray-200 bg-white text-sm">
                                        <button
                                            onClick={() => handleBid(card.AuctionType,card.id)}
                                            className="bg-blue-500 text-white px-4 py-2 "
                                        >
                                            Bid Now
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No interested auction yet.</p>
                )}
            </div>



        </>
    );
}

export default InterestCards;
