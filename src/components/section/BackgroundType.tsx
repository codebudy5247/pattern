import { Icon } from '@iconify/react';
import '../../styles/CreatePattern.module.css';
const BackgroundType = (props:any) => {

  const onClickHandler = (selected_background_tools: string) => {
    props?.setShowBackgroundTypeMenu(false);
    props?.setSelectedwBackgroundType(selected_background_tools);
  };

  return (
     <div
      className={"max-w-sm rounded overflow-hidden shadow-lg text-xs h-70 mb-2 p-5 text-center cursor-pointer w-[120px] h-[100px] m-auto "+((props?.type?.value===props?.selectedwBackgroundType)?"border border-4 border-dotted":"")}
      onClick={() => onClickHandler(props?.type?.value)}
    >
      {/* <Icon icon={props?.type?.icon} style={{ width: '40px', height: '40px' }} /> */}
      <img src={props?.type?.icon} alt='tools...' className='w-10 h-10 m-auto object-scale-down'  />
      
      <div className='text-center'>{props?.type?.displayName}</div> 
    </div>
  )
}

export default BackgroundType