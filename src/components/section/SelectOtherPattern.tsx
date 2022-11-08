import { useState, useEffect } from 'react';
import { otherPatterns } from "../../mock/drawing_tools_stepone";


const SelectOtherPattern = (props:any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    props?.setSelectedShape(otherPatterns[0]);
  }, []);

  const onClickShape = (item:any, index:number) =>{
    console.log(item,'shape selector');
    props?.setSelectedShape(item);
    SelectIndex(index);
  }

  return (
    <>
      <div className="mt-5 flex justify-between p-4">
        {otherPatterns.map((otherPattern, index) => (
          <div key={index}>
            <img
              className={"object-contain h-8 w-8 m-auto "+((selectedIndex==index)?"border":"")}
              src={otherPattern.preview}
              alt="shapes"
              onClick={() => onClickShape(otherPattern, index)}
            />
          </div>  
        ))}
      </div>
    </>
  )
}

export default SelectOtherPattern