import React from 'react';
import NextBreadcrumb from '../NextBreadcrumb';

const Header = ({ heading }) => {
  return (
    <>
      <header style={{
        backgroundImage: "url('/assets/images/pageheaderbg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',

      }} className="text-black   md:py-[40px]  py-8   z-1  ">
        <div className="w-[90%] m-auto   ">
          <h1 className=" md:text-3xl text-md  font-bold text-[#00A9E2]  py-4 md:mb-[100px] max-sm:mt-2">{heading}</h1>
        </div>
      </header>
      <div className="w-[90%] m-auto   ">
        <NextBreadcrumb
          homeElement={<span className='text-[#00A9E2] ' >Home</span>}
          separator={<span className='px-2 text-[#00A9E2]'>  / </span>}
          activeClasses='text-[#FC8404]'
          containerClasses='flex '
          listClasses='hover:underline  font-extrabold text-[#00A9E2]'
          capitalizeLinks
        />
      </div>

    </>
  );
};

export default Header;


