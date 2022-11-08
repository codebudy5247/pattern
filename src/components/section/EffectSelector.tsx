import { useState, useEffect } from 'react';
import { PhotoshopPicker } from 'react-color';

import { shapes } from './../../mock/drawing_tools_stepone';
import SelectEffects from './SelectEffects';
import { BODY, LINE, BACKGROUND, CORNER_STYLE } from './../../mock/drawing_tools_steptwo';
import { min_cornersize } from '../../mock/common_variable';
import { max_cornersize } from './../../mock/common_variable';

const EffectSelector = (props: any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customcolor, setCustomColor] = useState('#fff');
  const [size, setSize] = useState(props?.selectedEffect?.corner_size);
  useEffect(() => {
    // console.log("EffectSelector:", props?.selectedEffect.class, props?.shapes[0].class, props?.text);
    if (props?.selectedEffect.id === props?.shapes.length + 1)
      return;
    if (props?.selectedEffect.class === props?.shapes[0].class && props?.selectedEffect.id !== -1)
      onClickShape(props?.shapes[props?.selectedEffect.id - 1], props?.selectedEffect.id - 1);
    else 
      onClickShape(props?.shapes[0], 0);
    if (props?.text === CORNER_STYLE)
      setSize(props?.selectedEffect?.corner_size);
  }, [props?.selectedEffect.id, props?.selectedEffect?.corner_size]);

  const onClickShape = (item:any, index:number) =>{
    // console.log(item,'line selector');
    props?.setSelectedEffect(item);
    SelectIndex(index);
    setShowCustomColor(false);
  }

  const onClickCustomShape = () => {
    setShowCustomColor(true);
    SelectIndex(props?.shapes.length);
  }

  const handleChangeComplete = (color: any, event: any) => {
    console.log(color, event);
    setCustomColor(color.hex);
  }

  const onAccept = () => {
    const item: any = [];
    item.class = props?.shapes[0].class;
    item.id = props?.shapes.length + 1;
    item.preview = "https://ik.imagekit.io/lqv4qsole/color/custom_QRCWJZmrdN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666894162150";
    item.color = customcolor;
    props?.setSelectedEffect(item);
    setShowCustomColor(false);
  }

  const onCancel = () => {
    setShowCustomColor(false)
  }

  const onChangeSize = (e: any) => {
    if (e.target.value < min_cornersize)
      e.target.value = min_cornersize;
    else if (e.target.value > max_cornersize)
      e.target.value = max_cornersize;
    setSize(e.target.value);
    props?.onChangeCornerSize(e.target.value);
  }
  return (
    <>
      {/* <div className="text-center"> FlowLines </div> */}
      <div className="mt-5 flex justify-start gap-2 p-4 cursor-pointer">
        <div className='w-24 my-auto'>
          <label className={(props?.text.length>8)?"text-xs":"text-lg"}>{props?.text}</label>
        </div>
        {props?.shapes.map((shape:any, index:number) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 m-auto "+((selectedIndex==index)?"border border-4 border-dotted":"")}
              src={shape.preview}
              alt="shapes"
              onClick={() => onClickShape(shape, index)}
              title={"color: gold"}
            />
          </div>
        ))}
        {(props?.text === LINE || props?.text === BODY || props?.text === BACKGROUND)?
          <div>
            <img
              className={"object-contain h-8 w-8 m-auto "+((selectedIndex==props?.shapes.length)?"border border-4 border-dotted":"")}
              src={"https://ik.imagekit.io/lqv4qsole/color/custom_QRCWJZmrdN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666894162150"}
              alt="shapes"
              onClick={() => onClickCustomShape()}
              title={"color: gold"}
            />
          </div>
        :
          <></>
        }
        {(props?.text === CORNER_STYLE)?
          <div className='w-36 flex justify-start gap-2 border-l-2'>
            <div className='m-auto'>
              <label className={(props?.text.length>8)?"text-xs":"text-lg"}>CornerSize: </label>
            </div>
            <div>
              <input type="number" className='h-8 w-16 border border-solid border-black border-4 rounded-md' onChange={(e) => onChangeSize(e)} value={size} />
            </div>
          </div>
        :
          <></>
        }
      </div>
      {
        (showCustomColor === true)?
          <div className='absolute'>
            <PhotoshopPicker 
              color={ customcolor }
              onChange={ (color: any, event: any)=>handleChangeComplete(color, event) } onAccept={onAccept} onCancel={onCancel} />
          </div>
        :
          <></>
      }
    </>
  );
};

export default EffectSelector;
