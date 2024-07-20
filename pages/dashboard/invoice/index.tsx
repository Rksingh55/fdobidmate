import Link from 'next/link'
import React, { useEffect } from 'react'
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { getToken } from '@/localStorageUtil';
import { useRouter } from 'next/router';

function Invoice() {
  const router = useRouter();
  useEffect(() => {
      const token = getToken();
      if (!token) {
          router.replace('/');
      }
  }, []);

  return (
    <div>            <Dashboardbredcrumb />
    </div>
  )
}

export default Invoice