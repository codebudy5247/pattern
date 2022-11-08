import { Icon } from '@iconify/react'
import React from 'react'

const Format = (props:any) => {
  return (
    <div
    className="max-w-sm rounded overflow-hidden shadow-lg text-xs h-70 mb-2 p-5 text-center cursor-pointer"
    // onClick={() => onClickHandler(props?.tool?.value)}
    >
    {/* <Icon icon={props?.format?.icon} style={{ width: '40px', height: '40px' }} /> */}
    <img src={props?.format?.icon} alt='tools...' className='w-10 h-10'  />
   <div className='text-center'>{props?.format?.displayName}</div> 
  </div>
  )
}

export default Format