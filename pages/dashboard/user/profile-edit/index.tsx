import React from 'react'

function profileEdit() {
  return (
    <>
      <div className=' w-full bg-white  rounded-md py-2 px-4'>    <h1 className='font-bold text-xl'>Personal Information</h1>

        <div className="mt-2 ">
          <input className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Rakesh" />
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

        <button className='bg-blue-400 px-4 py-2 mt-2 text-white rounded-sm'>Update Profile</button>
      </div>
    </>
  )
}

export default profileEdit