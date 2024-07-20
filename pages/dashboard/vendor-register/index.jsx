import React, { useEffect } from 'react'
import VendorRegisterform from '../../../components/VendorRegisterform'
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useRouter } from 'next/router';
import { getToken } from '../../../localStorageUtil';

function index() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/');
    }
  }, []);

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