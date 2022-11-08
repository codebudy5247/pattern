import styles from "../../styles/Canva.module.css"
import {fabric} from "fabric";
import { useEffect} from "react";

let flag = 0
let canvas:any;

const Canva = (props:any) => {
  console.log({props});
  
  useEffect(() => {
    const imageUrl = "./img/canva-back.png";
    canvas = new fabric.Canvas("c", {
      hoverCursor: "pointer",
      selection: true,
    });
    canvas.backgroundColor = "#F5F5F5";
    canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
      backgroundImageOpacity: 0.5,
      // should the image be resized to fit the container
      backgroundImageStretch: false
  });
    canvas.setWidth(260);
    canvas.setHeight(230);
    flag = 1 
  }, [])
  
  const onClickHandler = () => {
    if(flag === 1 && props?.selectedShape?.preview != undefined){
      if(props?.selectedShape?.preview){
        fabric.Image.fromURL(props?.selectedShape?.preview, function (img : any) {
          img.scale(0.5).set({
              left: 10,
              top: 10,
              angle: 0,
              originX: "left",
              originY: "top"
          }),
          canvas.centerObject(img).add(img).renderAll();
          
          props.setSelectedShape("")        
      });
      }
    }else if (props?.selectedShape?.backgroundColor && flag === 1){
      if(props?.selectedShape?.backgroundColor){
        const rect = new fabric.Rect({
          left: 100,
          top: 50,
          width: 20,
          height: 20,
          fill: props?.selectedShape?.backgroundColor,
          angle: 0,
          padding: 10
        });
        canvas.add(rect);
        props.setSelectedShape("")  
      }
    }
    const json = canvas.toJSON();
    console.log("json",json.objects);
  } 
  
  return (
    <div>
      {/* <Canvas /> */}
      <div className="h-59 w-65" onClick={onClickHandler} style={{border:'1px solid #CDCDCD'}}><canvas id="c"/></div>
      {/* CDCDCD border-solid border-2 border-BLACK */}
    </div>
  )
}

export default Canva