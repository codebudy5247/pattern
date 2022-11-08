import { useState, useEffect } from 'react';
import { PhotoshopPicker } from 'react-color';
import { Icon } from '@iconify/react';
import { plain_color } from "../../mock/bg_type";

const SelectPlainBgColor = (props:any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customcolor, setCustomColor] = useState('#fff');
  useEffect(() => {
    console.log("SelectPlainBgColor");
    if (props?.selectedShape.name === "plain_color_bg_type") {
      if (props?.selectedShape.id === plain_color.length + 1) {
        SelectIndex(plain_color.length);
        setCustomColor(props?.selectedShape.backgroundColor);
        return;
      }
      onClickShape(plain_color[props?.selectedShape.id - 1], props?.selectedShape.id - 1);
      return;
    }
    onClickShape(plain_color[0], 0);
  }, []);
  //Handle OnClick Back
  const onClickHandler = () => {
    props?.setShowBackgroundTypeMenu(true);
    props?.selectedwBackgroundType(' ');
  };

  const onClickShape = (item:any, index:number) =>{
    SelectIndex(index);
    setShowCustomColor(false);
    props.setSelectedShape(item);
  }

  // const color_list = plain_color.map((color) => color.backgroundColor)
  const rando_color = (colorCode:string) =>{
      return colorCode;
  }

  const onClickCustomShape = () => {
    setShowCustomColor(true);
    SelectIndex(plain_color.length);
  }

  const handleChangeComplete = (color: any, event: any) => {
    setCustomColor(color.hex);
  }

  const onAccept = () => {
    setShowCustomColor(false);

    const item: any = [];
    item.id = plain_color.length + 1;
    item.backgroundColor = customcolor;
    item.name = "plain_color_bg_type";
    props?.setSelectedShape(item);
  }

  const onCancel = () => {
    setShowCustomColor(false)
  }
    
  return (
    <>
      <div className="max-w-initial rounded overflow-hidden shadow-lg p-2">
        <div className="font-bold text-sm mb-2">Drawing tools</div>
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-2">
          {plain_color.map((shape:any, index:number) => (
            <div key={index}>
              <div
                className={"object-contain h-8 w-8 m-auto "+((selectedIndex==index)?"border border-4 border-dotted":"")}
                onClick={() => onClickShape(shape, index)}
                title={"color: gold"}
                style={{backgroundColor:rando_color(shape.backgroundColor)}}
              ></div>
            </div>
          ))}
            <img
              className={"cursor-pointer object-contain h-8 w-8 m-auto "+((selectedIndex===plain_color.length)?"border border-4 border-dotted":"")} 
              key={plain_color.length}
              src={"https://ik.imagekit.io/lqv4qsole/color/custom_QRCWJZmrdN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666894162150"}
              alt="shapes"
              onClick={() => onClickCustomShape()}
              title={"color: gold"}
            />
        </div>
        {/*  */}
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
  )
}

export default SelectPlainBgColor