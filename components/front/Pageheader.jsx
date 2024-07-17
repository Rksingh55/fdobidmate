import React from 'react';
import NextBreadcrumb from '../NextBreadcrumb';

const Header = ({ heading }) => {
  return (
    <header className="text-black mainheaderbg  md:py-[40px] py-12   z-1">
      <div className="w-[90%] m-auto ">
        <h1 className=" md:text-3xl text-xl  font-bold text-white  py-2 ] mb-2">{heading}</h1>
        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span className='px-2'>  / </span>}
          activeClasses='text-white'
          containerClasses='flex '
          listClasses='hover:underline  font-bold'
          capitalizeLinks
        />
      </div>

    </header>
  );
};

export default Header;
