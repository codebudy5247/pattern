import { useState, useEffect } from 'react';
import { PhotoshopPicker } from 'react-color';

import { max_blur, min_blur, max_padding, min_padding, max_angle, min_angle } from '../../mock/common_variable';

const ShadowSelector = (props: any) => {
  const [selectedIndex, SelectIndex] = useState(false);
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customcolor, setCustomColor] = useState('#fff');
  const [angle, setAngle] = useState(0)
  const [blur, setBlur] = useState(5)
  const [padding, setPadding] = useState(10)
  useEffect(() => {
    SelectIndex(props?.shadowVisibility);
    setCustomColor(props?.shadowColor);
    setAngle(props?.shadowAngle);
    setBlur(props?.shadowSize);
    setPadding(props?.shadowPadding);
  }, [props?.shadowVisibility, props?.shadowColor, props?.shadowAngle, props?.shadowSize, props?.shadowPadding]);

  const onClickShape = () =>{
    // console.log(item,'line selector');
    SelectIndex(!selectedIndex);
    props?.onChangeShadow(!selectedIndex, customcolor, 5, 10, angle);
  }

  const onClickCustomShape = () => {
    setShowCustomColor(!showCustomColor);
  }

  const handleChangeComplete = (color: any, event: any) => {
    // console.log(color, event);
    setCustomColor(color.hex);
    // props?.onChangeShadow(selectedIndex, color.hex, blur, padding, angle);
  }

  const onChangeAngle = (e: any) => {
    if (e.target.value < min_angle)
      e.target.value = parseInt(e.target.value) + max_angle;
    e.target.value = parseInt(e.target.value) % max_angle;
    if (e.target.value === angle)
      return;
    setAngle(e.target.value);
    props?.onChangeShadow(selectedIndex, customcolor, blur, padding, e.target.value);
  }

  const onChangeBlur = (e: any) => {
    if (e.target.value < min_blur)
      e.target.value = min_blur;
    else if (e.target.value > max_blur)
      e.target.value = max_blur;
    if (e.target.value === blur)
      return;
    setBlur(e.target.value);
    props?.onChangeShadow(selectedIndex, customcolor, e.target.value, padding, angle);
  }

  const onChangePadding = (e: any) => {
    if (e.target.value < min_padding)
      e.target.value = min_padding;
    else if (e.target.value > max_padding)
      e.target.value = max_padding;
    if (e.target.value === padding)
      return;
    setPadding(e.target.value);
    props?.onChangeShadow(selectedIndex, customcolor, blur, e.target.value, angle);
  }

  const onAccept = () => {
    setShowCustomColor(false);
    props?.onChangeShadow(selectedIndex, customcolor, blur, padding, angle);
  }

  const onCancel = () => {
    setShowCustomColor(false)
  }
  return (
    <>
      {/* <div className="text-center"> FlowLines </div> */}
      <div className="mt-5 flex justify-start gap-2 p-4 cursor-pointer">
        <div className='w-24 my-auto'>
          <label className={(props?.text.length>8)?"text-xs":"text-lg"}>{props?.text}</label>
        </div>
        <div className='flex justify-start gap-5'>
          <div>
            <p>Visible</p>
            <img
              className={"object-contain h-8 w-8 m-auto "+((selectedIndex==true)?"border border-4 border-dotted":"")}
              src={"https://ik.imagekit.io/lqv4qsole/effect/shadow_JUPnJUeUCR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666905212588"}
              alt="shapes"
              onClick={() => onClickShape()}
              title={"color: gold"}
            />
          </div>
          <div>
            <p>Color</p>
            <img
              className={"object-contain h-8 w-8 m-auto"}
              src={"https://ik.imagekit.io/lqv4qsole/color/custom_QRCWJZmrdN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666894162150"}
              alt="shapes"
              onClick={() => onClickCustomShape()}
              title={"color: gold"}
            />
          </div>
          <div>
            <p>Angle</p>
            <input type="number" className='h-8 w-16 border border-solid border-black border-4 rounded-md' onChange={(e) => onChangeAngle(e)} value={angle} />
          </div>
          <div>
            <p>Blur</p>
            <input type="number" className='h-8 w-16 border border-solid border-black border-4 rounded-md' onChange={(e) => onChangeBlur(e)} value={blur} />
          </div>
          <div>
            <p>Padding</p>
            <input type="number" className='h-8 w-16 border border-solid border-black border-4 rounded-md' onChange={(e) => onChangePadding(e)} value={padding} />
          </div>
        </div>
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
export default ShadowSelector