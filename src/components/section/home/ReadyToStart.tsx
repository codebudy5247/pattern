import React from 'react';

function ReadyToStart() {
    return (
        <div className='linear-2-bg py-20 relative'>
            <img src='/img/sv1.png' alt='' className='absolute bottom-0 left-0' />
            <p className='text-white text-3xl sm:text-5xl font-medium text-center'>Ready to get started?</p>
            <div className='flex justify-center mt-10'>
                <button className='text-[#0951DE] text-lg font-medium rounded-md bg-white px-10 py-2'>Create Patternz Now</button>
            </div>
            <img src='/img/sv2.png' alt='' className='absolute top-0 right-0' />
        </div>
    );
}

export default ReadyToStart;