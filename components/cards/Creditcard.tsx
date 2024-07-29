import { CreditCardIcon } from '@/public/icons'
import React from 'react'
import { FcOk } from 'react-icons/fc'

function Creditcard() {
    return (
        <>
            <div className='bg-[#C1E9FF] border-1 rounded-md p-3'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h1 className='text-xl font-bold'> Cards Details </h1>
                    </div>
                    <CreditCardIcon />
                </div>
                <div className='flex flex-col'>
                    <div className='flex md:flex-row flex-col gap-4 py-3'>
                        <div>
                            <h1 className='text-lg font-bold'>Card number</h1>
                            <p className='text-[#5E5E5E]'>Enter the 16-digit card number on the card</p>
                        </div>
                        <input className='bg-white border-1 rounded-md px-4 max-sm:py-2 ' type='number' placeholder='xxxx xxxx xxxx xxxx' />
                        <div className='flex items-center text-3xl'>
                            <FcOk className='max-sm:hidden' />
                        </div>
                    </div>
                    <div className='flex gap-4 py-3 md:flex-row flex-col'>
                        <div>
                            <h1 className='text-lg font-bold'>Card owner</h1>
                            <p className='text-[#5E5E5E]'>Enter the name on the card</p>
                        </div>
                        <input className='bg-white border-1 rounded-md px-4 max-sm:py-2 ' type='text' placeholder='Name' />
                        <div className='flex items-center text-3xl'>
                        </div>
                    </div>
                    <div className='flex gap-4 py-3 md:flex-row flex-col '>
                        <div>
                            <h1 className='text-lg font-bold'>Expiry date</h1>
                            <p className='text-[#5E5E5E]'>Enter the 16-digit card number on the card
                            </p>
                        </div>
                        <div className='flex justify-between gap-3'>
                            <input className='bg-white border-1 rounded-md  w-12 px-4' type='number' placeholder='MM' />
                            <span className='flex items-center justify-center font-extrabold text-2xl'>/</span>
                            <input className='bg-white border-1 rounded-md  w-12 px-2' type='number' placeholder='YY' />
                            <span> <h1 className='text-lg font-bold'>CVV2</h1>
                                <p className='text-[#5E5E5E]'>Security code
                                </p></span>
                            <input className='bg-white border-1 rounded-md  w-12 px-2 ' type='number' placeholder='xxxx' />
                        </div>
                        <div className='flex items-center text-3xl'>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex justify-end'>
                                <button
                                    type="submit"
                                    className="mt-2 px-12 py-2 bg-[#FC8404] text-white font-semibold rounded-md  hover:bg-[#e1a05a]"
                                >
                                   Pay
                                </button>
                            </div>
        </>
    )
}

export default Creditcard