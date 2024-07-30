import React, { useEffect } from 'react'
import VendorRegisterform from '../../../components/VendorRegisterform'
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
export default index