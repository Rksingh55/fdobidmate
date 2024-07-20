import Link from 'next/link'
import React, { useEffect } from 'react'
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getToken } from '@/localStorageUtil';

function Grn() {
  const router = useRouter();
  useEffect(() => {
      const token = getToken();
      if (!token) {
          router.replace('/');
      }
  }, []);
  return (
    <div> <Dashboardbredcrumb />
    </div>
  )
}

export default Grn