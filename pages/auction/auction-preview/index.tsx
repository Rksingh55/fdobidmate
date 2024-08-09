import React, { useEffect, useRef, useState } from 'react'
import { GrFormSubtract } from "react-icons/gr";
import Header from '@/components/front/Pageheader';
import { FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';
import { IoAddOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@/components/Tablayout';
import { BiDetail, BiDollarCircle } from "react-icons/bi";
import { SiAmazoncloudwatch } from "react-icons/si";
import Countdown from '@/components/Countdown';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Frontheader from '@/components/front/Navbar';
import { useRouter } from 'next/router';
import Footer from '@/components/Layouts/Footer';
import ImageZoom from '@/components/ImageZoom';
import Swal from 'sweetalert2';


function aucktion() {
  const router = useRouter();
  const auctionType = router.query.auctionType;
  const [autoMode, setAutoMode] = useState(false);

  const targetDate = '2024-10-22T23:59:59';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [autoBidAmount, setAutobidAmount] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSetbidamount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSetClick = () => {
    if (inputValue.trim() === "") {
      toast.error("Please set amount!!");
      setAutoMode(false);
    } else {
      const amount = parseFloat(inputValue.trim());
      setAutobidAmount(amount);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAutoMode(true);
      }, 3000);
    }
  };

  console.log("l--------", autoBidAmount)

  const initialCurrentBidAmount = 600;
  const Incrementvalue = 200;
  const [currentBid, setCurrentBid] = useState(initialCurrentBidAmount);
  const [value, setValue] = useState(initialCurrentBidAmount + Incrementvalue);

  useEffect(() => {
    setValue(currentBid + Incrementvalue);
  }, [currentBid]);

  // const Decrement = () => {
  //   if (value > currentBid + autoBidAmount) {
  //     setValue((prevValue: number) => prevValue - autoBidAmount);
  //   } else {
  //     toast.error('Bid amount cannot be less than the current bid amount');
  //   }
  // };

  let u_name = "";
  useEffect(() => {
    const u_name = localStorage.getItem("userName");
    setName(u_name ?? "");
  }, []);
  const [name, setName] = useState(u_name ?? "");


  const handleBidSubmit = () => {
    if (!name) {
      toast.error('You must be logged in to submit a bid, Please Login');
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000);
      return;
    }
    if (value > currentBid) {
      setCurrentBid(value);
      toast.success(`${value} $, Bid submitted successfully!`);
    } else {
      toast.error('Bid amount must be greater than the current bid');
    }
  };


  useEffect(() => {
    if (autoMode) {
      const timer = setInterval(() => {
        setValue((prevValue: number) => {
          const newBid = prevValue + autoBidAmount;
          handleAutoBidSubmit(newBid);
          return newBid;
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [autoMode]);

  const Increment = () => {
    setValue((prevValue: number) => prevValue + Incrementvalue);
  };

  const handleAutoBidSubmit = (newBid: number) => {
    if (!name) {
      toast.error('You must be logged in to start auto bid, Please Login');
      setTimeout(() => {
        router.push("/auth/login")
      }, 4000);
      return;
    }
    setCurrentBid(newBid);
    toast.success(`${newBid} $, Auto bid submitted successfully!`);
  };

  const descriptionRef = useRef<any>(null);

  const handleScroll = () => {
    descriptionRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };




  const initialCurrentBidAmount2 = 100000;
  const minimumDecrement = 500;
  const lowestbidamount = 90000;
  const [value2, setvalue2] = useState(initialCurrentBidAmount2 + minimumDecrement)
  const [currentBid2, setCurrentBid2] = useState(initialCurrentBidAmount2);
  useEffect(() => {
    setvalue2(currentBid2 - minimumDecrement);
  }, [currentBid2]);


  const Decrement2 = () => {
    if (value2 > lowestbidamount) {
      setvalue2(prevValue => prevValue - minimumDecrement);
    }
    else {
      toast.error("bid amount is not less then to lowest bid value ")
    }
  }

  const handleBidSubmit2 = () => {
    if (!name) {
      toast.error('You must be logged in to submit a bid, Please Login');
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000);
      return;
    }
    if (value2 < currentBid2 && value2 > lowestbidamount) {
      setCurrentBid2(value2);
      console.log(`${value2} $, Bid submitted successfully!`)
      toast.success(`${value2} $, Bid submitted successfully!`);
    } else {
      toast.error('Bid amount must be lowest than the current bid');
    }
  };



  const [open, setOpen] = useState(false);
  const openInput = () => {
    setOpen(true);
  };


  return (
    <>


      <ToastContainer />
      <Frontheader />
      <Header heading="Auction Preview" />
      <div className='w-[90%] m-auto '>
        <div className='flex gap-4 md:flex-row flex-col  mt-5'>
          <div className='md:basis-[40%] w-full '>
            <img src='https://d3nn873nee648n.cloudfront.net/1200x1800-new/20616/PT1063827.jpg' />
          </div>
          <div className='md:basis-[60%] w-full flex flex-col gap-2 '>
            <div className=' md:px-4 '>
              <h1 className='md:text-3xl text-xl font-bold'>2014 KIA Sorento</h1>
              <p className=' py-2'>Korem ipsum dolor amet, consectetur adipiscing elit. Maece nas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla....</p>
              <p className='font-bold cursor-pointer hover:text-blue-400 hover:underline' onClick={handleScroll}>Read Description </p>
              <p className=' py-2 font-semibold'>ITEM CONDITION : NEW</p>
              <p className=' py-2'>Timezone : UTC 0</p>
              <p className=' py-2 font-bold text-blue-400'>Time Left -</p>
              {/* --------time left code -------- */}
              {isClient && <Countdown targetDate={targetDate} />}
            </div>
          </div>
        </div>
        {/* ------tabs-------- */}
        <div className='py-12 '>
          <div className=''>
            <table className=' rounded-md  bg-white mt-2 max-sm:text-[10px] border-2 border-[#192B56]'>
              <thead>
                <tr className=' bg-[#F4F7FF] text-black '>
                  <th className='p-2 bg-[#192B56] text-white'>Type</th>
                  <th className='p-2 bg-[#192B56] text-white'> Amount</th>
                  <th className='p-2 bg-[#192B56] text-white'>Status</th>
                  <th className='p-2 bg-[#192B56] text-white'>Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2'>07/06/2024</td>
                  <td className='p-2'>732872.0 $</td>
                  <td className='p-2'>Pending</td>
                  <td className='p-2'>Pending</td>

                </tr>
                <tr>
                  <td className='p-2'>07/06/2024</td>
                  <td className='p-2'>732872.0 $</td>
                  <td className='p-2'>Failed</td>
                  <td className='p-2'>Failed</td>

                </tr>
                <tr>
                  <td className='p-2'>07/06/2024</td>
                  <td className='p-2'>732872.0 $</td>
                  <td className='p-2'>Failed</td>
                  <td className='p-2'>Success</td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

aucktion.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default aucktion