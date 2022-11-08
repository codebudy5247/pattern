import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { abstract_type } from "../../mock/bg_type";

const SelectImageBackground = (props:any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    console.log("SelectRoofStyle", props?.selectedShape);
    if (props?.selectedShape.name === "abstract_bg_type") {
      onClickShape(abstract_type[props?.selectedShape.id - 1], props?.selectedShape.id - 1);
      return;
    }
    onClickShape(abstract_type[0], 0);
  }, []);

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
        {abstract_type.map((abstract, index) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 "+((selectedIndex===index)?"border border-4 border-dotted":"")}
              src={abstract.preview}
              alt="shapes"
              onClick={() => onClickShape(abstract, index)}
            />
          </div>
          
        ))}
      </div>
    </>
  )
}

export default SelectImageBackground