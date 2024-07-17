import React from 'react';
import NextBreadcrumb from './NextBreadcrumb';

const Header = () => {
  return (
    <header className="text-black     z-1">
      <NextBreadcrumb
        homeElement={'Home'}
        separator={<span className='px-2'>  / </span>}
        activeClasses='text-amber-500'
        containerClasses='flex '
        listClasses='hover:underline  font-bold '
        capitalizeLinks
      />
    </header>
  );
};

export default Header;
