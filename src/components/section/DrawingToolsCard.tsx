import { Icon } from '@iconify/react';
import '../../styles/CreatePattern.module.css';

const DrawingTools = (props: any) => {
  const onClickHandler = (selected_drawing_tools: string) => {
    props?.setShowDrawingToolsMenu(false);
    props?.setSelectedDrawingTools(selected_drawing_tools);
  };

  return (
    <div
      className={"max-w-sm rounded overflow-hidden shadow-lg text-xs h-70 mb-2 p-5 text-center cursor-pointer w-[120px] h-[100px] m-auto "+((props?.tool?.value===props?.selectedDrawingTools)?"border border-4 border-dotted":"")}
      // style={{ cursor: 'pointer' }}
      onClick={() => onClickHandler(props?.tool?.value)}>
      {/* <Icon icon={props?.tool?.icon} style={{ width: '40px', height: '40px' }} /> */}
        <img src={props?.tool?.icon} alt='tools...' className='w-10 h-10 m-auto object-scale-down' />
        {props?.tool?.displayName}
    </div>
  );
};

export default DrawingTools;
