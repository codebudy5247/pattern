import {fabric} from "fabric";
import {useState} from "react";

const flagArray: any = []
const blockItems: any = []
let canvas:any
const objects:any=[1,2,3,4,5,6,7,8,9];
const rows:any=[0,1,2,3,4,5,6,7,8]

const Grid = (props : any) => {
    
    
    const onClickHandler = (id : string) => {
        console.log({id});
        if (props ?. selectedShape) {
            // const flag = flagArray.find((canvasId : any) => canvasId === id)
            // if (! flag) {
            // flagArray.push(id);
                canvas = new fabric.Canvas(id, {
                    hoverCursor: "pointer",
                    selection: true
                })
                // canvas.backgroundColor = "#F5F5F5";
                canvas.setWidth(35);
                canvas.setHeight(35);
                fabric.Image.fromURL(props?.selectedShape?.preview, function (img : any) {
                    img.scale(0.5).set({
                        left: 5,
                        top: 5,
                        angle: 0,
                        originX: "left",
                        originY: "top",
                        selectable:false
                    }),
                    canvas.centerObject(img).add(img).renderAll();
                    const json = canvas.toJSON();
                    const block_item_data = {
                    _id: id,
                    block_item_json_data:json.objects
                    }
                    const found = blockItems.find((blockItem : any) => blockItem.block_item_data._id === id)
                    if (! found) {
                    blockItems.push({block_item_data})
                    }
                    // if(blockItems.length ===81){
                    // props?.setPattern(blockItems)
                    // }
                });
                // console.log({blockItems});
                props?.setPattern(blockItems)
        }
    }

    return (
        <>
         {/* {rows.map((row:any, j:any) =><>
        <div className="flex" key={j}>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+1)} ><canvas id={} /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+2)} ><canvas id={row*10+j+2}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+3)} ><canvas id={row*10+j+3}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+4)} ><canvas id={row*10+j+4}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+5)} ><canvas id={row*10+j+5} /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+6)} ><canvas id={row*10+j+6}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+7)} ><canvas id={row*10+j+7}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+8)} ><canvas id={row*10+j+8}  /></div>
            <div  className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler(row*10+j+9)} ><canvas id={row*10+j+9}  /></div>
         </div>  </> )} */}
         {/* //! TODO:Make Grid Dynamic */}
     <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("1")} ><canvas id="1"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("2")} ><canvas id="2"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("3")} ><canvas id="3"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("4")} ><canvas id="4"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("5")} ><canvas id="5"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("6")} ><canvas id="6"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("7")} ><canvas id="7"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("8")} ><canvas id="8"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("9")} ><canvas id="9"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("10")} ><canvas id="10"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("11")} ><canvas id="11"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("12")} ><canvas id="12"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("13")} ><canvas id="13"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("14")} ><canvas id="14"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("15")} ><canvas id="15"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("16")} ><canvas id="16"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("17")} ><canvas id="17"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("18")} ><canvas id="18"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("19")} ><canvas id="19"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("20")} ><canvas id="20"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("21")} ><canvas id="21"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("22")} ><canvas id="22"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("23")} ><canvas id="23"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("24")} ><canvas id="24"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("25")} ><canvas id="25"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("26")} ><canvas id="26"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("27")} ><canvas id="27"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("28")} ><canvas id="28"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("29")} ><canvas id="29"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("30")} ><canvas id="30"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("31")} ><canvas id="31"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("32")} ><canvas id="32"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("33")} ><canvas id="33"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("34")} ><canvas id="34"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("35")} ><canvas id="35"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("36")} ><canvas id="36"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("37")} ><canvas id="37"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("38")} ><canvas id="38"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("39")} ><canvas id="39"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("40")} ><canvas id="40"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("41")} ><canvas id="41"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("42")} ><canvas id="42"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("43")} ><canvas id="43"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("44")} ><canvas id="44"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("45")} ><canvas id="45"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("46")} ><canvas id="46"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("47")} ><canvas id="47"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("48")} ><canvas id="48"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("49")} ><canvas id="49"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("50")} ><canvas id="50"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("51")} ><canvas id="51"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("52")} ><canvas id="52"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("53")} ><canvas id="53"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("54")} ><canvas id="54"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("55")} ><canvas id="55"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("56")} ><canvas id="56"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("57")} ><canvas id="57"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("58")} ><canvas id="58"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("59")} ><canvas id="59"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("60")} ><canvas id="60"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("61")} ><canvas id="61"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("62")} ><canvas id="62"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("63")} ><canvas id="63"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("64")} ><canvas id="64"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("65")} ><canvas id="65"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("66")} ><canvas id="66"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("67")} ><canvas id="67"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("68")} ><canvas id="68"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("69")} ><canvas id="69"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("70")} ><canvas id="70"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("71")} ><canvas id="71"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("72")} ><canvas id="72"/></div>

    </div>
    <div className="flex">
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("73")} ><canvas id="73"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("74")} ><canvas id="74"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("75")} ><canvas id="75"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("76")} ><canvas id="76"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("77")} ><canvas id="77"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("78")} ><canvas id="78"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("79")} ><canvas id="79"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("80")} ><canvas id="80"/></div>
                <div className="w-10 h-10" style={{border:'0.2px solid grey'}} onClick={() => onClickHandler("81")} ><canvas id="81"/></div>

    </div>
        </>
    )
}

