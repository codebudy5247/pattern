import { useState } from 'react';
import { flowLines } from "../../mock/drawing_tools_stepone";
import { useEffect } from 'react';

const FlowLinesSelector = (props: any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    props?.setSelectedShape(flowLines[0]);
  }, []);

  const onClickShape = (item:any, index:number) =>{
    console.log(item,'line selector');
    props?.setSelectedShape(item);
    SelectIndex(index);
  }
  return (
    <>
      {/* <div className="text-center"> FlowLines </div> */}
      <div className="mt-5 flex justify-between p-4 cursor-pointer">
        {flowLines.map((flowLine, index) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 m-auto "+((selectedIndex==index)?"border":"")}
              src={flowLine.preview}
              alt="shapes"
              onClick={() => onClickShape(flowLine, index)}
            />
          </div>
          
        ))}
      </div>
    </>
  );
};

export default FlowLinesSelector;
