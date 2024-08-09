import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/front/Pageheader';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Frontheader from '@/components/front/Navbar';
import Auctioncards from '@/components/cards/auctioncard';
import Footer from '@/components/Layouts/Footer';
const AuctionCard = () => {

  return (
    <>
      <ToastContainer />
      <Frontheader />
      <Header heading="Auction List" />
      <div className='md:w-[90%] m-auto '>
        <Auctioncards />
      </div>


    </>
  );
};

AuctionCard.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default AuctionCard;
