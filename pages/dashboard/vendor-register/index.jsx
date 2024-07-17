import React from 'react'
import VendorRegisterform from '../../../components/VendorRegisterform'
import BlankLayout from '@/components/Layouts/BlankLayout';

function index() {
  return (
    <div>
      <VendorRegisterform />
    </div>
  )
}
// index.getLayout = (page) => {
//   return <BlankLayout>{page}</BlankLayout>;
// };
export default index