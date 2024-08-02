import React, { useState } from 'react';
import { CreditCardIcon } from '@/public/icons';
import { FcOk } from 'react-icons/fc';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, TENDER_PAYMENT_API_URL } from '@/api.config';

const Creditcard: React.FC = () => {
    const [cardnumber, setCardNumber] = useState('');
    const [cardholdername, setcardholdername] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const vendor_id = localStorage.getItem("vendor_id")
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!cardnumber || !cardholdername || !expiryMonth || !expiryYear || !cvv) {

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please fill out all fields.',
                customClass: 'sweet-alerts',
            });
            return;
        }
        const formData = {
            vendor_id: vendor_id,
            doc_id: 18,
            type: "Tender",
            payment_type: "tender_fee",
            email: "lalsingh@amysoftech.in",
            amount: "500",
            currency: 1,
            company_id: 2,
            cardnumber,
            cardholdername,
            expiry: `${expiryMonth}/${expiryYear}`,
            cvv
        };
        try {
            const response = await axios.post(`${API_BASE_URL}${TENDER_PAYMENT_API_URL}`, formData);
            console.log('Payment response:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Payment successful!',
                customClass: 'sweet-alerts',
            });
        } catch (error) {
            console.error('Payment error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Payment failed.',
                customClass: 'sweet-alerts',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='bg-[#C1E9FF] border-1 rounded-md p-3'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h1 className='text-xl font-bold'>Card Details</h1>
                    </div>
                    <CreditCardIcon />
                </div>
                <div className='flex flex-col'>
                    <div className='flex md:flex-row flex-col gap-4 py-3'>
                        <div>
                            <h1 className='text-lg font-bold'>Card number</h1>
                            <p className='text-[#5E5E5E]'>Enter the 16-digit card number on the card</p>
                        </div>
                        <input
                            className='bg-white border-1 rounded-md px-4 max-sm:py-2'
                            type='number'
                            placeholder='xxxx xxxx xxxx xxxx'
                            value={cardnumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <div className='flex items-center text-3xl'>
                            <FcOk className='max-sm:hidden' />
                        </div>
                    </div>
                    <div className='flex gap-4 py-3 md:flex-row flex-col'>
                        <div>
                            <h1 className='text-lg font-bold'>Card owner</h1>
                            <p className='text-[#5E5E5E]'>Enter the name on the card</p>
                        </div>
                        <input
                            className='bg-white border-1 rounded-md px-4 max-sm:py-2'
                            type='text'
                            placeholder='Name'
                            value={cardholdername}
                            onChange={(e) => setcardholdername(e.target.value)}
                        />
                        <div className='flex items-center text-3xl'></div>
                    </div>
                    <div className='flex gap-4 py-3 md:flex-row flex-col'>
                        <div>
                            <h1 className='text-lg font-bold'>Expiry date</h1>
                            <p className='text-[#5E5E5E]'>Enter the expiration date</p>
                        </div>
                        <div className='flex justify-between gap-3'>
                            <input
                                className='bg-white border-1 rounded-md w-[120px] px-4'
                                type='number'
                                placeholder='MM'
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                            />
                            <span className='flex items-center justify-center font-extrabold text-2xl'>/</span>
                            <input
                                className='bg-white border-1 rounded-md w-[120px] px-2'
                                type='number'
                                placeholder='YY'
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                            />
                            <span>
                                <h1 className='text-lg font-bold'>CVV2</h1>
                                <p className='text-[#5E5E5E]'>Security code</p>
                            </span>
                            <input
                                className='bg-white border-1 rounded-md w-[120px] px-2'
                                type='number'
                                placeholder='xxx'
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center text-3xl'></div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <button
                    type="submit"
                    className="mt-2 px-12 py-2 bg-[#FC8404] text-white font-semibold rounded-md hover:bg-[#e1a05a]"
                >
                    Pay
                </button>
            </div>
        </form>
    );
};

export default Creditcard;
