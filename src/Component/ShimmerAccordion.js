import React from 'react'

const ShimmerAccordion = () => {
  return (
    <>
      <div className='border p-3 m-5 bg-slate-200'>
        <div className="flex mb-4 p-4 w-full">
          <div>
            <div className="w-4/6 px-5">
              <div className="w-[80px] h-[80px] rounded-[50%] bg-gray-300 ">

              </div>
            </div>
          </div>
          <div>
            <h1 className="md:text-3xl text-2xl font-bold w-[250px] h-[1.5rem] p-2 bg-gray-300 mt-2"></h1>
            <h3 className='w-[300px] h-[1.5rem] p-2 bg-gray-300 mt-2'></h3>
            <div className="flex mt-4 items-center ">
              <h3 className=" text-center h-[1.5rem] mt-1 bg-gray-300 p-2 mr-4 w-[80px]">

              </h3>
              <h3 className="p-2 mr-4 h-[1.5rem] mt-1 bg-gray-300 text-center w-[80px]">

              </h3>
              <h3 className='w-[200px] h-[1.5rem] mt-1 p-2 bg-gray-300'>

              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShimmerAccordion;
