import React from 'react';

function ArtItem({row}: any) {
    return (
        <div className='rounded-lg shadow-lg p-3 bg-white dark:bg-transparent dark:bg-gradient-to-r dark:from-[#ffffff]/10 dark:to-[#ffffff]/5'>
            <img src={`${row.image}`} className="rounded-lg" alt="" />
            <div className='flex justify-between py-1 mt-1 border-b border-[#EAEAEA]'>
                <p className='primaryText text-sm font-medium'>Title</p>
                <p className='secondaryText text-sm font-medium'>8520</p>
            </div>
            <div className='flex justify-between py-1 mt-1 border-b border-[#EAEAEA]'>
                <p className='primaryText text-sm font-medium'>Project</p>
                <p className='secondaryText text-sm font-medium'>12lorem ipsum1</p>
            </div>
            <div className='flex justify-between py-1 mt-1 border-b border-[#EAEAEA]'>
                <p className='primaryText text-sm font-medium'>Submitted</p>
                <p className='secondaryText text-sm font-medium'>2 hours ago</p>
            </div>
            <div className='flex justify-between py-1 mt-1 border-b border-[#EAEAEA]'>
                <p className='primaryText text-sm font-medium'>Status</p>
                <p className='secondaryText text-sm font-medium'>2 hours ago</p>
            </div>
            <div className='flex justify-between gap-2 mt-2'>
                <button className='px-4 py-1 rounded-lg bg-[#66B83C] text-white w-full'>Edit</button>
                <button className='px-4 py-1 rounded-lg bg-[#FF1C4A] text-white w-full'>Delete</button>
                <button className='px-4 py-1 rounded-lg bg-[#FED501] text-white w-full'>Share</button>
            </div>
        </div>
    );
}

export default ArtItem;