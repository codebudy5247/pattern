import {useState, useRef, useEffect} from "react";
import {drawing_tools} from "../../mock/drawing_tools_stepone";
import DrawingTools from "../../components/section/DrawingToolsCard";
import SavedPattern from "../../components/section/SavedPattern";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import styles from "../../styles/CreatePattern.module.css";
import ShapesSelecter from "../../components/section/ShapesSelecter";
import IconSelecter from "../../components/section/IconSelecter";
import FlowLinesSelector from "../../components/section/FlowLinesSelector";
import SelectOtherPattern from "../../components/section/SelectOtherPattern";

import { rectanglesIntersect} from "../../mock/common_function";
import { canvas_w, canvas_w_count, canvas_h, canvas_h_count, STEP_ONE, STEP_TWO, STEP_THREE } from "../../mock/common_variable";

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric';

import { default_stepone, flowLines, SHAPE_FLOWLINE, SHAPE_SHAPE, SHAPE_ICON, SHAPE_IMAGE } from "../../mock/drawing_tools_stepone";
import { background_colors, border_styles, corner_styles, lines, line_colors, shape_colors } from "../../mock/drawing_tools_steptwo";
const DrawingStepOne = (props: any) => {
    //mouseEvent
    let mousedrag = false;
    // Drawing Tools
    const [showDrawingToolsMenu, setShowDrawingToolsMenu] = useState(true);
    const [selectedDrawingTools, setSelectedDrawingTools] = useState(SHAPE_FLOWLINE);
    //Selected Tools state
    const [selectedShape, setSelectedShape] = useState(default_stepone);
    //Render objects
    const arrayobject:any[] = [];
    const [renderobjects, setRenderObjects] = useState <any[]> (props?.renderobjects);

    const { editor, onReady } = useFabricJSEditor()

    const SelectedDrawingToolsComponent = () => {
        if (selectedDrawingTools === SHAPE_FLOWLINE) {
            return (
                <FlowLinesSelector setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                    setSelectedDrawingTools={setSelectedDrawingTools}
                    setSelectedShape={setSelectedShape}
                    key={SHAPE_FLOWLINE}
                />
            );
        }
        if (selectedDrawingTools === SHAPE_SHAPE) {
            return (
                <ShapesSelecter setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                    setSelectedDrawingTools={setSelectedDrawingTools}
                    setSelectedShape={setSelectedShape}
                    key={SHAPE_SHAPE}
                />
            );
        }
        if (selectedDrawingTools === SHAPE_ICON) {
            return (
                <IconSelecter setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                    setSelectedDrawingTools={setSelectedDrawingTools}
                    setSelectedShape={setSelectedShape}
                    key={SHAPE_ICON}
                />
            );
        }
        if (selectedDrawingTools === SHAPE_IMAGE) {
            return (
                <SelectOtherPattern setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                    setSelectedDrawingTools={setSelectedDrawingTools}
                    setSelectedShape={setSelectedShape}
                    key={SHAPE_IMAGE}
                />
            );
        }
    };

    const initializeCanvas = () => {
        editor?.canvas.setWidth(canvas_w * canvas_w_count);
        editor?.canvas.setHeight(canvas_h * canvas_h_count);
        editor?.canvas.add(new fabric.Rect({
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
            editor?.canvas.add(new fabric.Line([0, 0, 0, canvas_h * canvas_h_count], {
                left: i * canvas_w,
                top: 0,
                selectable: false, 
                stroke: '#d2d2d2', 
                hoverCursor: "normal"
            }));
            editor?.canvas.add(new fabric.Line([0, 0, canvas_w * canvas_w_count, 0], {
                left: 0,
                top: i * canvas_h,
                selectable: false, 
                stroke: '#d2d2d2',
                hoverCursor: "normal"
            }));
        }
    }
    //Initialize canvas using fabric.js
    useEffect(() => {
        console.log("Initialize canvas");
        initializeCanvas();
        if (editor) {
            editor.canvas.selectionColor = "rgba(0,0,0,0)";
            editor.canvas.fireRightClick = true;
            editor.canvas.stopContextMenu = true;
        }
        editor?.canvas.on('mouse:down', function(options) {
            if (options.button === 1)
                onMouseDown(options.pointer);
            else if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        editor?.canvas.on('mouse:move', function(options) {
            onMouseMove(options.pointer);
        });
        editor?.canvas.on('mouse:up', function(options) {
            onMouseUp(options.pointer);
        });
    }, [editor?.canvas])

    useEffect(() => {
        console.log("callback after render", selectedShape, renderobjects);
        editor?.canvas.off('mouse:down');
        editor?.canvas.off('mouse:move');
        editor?.canvas.off('mouse:up');

        editor?.canvas.on('mouse:down', function(options) {
            if (options.button === 1)
                onMouseDown(options.pointer);
            else if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        editor?.canvas.on('mouse:move', function(options) {
            onMouseMove(options.pointer);
        });
        editor?.canvas.on('mouse:up', function(options) {
            onMouseUp(options.pointer);
        });
        render();
    }, [selectedShape]);
    const canvas_groups:any[] = [];
    const render = () => {
        console.log("Render:", renderobjects);
        let i=0;
        editor?.canvas.clear();
        canvas_groups.splice(0, canvas_groups.length);
        initializeCanvas();
        while(i<renderobjects.length) {
            const objects = renderobjects[i];
            if (objects.type === SHAPE_FLOWLINE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal"
                });
                if (objects.points.length !== 1) {
                    let pt_str = "";
                    let left = objects.points[0].x * canvas_w + canvas_w / 2 - 5 / 2;
                    let top = objects.points[0].y * canvas_h + canvas_h / 2 - 5 / 2;
                    for (let j=0;j<objects.points.length-1;j++) {
                        // Background
                        group.addWithUpdate(new fabric.Rect({
                            top: objects.points[j].y * canvas_h,
                            left: objects.points[j].x * canvas_w,
                            width:canvas_w * 1, 
                            height:canvas_h * 1, 
                            fill:'rgba(60, 60, 60, 0.1)',
                            selectable: false, 
                            hoverCursor: "normal"
                        }));
                        // str for draw lines
                        pt_str += "M " + (objects.points[j].x * canvas_w + canvas_w / 2 - 5 / 2) + " " + (objects.points[j].y * canvas_h + canvas_h / 2 - 5 / 2) + " ";
                        pt_str += "L " + (objects.points[j+1].x * canvas_w + canvas_w / 2 - 5 / 2) + " " + (objects.points[j+1].y * canvas_h + canvas_h / 2 - 5 / 2) + " ";
                        // calc top and left point
                        if (left > objects.points[j].x * canvas_w + canvas_w / 2 - 5 / 2)
                            left = objects.points[j].x * canvas_w + canvas_w / 2 - 5 / 2;
                        else if (top > objects.points[j].y * canvas_h + canvas_h / 2 - 5 / 2)
                            top = objects.points[j].y * canvas_h + canvas_h / 2 - 5 / 2;
                        // group.addWithUpdate(new fabric.Line([
                        //         objects.points[j].x * canvas_w + canvas_w / 2 - 5 / 2, 
                        //         objects.points[j].y * canvas_h + canvas_h / 2 - 5 / 2, 
                        //         objects.points[j+1].x * canvas_w + canvas_w / 2 - 5 / 2, 
                        //         objects.points[j+1].y * canvas_h + canvas_h / 2 - 5 / 2, 
                        //     ], {
                        //     stroke: 'black',
                        //     selectable: false, 
                        //     hoverCursor: "normal",
                        //     strokeWidth: 5
                        // }));
                        // draw connection rect.
                        group.addWithUpdate(new fabric.Rect({
                            left: objects.points[j].x * canvas_w + canvas_w / 2 - 4 / 2,
                            top: objects.points[j].y * canvas_h + canvas_h / 2 - 4 / 2,
                            width: 4 * 1, 
                            height: 4 * 1, 
                            fill: 'black',
                            stroke: 'gray', 
                            strokeWidth: 0,
                            selectable: false, 
                            hoverCursor: "normal",
                        }));
                    }
                    // str for draw line
                    pt_str += "z";
                    if (left > objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - 5 / 2)
                        left = objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - 5 / 2;
                    else if (top > objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - 5 / 2)
                        top = objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - 5 / 2;
                    // draw path
                    group.addWithUpdate(new fabric.Path(pt_str, {
                        left: left,
                        top: top,
                        stroke: 'black',
                        fill: 'gray',
                        strokeWidth: 5,
                        originX: 'left',
                        originY: 'top',
                        angle: 0, 
                        selectable: false, 
                        hoverCursor: "normal",
                    }));
                    group.addWithUpdate(new fabric.Ellipse({
                        left: objects.points[objects.points.length-1].x * canvas_w + canvas_w / 2 - 10, 
                        top: objects.points[objects.points.length-1].y * canvas_h + canvas_h / 2 - 10, 
                        rx: 10,
                        ry: 10,
                        angle: 0,
                        fill: 'gray',
                        stroke: 'black',
                        strokeWidth: 0,
                        selectable: false, 
                        hoverCursor: "normal"
                    }));
                }
                //draw last background.
                group.addWithUpdate(new fabric.Rect({
                    top: objects.points[objects.points.length-1].y * canvas_h, 
                    left: objects.points[objects.points.length-1].x * canvas_w, 
                    width:canvas_w * 1, 
                    height:canvas_h * 1, 
                    fill:'rgba(60, 60, 60, 0.1)',
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                //draw corner point
                group.addWithUpdate(new fabric.Ellipse({
                    left: objects.points[0].x * canvas_w + canvas_w / 2 - 10, 
                    top: objects.points[0].y * canvas_h + canvas_h / 2 - 10, 
                    rx: 10,
                    ry: 10,
                    angle: 0,
                    fill: 'gray',
                    stroke: 'black',
                    strokeWidth: 0,
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            else if (objects.type === SHAPE_SHAPE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal"
                });
                
                const path = objects.style.path;
                let j=0;
                let str_line = "";
                const st = objects.st;
                const en = objects.en;
                while (j<path.length) {
                    if (path[j][0] === 'M' || path[j][0] === 'L') {
                        let ptx: number = +path[j][1], pty: number = +path[j][2];
                        ptx = (ptx * canvas_w * (en.x - st.x + 1) / objects.style.width);
                        pty = (pty * canvas_h * (en.y - st.y + 1) / objects.style.height);
                        ptx = +ptx.toFixed();
                        pty = +pty.toFixed();
                        str_line += path[j][0] + ' ' + ptx + ' ' + pty + ' ';
                    }
                    else if (path[j][0] === 'C') {
                        let pt1: number = +path[j][1], pt2: number = +path[j][2], pt3: number = +path[j][3], 
                            pt4: number = +path[j][4], pt5: number = +path[j][5], pt6: number = +path[j][6];
                        pt1 = (pt1 * canvas_w * (en.x - st.x + 1) / objects.style.width);
                        pt2 = (pt2 * canvas_h * (en.y - st.y + 1) / objects.style.height);
                        pt3 = (pt3 * canvas_w * (en.x - st.x + 1) / objects.style.width);
                        pt4 = (pt4 * canvas_h * (en.y - st.y + 1) / objects.style.height);
                        pt5 = (pt5 * canvas_w * (en.x - st.x + 1) / objects.style.width);
                        pt6 = (pt6 * canvas_h * (en.y - st.y + 1) / objects.style.height);
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
                group.addWithUpdate(new fabric.Rect({
                    top: st.y * canvas_h,
                    left: st.x * canvas_w,
                    width:canvas_w * (en.x - st.x + 1), 
                    height:canvas_h * (en.y - st.y + 1), 
                    fill:'rgba(60, 60, 60, 0.1)',
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                group.addWithUpdate(new fabric.Path(str_line, {
                    left: st.x * canvas_w,
                    top: st.y * canvas_h,
                    stroke: 'black',
                    fill: 'gray',
                    strokeWidth: 1,
                    originX: 'left',
                    originY: 'top',
                    selectable: false, 
                    hoverCursor: "normal"
                }));
                canvas_groups.push(group);
                editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
            }
            else if (objects.type === SHAPE_ICON) {
                fabric.Image.fromURL(objects.style.preview, (myImg:any) => {
                    const group = new fabric.Group([], {
                        left: 0,
                        top: 0,
                        selectable: false, 
                        hoverCursor: "normal"
                    });

                    //i create an extra var for to change some image properties
                    myImg.set({ 
                        left: objects.st.x * canvas_w, 
                        top: objects.st.y * canvas_h, 
                        scaleX: canvas_w * (objects.en.x - objects.st.x + 1) / myImg.width, 
                        scaleY: canvas_h * (objects.en.y - objects.st.y + 1) / myImg.height, 
                        selectable: false, 
                        hoverCursor: "normal"
                    });
                    group.addWithUpdate(new fabric.Rect({
                        top: objects.st.y * canvas_h,
                        left: objects.st.x * canvas_w,
                        width:canvas_w * (objects.en.x - objects.st.x + 1), 
                        height:canvas_h * (objects.en.y - objects.st.y + 1), 
                        fill:'rgba(60, 60, 60, 0.1)',
                        selectable: false, 
                        hoverCursor: "normal"
                    }));
                    group.addWithUpdate(myImg);
                    canvas_groups.push(group); 
                    editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
                });
            }
            else if (objects.type === SHAPE_IMAGE) {
                fabric.Image.fromURL(objects.style.preview, (myImg:any) => {
                    const group = new fabric.Group([], {
                        left: 0,
                        top: 0,
                        selectable: false, 
                        hoverCursor: "normal"
                    });

                    //i create an extra var for to change some image properties
                    myImg.set({ 
                        left: objects.st.x * canvas_w, 
                        top: objects.st.y * canvas_h, 
                        scaleX: canvas_w * (objects.en.x - objects.st.x + 1) / myImg.width, 
                        scaleY: canvas_h * (objects.en.y - objects.st.y + 1) / myImg.height, 
                        selectable: false, 
                        hoverCursor: "normal"
                    });
                    group.addWithUpdate(new fabric.Rect({
                        top: objects.st.y * canvas_h,
                        left: objects.st.x * canvas_w,
                        width:canvas_w * (objects.en.x - objects.st.x + 1), 
                        height:canvas_h * (objects.en.y - objects.st.y + 1), 
                        fill:'rgba(60, 60, 60, 0.1)',
                        selectable: false, 
                        hoverCursor: "normal"
                    }));
                    group.addWithUpdate(myImg);
                    canvas_groups.push(group); 
                    editor?.canvas.add(canvas_groups[canvas_groups.length-1]);
                });
            }
            i++;
        }
    }
    //Current Multi-Lines
    const currentlines = new fabric.Group([], {
        left: 0,
        top: 0,
        selectable: false, 
        hoverCursor: "normal"
    });
    //Draw current line
    const drawCurrentLine = (points:any) => {
        currentlines._objects.splice(0, currentlines._objects.length);
        if (points.length <= 0)
            return;
        for (let i=0;i<points.length-1;i++) {
            currentlines.addWithUpdate(new fabric.Line([
                    points[i].x * canvas_w + canvas_w / 2 - 5 / 2, 
                    points[i].y * canvas_h + canvas_h / 2 - 5 / 2, 
                    points[i+1].x * canvas_w + canvas_w / 2 - 5 / 2, 
                    points[i+1].y * canvas_h + canvas_h / 2 - 5 / 2, 
                ], {
                selectable: false, 
                stroke: 'black',
                strokeWidth: 5,
                hoverCursor: "normal"
            }));
            currentlines.addWithUpdate(new fabric.Rect({
                left: points[i].x * canvas_w + canvas_w / 2 - 5 / 2,
                top: points[i].y * canvas_h + canvas_h / 2 - 5 / 2,
                width: 5 * 1, 
                height: 5 * 1, 
                fill: 'black',
                stroke: 'gray', 
                strokeWidth: 0,
                selectable: false, 
                hoverCursor: "normal",
            }));
        }
        currentlines.addWithUpdate(new fabric.Ellipse({
            left: points[0].x * canvas_w + canvas_w / 2 - 10,
            top: points[0].y * canvas_h + canvas_h / 2 - 10,
            rx: 10,
            ry: 10,
            angle: 0,
            fill: 'gray',
            stroke:'black',
            strokeWidth:0,
        }));
        currentlines.addWithUpdate(new fabric.Ellipse({
            left: points[points.length-1].x * canvas_w + canvas_w / 2 - 10,
            top: points[points.length-1].y * canvas_h + canvas_h / 2 - 10,
            rx: 10,
            ry: 10,
            angle: 0,
            fill: 'gray',
            stroke:'black',
            strokeWidth:0,
        }));
        editor?.canvas.add(currentlines);
    }
    //Draw current shape
    const drawCurrentShape = (st:any, en:any) => {
        currentlines._objects.splice(0, currentlines._objects.length);

        if (selectedDrawingTools === SHAPE_SHAPE) {
            const path = selectedShape.path;
            let i=0;
            let str_line = "";
            while (i<path.length) {
                if (path[i][0] === 'M' || path[i][0] === 'L') {
                    let ptx: number = +path[i][1], pty: number = +path[i][2];
                    ptx = (ptx * canvas_w * (en.x - st.x + 1) / selectedShape.width);
                    pty = (pty * canvas_h * (en.y - st.y + 1) / selectedShape.height);
                    ptx = +ptx.toFixed();
                    pty = +pty.toFixed();
                    str_line += path[i][0] + ' ' + ptx + ' ' + pty + ' ';
                }
                else if (path[i][0] === 'C') {
                    let pt1: number = +path[i][1], pt2: number = +path[i][2], pt3: number = +path[i][3], pt4: number = +path[i][4], pt5: number = +path[i][5], pt6: number = +path[i][6];
                    pt1 = (pt1 * canvas_w * (en.x - st.x + 1) / selectedShape.width);
                    pt2 = (pt2 * canvas_h * (en.y - st.y + 1) / selectedShape.height);
                    pt3 = (pt3 * canvas_w * (en.x - st.x + 1) / selectedShape.width);
                    pt4 = (pt4 * canvas_h * (en.y - st.y + 1) / selectedShape.height);
                    pt5 = (pt5 * canvas_w * (en.x - st.x + 1) / selectedShape.width);
                    pt6 = (pt6 * canvas_h * (en.y - st.y + 1) / selectedShape.height);
                    pt1 = +pt1.toFixed();
                    pt2 = +pt2.toFixed();
                    pt3 = +pt3.toFixed();
                    pt4 = +pt4.toFixed();
                    pt5 = +pt5.toFixed();
                    pt6 = +pt6.toFixed();
                    str_line += path[i][0] + ' ' + pt1 + ' ' + pt2 + ' ' + pt3 + ' ' + pt4 + ' ' + pt5 + ' ' + pt6 + ' ';}
                else if (path[i][0] === 'Z') {
                    str_line += path[i][0] + ' ';
                }
                i++;
            }

            currentlines.addWithUpdate(new fabric.Path(str_line, {
                left: st.x * canvas_w,
                top: st.y * canvas_h,
                stroke: 'black',
                fill: 'gray',
                strokeWidth: 1,
                originX: 'left',
                originY: 'top',
            }));
            editor?.canvas.add(currentlines);
        }
        else if (selectedDrawingTools === SHAPE_ICON) {
            fabric.Image.fromURL(selectedShape.preview, (myImg:any) => {
                //i create an extra var for to change some image properties
                myImg.set({ left: st.x * canvas_w, top: st.y * canvas_h, scaleX: canvas_w * (en.x - st.x + 1) / myImg.width, scaleY: canvas_h * (en.y - st.y + 1) / myImg.height});
                currentlines.addWithUpdate(myImg); 
                editor?.canvas.add(currentlines);
            });
        }
        else if (selectedDrawingTools === SHAPE_IMAGE) {
            fabric.Image.fromURL(selectedShape.preview, (myImg:any) => {
                //i create an extra var for to change some image properties
                myImg.set({ left: st.x * canvas_w, top: st.y * canvas_h, scaleX: canvas_w * (en.x - st.x + 1) / myImg.width, scaleY: canvas_h * (en.y - st.y + 1) / myImg.height});
                currentlines.addWithUpdate(myImg); 
                editor?.canvas.add(currentlines);
            });
        }
    }
    const getSelectedShape = () => {
        console.log("selected item:", selectedDrawingTools, selectedShape);
    }
    //Mouse Down event on canvas
    const onMouseDown = (point:any) => {
        console.log("Mouse Down", point, arrayobject.length, selectedShape);
        getSelectedShape();
        mousedrag = true;
        while (arrayobject.length > 0) {
            arrayobject.pop();
        }
        onMouseMove(point);
    }
    //Mouse Right Click event on canvas
    const onRightMouseDown = (point:any) => {
        mousedrag = false;
        console.log("Right Mouse Click", point);
        const x = Math.floor(point.x / canvas_w);
        const y = Math.floor(point.y / canvas_h);
        if (x<0 || y<0 || x>=canvas_w_count || y>=canvas_h_count)
            return;
        const selecteditem = containpointinrenderobjects(x, y);
        if (selecteditem === -1) 
            return;
        renderobjects.splice(selecteditem, 1);
        render();
    }
    //Mouse Move event on canvas
    const onMouseMove = (point:any) => {
        if (mousedrag == false)
            return;
        point_push(point);
    }
    //Mouse Up event on canvas
    const onMouseUp = (point:any) => {
        if (mousedrag === false)
            return;
        console.log("Mouse Up", point);
        mousedrag = false;
        if (arrayobject.length === 0)
            return;
        if (selectedDrawingTools === SHAPE_FLOWLINE)
        {
            //points push all point of arrayobject
            const points = [];
            for (let i=0;i<arrayobject.length;i++) {
                points.push({x:arrayobject[i].x, y:arrayobject[i].y});
            }
            const renderobject = {type: SHAPE_FLOWLINE, points: points, skewX: 0, skewY: 0, flipX: false, flipY: false, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}, corner_size: 10};
            renderobjects.push(renderobject);
            console.log("RenderObjects:", renderobjects);
            render();
        }
        else if (selectedDrawingTools === SHAPE_SHAPE) {
            const pt1 = arrayobject[0];
            const temp_pt = arrayobject[1];
            if (containpointinrenderobjects(pt1.x, pt1.y) != -1)
                return;
            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x:Math.min(pt1.x, pt2.x), y:Math.min(pt1.y, pt2.y)};
            const en_point = {x:Math.min(Math.max(pt1.x, pt2.x), st_point.x + 3), y:Math.min(Math.max(pt1.y, pt2.y), st_point.y + 3)};
            const renderobject = {type: SHAPE_SHAPE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}, corner_size: 10};
            renderobjects.push(renderobject);
            render();
        }
        else if (selectedDrawingTools === SHAPE_ICON) {
            const pt1 = arrayobject[0];
            const temp_pt = arrayobject[1];
            if (containpointinrenderobjects(pt1.x, pt1.y) != -1)
                return;
            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x:Math.min(pt1.x, pt2.x), y:Math.min(pt1.y, pt2.y)};
            const en_point = {x:Math.min(Math.max(pt1.x, pt2.x), st_point.x + 3), y:Math.min(Math.max(pt1.y, pt2.y), st_point.y + 3)};
            const renderobject = {type: SHAPE_IMAGE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}, corner_size: 10};
            renderobjects.push(renderobject);
            render();
        }
        else if (selectedDrawingTools === SHAPE_IMAGE) {
            const pt1 = arrayobject[0];
            const temp_pt = arrayobject[1];
            if (containpointinrenderobjects(pt1.x, pt1.y) != -1)
                return;
            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x: Math.min(pt1.x, pt2.x), y: Math.min(pt1.y, pt2.y)};
            const en_point = {x: Math.min(Math.max(pt1.x, pt2.x), st_point.x + 3), y: Math.min(Math.max(pt1.y, pt2.y), st_point.y + 3)};
            const renderobject = {type: SHAPE_IMAGE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}, corner_size: 10};
            renderobjects.push(renderobject);
            render();
        }
    }
    //Insert point into points
    const point_push = (point:any) =>  {
        const temp = arrayobject;
        const x = Math.floor(point.x / canvas_w);
        const y = Math.floor(point.y / canvas_h);
        if (x<0 || y<0 || x>=canvas_w_count || y>=canvas_h_count)
            return;
        if (containpointinrenderobjects(x, y) != -1) {
            return;
        }
        if (selectedDrawingTools === SHAPE_FLOWLINE)
        {
            let last_point = {x:-1,y:-1};
            if (temp.length !== 0)
                last_point = temp[temp.length - 1];
            if (last_point.x === x && last_point.y === y)
                return;
            let last2_point = {x:-1,y:-1};
            if (temp.length > 1)
                last2_point = temp[temp.length - 2];
            if (last2_point.x === x && last2_point.y === y) {
                temp.pop();
                drawCurrentLine(arrayobject);
            }
            else {
                let flag = false;
                const count = temp.length;
                for (let i=0;i<count;i++) {
                    if (temp[i].x === x && temp[i].y === y)
                        flag=true;
                }
                if (flag===false) {
                    if (temp.length === 0 || (temp[count-1].x-x)*(temp[count-1].x-x)+(temp[count-1].y-y)*(temp[count-1].y-y) === 1)
                        temp.push({x: x, y: y});
                        drawCurrentLine(arrayobject);
                }
            }
        }
        else if (selectedDrawingTools === SHAPE_SHAPE || selectedDrawingTools === SHAPE_ICON || selectedDrawingTools === SHAPE_IMAGE) {
            if (arrayobject.length === 0) {
                arrayobject.push({x: x, y: y});
                arrayobject.push({x: x, y: y});
            }
            const pt1 = arrayobject[0];
            const pt = arrayobject[1];
            const length = Math.min(Math.abs(x - pt1.x), Math.abs(y - pt1.y));
            const pt2 = {x: length * ((pt1.x>x)?-1:1) + pt1.x, y: length * ((pt1.y>y)?-1:1) + pt1.y};
            const st_point = {x:Math.min(pt1.x, pt2.x), y:Math.min(pt1.y, pt2.y)};
            const en_point = {x:Math.max(pt1.x, pt2.x), y:Math.max(pt1.y, pt2.y)};
            if (!((en_point.x-st_point.x + 1)>=1 && (en_point.x-st_point.x + 1)<=3))
                return;
            if (containrectinrenderobjects(st_point, en_point) === -1 && !(pt.x === x && pt.y === y)) {
                drawCurrentShape(st_point, en_point);
                arrayobject.pop();
                arrayobject.push({x: x, y: y});
            }
        }
    }

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

    const containrectinrenderobjects = (st:any, en:any) => {
        let flag = -1;
        for (let i=0;i<renderobjects.length;i++) {
            if (renderobjects[i].type === SHAPE_FLOWLINE) {
                for (let j=0;j<renderobjects[i].points.length;j++) {
                    if (st.x <= renderobjects[i].points[j].x && st.y <= renderobjects[i].points[j].y && 
                        en.x >= renderobjects[i].points[j].x && en.y >= renderobjects[i].points[j].y) {
                        flag=i;
                        break;
                    }
                }
            }
            if (renderobjects[i].type === SHAPE_SHAPE || renderobjects[i].type === SHAPE_ICON || renderobjects[i].type === SHAPE_IMAGE) {
                if (rectanglesIntersect(renderobjects[i].st.x, renderobjects[i].st.y, renderobjects[i].en.x, renderobjects[i].en.y, st.x, st.y, en.x, en.y)) {
                    flag = i;
                    break;
                }
            }
        }
        return flag;
    }
    // Handle Click Next Btn Step1 component
    const handleClickNextStep = () => {
        if (handleCheckavailability() === true) {
            props?.setPatternStep(STEP_TWO);
        }
        props?.setRenderObjects(renderobjects);
    }
    // Check availability to next step
    const handleCheckavailability = () => {
        let area_count = 0;
        for (let i=0;i<renderobjects.length;i++) {
            if (renderobjects[i].type === SHAPE_FLOWLINE) {
                area_count += renderobjects[i].points.length;
            }
            if (renderobjects[i].type === SHAPE_SHAPE || renderobjects[i].type === SHAPE_ICON || renderobjects[i].type === SHAPE_IMAGE) {
                area_count += (renderobjects[i].en.x - renderobjects[i].st.x + 1) * (renderobjects[i].en.y - renderobjects[i].st.y + 1);
            }
        }
        return true;
        if (area_count === canvas_w_count * canvas_h_count) {
            return true;
        }
        alert("Availability: false");
        return false;
    }
    return (
        <> {/* Parent Container */}
            <div className="n-container">
                <div className="flex justify-between py-3">
                    <p className="font-semibold text-2xl">Create Pattern</p>
                </div>
                <div className="sm:flex justify-between gap-6">
                    {/* Container 1st */}
                    <div className="sm:w-full overflow-hidden">
                        <div className="sm:w-full overflow-hidden shadow-lg bg-white rounded-lg px-6 mb-5">
                            <div className="max-w-initial rounded overflow-hidden shadow-lg p-2 mb-5 mt-2">
                                <div className={styles.center}>
                                     <FabricJSCanvas className="sample-canvas" onReady={onReady} />
                                </div>
                            </div>
                        </div>
                        {/* Buttons */}
                        {/* Step1 Btn Component */}
                        <div className={styles.center}>
                            {/* <div className="my-1 w-80 grid grid-cols-1 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md h-11 items-center" onClick={handleCheckavailability}>
                                    Check Availability
                                </button>
                            </div> */}
                            <div className="my-1 w-80 grid grid-cols-2 gap-4">
                                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 items-center cursor-not-allowed" disabled>
                                    Previous
                                </button>
                                <button className="blue-linear-bg text-white font-medium rounded-md h-11 items-center"
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
                        {/* min-h-fit */}
                        {/* Step1 Component */}
                        {/* Drawing tools */}
                        <div className="max-w-initial rounded overflow-hidden shadow-lg p-2">
                            <div className="font-bold text-sm mb-2 text-left">Drawing tools</div>
                            <div className="flex justify-around row">
                                {
                                    drawing_tools.map((tool: any, index: number) => (
                                        <>
                                            <DrawingTools 
                                                key={index}
                                                tool={tool}
                                                selectedDrawingTools={selectedDrawingTools}
                                                setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                                                setSelectedDrawingTools={setSelectedDrawingTools}/>
                                        </>
                                    ))
                                } 
                            </div>
                            {
                                SelectedDrawingToolsComponent()
                            }
                            <SavedPattern/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawingStepOne;
