import {useState, useEffect, useCallback} from "react";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import styles from "../../styles/CreatePattern.module.css";

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { canvas_w, canvas_w_count, canvas_h, canvas_h_count, STEP_ONE, STEP_TWO, STEP_THREE } from "../../mock/common_variable";
import { default_steptwo, LINE, BODY, BACKGROUND, OUTLINE, OUTLINE_STYLE, EFFECT, lines, border_styles, line_colors, shape_colors, background_colors, shape_effects, CORNER_STYLE, corner_styles, status_effects, STATUS, SHADOW } from "../../mock/drawing_tools_steptwo";
import { drawing_tools, default_stepone, default_stepthree, flowLines, SHAPE_FLOWLINE, SHAPE_SHAPE, SHAPE_ICON, SHAPE_IMAGE } from "../../mock/drawing_tools_stepthree";

import { fabric } from 'fabric';

const Preview = (props: any) => {
    const [ value, copy ] = useCopyToClipboard();
    const { editor, onReady } = useFabricJSEditor()
    const [ background, setBackground ] = useState (props?.background);

    const canvas_groups:any[] = [];

    const render = () => {
        console.log("background:", background);
        editor?.canvas.clear();

        initializeCanvas();
        initializeBackground();
        setTimeout(initializeRenderobjects, 100);
    };

    const initializeBackground = async () => {
        const scaleX = 1;
        const scaleY = 1;
        const canvas_count = 3;
        const group = new fabric.Group([], {
            left: 0,
            top: 0,
            selectable: false, 
            hoverCursor: "normal"
        });
        if (background?.type === "plainColour") {
            group.addWithUpdate(new fabric.Rect({
                top: 0,
                left: 0,
                width:canvas_w * canvas_w_count, 
                height:canvas_h * canvas_h_count, 
                stroke:'black', 
                fill: background?.color,
                selectable: false, 
                hoverCursor: "normal"
            }));
            editor?.canvas.add(group);
        }
        else if (background?.type === "roofStyle") {
            const myImg:any = await fabricImageFromURL(background?.image);
            myImg.set({ 
                top: 0,
                left: 0,
                scaleX: canvas_w * canvas_w_count / myImg.width * scaleX, 
                scaleY: canvas_h * canvas_h_count / myImg.height * scaleY, 
                selectable: false, 
                hoverCursor: "normal"
            });
            group.addWithUpdate(myImg);
            editor?.canvas.add(group);
        }
        else if (background?.type === "cellStyle") {
            const myImg:any = await fabricImageFromURL(background?.image);
            myImg.set({ 
                top: 0,
                left: 0,
                scaleX: canvas_w * canvas_w_count / myImg.width * scaleX, 
                scaleY: canvas_h * canvas_h_count / myImg.height * scaleY, 
                selectable: false, 
                hoverCursor: "normal"
            });
            group.addWithUpdate(myImg);
            editor?.canvas.add(group);
        }
        else if (background.type === "abstract") {
            drawBackgroundRenderobjects();
        }
    }
    //Draw objects by background.renderobjects
    const drawBackgroundRenderobjects = async() => {
        for (let i=0;i<background.renderobjects.length;i++) {
            const objects = background.renderobjects[i];
            const effect = objects.effect;
            let j=0;
            let strokeWidth = 3;
            let line_color = "black";
            let body_color = "gray";
            let background_color = "#80808024";
            let border_style = 0;
            let corner_type = "circle";
            const angle = objects.angle;
            const scaleX = objects.scaleX;
            const scaleY = objects.scaleY;
            const skewX = objects.skewX;
            const skewY = objects.skewY;
            const flipX = objects.flipX;
            const flipY = objects.flipY;
            const shadow_style = objects.shadow;
            const time = 3;
            while(j<effect.length) {
                if (effect[j].class === OUTLINE) {
                    strokeWidth = effect[j].strokeWidth * 3;
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
                blur: (shadow_style.visibility?shadow_style.size*time:0), offsetX: (shadow_style.visibility?shadow_style.padding*time:0) * Math.cos(shadow_style.angle * 3.14 / 180), offsetY: (shadow_style.visibility?shadow_style.padding*time:0) * Math.sin(shadow_style.angle * 3.14 / 180), color: shadow_style.color
            });
            if (objects.type === SHAPE_SHAPE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal"
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
                
                const path = objects.style.path;
                let j=0;
                let str_line = "";
                
                const st = { x:objects.st.x, y: objects.st.y };
                const en = { x:objects.en.x, y: objects.en.y };
                st.x -= canvas_w * 3;
                st.y -= canvas_h * 3;
                en.x -= canvas_w * 3;
                en.y -= canvas_h * 3;
                st.x *= 3;
                st.y *= 3;
                en.x *= 3;
                en.y *= 3;
                while (j<path.length) {
                    if (path[j][0] === 'M' || path[j][0] === 'L') {
                        let ptx: number = +path[j][1], pty: number = +path[j][2];
                        ptx = (ptx * (en.x - st.x + 1) / objects.style.width);
                        pty = (pty * (en.y - st.y + 1) / objects.style.height);
                        ptx = +ptx.toFixed();
                        pty = +pty.toFixed();
                        str_line += path[j][0] + ' ' + ptx + ' ' + pty + ' ';
                    }
                    else if (path[j][0] === 'C') {
                        let pt1: number = +path[j][1], pt2: number = +path[j][2], pt3: number = +path[j][3], 
                            pt4: number = +path[j][4], pt5: number = +path[j][5], pt6: number = +path[j][6];
                        pt1 = (pt1 * (en.x - st.x + 1) / objects.style.width);
                        pt2 = (pt2 * (en.y - st.y + 1) / objects.style.height);
                        pt3 = (pt3 * (en.x - st.x + 1) / objects.style.width);
                        pt4 = (pt4 * (en.y - st.y + 1) / objects.style.height);
                        pt5 = (pt5 * (en.x - st.x + 1) / objects.style.width);
                        pt6 = (pt6 * (en.y - st.y + 1) / objects.style.height);
                        pt1 = +pt1.toFixed();
                        pt2 = +pt2.toFixed();
                        pt3 = +pt3.toFixed();
                        pt4 = +pt4.toFixed();
                        pt5 = +pt5.toFixed();
                        pt6 = +pt6.toFixed();
                        str_line += path[j][0] + ' ' + pt1 + ' ' + pt2 + ' ' + pt3 + ' ' + pt4 + ' ' + pt5 + ' ' + pt6 + ' ';}
                    else if (path[j][0] === 'Z') {
                        str_line += path[j][0] + ' ';
                    }
                    j++;
                }
                group.addWithUpdate(new fabric.Path(str_line, {
                    left: st.x,
                    top: st.y,
                    stroke: line_color,
                    fill: body_color,
                    strokeWidth: strokeWidth,
                    strokeDashArray: [strokeWidth, strokeWidth * border_style],
                    originX: 'left',
                    originY: 'top',
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                group.rotate(angle);
                group.skewX = skewX;
                group.skewY = skewY;
                group.flipX = flipX;
                group.flipY = flipY;
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
                    hoverCursor: "normal"
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
                const st = { x:objects.st.x, y: objects.st.y };
                const en = { x:objects.en.x, y: objects.en.y };
                st.x -= canvas_w * 3;
                st.y -= canvas_h * 3;
                en.x -= canvas_w * 3;
                en.y -= canvas_h * 3;
                st.x *= 3;
                st.y *= 3;
                en.x *= 3;
                en.y *= 3;

                //i create an extra var for to change some image properties
                myImg.set({ 
                    left: st.x + ((en.x - st.x + 1) -  (en.x - st.x + 1) * scaleX) / 2, 
                    top: st.y + ((en.y - st.y + 1) - (en.y - st.y + 1) * scaleY) / 2, 
                    scaleX: (en.x - st.x + 1) / myImg.width * scaleX, 
                    scaleY: (en.y - st.y + 1) / myImg.height * scaleY, 
                    selectable: false, 
                    hoverCursor: "normal"
                });
                group.addWithUpdate(myImg);
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
                    hoverCursor: "normal"
                });
                group.lockMovementX = true;
                group.lockMovementY = true;
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
                const st = { x:objects.st.x, y: objects.st.y };
                const en = { x:objects.en.x, y: objects.en.y };
                st.x -= canvas_w * 3;
                st.y -= canvas_h * 3;
                en.x -= canvas_w * 3;
                en.y -= canvas_h * 3;
                st.x *= 3;
                st.y *= 3;
                en.x *= 3;
                en.y *= 3;
                
                //i create an extra var for to change some image properties
                myImg.set({ 
                    left: st.x + ((en.x - st.x + 1) - (en.x - st.x + 1) * scaleX) / 2, 
                    top: st.y + ((en.y - st.y + 1) - (en.y - st.y + 1) * scaleY) / 2, 
                    scaleX: (en.x - st.x + 1) / myImg.width * scaleX, 
                    scaleY: (en.y - st.y + 1) / myImg.height * scaleY, 
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
        }
    }

    const initializeRenderobjects = async () => {
        let i = 0;
        canvas_groups.splice(0, canvas_groups.length);
        while(i<props?.renderobjects.length) {
            const objects = props?.renderobjects[i];
            const effect = props?.renderobjects[i].effect;
            let j=0;
            let strokeWidth = 1;
            let line_color = "black";
            let body_color = "gray";
            let background_color = "#80808024";
            let border_style = 0;
            
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
            const time = 1;
            while(j<effect.length) {
                if (effect[j].class === OUTLINE) {
                    strokeWidth = effect[j].strokeWidth * time;
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
            console.log("strokeWidth:", strokeWidth);
            const shadow = new fabric.Shadow({
                blur: (shadow_style.visibility?shadow_style.size*time:0), offsetX: (shadow_style.visibility?shadow_style.padding*time:0) * Math.cos(shadow_style.angle * 3.14 / 180), offsetY: (shadow_style.visibility?shadow_style.padding*time:0) * Math.sin(shadow_style.angle * 3.14 / 180), color: shadow_style.color
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
                    pt_str += "M " + (400) + " " + (410) + " ";
                    pt_str += "L " + (400) + " " + (410) + " z";
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
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
                group.lockScalingX = true;
                group.lockScalingY = true;
                group.lockUniScaling = true;

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
    // Handle Click Next Btn Step1 component
    const handleClickNextStep = () => {
        return false;
    }
    // Handle Click Previous Btn Step1 component
    const handleClickPrevStep = () => {
        props?.setShowPreview(false);
    } 

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
        editor?.canvas.add(group);
    }
    //Current Multi-Lines
    const currentlines = new fabric.Group([], {
        left: 0,
        top: 0,
        selectable: false, 
        hoverCursor: "normal"
    });

    const containpointinrenderobjects = (x:number, y:number) => {
        let flag = -1;
        for (let i=background.renderobjects.length-1;i>=0;i--) {
            if (background.renderobjects[i].type === SHAPE_SHAPE || background.renderobjects[i].type === SHAPE_ICON || background.renderobjects[i].type === SHAPE_IMAGE) {
                if (background.renderobjects[i].st.x <= x && background.renderobjects[i].st.y <= y && background.renderobjects[i].en.x >= x && background.renderobjects[i].en.y >= y) {
                    flag=i;
                    break;
                }
            }
        }
        return flag;
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
    //Initialize canvas using fabric.js
    useEffect(() => {
        console.log("Initialize canvas");
        if (editor) {
            editor.canvas.selectionColor = "rgba(0,0,0,0)";
            editor.canvas.fireRightClick = true;
            editor.canvas.fireMiddleClick = true;
            editor.canvas.stopContextMenu = true;
        }

        console.log("Initialize canvas");
        render();
    }, [editor?.canvas])

    const onSubmit = () => {
        setTimeout(onDownload, 100);
    }

    const onDownload = () => {
        const str: any = editor?.canvas.toSVG({
            viewBox:{
                x: 0, 
                y: 0, 
                width: canvas_w * 9, 
                height:canvas_w * 9, 
            }
        });
        const svgUrl = 'data:image/svg+xml;utf8,'+encodeURIComponent(str);
        // const dataURL = editor?.canvas.toDataURL({
        //     width: canvas_w * 9, 
        //     height:canvas_w * 9, 
        //     left: 0,
        //     top: 0,
        //     format: 'png', 
        // });
        // const svgUrl = dataURL;
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "newesttree.svg";
        downloadLink.click();
    }

    return (
        <> {/* Parent Container */}
            <div className="n-container">
                <div className="flex justify-between py-3">
                    <p className="font-semibold text-2xl">Create Background</p>
                </div>
                <div className="sm:flex justify-between gap-6">
                    {/* Container 1st */}
                    <div className="sm:w-full overflow-hidden">
                        <div className="sm:w-full overflow-hidden shadow-lg bg-white rounded-lg px-6 mb-5">
                            <div className="max-w-initial rounded overflow-hidden shadow-lg p-2 mb-5 mt-2">
                                <div className={ styles.center }>
                                    <FabricJSCanvas className="sample-canvas" onReady={onReady} />
                                </div>
                            </div>
                        </div>
                        <div className={ styles.center }>
                            <div className="my-1 w-80 grid grid-cols-2 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center"
                                    onClick={handleClickPrevStep}>
                                    Previous
                                </button>
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center cursor-not-allowed"
                                    onClick={handleClickNextStep} disabled>
                                    Next
                                </button>
                            </div>
                            <div className="my-1 w-80 grid grid-cols-2 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center">
                                    Save
                                </button>
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center"
                                    onClick={onSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preview;
