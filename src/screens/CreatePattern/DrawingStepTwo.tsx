import {useState, useEffect} from "react";
import { effects } from "../../mock/format";
import styles from "../../styles/CreatePattern.module.css";
import EffectSelector from "../../components/section/EffectSelector";
import SelectEffects from "../../components/section/SelectEffects";

import { canvas_w, canvas_w_count, canvas_h, canvas_h_count, STEP_ONE, STEP_TWO, STEP_THREE } from "../../mock/common_variable";

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

import { default_stepone, flowLines, SHAPE_FLOWLINE, SHAPE_SHAPE, SHAPE_ICON, SHAPE_IMAGE } from "../../mock/drawing_tools_stepone";
import { default_steptwo, LINE, BODY, BACKGROUND, OUTLINE, OUTLINE_STYLE, EFFECT, lines, border_styles, line_colors, shape_colors, background_colors, shape_effects, CORNER_STYLE, corner_styles, status_effects, STATUS, SHADOW } from "../../mock/drawing_tools_steptwo";
import { fabric } from 'fabric';
import StatusSelector from "../../components/section/StatusSelector";
import ShadowSelector from "../../components/section/ShadowSelector";
const DrawingStepTwo = (props: any) => {
    // Drawing Tools
    const [selectedEffectTools, setSelectedEffectTools] = useState(LINE)
    const [selectedEffect, setSelectedEffect] = useState(default_steptwo)
    const [selectedItem, setSelectedItem] = useState(-1)

    const [renderobjects, setRenderObjects] = useState <any[]> (props?.renderobjects)

    const { editor, onReady } = useFabricJSEditor()
    
    const SelectedEffectToolsComponent = () => {
        if (selectedEffectTools === LINE) {
            let temp = selectedEffect;
            let temp1 = selectedEffect;
            let temp2 = selectedEffect;
            if (selectedItem !== -1) {
                const effect = renderobjects[selectedItem].effect;
                let j=0;
                // console.log("UseEffect:", selectedEffectTools);
                while(j<effect.length) {
                    if (effect[j].class === LINE) {
                        temp = effect[j];
                    }
                    if (effect[j].class === BODY) {
                        temp1 = effect[j];
                    }
                    if (effect[j].class === BACKGROUND) {
                        temp2 = effect[j];
                    }
                    j++;
                }
                // console.log("TEMP:", temp, temp1);
            }
            return (
                <>
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={temp}
                        shapes={line_colors}
                        text={LINE}
                        key={LINE}
                    />
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={temp1}
                        shapes={shape_colors}
                        text={BODY}
                        key={BODY}
                    />
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={temp2}
                        shapes={background_colors}
                        text={BACKGROUND}
                        key={BACKGROUND}
                    />
                </>
            );
        }
        else if (selectedEffectTools === OUTLINE) {
            let temp = selectedEffect;
            let temp1 = selectedEffect;
            let temp2 = selectedEffect;
            if (selectedItem !== -1) {
                const effect = renderobjects[selectedItem].effect;
                let j=0;
                // console.log("UseEffect:", selectedEffectTools);
                while(j<effect.length) {
                    if (effect[j].class === OUTLINE) {
                        temp = effect[j];
                    }
                    if (effect[j].class === OUTLINE_STYLE) {
                        temp1 = effect[j];
                    }
                    if (effect[j].class === CORNER_STYLE) {
                        temp2 = effect[j];
                        temp2['corner_size'] = renderobjects[selectedItem].corner_size;
                    }
                    j++;
                }
                // console.log("TEMP:", temp, temp1);
            }
            return (
                <>
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={temp}
                        shapes={lines}
                        text={OUTLINE}
                        key={OUTLINE}
                    />
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={temp1}
                        shapes={border_styles}
                        text={OUTLINE_STYLE}
                        key={OUTLINE_STYLE}
                    />
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        onChangeCornerSize={onChangeCornerSize}
                        selectedEffect={temp2}
                        shapes={corner_styles}
                        text={CORNER_STYLE}
                        key={CORNER_STYLE}
                    />
                </>
            );
        }
        else if (selectedEffectTools === EFFECT) {
            const temp = [];
            let shadowVisibility = false;
            let shadowColor = "#fff";
            let shadowAngle = 0;
            let shadowSize = 5;
            let shadowPadding = 10;
            if (selectedItem !== -1) {
                if (renderobjects[selectedItem].flipX===true)
                    temp.push('flipX');
                if (renderobjects[selectedItem].flipY===true)
                    temp.push('flipY');
                shadowVisibility = renderobjects[selectedItem].shadow.visibility;
                shadowColor = renderobjects[selectedItem].shadow.color;
                shadowSize = renderobjects[selectedItem].shadow.size;
                shadowAngle = renderobjects[selectedItem].shadow.angle;
                shadowPadding = renderobjects[selectedItem].shadow.padding;
            }
            // console.log("Shadow: ", shadowVisibility, shadowColor, shadowSize, shadowAngle);
            // console.log('Status:', temp);
            return (
                <>
                    <EffectSelector 
                        setSelectedEffectTools={setSelectedEffectTools}
                        setSelectedEffect={setSelectedEffect}
                        selectedEffect={selectedEffect}
                        shapes={shape_effects}
                        text={EFFECT}
                        key={EFFECT}
                    />
                    <ShadowSelector
                        shadowVisibility={shadowVisibility}
                        shadowColor={shadowColor}
                        shadowSize={shadowSize}
                        shadowAngle={shadowAngle}
                        shadowPadding={shadowPadding}
                        onChangeShadow={onChangeShadow}
                        text={SHADOW}
                        key={SHADOW}
                    />
                    <StatusSelector 
                        onClickStatusEffect={onClickStatusEffect}
                        statusEffect={temp}
                        shapes={status_effects}
                        text={STATUS}
                        key={STATUS}
                    />
                </>
            );
        }
    };

    const initializeCanvas = () => {
        editor?.canvas.setWidth(canvas_w * canvas_w_count);
        editor?.canvas.setHeight(canvas_h * canvas_h_count);
        const group = new fabric.Group([], {
            left: 0,
            top: 0,
            selectable: false, 
            hoverCursor: "normal"
        });
        group.addWithUpdate(new fabric.Rect({
            top:0,
            left:0,
            width:canvas_w * canvas_w_count - 1, 
            height:canvas_h * canvas_h_count - 1, 
            stroke:'black', 
            fill:'white',
            selectable: false, 
            hoverCursor: "normal"
        }));
        for (let i=1;i<canvas_w_count;i++) {
            group.addWithUpdate(new fabric.Line([0, 0, 0, canvas_h * canvas_h_count], {
                left: i * canvas_w,
                top: 0,
                selectable: false, 
                stroke: '#d2d2d2', 
                hoverCursor: "normal"
            }));
            group.addWithUpdate(new fabric.Line([0, 0, canvas_w * canvas_w_count, 0], {
                left: 0,
                top: i * canvas_h,
                selectable: false, 
                stroke: '#d2d2d2',
                hoverCursor: "normal"
            }));
        }
        editor?.canvas.add(group);
    }

    const fabricImageFromURL = async (image_url:string) => {                                                                          
        return new Promise(function(resolve, reject) {                                                                        
            try {
                fabric.Image.fromURL(image_url, function (image) {
                resolve(image);
            });
            } catch (error) {
                reject(error);
            }
        });                                                                                                                   
    }

    const canvas_groups:any[] = [];
    const render = async () => {
        console.log("Render:", renderobjects);
        let i=0;
        editor?.canvas.clear();
        canvas_groups.splice(0, canvas_groups.length);
        initializeCanvas();
        while(i<renderobjects.length) {
            const objects = renderobjects[i];
            const effect = renderobjects[i].effect;
            let j=0;
            let strokeWidth = 1;
            let line_color = "black";
            let body_color = "gray";
            let background_color = "#80808024";
            let border_style = 0;
            const effect_type = (selectedEffect.class===EFFECT)?selectedEffect.style:"";
            let corner_type = "circle";
            const angle = objects.angle;
            const scaleX = objects.scaleX;
            const scaleY = objects.scaleY;
            const skewX = objects.skewX;
            const skewY = objects.skewY;
            const flipX = objects.flipX;
            const flipY = objects.flipY;
            const shadow_style = objects.shadow;
            const corner_size = objects.corner_size;
            while(j<effect.length) {
                if (effect[j].class === OUTLINE) {
                    strokeWidth = effect[j].strokeWidth;
                }
                else if (effect[j].class === OUTLINE_STYLE) {
                    border_style = effect[j].style;
                }
                else if (effect[j].class === CORNER_STYLE) {
                    corner_type = effect[j].style;
                }
                else if (effect[j].class === LINE) {
                    line_color = effect[j].color;
                }
                else if (effect[j].class === BODY) {
                    body_color = effect[j].color;
                }
                else if (effect[j].class === BACKGROUND) {
                    background_color = effect[j].color;
                }
                j++;
            }
            const shadow = new fabric.Shadow({
                blur: (shadow_style.visibility?shadow_style.size:0), offsetX: (shadow_style.visibility?shadow_style.padding:0) * Math.cos(shadow_style.angle * 3.14 / 180), offsetY: (shadow_style.visibility?shadow_style.padding:0) * Math.sin(shadow_style.angle * 3.14 / 180), color: shadow_style.color
            });
            if (objects.type === SHAPE_FLOWLINE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal",
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = true;
                group.lockScalingY = true;

                group.setControlsVisibility({
                    mt: false, 
                    mb: false, 
                    ml: false, 
                    mr: false, 
                    bl: false,
                    br: false, 
                    tl: false, 
                    tr: false,
                    mtr: false, 
                });
                let pt_str = "";
                let left = objects.points[0].x * canvas_w + canvas_w / 2 - strokeWidth / 2;
                let top = objects.points[0].y * canvas_h + canvas_h / 2 - strokeWidth / 2;
                //Path
                for (let j=0;j<objects.points.length-1;j++) {
                    // Background
                    group.addWithUpdate(new fabric.Rect({
                        top: objects.points[j].y * canvas_h,
                        left: objects.points[j].x * canvas_w,
                        width:canvas_w * 1, 
                        height:canvas_h * 1, 
                        fill: background_color,
                        selectable: false, 
                        hoverCursor: "normal",
                    }));
                    pt_str += "M " + (objects.points[j].x * canvas_w + canvas_w / 2 - strokeWidth / 2) + " " + (objects.points[j].y * canvas_h + canvas_h / 2 - strokeWidth / 2) + " ";
                    pt_str += "L " + (objects.points[j+1].x * canvas_w + canvas_w / 2 - strokeWidth / 2) + " " + (objects.points[j+1].y * canvas_h + canvas_h / 2 - strokeWidth / 2) + " ";
                    if (left > objects.points[j].x * canvas_w + canvas_w / 2 - strokeWidth / 2)
                        left = objects.points[j].x * canvas_w + canvas_w / 2 - strokeWidth / 2;
                    else if (top > objects.points[j].y * canvas_h + canvas_h / 2 - strokeWidth / 2)
                        top = objects.points[j].y * canvas_h + canvas_h / 2 - strokeWidth / 2;
                    // group.addWithUpdate(new fabric.Line([
                    //         objects.points[j].x * canvas_w + canvas_w / 2 - strokeWidth / 2, 
                    //         objects.points[j].y * canvas_h + canvas_h / 2 - strokeWidth / 2, 
                    //         objects.points[j+1].x * canvas_w + canvas_w / 2 - strokeWidth / 2, 
                    //         objects.points[j+1].y * canvas_h + canvas_h / 2 - strokeWidth / 2, 
                    //     ], {
                    //     strokeWidth: strokeWidth,
                    //     strokeDashArray: [strokeWidth, strokeWidth * border_style],
                    //     stroke: line_color,
                    //     selectable: false, 
                    //     hoverCursor: "normal",
                    //     shadow: shadow
                    // }));
                }
                // Background
                group.addWithUpdate(new fabric.Rect({
                    top: objects.points[objects.points.length-1].y * canvas_h,
                    left: objects.points[objects.points.length-1].x * canvas_w,
                    width:canvas_w * 1, 
                    height:canvas_h * 1, 
                    fill:background_color,
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                if (border_style === 0) {
                    for (let j=0;j<objects.points.length-1;j++) {
                        //Connection Rect
                        group.addWithUpdate(new fabric.Rect({
                            left: objects.points[j].x * canvas_w + canvas_w / 2 - strokeWidth / 2,
                            top: objects.points[j].y * canvas_h + canvas_h / 2 - strokeWidth / 2,
                            width:strokeWidth * 1, 
                            height:strokeWidth * 1, 
                            fill: line_color,
                            strokeWidth: 0,
                            selectable: false, 
                            hoverCursor: "normal",
                            shadow: shadow,
                            rx: strokeWidth, 
                            ry: strokeWidth, 
                        }));
                    }
                }
                if (objects.points.length !== 1) {
                    pt_str += "M " + (objects.points[0].x * canvas_w + canvas_w / 2 - strokeWidth / 2) + " " + (objects.points[0].y * canvas_h + canvas_h / 2 - strokeWidth / 2) + " ";
                    pt_str += "L " + (objects.points[0].x * canvas_w + canvas_w / 2 - strokeWidth / 2) + " " + (objects.points[0].y * canvas_h + canvas_h / 2 - strokeWidth / 2) + " z";
                    // console.log(pt_str);

                    if (left > objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - strokeWidth / 2)
                        left = objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - strokeWidth / 2;
                    else if (top > objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - strokeWidth / 2)
                        top = objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - strokeWidth / 2;
                    
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: left,
                        top: top,
                        stroke: line_color,
                        fill: body_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth * border_style, strokeWidth * border_style],
                        originX: 'left',
                        originY: 'top',
                        angle: 0, 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow
                    }));
                }
                if (corner_type === 'circle') {
                    const border_width = parseInt(corner_size) + 3;
                    strokeWidth = 2;
                    //Circle
                    group.addWithUpdate(new fabric.Ellipse({
                        left: objects.points[0].x * canvas_w + canvas_w / 2 - strokeWidth / 2 - border_width,
                        top: objects.points[0].y * canvas_h + canvas_h / 2 - strokeWidth / 2 - border_width,
                        rx: border_width,
                        ry: border_width,
                        angle: 0,
                        fill: body_color,
                        stroke:line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow
                    }));
                    group.addWithUpdate(new fabric.Ellipse({
                        left: objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - strokeWidth / 2 - border_width,
                        top: objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - strokeWidth / 2 - border_width,
                        rx: border_width,
                        ry: border_width,
                        angle: 0,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow
                    }));
                }
                else if (corner_type === 'rect') {
                    const border_width = parseInt(corner_size) + 3;
                    strokeWidth = 2;
                    // strokeWidth = 0;
                    //Circle
                    group.addWithUpdate(new fabric.Rect({
                        left: objects.points[0].x * canvas_w + canvas_w / 2 - border_width - strokeWidth / 2, 
                        top: objects.points[0].y * canvas_h + canvas_h / 2 - border_width - strokeWidth / 2, 
                        width: border_width * 2,
                        height: border_width * 2,
                        angle: 0,
                        fill: body_color,
                        stroke:line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        rx: 5,
                        ry: 5,
                    }));
                    group.addWithUpdate(new fabric.Rect({
                        left: objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - border_width - strokeWidth / 2,
                        top: objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - border_width - strokeWidth / 2,
                        width: border_width * 2,
                        height: border_width * 2,
                        angle: 0,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        rx: 5,
                        ry: 5,
                    }));
                }
                else if (corner_type === 'triangle') {
                    const border_width = parseInt(corner_size) + 3;
                    strokeWidth = 2;
                    // strokeWidth = 0;
                    let triangle_angle = 0, triangle1_angle = 0;
                    if (objects.points[1].x === objects.points[0].x) {
                        triangle_angle = ((objects.points[0].y > objects.points[1].y)?180:0);
                    }
                    else if (objects.points[1].y === objects.points[0].y) {
                        triangle_angle = ((objects.points[0].x > objects.points[1].x)?1:-1)*90;
                    }
                    if (objects.points[objects.points.length-2].x === objects.points[objects.points.length-1].x) {
                        triangle1_angle = ((objects.points[objects.points.length-1].y > objects.points[objects.points.length-2].y)?180:0);
                    }
                    else if (objects.points[objects.points.length-2].y === objects.points[objects.points.length-1].y) {
                        triangle1_angle = ((objects.points[objects.points.length-1].x > objects.points[objects.points.length-2].x)?1:-1)*90;
                    }
                    const width = border_width * 2;
                    const height = border_width * 2;
                    let x = objects.points[0].x * canvas_w + canvas_w / 2 - width / 2 - strokeWidth / 2;
                    let y = objects.points[0].y * canvas_h + canvas_h / 2 - height / 2 - strokeWidth / 2;
                    const pos = fabric.util.rotatePoint(
                        new fabric.Point(x, y),
                        new fabric.Point((objects.points[0].x) * canvas_w + canvas_w / 2, ( objects.points[0].y) * canvas_h + canvas_h / 2),
                        fabric.util.degreesToRadians(triangle_angle)
                    );
                    //Circle
                    group.addWithUpdate(new fabric.Triangle({
                        left: pos.x,
                        top: pos.y,
                        width: width,
                        height: height,
                        angle: triangle_angle,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                    x = objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - width / 2 - strokeWidth / 2;
                    y = objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - height / 2 - strokeWidth / 2;
                    const pos1 = fabric.util.rotatePoint(
                        new fabric.Point(x, y),
                        new fabric.Point((objects.points[objects.points.length-1].x) * canvas_w + canvas_w / 2, ( objects.points[objects.points.length-1].y) * canvas_h + canvas_h / 2),
                        fabric.util.degreesToRadians(triangle1_angle)
                    );
                    group.addWithUpdate(new fabric.Triangle({
                        left: pos1.x,
                        top: pos1.y,
                        width: width,
                        height: height,
                        angle: triangle1_angle,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                }
                else if (corner_type === 'diamond') {
                    const border_width = parseInt(corner_size);
                    strokeWidth = 2;
                    const object_angle = 45;
                    const width = border_width * 2, height = border_width * 2;
                    let x = objects.points[0].x * canvas_w + canvas_w / 2 - width / 2 - strokeWidth / 2;
                    let y = objects.points[0].y * canvas_h + canvas_h / 2 - height / 2 - strokeWidth / 2;
                    const pos = fabric.util.rotatePoint(
                        new fabric.Point(x, y),
                        new fabric.Point((objects.points[0].x) * canvas_w + canvas_w / 2, ( objects.points[0].y) * canvas_h + canvas_h / 2),
                        fabric.util.degreesToRadians(object_angle)
                    );
                    //Diamond
                    group.addWithUpdate(new fabric.Rect({
                        left: pos.x,
                        top: pos.y,
                        width: width,
                        height: height,
                        angle: object_angle,
                        fill: body_color,
                        stroke:line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        rx: strokeWidth / 2,
                        ry: strokeWidth / 2,
                    }));
                    x = objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - width / 2 - strokeWidth / 2;
                    y = objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - height / 2 - strokeWidth / 2;
                    const pos1 = fabric.util.rotatePoint(
                        new fabric.Point(x, y),
                        new fabric.Point((objects.points[objects.points.length-1].x) * canvas_w + canvas_w / 2, ( objects.points[objects.points.length-1].y) * canvas_h + canvas_h / 2),
                        fabric.util.degreesToRadians(object_angle)
                    );
                    group.addWithUpdate(new fabric.Rect({
                        left: pos1.x,
                        top: pos1.y,
                        width: width,
                        height: height,
                        angle: object_angle,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style], 
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        rx: strokeWidth / 2,
                        ry: strokeWidth / 2,
                    }));
                }
                else if (corner_type === '5-star') {
                    const border_width = parseInt(corner_size) + 5;
                    strokeWidth = 2;
                    let object_angle = -90;
                    let object_angle1 = -90;
                    if (objects.points[1].x === objects.points[0].x) {
                        object_angle = ((objects.points[0].y > objects.points[1].y)?-90:90);
                    }
                    else if (objects.points[1].y === objects.points[0].y) {
                        object_angle = ((objects.points[0].x > objects.points[1].x)?36:72);
                    }
                    if (objects.points[objects.points.length-2].x === objects.points[objects.points.length-1].x) {
                        object_angle1 = ((objects.points[objects.points.length-1].y > objects.points[objects.points.length-2].y)?-90:90);
                    }
                    else if (objects.points[objects.points.length-2].y === objects.points[objects.points.length-1].y) {
                        object_angle1 = ((objects.points[objects.points.length-1].x > objects.points[objects.points.length-2].x)?36:72);
                    }
                    const width = border_width * 2 + 7, height = border_width * 2 + 7;
                    const length = border_width * 2;
                    let x = canvas_w * canvas_w_count;
                    let y = canvas_h * canvas_h_count;
                    let pt_str = "";
                    const star_angle = 72;
                    
                    pt_str += "M " + ((length/2) * Math.cos((object_angle)*3.14/180)) + " " + ((length/2) * Math.sin((object_angle)*3.14/180)) + " ";
                    for (let j=0;j<5;j++) {
                        pt_str += "L " + ((length/4) * Math.cos((star_angle*j+36 + object_angle)*3.14/180)) + " " + ((length/4) * Math.sin((star_angle*j+36 + object_angle)*3.14/180)) + " ";
                        pt_str += "L " + ((length/2) * Math.cos((star_angle*(j+1) + object_angle)*3.14/180)) + " " + ((length/2) * Math.sin((star_angle*(j+1) + object_angle)*3.14/180)) + " ";
                        if (x > ((length/2) * Math.cos((star_angle*(j) + object_angle)*3.14/180)))
                            x = ((length/2) * Math.cos((star_angle*(j) + object_angle)*3.14/180));
                        if (y > ((length/2) * Math.sin((star_angle*(j) + object_angle)*3.14/180)))
                            y = ((length/2) * Math.sin((star_angle*(j) + object_angle)*3.14/180));
                    }
                    pt_str += "z";
                    //Diamond
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: objects.points[0].x * canvas_w + (canvas_w/2 - Math.abs(x)) - strokeWidth / 2,
                        top: objects.points[0].y * canvas_h + (canvas_h/2 -Math.abs(y)) - strokeWidth / 2,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style],
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                    x = canvas_w * canvas_w_count;
                    y = canvas_h * canvas_h_count;

                    pt_str = "M " + ((length/2) * Math.cos((object_angle1)*3.14/180)) + " " + ((length/2) * Math.sin((object_angle1)*3.14/180)) + " ";
                    for (let j=0;j<5;j++) {
                        pt_str += "L " + ((length/4) * Math.cos((star_angle*j+36 + object_angle1)*3.14/180)) + " " + ((length/4) * Math.sin((star_angle*j+36 + object_angle1)*3.14/180)) + " ";
                        pt_str += "L " + ((length/2) * Math.cos((star_angle*(j+1) + object_angle1)*3.14/180)) + " " + ((length/2) * Math.sin((star_angle*(j+1) + object_angle1)*3.14/180)) + " ";
                        if (x > ((length/2) * Math.cos((star_angle*(j) + object_angle1)*3.14/180)))
                            x = ((length/2) * Math.cos((star_angle*(j) + object_angle1)*3.14/180));
                        if (y > ((length/2) * Math.sin((star_angle*(j) + object_angle1)*3.14/180)))
                            y = ((length/2) * Math.sin((star_angle*(j) + object_angle1)*3.14/180));
                    }
                    pt_str += "z";
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: objects.points[objects.points.length-1].x * canvas_w + (canvas_w/2 - Math.abs(x)) - strokeWidth / 2,
                        top: objects.points[objects.points.length-1].y * canvas_h + (canvas_h/2 -Math.abs(y)) - strokeWidth / 2,
                        width: width,
                        height: height,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style],
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                }
                else if (corner_type === '6-star') {
                    const border_width = parseInt(corner_size) + 5;
                    strokeWidth = 2;
                    let object_angle = -90;
                    let object_angle1 = -90;
                    if (objects.points[1].x === objects.points[0].x) {
                        object_angle = ((objects.points[0].y > objects.points[1].y)?-30:30);
                    }
                    else if (objects.points[1].y === objects.points[0].y) {
                        object_angle = ((objects.points[0].x > objects.points[1].x)?-60:60);
                    }
                    if (objects.points[objects.points.length-2].x === objects.points[objects.points.length-1].x) {
                        object_angle1 = ((objects.points[objects.points.length-1].y > objects.points[objects.points.length-2].y)?-30:30);
                    }
                    else if (objects.points[objects.points.length-2].y === objects.points[objects.points.length-1].y) {
                        object_angle1 = ((objects.points[objects.points.length-1].x > objects.points[objects.points.length-2].x)?-60:60);
                    }
                    const width = border_width * 2 + 7, height = border_width * 2 + 7;
                    const length = border_width * 2;
                    let x = canvas_w * canvas_w_count;
                    let y = canvas_h * canvas_h_count;
                    let pt_str = "";
                    const star_angle = 60;
                    
                    pt_str += "M " + ((length/2) * Math.cos((object_angle)*3.14/180)) + " " + ((length/2) * Math.sin((object_angle)*3.14/180)) + " ";
                    for (let j=0;j<6;j++) {
                        pt_str += "L " + ((length/4) * Math.cos((star_angle*j+30 + object_angle)*3.14/180)) + " " + ((length/4) * Math.sin((star_angle*j+30 + object_angle)*3.14/180)) + " ";
                        pt_str += "L " + ((length/2) * Math.cos((star_angle*(j+1) + object_angle)*3.14/180)) + " " + ((length/2) * Math.sin((star_angle*(j+1) + object_angle)*3.14/180)) + " ";
                        if (x > ((length/2) * Math.cos((star_angle*(j) + object_angle)*3.14/180)))
                            x = ((length/2) * Math.cos((star_angle*(j) + object_angle)*3.14/180));
                        if (y > ((length/2) * Math.sin((star_angle*(j) + object_angle)*3.14/180)))
                            y = ((length/2) * Math.sin((star_angle*(j) + object_angle)*3.14/180));
                    }
                    pt_str += "z";
                    //Diamond
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: objects.points[0].x * canvas_w + (canvas_w/2 - Math.abs(x)) - strokeWidth / 2,
                        top: objects.points[0].y * canvas_h + (canvas_h/2 -Math.abs(y)) - strokeWidth / 2,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style],
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                    x = canvas_w * canvas_w_count;
                    y = canvas_h * canvas_h_count;

                    pt_str = "M " + ((length/2) * Math.cos((object_angle1)*3.14/180)) + " " + ((length/2) * Math.sin((object_angle1)*3.14/180)) + " ";
                    for (let j=0;j<6;j++) {
                        pt_str += "L " + ((length/4) * Math.cos((star_angle*j+30 + object_angle1)*3.14/180)) + " " + ((length/4) * Math.sin((star_angle*j+30 + object_angle1)*3.14/180)) + " ";
                        pt_str += "L " + ((length/2) * Math.cos((star_angle*(j+1) + object_angle1)*3.14/180)) + " " + ((length/2) * Math.sin((star_angle*(j+1) + object_angle1)*3.14/180)) + " ";
                        if (x > ((length/2) * Math.cos((star_angle*(j) + object_angle1)*3.14/180)))
                            x = ((length/2) * Math.cos((star_angle*(j) + object_angle1)*3.14/180));
                        if (y > ((length/2) * Math.sin((star_angle*(j) + object_angle1)*3.14/180)))
                            y = ((length/2) * Math.sin((star_angle*(j) + object_angle1)*3.14/180));
                    }
                    pt_str += "z";
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: objects.points[objects.points.length-1].x * canvas_w + (canvas_w/2 - Math.abs(x)) - strokeWidth / 2,
                        top: objects.points[objects.points.length-1].y * canvas_h + (canvas_h/2 -Math.abs(y)) - strokeWidth / 2,
                        width: width,
                        height: height,
                        fill: body_color,
                        stroke: line_color,
                        strokeWidth: strokeWidth,
                        strokeDashArray: [strokeWidth*border_style, strokeWidth*border_style],
                        selectable: false, 
                        hoverCursor: "normal",
                        shadow: shadow,
                        strokeLineJoin: 'round',
                    }));
                }
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            else if (objects.type === SHAPE_SHAPE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal",
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = (effect_type==='scale')?false:true;
                group.lockScalingY = (effect_type==='scale')?false:true;
                group.lockUniScaling = false;

                group.setControlsVisibility({
                    mt: (effect_type==='skew')?true:false, 
                    mb: (effect_type==='skew')?true:false, 
                    ml: (effect_type==='skew')?true:false, 
                    mr: (effect_type==='skew')?true:false, 
                    bl: (effect_type==='scale')?true:false,
                    br: (effect_type==='scale')?true:false, 
                    tl: (effect_type==='scale')?true:false, 
                    tr: (effect_type==='scale')?true:false,
                    mtr: (effect_type==='rotate')?true:false, 
                });
                
                const path = objects.style.path;
                let j=0;
                let str_line = "";
                const st = objects.st;
                const en = objects.en;
                while (j<path.length) {
                    if (path[j][0] === 'M' || path[j][0] === 'L') {
                        let ptx: number = +path[j][1], pty: number = +path[j][2];
                        ptx = (ptx * (canvas_w * (en.x - st.x + 1) - strokeWidth) / objects.style.width) * scaleX;
                        pty = (pty * (canvas_h * (en.y - st.y + 1) - strokeWidth) / objects.style.height) * scaleY;
                        ptx = +ptx.toFixed();
                        pty = +pty.toFixed();
                        str_line += path[j][0] + ' ' + ptx + ' ' + pty + ' ';
                    }
                    else if (path[j][0] === 'C') {
                        let pt1: number = +path[j][1], pt2: number = +path[j][2], pt3: number = +path[j][3], 
                            pt4: number = +path[j][4], pt5: number = +path[j][5], pt6: number = +path[j][6];
                        pt1 = (pt1 * (canvas_w * (en.x - st.x + 1) - strokeWidth) / objects.style.width) * scaleX;
                        pt2 = (pt2 * (canvas_h * (en.y - st.y + 1) - strokeWidth) / objects.style.height) * scaleY;
                        pt3 = (pt3 * (canvas_w * (en.x - st.x + 1) - strokeWidth) / objects.style.width) * scaleX;
                        pt4 = (pt4 * (canvas_h * (en.y - st.y + 1) - strokeWidth) / objects.style.height) * scaleY;
                        pt5 = (pt5 * (canvas_w * (en.x - st.x + 1) - strokeWidth) / objects.style.width) * scaleX;
                        pt6 = (pt6 * (canvas_h * (en.y - st.y + 1) - strokeWidth) / objects.style.height) * scaleY;
                        pt1 = +pt1;
                        pt2 = +pt2;
                        pt3 = +pt3;
                        pt4 = +pt4;
                        pt5 = +pt5;
                        pt6 = +pt6;
                        str_line += path[j][0] + ' ' + pt1 + ' ' + pt2 + ' ' + pt3 + ' ' + pt4 + ' ' + pt5 + ' ' + pt6 + ' ';}
                    else if (path[j][0] === 'Z') {
                        str_line += path[j][0] + ' ';
                    }
                    j++;
                }
                //background
                // group.addWithUpdate(new fabric.Rect({
                //     top: st.y * canvas_h,
                //     left: st.x * canvas_w,
                //     width:canvas_w * (en.x - st.x + 1), 
                //     height:canvas_h * (en.y - st.y + 1), 
                //     fill: background_color,
                //     angle: 0, 
                //     selectable: false, 
                //     hoverCursor: "normal"
                // }));
                group.addWithUpdate(new fabric.Path(str_line, {
                    left: st.x * canvas_w + (canvas_w * (objects.en.x - objects.st.x + 1) - canvas_w * (objects.en.x - objects.st.x + 1) * scaleX) / 2,
                    top: st.y * canvas_h + (canvas_h * (objects.en.y - objects.st.y + 1) - canvas_h * (objects.en.y - objects.st.y + 1) * scaleY) / 2,
                    stroke: line_color,
                    fill: body_color,
                    strokeWidth: strokeWidth,
                    strokeDashArray: [strokeWidth, strokeWidth * border_style],
                    originX: 'left',
                    originY: 'top',
                    angle: 0, 
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                group.rotate(angle);
                group.skewX = skewX;
                group.skewY = skewY;
                group.flipX = flipX;
                group.flipY = flipY;
                // group.scaleX = scaleX;
                // group.scaleY = scaleY;
                if (shadow_style.visibility === true)
                    group.shadow = shadow;
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            else if (objects.type === SHAPE_ICON) {
                const myImg:any = await fabricImageFromURL(objects.style.preview);
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    angle: angle, 
                    scaleX: scaleX, 
                    scaleY: scaleY, 
                    skewX: skewX, 
                    skewY: skewY, 
                    selectable: false, 
                    hoverCursor: "normal",
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = (effect_type==='scale')?false:true;
                group.lockScalingY = (effect_type==='scale')?false:true;
                group.lockUniScaling = false;

                group.setControlsVisibility({
                    mt: (effect_type==='skew')?true:false, 
                    mb: (effect_type==='skew')?true:false, 
                    ml: (effect_type==='skew')?true:false, 
                    mr: (effect_type==='skew')?true:false, 
                    bl: (effect_type==='scale')?true:false,
                    br: (effect_type==='scale')?true:false, 
                    tl: (effect_type==='scale')?true:false, 
                    tr: (effect_type==='scale')?true:false,
                    mtr: (effect_type==='rotate')?true:false, 
                });

                //i create an extra var for to change some image properties
                myImg.set({ 
                    left: objects.st.x * canvas_w + (canvas_w * (objects.en.x - objects.st.x + 1) - canvas_w * (objects.en.x - objects.st.x + 1) * scaleX) / 2, 
                    top: objects.st.y * canvas_h + (canvas_h * (objects.en.y - objects.st.y + 1) - canvas_h * (objects.en.y - objects.st.y + 1) * scaleY) / 2, 
                    scaleX: canvas_w * (objects.en.x - objects.st.x + 1) / myImg.width * scaleX, 
                    scaleY: canvas_h * (objects.en.y - objects.st.y + 1) / myImg.height * scaleY, 
                    selectable: false, 
                    hoverCursor: "normal"
                });
                group.addWithUpdate(myImg);
                group.rotate(angle);
                group.flipX = flipX;
                group.flipY = flipY;
                if (shadow_style.visibility === true)
                    group.shadow = shadow;
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            else if (objects.type === SHAPE_IMAGE) {
                const myImg:any = await fabricImageFromURL(objects.style.preview);
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    angle: angle, 
                    scaleX: scaleX, 
                    scaleY: scaleY, 
                    skewX: skewX, 
                    skewY: skewY, 
                    selectable: false, 
                    hoverCursor: "normal",
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = (effect_type==='scale')?false:true;
                group.lockScalingY = (effect_type==='scale')?false:true;
                group.lockUniScaling = false;

                group.setControlsVisibility({
                    mt: (effect_type==='skew')?true:false, 
                    mb: (effect_type==='skew')?true:false, 
                    ml: (effect_type==='skew')?true:false, 
                    mr: (effect_type==='skew')?true:false, 
                    bl: (effect_type==='scale')?true:false,
                    br: (effect_type==='scale')?true:false, 
                    tl: (effect_type==='scale')?true:false, 
                    tr: (effect_type==='scale')?true:false,
                    mtr: (effect_type==='rotate')?true:false, 
                }); 

                //i create an extra var for to change some image properties
                myImg.set({ 
                    left: objects.st.x * canvas_w + (canvas_w * (objects.en.x - objects.st.x + 1) - canvas_w * (objects.en.x - objects.st.x + 1) * scaleX) / 2, 
                    top: objects.st.y * canvas_h + (canvas_h * (objects.en.y - objects.st.y + 1) - canvas_h * (objects.en.y - objects.st.y + 1) * scaleY) / 2, 
                    scaleX: canvas_w * (objects.en.x - objects.st.x + 1) / myImg.width * scaleX, 
                    scaleY: canvas_h * (objects.en.y - objects.st.y + 1) / myImg.height * scaleY, 
                    selectable: false, 
                    hoverCursor: "normal"
                });
                group.addWithUpdate(myImg);
                group.rotate(angle);
                group.flipX = flipX;
                group.flipY = flipY;
                if (shadow_style.visibility === true)
                    group.shadow = shadow;
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            i++;
        }
        editor?.canvas.renderAll();
    }

    // const renderIcon = (icon: any) => {
    //     return (ctx: any, left: any, top:any, styleOverride: any, fabricObject: any) => {
    //         const size = 20;
    //         ctx.save();
    //         ctx.translate(left, top);
    //         ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    //         ctx.drawImage(icon, -size/2, -size/2, size, size);
    //         ctx.restore();
    //     }
    // }

    const InitializeFabric = () => {
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerStyle = 'rect';

        const rotateIcon = "data:image/svg+xml,%3Csvg height='32px' width='32px' fill='%23000000' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 33.317 28' enable-background='new 0 0 33.317 28' xml:space='preserve'%3E%3Cpath d='M16.659,24c-5.078,0-9.213-3.987-9.475-9h2.975l-4.5-5l-4.5,5h3.025c0.264,6.671,5.74,12,12.475,12c3.197,0,6.104-1.21,8.315-3.185l-2.122-2.122C21.188,23.127,19.027,24,16.659,24z'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.133,14c-0.265-6.669-5.74-12-12.475-12c-3.197,0-6.104,1.21-8.315,3.185l2.122,2.122C12.129,5.873,14.29,5,16.659,5c5.077,0,9.213,3.987,9.475,9h-2.975l4.5,5l4.5-5H29.133z'%3E%3C/path%3E%3C/svg%3E"

        const rotateImg = document.createElement('img');
        rotateImg.src = rotateIcon;
        
        fabric.Object.prototype.controls.mtr.x = 0;
        fabric.Object.prototype.controls.mtr.y = 0;
        fabric.Object.prototype.controls.mtr.offsetX = 0;
        fabric.Object.prototype.controls.mtr.offsetY = 0;
        fabric.Object.prototype.controls.mtr.render = ((ctx, left, top, styleOverride, fabricObject) => {
            //left + size/2, top + size/2, size/2, 0, 2 * Math.PI, false    
            const angle: any = fabricObject.angle;

            ctx.save();    
            ctx.beginPath();
            ctx.arc(left, top, 13, 0, 2 * Math.PI, false);
            ctx.shadowColor = "#00000055"
            ctx.shadowBlur = 4
            ctx.fillStyle = "#ffffff"
            ctx.fill()
            ctx.lineWidth = 2
            ctx.restore();

            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(angle));
            ctx.drawImage(rotateImg, -20/2, -20/2, 20, 20);
            ctx.restore();
        });
        //top middle scrolling for skewing control
        fabric.Object.prototype.controls.ml = new fabric.Control({
            x: 0.5,
            y: 0,
            offsetY: 0,
            offsetX: 0,
            cursorStyle: 'n-resize',
            actionHandler: skewLeftHandler,
            // render: renderIcon(leftImg),
            actionName: 'skewLeft'
        });
        //middle right scrolling for skewing control
        fabric.Object.prototype.controls.mr = new fabric.Control({
            x: -0.5,
            y: 0,
            offsetY: 0,
            offsetX: 0,
            cursorStyle: 'ns-resize',
            actionHandler: skewRightHandler,
            // render: renderIcon(rightImg),
            actionName: 'skewRight'
        });
        //
        fabric.Object.prototype.controls.mb = new fabric.Control({
            x: 0,
            y: 0.5,
            offsetY: 0,
            offsetX: 0,
            cursorStyle: 'e-resize',
            actionHandler: skewDownHandler,
            // render: renderIcon(downImg),
            actionName: 'skewDown'
        });

        fabric.Object.prototype.controls.mt = new fabric.Control({
            x: 0,
            y: -0.5,
            offsetY: 0,
            offsetX: 0,
            cursorStyle: 'ew-resize',
            actionHandler: skewUpHandler,
            // render: renderIcon(upImg),
            actionName: 'skewUp'
        });
    }

    const skewLeftHandler = (eventData: any, transform: any, x: number, y: number) => {
        const icon_pt = {x: transform?.lastX, y: transform?.lastY};
        const mouse_pt = {x: x, y: y};
        const target = transform.target;
        const canvas = target.canvas;
        if (selectedItem === -1)
            return false;
        target.skewY = target.skewY + (eventData.movementY) / 10;
        canvas.requestRenderAll();
        renderobjects[selectedItem].skewY = target.skewY;
        return false;
	}

    const skewRightHandler = (eventData: any, transform: any, x: number, y: number) => {
        const icon_pt = {x: transform?.lastX, y: transform?.lastY};
        const mouse_pt = {x: x, y: y};
        const target = transform.target;
        const canvas = target.canvas;
        if (selectedItem === -1)
            return false;
        target.skewY = target.skewY + (eventData.movementY) / 10;
        canvas.requestRenderAll();
        renderobjects[selectedItem].skewY = target.skewY;
        return false;
	}

    const skewDownHandler = (eventData: any, transform: any, x: number, y: number) => {
        const icon_pt = {x: transform?.lastX, y: transform?.lastY};
        const mouse_pt = {x: x, y: y};
        const target = transform.target;
        const canvas = target.canvas;
        if (selectedItem === -1)
            return false;
        target.skewX = target.skewX + (eventData.movementX) / 10;
        canvas.requestRenderAll();
        renderobjects[selectedItem].skewX = target.skewX;
        return false;
	}

    const skewUpHandler = (eventData: any, transform: any, x: number, y: number) => {
        const icon_pt = {x: transform?.lastX, y: transform?.lastY};
        const mouse_pt = {x: x, y: y};
        const target = transform.target;
        const canvas = target.canvas;
        if (selectedItem === -1)
            return false;
        target.skewX = target.skewX + (eventData.movementX) / 10;
        canvas.requestRenderAll();
        renderobjects[selectedItem].skewX = target.skewX;
        return false;
	}

    const setActiveObject = () => {
        if ( editor?.canvas?._objects && selectedItem + 1 >= editor?.canvas?._objects?.length )
            return;
        editor?.canvas.setActiveObject(editor?.canvas._objects[ selectedItem + 1 ]);
        editor?.canvas._objects[ selectedItem + 1 ].set({'borderColor':'#fbb802','cornerColor':'#fbb802'});
        editor?.canvas.renderAll();
    }
    //  const deleteObject = (eventData: any, transform: any) => {
    //     const target = transform.target;
	// 	const canvas = target.canvas;
    //     canvas.remove(target);
    //     canvas.requestRenderAll();
    //     return false;
	// }

    // const cloneObject = (eventData: any, transform: any) => {
    //     const target = transform.target;
    //     const canvas = target.canvas;
    //     target.clone((cloned: any) => {
    //         cloned.left += 10;
    //         cloned.top += 10;
    //         canvas.add(cloned);
    //     });
    //     return false;
    // }   
    //Initialize canvas using fabric.js
    useEffect(() => {
        console.log("Initialize canvas");
        InitializeFabric();
        if (editor) {
            editor.canvas.selectionColor = "rgba(0,0,0,0)";
            editor.canvas.fireRightClick = true;
            editor.canvas.stopContextMenu = true;

            editor.canvas.uniScaleKey = "altKey";
            editor.canvas.centeredScaling = true;
        }
        editor?.canvas.on('mouse:down', function(options) {
            // if (options.button === 1)
            //     onMouseDown(options.pointer);
            if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        // editor?.canvas.on('mouse:move', function(options) {
        //     onMouseMove(options.pointer);
        // });
        editor?.canvas.on('mouse:up', function(options) {
            if (options.button === 1)
                onMouseUp(options.pointer);
        });
        editor?.canvas.on('selection:created', function(option) {
            // console.log(option);
            // onObject_Selected(option);
        });
        editor?.canvas.on('object:modified', function(option) {
            onObject_Modified(option);
        });
        render();
    }, [editor?.canvas])

    // const onObject_Selected = (option: any) => {
    //     console.log("HandleElement:", option, option.selected);
    //     // console.log("MouseUp:", point);
    //     const x = Math.floor((option.selected[0].left + option.selected[0].width / 2) / canvas_w);
    //     const y = Math.floor((option.selected[0].top + option.selected[0].height / 2) / canvas_h);
    //     const selected_index = containpointinrenderobjects(x, y);
        
    //     if (selected_index !== -1) {
    //         setSelectedItem(-1);
    //         if ( editor?.canvas?._objects && selected_index + 1 >= editor?.canvas?._objects?.length)
    //             return;
    //         setSelectedItem(selected_index);
    //     }
    //     editor?.canvas.renderAll();
    // };
    useEffect(() => {
        // console.log("callback after render", selectedEffect, renderobjects, selectedItem);        
        if (selectedItem === -1)
            return;
        const renderobject = renderobjects[selectedItem];
        if (selectedEffect.class !== EFFECT) {
            let i=0;
            while(i<renderobject.effect.length) {
                if (renderobject.effect[i].class === selectedEffect.class) {
                    renderobject.effect.splice(i, 1);
                }
                i++;
            }
            renderobjects[selectedItem].effect.push(selectedEffect);
        }
        render();
        setTimeout(setActiveObject, 100);

        editor?.canvas.off('object:modified');
        editor?.canvas.off('selection:created');
        editor?.canvas.off('selection:updated');
        editor?.canvas.off('mouse:up');
        editor?.canvas.off('mouse:down');
        editor?.canvas.on('mouse:down', function(options) {
            // if (options.button === 1)
            //     onMouseDown(options.pointer);
            if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        editor?.canvas.on('object:modified', function(option) {
            onObject_Modified(option);
        });
        editor?.canvas.on('mouse:up', function(options) {
            if (options.button === 1)
                onMouseUp(options.pointer);
        });
        editor?.canvas.on('selection:updated', function(option) {
            // console.log(option);
            // onObject_Selected(option);
        });
    }, [selectedEffect])

    const onClickStatusEffect = (statusEffect: any) => {
        console.log("StatusEffect:", statusEffect);
        if (selectedItem === -1)
            return;
        if (statusEffect === 'flipX')
            renderobjects[selectedItem].flipX = !renderobjects[selectedItem].flipX;
        else if (statusEffect === 'flipY')
            renderobjects[selectedItem].flipY = !renderobjects[selectedItem].flipY;

        render();
        setTimeout(setActiveObject, 100);
    };

    const onChangeCornerSize = (corner_size: number) => {
        if (selectedItem === -1)
            return;
        renderobjects[selectedItem].corner_size = corner_size;

        render();
        setTimeout(setActiveObject, 100);
    }

    useEffect(() => {
        InitializeFabric();

        if (selectedItem === -1) {
            editor?.canvas.discardActiveObject().renderAll();
            return;
        }
        
        render();
        setTimeout(setActiveObject, 100);

        editor?.canvas.off('object:modified');
        editor?.canvas.off('mouse:up');
        editor?.canvas.off('mouse:down');
        editor?.canvas.on('mouse:down', function(options) {
            // if (options.button === 1)
            //     onMouseDown(options.pointer);
            if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        editor?.canvas.on('object:modified', function(option) {
            onObject_Modified(option);
        });
        editor?.canvas.on('mouse:up', function(options) {
            if (options.button === 1)
                onMouseUp(options.pointer);
        });
    }, [selectedItem]);
    //Mouse Down event on canvas
    // const onMouseDown = (point:any) => {
    //     // console.log("MouseDown:", point);
    // }
    //Mouse Right Click event on canvas
    const onRightMouseDown = (point:any) => {
        if (selectedItem === -1)
            return;
        setSelectedItem(-1);
        editor?.canvas.discardActiveObject().requestRenderAll();
    }
    //Mouse Move event on canvas
    // const onMouseMove = (point:any) => {
    //     // console.log("MouseMove:", point);
    // }
    //Mouse Up event on canvas
    const onMouseUp = (point:any) => {
        // console.log("MouseUp:", point);
        const x = Math.floor(point.x / canvas_w);
        const y = Math.floor(point.y / canvas_h);
        const selected_index = containpointinrenderobjects(x, y);
        // console.log(selected_index);

        if (selected_index === -1) {
            setSelectedItem(-1);
            return;
        }
        if ( editor?.canvas?._objects && selected_index + 1 >= editor?.canvas?._objects?.length)
            return;
        setSelectedItem(selected_index);
    }

    const onObject_Modified = (option:any) => {
        console.log("Object modified:", option, option?.target.angle, option?.target.scaleX, option?.target.scaleY, selectedItem);
        if (selectedItem === -1 || renderobjects[selectedItem].type === SHAPE_FLOWLINE)
            return;

        const skewX = option.target.skewX;
        const skewY = option.target.skewY;
        const width = ((renderobjects[selectedItem].en.x - renderobjects[selectedItem].st.x + 1) * canvas_w * (1 + Math.sin(skewX * 3.14 / 180)));
        const height = ((renderobjects[selectedItem].en.y - renderobjects[selectedItem].st.y + 1) * canvas_h * (1 + Math.sin(skewY * 3.14 / 180)));
        const angle = option?.target.angle + (Math.atan2(height, width) / 3.14 * 180);
        const length = Math.sqrt((width * width) + (height*height));
        const scale_LX = Math.abs(length*Math.cos(angle * 3.14 / 180));
        const scale_LY = Math.abs(length*Math.sin(angle * 3.14 / 180));
        const scale_length = Math.max(scale_LX, scale_LY);
        console.log("scaled Size:", width, height, angle, length, scale_LX, scale_LY);

        renderobjects[selectedItem].angle = option?.target.angle;
        const currentlength_X = (scale_length * option?.target.scaleX * renderobjects[selectedItem].scaleX);
        const currentlength_Y = (scale_length * option?.target.scaleY * renderobjects[selectedItem].scaleY);
        const max_X = (renderobjects[selectedItem].en.x - renderobjects[selectedItem].st.x + 1) * canvas_w;
        const max_Y = (renderobjects[selectedItem].en.y - renderobjects[selectedItem].st.y + 1) * canvas_h;
        const scaleX = max_X / currentlength_X;
        const scaleY = max_Y / currentlength_Y;
        console.log("scale:", scaleX, scaleY, currentlength_X, currentlength_Y);
        if ( (currentlength_X <= max_X && currentlength_Y <= max_Y) ) {
            renderobjects[selectedItem].scaleX *= option?.target.scaleX;
            renderobjects[selectedItem].scaleY *= option?.target.scaleY;
        }
        else {
            renderobjects[selectedItem].scaleX *= option?.target.scaleX * scaleX;
            renderobjects[selectedItem].scaleY *= option?.target.scaleY * scaleY;
        }
        // console.log("Object modified:", renderobjects[selectedItem].effect.angle, renderobjects[selectedItem].effect.scaleX, renderobjects[selectedItem].effect.scaleY);
        render();

        setTimeout(setActiveObject, 100);
    }
    //Select shadow dialog
    const onChangeShadow = (visibility: boolean, color: any, size: number, padding: number, angle: number) => {
        if (selectedItem === -1)
            return;
        renderobjects[selectedItem].shadow.visibility = visibility;
        renderobjects[selectedItem].shadow.color = color;
        renderobjects[selectedItem].shadow.size = size;
        renderobjects[selectedItem].shadow.angle = angle;
        renderobjects[selectedItem].shadow.padding = padding;

        render();
        setTimeout(setActiveObject, 100);

        editor?.canvas.off('object:modified');
        editor?.canvas.off('selection:created');
        editor?.canvas.off('selection:updated');
        editor?.canvas.off('mouse:up');
        editor?.canvas.off('mouse:down');
        editor?.canvas.on('mouse:down', function(options) {
            // if (options.button === 1)
            //     onMouseDown(options.pointer);
            if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        editor?.canvas.on('object:modified', function(option) {
            onObject_Modified(option);
        });
        editor?.canvas.on('mouse:up', function(options) {
            if (options.button === 1)
                onMouseUp(options.pointer);
        });
        editor?.canvas.on('selection:updated', function(option) {
            console.log(option);
            // onObject_Selected(option);
        });
    }
    // Handle Click Next Btn Step1 component
    const handleClickNextStep = () => {
        props?.setPatternStep(STEP_THREE);
    }
    // Handle Click Previous Btn Step1 component
    const handleClickPrevStep = () => {
        props?.setPatternStep(STEP_ONE);
    }
    //Check if selected by point for fabric.js
    const containpointinrenderobjects = (x:number, y:number) => {
        let flag = -1;
        for (let i=0;i<renderobjects.length;i++) {
            if (renderobjects[i].type === SHAPE_FLOWLINE) {
                for (let j=0;j<renderobjects[i].points.length;j++) {
                    if (renderobjects[i].points[j].x === x && renderobjects[i].points[j].y === y) {
                        flag=i;
                        break;
                    }
                }
            }
            else if (renderobjects[i].type === SHAPE_SHAPE || renderobjects[i].type === SHAPE_ICON || renderobjects[i].type === SHAPE_IMAGE) {
                if (renderobjects[i].st.x <= x && renderobjects[i].st.y <= y && renderobjects[i].en.x >= x && renderobjects[i].en.y >= y) {
                    flag=i;
                    break;
                }
            }
        }
        return flag;
    }

    return (
        <> {/* Parent Container */}
            <div className="n-container">
                <div className="flex justify-between py-3">
                    <p className="font-semibold text-2xl">Add Colours,Effects To Pattern</p>
                </div>
                <div className="sm:flex justify-between gap-6">
                    {/* Container 1st */}
                    <div className="sm:w-full overflow-hidden">
                        <div className="sm:w-full overflow-hidden shadow-lg bg-white rounded-lg px-6 mb-5">
                            <div className="max-w-initial rounded overflow-hidden shadow-lg p-2 mb-5 mt-2">
                                <div className={
                                    styles.center
                                }>
                                    <FabricJSCanvas className="sample-canvas" onReady={onReady} />
                                </div>
                            </div>
                        </div>
                        {/* Step3 Btn Component */}
                        <div className={styles.center}>
                            <div className="my-1 w-80 grid grid-cols-2 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center"
                                    onClick={handleClickPrevStep}>
                                    Previous
                                </button>
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center"
                                    onClick={handleClickNextStep}>
                                    Next
                                </button>
                            </div>
                            <div className="my-1 w-80 grid grid-cols-2 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center">
                                    Save
                                </button>
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center">
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Container 2nd */}
                    <div className="sm:w-full overflow-hidden shadow-lg bg-white rounded-lg px-6 mb-5"
                        style={{height: 'fit-content'}}
                    >
                        {/* Step3 Component */}
                        {/* Effects */}
                        <div className="max-w-initial rounded overflow-hidden shadow-lg p-2">
                            <div className="font-bold text-sm mb-2 text-left">Effects</div>
                            <div className="flex justify-around row">
                                {
                                    effects.map((effect: any, index: number) => (
                                        <>
                                            <SelectEffects 
                                                key={effect._id} 
                                                effect={effect}
                                                setSelectedEffectTools={setSelectedEffectTools}
                                                selectedEffectTools={selectedEffectTools}
                                            />
                                        </>
                                    ))
                                } 
                            </div>
                            {
                                SelectedEffectToolsComponent()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawingStepTwo;
