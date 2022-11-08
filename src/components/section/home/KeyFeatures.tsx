import React from 'react'
import { Icon } from '@iconify/react';
const KeyFeatures = () => {
  return (
    <div className='py-10 bg-white dark:bg-dark_color1'>
    <div className='n-container'>
        <p className='text-4xl sm:text-5xl text-center font-medium primaryText'>Key features?</p>
        <div className='flex justify-between gap-2'>

            <div className='sm:w-1/3'>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2 text-blue-800' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}>
            <Icon icon="charm:tick" width={20} height={20}  />
            </div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Launch your gamified generative arts collection</p>
            </div>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Collaborate, create, and share exclusive and premium content through inhouse Blockchain based social platform</p>
            </div>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Set up token gated different channels based on content and engagement levels</p>
            </div>
            </div>

            <div className='sm:w-1/3'>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Set up royalty splits and share the royalty revenue with community at Craftbook</p>
            </div>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Set up private and personalized storefronts allowing the creation and sale of various Items for the community</p>
            </div>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Pay for the watch, pay for engaging, games section, posting, reels, meme area and much more with on-chain and off-chain feature</p>
            </div>
            </div>

            <div className='sm:w-1/3'>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Decentralized governance mechanism based on Craftbook token</p>
            </div>
            <div className='flex justify-between gap-1 items-center gap-2'>
            <div className='h-fit mt-4 rounded-full p-2' style={{backgroundColor:'rgba(15, 81, 224, 0.2)'}}><Icon icon="charm:tick" width={20} height={20}  /></div>
            <p className='primaryText text-lg sm:text-xl mt-4'>Earn Craftbook token through royalty, staking, minting, content creation and engagement</p>
            </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default KeyFeatures