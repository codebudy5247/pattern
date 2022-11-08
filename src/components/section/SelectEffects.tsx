import React from 'react'

const SelectEffects = (props:any) => {
  const onClickHandler = (selected_effect_tools: string) => {
    props?.setSelectedEffectTools(selected_effect_tools);
  };

  return (
    <div className={"max-w-sm rounded overflow-hidden shadow-lg text-xs h-70 mb-2 p-5 text-center cursor-pointer  w-[120px] h-[100px] m-auto "+( (props?.selectedEffectTools === props?.effect?.value)?"border":"" )}
      onClick={() => onClickHandler(props?.effect?.value)}>
      {/* <Icon icon={props?.tool?.icon} style={{ width: '40px', height: '40px' }} /> */}
      <img src={props?.effect?.icon} alt='tools...' className='w-10 h-10 m-auto object-scale-down'  />
      {props?.effect?.displayName}
    </div>
  )
}

export default SelectEffects