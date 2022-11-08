import React from 'react';
import { BiPhoneCall } from 'react-icons/bi'
import { FiMail } from 'react-icons/fi'
import { BsFacebook, BsTwitter, BsDiscord, BsTelegram, BsLinkedin } from 'react-icons/bs'

function Footer() {
    return (
        <div className='bg-black py-20'>
            <div className='n-container'>
                <div className='flex justify-around gap-10'>
                    <div>
                        <img src="/img/logo1.png" alt="" className="h-10 shadow" />
                        <p className='text-white font-medium text-xl mt-5'>Customized Generative Arts for Web3</p>  
                    </div>
                    <div>
                        <p className='text-white font-medium text-xl mt-5'>Useful Links</p>
                        <div className='grid grid-cols-2 text-white mt-4 gap-2'>
                            <p>Terms of Use</p>
                            <p>License</p>
                            <p>Privacy Policy</p>
                            <p>Creator Terms of Use</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-white font-medium text-xl mt-5'>Contact us</p>
                        <div className=' text-white mt-4 gap-2'>
                            <p className='flex justify-start items-center gap-2'> <BiPhoneCall /> +91 12345 67890</p>
                            <p className='flex justify-start items-center gap-2'> <FiMail /> www.Lorem.com</p>
                        </div>
                        <div className='flex justify-start gap-2 mt-4 text-white text-xl'>
                            <BsFacebook className='curosr-pointer' />
                            <BsTwitter  className='curosr-pointer'/>
                            <BsDiscord  className='curosr-pointer'/>
                            <BsTelegram className='curosr-pointer' />
                            <BsLinkedin className='curosr-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;