export default Grid


// get updated img value

/**
 * fabric.Image.fromURL('data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACa0lEQVRYhbVXMW7bQBAcMgRTWCJdC+qFOLAaudFDnEKdYL1AfoCRB8gvkJJUAQw/RI3cSIBg13ZShzxWBEK6sEjf7e3dkYC8Fckhduf2doZHryzLEpY4e/mp3M+jEW7TB/bdq+457rMnpGVeP9v3p7b08K0oE7NoiHk0Yotfxxdt07UnsEy3Gomq+F32qKy+SQRtCVTtn0VDAEBS5nXx7//WbdPpBOQ9/3YywDwaYRYNsUy3dfHksMquHwLF27uieF+53JFFssFK7Gps3Zsg9j+bCcjFb07H+PrnFwD3ik14NYQyCWsH5OKe5wHQ206Lu/BqODkSGgFanBbp+iG71y7cpBDvy/MPxQeozmUdL9Nt3WIuOFyeKc4ntA5UbaRmIw8htyIXXg3mffakPNd8gNM5Tb4SOyySTWPc5hNaB+hA0eRyEQCIvdCKy8W52fDn0Qj7/lRZsazzxOJsosideOyF9XUVV91z7PtT3JyOEbiczaRjqhYT7vKRAGivY1rchdvy1zPQVMeiyFmfcOGm/MoQJmVeezsXsRcCPrTkTXEuf02Afs8/ygdo/kAG77JHiCLXzIjTuVzEhdvyByadfrQPVPmDldhpEpJ94OV/piWvQhS59Uwlihz9T533dw9xmz6oWyAHZXxsH6Dd0ghw7TqmDyzFzv41NHn2sXyAhkf/CxbJxvo9Nw2dCafnicvOwH4mpBKSk9t8oqmPXHYGynP2TNhGx01wk5SNBGQSLh27Tsm24iyBdW+i3I///rb6BPdfIOt83ZsobY8O5wMjAXlAuHB1hK7Wla/1rxlX3KZzV7QmYPIJ2z7b4hVhK2M6UYICmwAAAABJRU5ErkJggg==', function(origImage) {
  var origBoundingRect = origImage.getBoundingRect();
  fabric.Image.fromURL(origImage.toDataURL({
    width: origImage.width - 5,
    height: origImage.height - 5
  }), function(newImage) {
    var newBoundingRect = newImage.getBoundingRect();
    console.log('origBoundingRect:\r\n' + JSON.stringify(origBoundingRect) + '\r\n\r\n' + 'newBoundingRect:\r\n' + JSON.stringify(newBoundingRect));
  });
});
 */
