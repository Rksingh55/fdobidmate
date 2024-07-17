import React from 'react'

function loader() {
    return (
        <>
            <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#00A9E2] mx-auto"
                    ></div>

                    <h2 className=" dark:text-white mt-4 text-green-500 font-bold text-md">Loading Please wait.....</h2>

                </div>

            </div>
        </>
    )
}

export default loader