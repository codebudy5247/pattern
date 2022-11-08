import React from 'react';

function HowToCreatePatternz() {
    return (
        <div className='py-10'>
            <p className='text-center text-4xl sm:text-5xl primaryText font-medium'>How to create Patternz</p>
            <div className='sm:flex justify-between items-center mt-10 sm:mt-20'>
                <div className='sm:w-1/2'>
                    <p className='text-left sm:text-right primaryText text-2xl font-medium px-10'>Step 1</p>
                </div>
                <div className='sm:w-1/2 linear-1-bg rounded-l-full px-10 py-8 mt-6 sm:mt-0'>
                    <div className='flex justify-between max-w-[640px] gap-4 sm:gap-10'>
                        <p className='text-start text-white text-lg sm:text-xl'>Create the pattern and verify the availability of the pattern.</p>
                        <div className='bg-white p-6 -mt-14 -mb-4 border border-[#B7B7B7] rounded-xl flex justify-center items-center'>
                            <img src='/img/s2.png' alt='' className='max-w-[80px]' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse sm:flex-row justify-between items-center mt-6 sm:mt-10'>
                <div className='sm:w-1/2 linear-1-bg rounded-r-full px-10 py-8 mt-6 sm:mt-0 flex justify-end'>
                    <div className='flex justify-between max-w-[640px] gap-4 sm:gap-10'>
                        <div className='bg-white p-6 -mt-14 -mb-4 border border-[#B7B7B7] rounded-xl flex justify-center items-center'>
                            <img src='/img/s3.png' alt='' className='max-w-[80px]' />
                        </div>
                        <p className='text-start text-white text-lg sm:text-xl'>Select or create the background from the available drawing tools.</p>
                    </div>
                </div>
                <div className='sm:w-1/2 w-full'>
                    <p className='text-end sm:text-start primaryText text-2xl font-medium px-10'>Step 2</p>
                </div>
            </div>
            <div className='sm:flex justify-between items-center mt-6 sm:mt-10'>
                <div className='sm:w-1/2'>
                    <p className='text-left sm:text-right primaryText text-2xl font-medium px-10'>Step 3</p>
                </div>
                <div className='sm:w-1/2 linear-1-bg rounded-l-full px-10 py-8 mt-6 sm:mt-0'>
                    <div className='flex justify-between max-w-[640px] gap-4 sm:gap-10'>
                        <p className='text-start text-white text-lg sm:text-xl'>Add effects to the shapes in the pattern.</p>
                        <div className='bg-white p-6 -mt-14 -mb-4 border border-[#B7B7B7] rounded-xl flex justify-center items-center'>
                            <img src='/img/s1.png' alt='' className='max-w-[80px]' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse sm:flex-row justify-between items-center mt-6 sm:mt-10'>
                <div className='sm:w-1/2 linear-1-bg rounded-r-full px-10 py-8 mt-6 sm:mt-0 flex justify-end'>
                    <div className='flex justify-between w-full max-w-[640px] gap-4 sm:gap-10'>
                        <div className='bg-white p-6 -mt-14 -mb-4 border border-[#B7B7B7] rounded-xl flex justify-center items-center'>
                            <img src='/img/s4.png' alt='' className='max-w-[80px]' />
                        </div>
                        <p className='text-white text-center w-full text-lg sm:text-xl'>Mint the final art piece.</p>
                    </div>
                </div>
                <div className='sm:w-1/2 w-full'>
                    <p className='text-end sm:text-start primaryText text-2xl font-medium px-10'>Step 4</p>
                </div>
            </div>
        </div>
    );
}

export default HowToCreatePatternz;