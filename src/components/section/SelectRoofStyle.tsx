import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { roof_type } from "../../mock/bg_type";

const SelectRoofStyle = (props:any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    console.log("SelectRoofStyle", props?.selectedShape);
    if (props?.selectedShape.name === "roof_bg_type") {
      onClickShape(roof_type[props?.selectedShape.id - 1], props?.selectedShape.id - 1);
      return;
    }
    onClickShape(roof_type[0], 0);
  }, []);
  //Handle OnClick Back
  const onClickHandler = () => {
    props?. setShowBackgroundTypeMenu(true);
    props?. selectedwBackgroundType(' ');
  };
  
  const onClickShape = (item:any, index:number) =>{
    SelectIndex(index);
    props.setSelectedShape(item)
  }
  return (
    <>
      <div className="flex justify-between p-4 cursor-pointer">
        {roof_type.map((roof, index) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 "+((selectedIndex===index)?"border border-4 border-dotted":"")}
              src={roof.preview}
              alt="shapes"
              onClick={() => onClickShape(roof, index)}
            />
          </div>
          
        ))}
      </div>
    </>
  )
}

export default SelectRoofStyle