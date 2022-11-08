import React from 'react';

function About() {
    return (
        <div className='bg-white dark:bg-dark_color1 py-10'>
            <div className='n-container'>
                <div className='flex flex-col-reverse sm:flex-row justify-between items-center'>
                    <div className='sm:w-1/2 flex justify-center mt-5 sm:mt-0'>
                        <img src='/img/Group39954.png' alt='' className='w-10/12' />
                    </div>
                    <div className='sm:w-1/2'>
                        <p className='text-4xl sm:text-5xl font-medium primaryText'>About</p>
                        <p className='mt-4 secondaryText text-lg sm:text-xl'>Craftbook is an initiative for Customized Generative Art that aims to gamify the world of digital art and provide a boundless platform for creativity. This is a create-to-earn platform that provides the power to every individual to create anything that engages their community. Easy to use and inclusive platform where user and creator collaborate to try out unique ideas.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;