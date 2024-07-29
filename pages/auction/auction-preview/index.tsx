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
            {/* <ImageZoom src="https://d3nn873nee648n.cloudfront.net/1200x1800-new/20616/PT1063827.jpg" alt="Product Image" /> */}
          </div>
          <div className='md:basis-[60%] w-full flex flex-col gap-2 '>
            <div className=' md:px-4 '>
              <h1 className='md:text-3xl text-xl font-bold'>2014 KIA Sorento</h1>

              <div className='flex gap-1 py-3'>
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStar className='text-yellow-500' />
                <FaStarHalfAlt className='text-yellow-500' />
              </div>
              <p className=' py-2'>Korem ipsum dolor amet, consectetur adipiscing elit. Maece nas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla....</p>
              <p className='font-bold cursor-pointer hover:text-blue-400 hover:underline' onClick={handleScroll}>Read Description </p>
              <p className=' py-2 font-semibold'>ITEM CONDITION : NEW</p>
              <p className=' py-2'>Timezone : UTC 0</p>

              <p className=' py-2 font-bold text-blue-400'>Time Left -</p>

              {/* --------time left code -------- */}

              {isClient && <Countdown targetDate={targetDate} />}
              <h1 className='py-2'>Auction ends : {targetDate}</h1>

              <div className='bg-white w-full  flex flex-col md:flex-row max-sm:items-center gap-5 p-2 py-2 rounded-md mb-2 mt-2'>
                <div className='flex gap-2 p-2'>
                  <div className='flex justify-center items-center '> <BiDollarCircle className='text-4xl text-blue-500' /></div>
                  <div className='text-center '>
                    <h1 className=' font-bold'>61</h1>
                    <p>Active Bidder</p>
                  </div>
                </div>
                <div className='flex gap-2 p-2'>
                  <div className='flex justify-center items-center '> <SiAmazoncloudwatch className='text-4xl text-blue-500' /></div>
                  <div className='text-center '>
                    <h1 className=' font-bold'>203</h1>
                    <p>Watching</p>
                  </div>
                </div>
                <div className='flex gap-2 p-2'>
                  <div className='flex justify-center items-center '> <BiDetail className='text-4xl text-blue-500' /></div>
                  <div className='text-center '>
                    <h1 className=' font-bold'>82</h1>
                    <p>Total Bids</p>
                  </div>
                </div>
              </div>
              <p className='py-2'> Auction Type : <span className='bg-yellow-300 py-1 px-3'> {auctionType}  </span ></p>
              {
                auctionType === 'Reverse' ? (
                  <div>
                    <p className="py-3">
                      Bid Amount  : <span className="font-extrabold">$ {initialCurrentBidAmount2} to $ {lowestbidamount}</span>
                    </p>
                    <p>   Current bid :   <span className="font-extrabold">$ {currentBid2}</span></p>
                  </div>
                ) : (
                  <p className="py-3">
                    Current highest bid : <span className="font-extrabold">${currentBid}</span>
                  </p>
                )
              }

              {autoMode && <p className="py-1 text-blue-600 font-bold">Auto-bidding started with amount : {autoBidAmount}</p>}




              {/* --------bid counter code-------- */}

              {
                auctionType === 'Reverse' ? (
                  <div className='py-3'>
                    <div className='flex md:flex-row flex-col md:gap-4 gap-2 bg-white rounded-md p-6'>
                      <button onClick={Decrement2} className='bg-green-100 hover:bg-green-300 md:px-6 flex items-center justify-center p-3' >
                        <GrFormSubtract className='text-black' />
                      </button>
                      <div className='font-bold rounded-sm md:px-[100px] px-12 border-2 py-3'>{value2} $</div>

                      <button onClick={handleBidSubmit2} type='submit' className='bg-blue-500 md:px-12 text-white py-3'>
                        Bid
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='flex gap-4  py-3'>
                      <button onClick={() => {
                        setAutoMode(false);
                        setOpen(false);
                      }} className={`px-4 py-2 ${!open ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Manual
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${open ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={openInput}
                      >
                        Auto Bidding
                      </button>
                    </div>
                    {open &&
                      <div className='flex gap-2'>
                        <input
                          type='number'
                          className='px-2 py-2 border-2'
                          placeholder='Set Amount'
                          value={inputValue}
                          onChange={handleSetbidamount}
                        />
                        <button
                          onClick={handleSetClick}


                          className={`px-4 py-2 ${autoMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          disabled={loading || autoMode}
                        >
                          {loading ? 'Loading...' : 'Start'}
                        </button>

                        {autoMode && (
                          <button
                            className='bg-red-500 px-4 py-2 text-white'
                            onClick={() => {
                              setAutoMode(false);
                              setOpen(false);
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    }


                    {!open ? (
                      <>
                        <div>
                          <p className="py-1">Bidding amount increase with : {Incrementvalue}</p>
                          <h2 className='py-2 text-red-600'>Your next bid amount (current highest bid + Increment value)  :  <span className='font-extrabold'> $ {value} </span></h2>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-4 gap-2 bg-white rounded-md p-6'>
                          {/* <button onClick={Decrement} className='bg-green-100 hover:bg-green-300 md:px-6 flex items-center justify-center p-3' disabled={autoMode}>
                            <GrFormSubtract className='text-black' />
                          </button> */}
                          <div className='font-bold rounded-sm md:px-[100px] px-12 border-2 py-3'>{value} $</div>
                          <button onClick={Increment} className='bg-green-100 text-black hover:bg-green-300 md:px-6 p-3 flex items-center justify-center' disabled={autoMode}>
                            <IoAddOutline className='' />
                          </button>
                          <button onClick={handleBidSubmit} type='submit' className='bg-blue-500 md:px-12 text-white py-3'>
                            Bid
                          </button>
                        </div></>
                    ) : null}
                  </div>
                )
              }

            </div>
          </div>
        </div>

        {/* ------tabs-------- */}
        <div className='md:mt-[100px] '>
          <Tabs />
        </div>


        <div ref={descriptionRef} id='description'>
          <h1 className='font-bold md:text-2xl text-xl py-2'>Description</h1>
          <h1 className='font-bold md:text-xl text-md py-2'>How can have anything you ant in life if you ?</h1>
          <p className=' text-justify'>If you’ve been following the crypto space, you’ve likely heard of Non-Fungible Tokens (Biddings), more popularly referred to as ‘Crypto Collectibles.’ The world of Biddings is growing rapidly. It seems there is no slowing down of these assets as they continue to go up in price. This growth comes with the opportunity for people to start new businesses to create and capture value. The market is open for players in every kind of field. Are you a collector.</p><br />
          <p className=' text-justify'>But getting your own auction site up and running has always required learning complex coding langua ges, or hiring an expensive design firm for thousands of dollars and months of work.</p>
          <p className=' text-justify'>Amet consectetur adipisicing elit. Maxime reprehenderit quaerat, velit rem atque vel impedit! Expensive Design.</p>
        </div>
      </div>

    </>
  )
}

aucktion.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default aucktion