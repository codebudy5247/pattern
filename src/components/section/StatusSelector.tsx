import { useState, useEffect } from 'react';
import { PhotoshopPicker } from 'react-color';

import { shapes } from './../../mock/drawing_tools_stepone';
import SelectEffects from './SelectEffects';
import { BODY, LINE, BACKGROUND } from './../../mock/drawing_tools_steptwo';

const StatusSelector = (props: any) => {
  const [statusEffect, setStatusEffect] = useState(props?.statusEffect);
  const [flag, setflag] = useState(false)
  useEffect(() => {
    setStatusEffect(props?.statusEffect);
  }, [props?.statusEffect]);
  const onClickShape = (item:any, index:number) => {
    // console.log(item,'line selector');
    console.log(props?.statusEffect, statusEffect);
    if (statusEffect.includes(item.style)) {
      statusEffect.splice(statusEffect.indexOf(item.style), 1);
    }
    else {
      statusEffect.push(item.style);
    }
    props?.onClickStatusEffect(item.style);
    setflag(!flag);
  }
  return (
    <>
      {/* <div className="text-center"> FlowLines </div> */}
      <div className="mt-5 flex justify-start gap-2 p-4 cursor-pointer">
        <div className='w-24'>
          <label className={(props?.text.length>8)?"text-xs":"text-lg"}>{props?.text}</label>
        </div>
        {props?.shapes.map((shape:any, index:number) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 m-auto "+((statusEffect.includes(shape.style))?"border border-4 border-dotted":"")}
              src={shape.preview}
              alt="shapes"
              onClick={() => onClickShape(shape, index)}
              title={"color: gold"}
            />
          </div>
          
        ))}
      </div>
    </>
  );
};

export default StatusSelector;
