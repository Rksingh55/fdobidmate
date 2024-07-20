import React, { useEffect } from 'react'
import { TbEdit, TbEyeDotted } from "react-icons/tb";
import { RxBorderDotted } from "react-icons/rx";
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getToken } from '@/localStorageUtil';



function profile() {
    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/');
        }
    }, []);

    return (
        <>
            <div className='flex gap-2 flex-col md:flex-row'>
                <div className='md:basis-[40%] w-full bg-white  rounded-md py-2 px-4'>
                    <div className='flex justify-between gap-2'>
                        <h1 className='font-bold text-xl'>Profile</h1>
                        <Link href="/dashboard/user/profile-edit" >
                            <TbEdit className='text-xl text-blue-500 cursor-pointer' />
                        </Link>
                    </div>
                    <div className='flex justify-center items-center '>
                        <img className='w-[140px] h-[140px] rounded-full  border-[4px] border-blue-200 object-cover' src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1718089035~exp=1718092635~hmac=a9d2525204492fd8f06e926b959f12bd7592c3988c9450691b5c6c8d8ba97298&w=900" />
                    </div>

                    <div className='  py-2 mt-2  px-2 flex flex-col gap-2  text-justify'>
                        <h1 className='text-2xl'> Lal Singh</h1>
                        <h1><span className='font-bold'>Position</span> : Web Developer</h1>
                        <h1><span className='font-bold'>DOB</span> : Jan 20, 1989</h1>
                        <h1><span className='font-bold'>Adress</span> : New York, USA</h1>
                        <h1><span className='font-bold'>Email</span> : lalsingh@gmail.com</h1>
                        <h1><span className='font-bold'>Phoneno</span> :+91 8877766666</h1>


                    </div>
                </div>

                {/* ------personal information------ */}
                <div className='md:basis-[60%] w-full bg-white  rounded-md py-2 px-4'>    <h1 className='font-bold text-xl'>Personal Information</h1>

                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Lal " />
                    </div>

                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Singh" />
                    </div>
                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="raj@gmail.com " />
                    </div>
                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="+91 8877766666" />
                    </div>
                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jan 20, 1989" />
                    </div>
                    <div className="mt-2">
                        <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="New York, USA" />
                    </div>

                </div>
            </div>

            <div className='flex gap-2 mt-2 md:flex-row flex-col'>
                {/* -------personal addresss-------- */}
                <div className='md:basis-1/2 w-full bg-white    rounded-md py-2 px-4'>
                    <h1 className='font-bold text-xl'>Personal Adress</h1>
                    <form className="w-full max-w-lg mt-3">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Country
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="india" />

                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    City
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Noida" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Street
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Noida" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    State
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                        <option>Uttar Pradesh</option>
                                        <option>Delhi</option>
                                        <option>Haryana</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Zip
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                            </div>
                        </div>
                    </form>

                </div>
                {/* ------payment history------- */}
                <div className='md:basis-1/2  w-full bg-white    rounded-md py-2 px-4'>
                    <h1 className='font-bold text-xl'>Payment History</h1>
                    <div className='flex justify-between  mt-3'>
                        <div>
                            <p>March</p>
                            <p className='font-semibold text-grey-200'>Pro Membership</p>
                        </div>
                        <div className='flex gap-3'>
                            <p>90%</p>
                            <FaEye className='text-blue-500 cursor-pointer' />
                        </div>

                    </div>
                    <div className='flex justify-between  mt-3'>
                        <div>
                            <p>February</p>
                            <p className='font-semibold text-grey-200'>Pro Membership</p>
                        </div>
                        <div className='flex gap-3'>
                            <p>90%</p>
                            <FaEye className='text-blue-500 cursor-pointer' />
                        </div>

                    </div>
                    <div className='flex justify-between  mt-3'>
                        <div>
                            <p>January</p>
                            <p className='font-semibold text-grey-200'>Pro Membership</p>
                        </div>
                        <div className='flex gap-3'>
                            <p>90%</p>
                            <FaEye className='text-blue-500 cursor-pointer' />
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default profile