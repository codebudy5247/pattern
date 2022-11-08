import { useState, useEffect } from 'react';
import { icons } from "../../mock/drawing_tools_stepone";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconSelecter = (props: any) => {
  const [selectedIndex, SelectIndex] = useState(0);
  useEffect(() => {
    props?.setSelectedShape(icons[0]);
  }, []);

  const onClickShape = (item:any, index:number) =>{
    console.log(item,'icon selector');
    props?.setSelectedShape(item);
    SelectIndex(index);
  }
  return (
    <>
      {/* <div className="text-center"> Icons </div> */}
      <div className="mt-5 flex justify-between p-4">
        {icons.map((icon, index) => (
          <div key={index}>
            <img
          className={"object-contain h-8 w-8 m-auto "+((selectedIndex==index)?"border":"")}
          src={icon.preview}
          alt="shapes"
          onClick={() => onClickShape(icon, index)}
        />
          </div>
          
        ))}
      </div>
    </>
  );
};

export default IconSelecter;
