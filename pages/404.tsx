import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import React from 'react'

function Notfound() {
    return (
        <div className='flex justify-center items-center flex-col gap-2'>
            <h1 className='mt-[20%]  text-2xl'>404</h1>
            <h2 className=' text-4xl font-bold'>Sorry, Page Not Found!!</h2>
            <Link href="/">
                <button className='bg-blue-500 px-4 py-2 mt-3 text-white '>Back to Home</button></Link>
        </div>
    )
}
Notfound.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Notfound