import { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface Tab {
  title: string;
  content: any;
}

const Review = [
  {}, {}, {}, {}
]
const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs: Tab[] = [
    {
      title: 'Your bidding history',
      content:
        <div className=''>
          <table className=' rounded-md  bg-white mt-2 max-sm:text-[10px] '>
            <thead>
              <tr className=' bg-[#F4F7FF] text-black '>
                <th className='p-2'>Date</th>
                <th className='p-2'>Bid Amount</th>
                <th className='p-2'>Status</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Pending</td>
              </tr>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Failed</td>

              </tr>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Success</td>

              </tr>
            </tbody>
          </table>
        </div>
    },
    {
      title: 'Top Contributors',
      content:
        <div className=''>
          <table className=' rounded-md  bg-white mt-2 max-sm:text-[10px] '>
            <thead>
              <tr className=' bg-[#F4F7FF] text-black '>
                <th className='p-2'>Date</th>
                <th className='p-2'>Bid</th>
                <th className='p-2'>User</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Lab@gmail.com</td>
              </tr>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Lab@gmail.com</td>
              </tr>
              <tr>
                <td className='p-2'>07/06/2024</td>
                <td className='p-2'>732872.0 $</td>
                <td className='p-2'>Lab@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
    },
    {
      title: 'Review', content:
        <div>
          <h1 className='text-2xl py-2'>Total Reviews (100)</h1>
          {
            Review?.map((index: any) => (
              <div key={index} className='flex gap-3 mt-10'>
                <div className=''>
                  <img className=' h-[100px] w-[100px] object-cover rounded-full' src='https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65746.jpg?t=st=1718003155~exp=1718006755~hmac=daade446d4efc8d07e9f2f98cc65dd89324f158e169257f69cc6a01c4397851a&w=900' />

                </div>
                <div className='w-[60%]'>
                  <div className='flex gap-2'>   <h1 className='font-bold'>Rahul Singh</h1>
                    <div className='w-[1px]  bg-black'></div>
                    <h2>Noida</h2></div>
                  <p className='py-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis odio magnam amet quidem vitae exercitationem, laudantium quas voluptas dignissimos porro commodi velit sed a consequatur dolore.</p>
                  <div className='flex gap-1 py-1'>
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStarHalfAlt className='text-yellow-500' /><br />
                    <p>4.5 / 5 Star</p>
                  </div>
                </div>

              </div>
            ))
          }

          <p className='text-center cursor-pointer underline hover:text-black py-4 text-blue-500'>See All Reviws</p>
          <div className=''>
            <h1 className='text-2xl py-4'>Make a review</h1>
            <form>
              <div className="form-group flex gap-2">
                <input type="email" className="form-control py-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                <input type="email" className="form-control py-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>

              <div className='flex gap-3 py-1 mt-2  items-center'>
                <h1>Choose Your Rating</h1>
                <div className='flex  gap-1'>
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStar className='text-yellow-500' />
                  <FaStarHalfAlt className='text-yellow-500' />
                </div>
                <br />
                <div className="inline-block relative w-64">
                  <select className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none ">
                    <option>Choose Rating</option>
                    <option>Very Bad</option>
                    <option>Bad</option>
                    <option>Good</option>
                    <option>Best</option>
                    <option>Excellent</option>

                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div className="form-group mt-2">
                <textarea className="form-control" placeholder="Enter your messege" />
              </div>
              <button type="submit" className="btn btn-primary mt-2 px-10">Submit</button>
            </form>
          </div>
        </div>
    },


  ];

  return (
    <div className="w-full   py-2  mt-8">
      <div className='md:w-full '>
        <div className="flex  gap-2">
          {tabs?.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 gap-2 py-3  md:px-4 max-sm:text-[10px] max-sm:font-semibold text-center focus:outline-none ${activeTab === index ? ' bg-blue-200 rounded-md ' : 'text-gray-500 bg-white rounded-md'
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab?.title}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white rounded-md  mt-2">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
