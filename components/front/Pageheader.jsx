import React from 'react';
import NextBreadcrumb from '../NextBreadcrumb';

const Header = ({ heading }) => {
  return (
    <header style={{
      backgroundImage: "url('/assets/images/pageheaderbg.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'cover',
    }} className="text-black   md:py-[70px] py-10   z-1 w-full">
      <div className="w-[90%] m-auto  ">
        <h1 className=" md:text-3xl text-xl  font-bold text-[#00A9E2]  py-4 md:mb-[70px]">{heading}</h1>
        <NextBreadcrumb
          homeElement={<span  className='text-[#00A9E2] ' >Home</span>}
          separator={<span className='px-2 text-[#00A9E2] '>  / </span>}
          activeClasses='text-[#FC8404]'
          containerClasses='flex '
          listClasses='hover:underline  font-bold '
          capitalizeLinks
        />
      </div>

    </header>
  );
};

export default Header;


