import React from 'react';
import About from '../components/section/home/About';
import Blogs from '../components/section/home/Blogs';
import Faqs from '../components/section/home/Faqs';
import HowToCreatePatternz from '../components/section/home/HowToCreatePatternz';
import ReadyToStart from '../components/section/home/ReadyToStart';
import WhatIsPatternz from '../components/section/home/WhatIsPatternz';
import PatternZ from './PatternZ';
import HowDoesItWork from '../components/section/home/HowDoesItWork';
import KeyFeatures from '../components/section/home/KeyFeatures';
import WhyCraftbook from '../components/section/home/WhyCraftbook';

function Home() {
    return (
        <div>
            <div className='homeBg bg-white dark:bg-dark_color1 relative'>
                <img src='/img/sv.png' alt='' className='absolute max-w-[160px]' />  
                <div className='sm:flex justify-between items-center n-container'>
                    <div className='sm:w-7/12'>
                        <p className='text-4xl sm:text-6xl font-bold text-white text-center sm:text-start pt-10 sm:pt-0'>Customized Generative Arts for Web3</p>
                        <p className='mt-5 text-white font-medium text-xl sm:text-3xl mb-10 sm:mb-20 text-center sm:text-start'>Art created by the community, created for the community</p>
                    </div>
                    <div className='sm:w-5/12 sm:pt-10 pb-20'>
                        <img src='/img/items.png' alt='' className='w-8/12 sm:w-11/12 m-auto' />
                    </div>
                </div>
            </div>

            <About />
            <PatternZ />
            <HowDoesItWork />
            <KeyFeatures />
            {/* <WhatIsPatternz /> */}
            {/* <HowToCreatePatternz /> */}
            {/* <Blogs /> */}
            <WhyCraftbook />
            <Faqs />
            <ReadyToStart />
        </div>
    );
}

export default Home;