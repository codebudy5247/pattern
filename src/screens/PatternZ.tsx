import React from 'react';

function PatternZ() {
    return (
        
        <div className='bg-white dark:bg-dark_color1 py-10'>
            <div className='text-center'><p className='text-4xl sm:text-5xl font-medium primaryText mb-6'>Powered By Craftbook</p></div>
            <div className='n-container'>
                <div className='sm:flex justify-between items-center'>
                    <div className='sm:w-1/2'>
                        <p className='text-4xl sm:text-5xl font-medium primaryText'>Geo Patternz</p>
                        <p className='mt-4 secondaryText text-lg sm:text-xl'>Welcome to Craftbook Creatives first customized generative project “Patternz”. Patternz is influned by the simple mobile game based on connecting flow lines. The generative art system provide the right tools for creating the unique art pieces. The project enables the user to explore their hidden talent in the art and manifests their creativity in the form of patternz. Each patternz represents their creator&apos;s ingenuity. <br/> <br/> This is an opportunity to create and engage with Craftbook’s first web3 project and join the new artistic community.</p>
                    </div>
                    <div className='sm:w-1/2 flex justify-end items-center mt-5 sm:mt-0'>
                        <img src='/img/Flow_Free1.png' alt='' className='w-10/12 m-auto' />
                        {/* <button className="btn">
                        Apply
                        </button> */}
                    </div>
                </div>
                <div className='flex justify-end w-10/12 mt-4'>
                    <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex gap-2 items-center">
                        Apply for Whitelist
                    </button>
                </div>
            </div>
        </div>
       
        
    );
}

export default PatternZ;