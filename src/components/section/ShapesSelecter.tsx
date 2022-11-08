import { useState, useEffect } from 'react';
import { shapes } from "../../mock/drawing_tools_stepone";

const ShapesSelecter = (props: any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    props?.setSelectedShape(shapes[0]);
  }, []);

  const onClickShape = (item:any, index:number) =>{
    console.log(item,'shape selector');
    props?.setSelectedShape(item);
    SelectIndex(index);
  }
  return (
    <>
      <div className="mt-5 flex justify-between p-4">
        {shapes.map((shapes, index) => (
          <div key={index}>
            <img
          className={"object-contain h-8 w-8 "+((selectedIndex==index)?"border":"")}
          src={shapes?.preview}
          alt="shapes"
          onClick={() => onClickShape(shapes, index)}
        />
          </div>
          
        ))}
      </div>
    </>
  );
};

export default ShapesSelecter;
