import React from 'react'

const SelectFrames = (props:any) => {
  return (
    <div
    className="max-w-sm rounded overflow-hidden shadow-lg text-xs h-70 mb-2 p-5 text-center cursor-pointer">
    {/* <Icon icon={props?.tool?.icon} style={{ width: '40px', height: '40px' }} /> */}
    <img src={props?.frame?.icon} alt='tools...' className='w-10 h-10 m-auto'  />
    {props?.frame?.displayName}
  </div>
  )
}

export default SelectFrames