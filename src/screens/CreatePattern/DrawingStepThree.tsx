import {useState, useEffect, useCallback} from "react";
import {Icon} from "@iconify/react";
import {bg_type, default_background, plain_color} from "../../mock/bg_type";
import { formats,effects,frames } from "../../mock/format";
import DrawingTools from "../../components/section/DrawingToolsCard";
import BackgroundType from "../../components/section/BackgroundType";
import SavedPattern from "../../components/section/SavedPattern";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import styles from "../../styles/CreatePattern.module.css";
import ShapesSelecter from "../../components/section/ShapesSelecter";
import IconSelecter from "../../components/section/IconSelecter";
import FlowLinesSelector from "../../components/section/FlowLinesSelector";
import SelectOtherPattern from "../../components/section/SelectOtherPattern";
import SavedBackground from "../../components/section/SavedBackground";
import Format from "../../components/section/Format";
import Canva from "../../components/layout/Canvas";
import SelectEffects from "../../components/section/SelectEffects";
import SelectFrames from "../../components/section/SelectFrames";
import SelectImageBackground from "../../components/section/SelectImageBackground";
import SelectRoofStyle from "../../components/section/SelectRoofStyle";
import SelectPlainBgColor from "../../components/section/SelectPlainBgColor";
import Grid from "../../components/layout/Grid";

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { canvas_w, canvas_w_count, canvas_h, canvas_h_count, STEP_ONE, STEP_TWO, STEP_THREE } from "../../mock/common_variable";
import { default_steptwo, LINE, BODY, BACKGROUND, OUTLINE, OUTLINE_STYLE, EFFECT, lines, border_styles, line_colors, shape_colors, background_colors, shape_effects, CORNER_STYLE, corner_styles, status_effects, STATUS, SHADOW } from "../../mock/drawing_tools_steptwo";
import { drawing_tools, default_stepone, default_stepthree, flowLines, SHAPE_FLOWLINE, SHAPE_SHAPE, SHAPE_ICON, SHAPE_IMAGE } from "../../mock/drawing_tools_stepthree";

import EffectSelector from "../../components/section/EffectSelector";
import ShadowSelector from "../../components/section/ShadowSelector";
import StatusSelector from "../../components/section/StatusSelector";

import { fabric } from 'fabric';
import { rectanglesIntersect } from "../../mock/common_function";

const DrawingStepThree = (props: any) => {
    const [value, copy] = useCopyToClipboard();
    const { editor, onReady } = useFabricJSEditor()
    //---------------------Drawing Tools--------------------------
    const [showDrawingToolsMenu, setShowDrawingToolsMenu] = useState < boolean > (true);
    const [selectedDrawingTools, setSelectedDrawingTools] = useState(SHAPE_SHAPE);
    // Background Type
    const [showBackgroundTypeMenu, setShowBackgroundTypeMenu] = useState < boolean > (true);
    const [selectedwBackgroundType, setSelectedwBackgroundType] = useState(props?.background?.type);
    //Selected Tools state
    const [selectedShape, setSelectedShape] = useState < any > (props?.selectedShape)
    //Background
    const [background, setBackground] = useState (props?.background);

    const [selectedItem, setSelectedItem] = useState(-1)
    //--------------------------Effect----------------------------------
    const [selectedEffectTools, setSelectedEffectTools] = useState(LINE)
    const [selectedEffect, setSelectedEffect] = useState(default_steptwo)

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

    const SelectedEffectToolsComponent = () => {
        const renderobjects = background.renderobjects;
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

    const SelectedBackgroundTypeComponent = () => {
        if (selectedwBackgroundType === "cellStyle") {
            return (
                <SelectImageBackground 
                    setShowBackgroundTypeMenu={setShowBackgroundTypeMenu}
                    selectedwBackgroundType={selectedwBackgroundType}
                    setSelectedShape={setSelectedShape}
                    selectedShape={selectedShape}
                />
            );
        }
        else if (selectedwBackgroundType === "abstract") {
            if (selectedItem === -1) {
                return (
                    <>
                        {/* Drawing tools */}
                        <div className="max-w-initial rounded overflow-hidden shadow-lg p-2">
                            <div className="font-bold text-sm mb-2">Drawing tools</div>
                            <div className="flex justify-around row">
                                {
                                    drawing_tools.map((tool: any, index:number) => (
                                        <>
                                            <DrawingTools key={
                                                    tool._id
                                                }
                                                tool={tool}
                                                selectedDrawingTools={selectedDrawingTools}
                                                setShowDrawingToolsMenu={setShowDrawingToolsMenu}
                                                setSelectedDrawingTools={setSelectedDrawingTools}/>
                                        </>
                                    ))
                                } 
                            </div>
                            { SelectedDrawingToolsComponent() }
                        </div>
                    </>
                );
            }
            else {
                return (
                    <>
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
                    </>
                );
            }
        }
        else if (selectedwBackgroundType === "roofStyle") {
            return (
                <SelectRoofStyle 
                    setShowBackgroundTypeMenu={setShowBackgroundTypeMenu}
                    selectedwBackgroundType={selectedwBackgroundType}
                    setSelectedShape={setSelectedShape}
                    selectedShape={selectedShape}
                />
            );
        }
        else if (selectedwBackgroundType === "plainColour") {
            return (
                <SelectPlainBgColor 
                    setShowBackgroundTypeMenu={setShowBackgroundTypeMenu}
                    selectedwBackgroundType={selectedwBackgroundType}
                    setSelectedShape={setSelectedShape}
                    selectedShape={selectedShape}
                />
            );
        }
    };

    //Select shadow dialog
    const onChangeShadow = (visibility: boolean, color: any, size: number, padding: number, angle: number) => {
        if (selectedItem === -1)
            return;
        background.renderobjects[selectedItem].shadow.visibility = visibility;
        background.renderobjects[selectedItem].shadow.color = color;
        background.renderobjects[selectedItem].shadow.size = size;
        background.renderobjects[selectedItem].shadow.angle = angle;
        background.renderobjects[selectedItem].shadow.padding = padding;

        render();
        setTimeout(setActiveObject, 100);
    }

    const onClickStatusEffect = (statusEffect: any) => {
        console.log("StatusEffect:", statusEffect);
        if (selectedItem === -1)
            return;
        if (statusEffect === 'flipX')
            background.renderobjects[selectedItem].flipX = !background.renderobjects[selectedItem].flipX;
        else if (statusEffect === 'flipY')
            background.renderobjects[selectedItem].flipY = !background.renderobjects[selectedItem].flipY;

        render();
        setTimeout(setActiveObject, 100);
    };
    const canvas_groups:any[] = [];

    const render = async() => {
        props?.setBackground(background);
        console.log("background:", background);
        editor?.canvas.clear();

        initializeCanvas();
        drawRenderobjects();
        setTimeout(initializeBackground, 100);
        initializeFabric();
    };
    //Draw objects by background.renderobjects
    const drawRenderobjects = async() => {
        if (selectedwBackgroundType !== "abstract")
            return;
        for (let i=0;i<background.renderobjects.length;i++) {
            const objects = background.renderobjects[i];
            const effect = objects.effect;
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
            if (objects.type === SHAPE_SHAPE) {
                const group = new fabric.Group([], {
                    left: 0,
                    top: 0,
                    selectable: false, 
                    hoverCursor: "normal"
                });
                group.lockMovementX = false;
                group.lockMovementY = false;
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
                group.lockMovementX = false;
                group.lockMovementY = false;
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
                    left: objects.st.x + ((objects.en.x - objects.st.x + 1) -  (objects.en.x - objects.st.x + 1) * scaleX) / 2, 
                    top: objects.st.y + ((objects.en.y - objects.st.y + 1) - (objects.en.y - objects.st.y + 1) * scaleY) / 2, 
                    scaleX: (objects.en.x - objects.st.x + 1) / myImg.width * scaleX, 
                    scaleY: (objects.en.y - objects.st.y + 1) / myImg.height * scaleY, 
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
                group.lockMovementX = false;
                group.lockMovementY = false;
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
                    left: objects.st.x + ((objects.en.x - objects.st.x + 1) - (objects.en.x - objects.st.x + 1) * scaleX) / 2, 
                    top: objects.st.y + ((objects.en.y - objects.st.y + 1) - (objects.en.y - objects.st.y + 1) * scaleY) / 2, 
                    scaleX: (objects.en.x - objects.st.x + 1) / myImg.width * scaleX, 
                    scaleY: (objects.en.y - objects.st.y + 1) / myImg.height * scaleY, 
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
    };

    useEffect(() => {
        // console.log("callback after render", selectedEffect, renderobjects, selectedItem);
        if (selectedItem === -1)
            return;
        const renderobject = background.renderobjects[selectedItem];
        if (selectedEffect.class !== EFFECT) {
            let i=0;
            while(i<renderobject.effect.length) {
                if (renderobject.effect[i].class === selectedEffect.class) {
                    renderobject.effect.splice(i, 1);
                }
                i++;
            }
            background.renderobjects[selectedItem].effect.push(selectedEffect); 
        }
        render();
        setTimeout(setActiveObject, 100);
    }, [selectedEffect])

    useEffect(() => {
        if (selectedwBackgroundType === "abstract") {
            render();
        }
    }, [selectedwBackgroundType]);

    useEffect(() => {
        if (!selectedShape || selectedShape.id === '')
            return;
        props?.setSelectedShape(selectedShape);
        console.log("selectedShape:", selectedwBackgroundType, " - ", selectedShape);
        background.type = selectedwBackgroundType;
        if (selectedwBackgroundType === "plainColour") {
            background.color = selectedShape?.backgroundColor;
        }
        else if (selectedwBackgroundType === "roofStyle") {
            background.image = selectedShape?.preview;
        }
        else if (selectedwBackgroundType === "cellStyle") {
            background.image = selectedShape?.preview;
        }
        else if (selectedwBackgroundType === "abstract") {
            background.color = "#ffffff33";
        }
        setBackground(background);
        render();
    }, [selectedShape])
    // Handle Click Next Btn Step1 component
    const handleClickNextStep = () => {
        return false;
    }
    // Handle Click Previous Btn Step1 component
    const handleClickPrevStep = () => {
        props?.setPatternStep(STEP_TWO);
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
    //set Object active by selctedItem
    const setActiveObject = () => {
        if ( editor?.canvas?._objects && selectedItem + 1 >= editor?.canvas?._objects?.length )
            return;
        if (selectedItem === -1) {
            editor?.canvas.discardActiveObject().renderAll();
            return;
        }
        console.log("setActiveObject:", selectedItem, editor?.canvas);
        editor?.canvas.setActiveObject(editor?.canvas._objects[ selectedItem + 1 ]);
        editor?.canvas._objects[ selectedItem + 1 ].set({'borderColor':'#fbb802','cornerColor':'#fbb802'});
        editor?.canvas.renderAll();
    }

    useEffect(() => {
        console.log("selectedItem:", selectedItem);
        if (selectedItem === -1) {
            editor?.canvas.discardActiveObject().renderAll();
            return;
        }

        render();
        setTimeout(setActiveObject, 100);
    }, [selectedItem]);

    const initializeFabric = () => {
        editor?.canvas.off('mouse:down');
        editor?.canvas.off('mouse:move');
        editor?.canvas.off('mouse:up');
        editor?.canvas.off('object:modified');
        
        editor?.canvas.on('mouse:down', function(options) {
            if (options.button === 1)
                onMouseDown(options.pointer);
            else if (options.button === 3)
                onRightMouseDown(options.pointer);
        });
        // editor?.canvas.on('mouse:dblclick', function(options) {
        //     onClearActiveObject(options);
        // });
        editor?.canvas.on('mouse:move', function(options) {
            onMouseMove(options.pointer);
        });
        editor?.canvas.on('mouse:up', function(options) {
            onMouseUp(options.pointer);
        });
        editor?.canvas.on('object:modified', function(option) {
            onObject_Modified(option);
        });
    }
    let mousedrag = false;
    let st_pt = {x: -1, y: -1};
    let en_pt = {x: -1, y: -1};

    const onClearActiveObject = (point:any) => {
        console.log("onClearActiveObject");
        if (selectedItem === -1)
            return;
        setSelectedItem(-1);
        editor?.canvas.discardActiveObject().requestRenderAll();
    }
    //Mouse Down event on canvas
    const onMouseDown = (point:any) => {
        if (selectedwBackgroundType !== "abstract") 
            return;
        mousedrag = true;
        if (selectedItem !== -1) {
            mousedrag = false;
        }
        // console.log("Mouse Down", point, selectedShape, selectedItem);
        st_pt = {x: point.x, y: point.y};
    }
    //Mouse Right Click event on canvas
    const onRightMouseDown = (point:any) => {
        if (selectedwBackgroundType !== "abstract") 
            return;
        mousedrag = false;
        console.log("Right Mouse Click", point);
        if (point.x<0 || point.y<0 || point.x>=canvas_w * canvas_w_count || point.y>=canvas_h * canvas_h_count)
            return;
        const selecteditem = containpointinrenderobjects(point.x, point.y);
        if (selecteditem === -1) 
            return;
        background.renderobjects.splice(selecteditem, 1);
        render();
    }
    //Mouse Move event on canvas
    const onMouseMove = (point:any) => {
        if (mousedrag === false || selectedwBackgroundType !== "abstract")
            return;
        point_push(point);
    }
    //Mouse Up event on canvas
    const onMouseUp = (point:any) => {
        if (selectedwBackgroundType !== "abstract")
            return;
        const x = point.x;
        const y = point.y;
        if (Math.sqrt((st_pt.x-x)*(st_pt.x-x)+(st_pt.y-y)*(st_pt.y-y))<15) {
            console.log("Select Object", point);
            const selectedIndex = containpointinrenderobjects(point.x, point.y);
            setSelectedItem(selectedIndex);
            return;
        }
        if (mousedrag === false)
            return;
        console.log("Create New Object", point);
        mousedrag = false;
        if (selectedDrawingTools === SHAPE_SHAPE) {
            const pt1 = st_pt;
            const temp_pt = {x: x, y: y};

            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x:Math.min(pt1.x, pt2.x), y:Math.min(pt1.y, pt2.y)};
            const en_point = {x:Math.max(pt1.x, pt2.x), y:Math.max(pt1.y, pt2.y)};
            const renderobject = {type: SHAPE_SHAPE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}};
            background.renderobjects.push(renderobject);
        }
        else if (selectedDrawingTools === SHAPE_ICON) {
            const pt1 = st_pt;
            const temp_pt = {x: x, y: y};

            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x:Math.min(pt1.x, pt2.x), y:Math.min(pt1.y, pt2.y)};
            const en_point = {x:Math.max(pt1.x, pt2.x), y:Math.max(pt1.y, pt2.y)};
            const renderobject = {type: SHAPE_IMAGE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}};
            background.renderobjects.push(renderobject);
        }
        else if (selectedDrawingTools === SHAPE_IMAGE) {
            const pt1 = st_pt;
            const temp_pt = {x: x, y: y};

            const length = Math.min(Math.abs(temp_pt.x - pt1.x), Math.abs(temp_pt.y - pt1.y))
            const pt2 = {x: length * ((pt1.x>temp_pt.x)?-1:1) + pt1.x, y: length * ((pt1.y>temp_pt.y)?-1:1) + pt1.y};
            const st_point = {x: Math.min(pt1.x, pt2.x), y: Math.min(pt1.y, pt2.y)};
            const en_point = {x: Math.max(pt1.x, pt2.x), y: Math.max(pt1.y, pt2.y)};
            const renderobject = {type: SHAPE_IMAGE, st: st_point, en: en_point, skewX: 0, skewY: 0, flipX: false, flipY: false, style: selectedShape, effect: [lines[0], corner_styles[0], border_styles[0], line_colors[0], shape_colors[0], background_colors[0]], angle: 0, scaleX: 1, scaleY: 1, shadow: {visibility: false, color: 'rgba(0, 0, 0, 0.3)', size: 5, angle: 0, padding: 10}};
            background.renderobjects.push(renderobject);
        }
        render();
    }
    //Insert point into points
    const point_push = (point:any) =>  {
        const x = point.x;
        const y = point.y;
        if (x<0 || y<0 || x>=canvas_w_count * canvas_w || y>=canvas_h_count * canvas_h) {
            console.log("out of size");
            return;
        }
        if (selectedDrawingTools === SHAPE_SHAPE || selectedDrawingTools === SHAPE_ICON || selectedDrawingTools === SHAPE_IMAGE) {
            const pt1 = st_pt;
            const length = Math.min(Math.abs(x - pt1.x), Math.abs(y - pt1.y));
            const pt2 = {x: length + pt1.x, y: length + pt1.y};
            const en_pt2 = {x: pt1.x + length * ((pt1.x>x)?-1:1), y: pt1.y + length * ((pt1.y>y)?-1:1)};
            const st_pt1 = {x: Math.min(pt1.x, en_pt2.x), y: Math.min(pt1.y, en_pt2.y)};
            const en_pt1 = {x: Math.max(pt1.x, en_pt2.x), y: Math.max(pt1.y, en_pt2.y)};
            en_pt = {x: x, y: y};
            if (!((en_pt1.x-st_pt1.x + 1)>=1))
                return;
            drawCurrentShape(st_pt1, en_pt1);
        }
    }

    const onObject_Modified = (option:any) => {
        console.log("Object modified:", option, option?.target.angle, option?.target.scaleX, option?.target.scaleY, selectedItem);
        if (selectedItem === -1 || background.renderobjects[selectedItem].type === SHAPE_FLOWLINE)
            return;
        if (option.action === "rotate") {
            background.renderobjects[selectedItem].angle = option?.target.angle;
            return;
        }
        let strokeWidth = 1, j=0;
        const effect = background.renderobjects[selectedItem].effect;
        while(j<effect.length) {
            if (effect[j].class === OUTLINE) {
                strokeWidth = effect[j].strokeWidth;
            }
            j++;
        }
        background.renderobjects[selectedItem].angle = option?.target.angle;
        const angle = option?.target.angle;
        const br_x = option?.target.aCoords.br.x;
        const br_y = option?.target.aCoords.br.y;
        const tl_x = option?.target.aCoords.tl.x;
        const tl_y = option?.target.aCoords.tl.y;
        const tr_x = option?.target.aCoords.tr.x;
        const tr_y = option?.target.aCoords.tr.y;

        const c_x = (br_x+tl_x)/2;
        const c_y = (br_y+tl_y)/2;
        const length = Math.sqrt((br_x-tl_x)*(br_x-tl_x)+(br_y-tl_y)*(br_y-tl_y))/2;
        console.log(c_x, c_y, length, c_x - length * Math.cos(45 * 3.141592/180), c_y - length * Math.sin(45 * 3.141592/180));
        
        background.renderobjects[selectedItem].st.x = c_x - length * Math.cos(45 * 3.141592/180);
        background.renderobjects[selectedItem].st.y = c_y - length * Math.sin(45 * 3.141592/180);
        background.renderobjects[selectedItem].en.x = background.renderobjects[selectedItem].st.x + Math.sqrt((tr_x-tl_x)*(tr_x-tl_x)+(tr_y-tl_y)*(tr_y-tl_y)) - (strokeWidth) * (((background.renderobjects[selectedItem].type === SHAPE_ICON) || (background.renderobjects[selectedItem].type === SHAPE_IMAGE))?0:1);
        background.renderobjects[selectedItem].en.y = background.renderobjects[selectedItem].st.y + Math.sqrt((tr_x-br_x)*(tr_x-br_x)+(tr_y-br_y)*(tr_y-br_y)) - (strokeWidth) * (((background.renderobjects[selectedItem].type === SHAPE_ICON) || (background.renderobjects[selectedItem].type === SHAPE_IMAGE))?0:1);

        background.renderobjects[selectedItem].scaleX = option?.target.scaleX;
        background.renderobjects[selectedItem].scaleY = option?.target.scaleY;
        background.renderobjects[selectedItem].skewX = option?.target.skewX;
        background.renderobjects[selectedItem].skewY = option?.target.skewY;
        // console.log("Object modified:", renderobjects[selectedItem].effect.angle, renderobjects[selectedItem].effect.scaleX, renderobjects[selectedItem].effect.scaleY);

        // render(); 
        // setTimeout(setActiveObject, 100); 
    }
    //Current Multi-Lines
    const currentlines = new fabric.Group([], {
        left: 0,
        top: 0,
        selectable: false, 
        hoverCursor: "normal"
    });
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
                    ptx = (ptx * (en.x - st.x + 1) / selectedShape.width);
                    pty = (pty * (en.y - st.y + 1) / selectedShape.height);
                    ptx = +ptx.toFixed();
                    pty = +pty.toFixed();
                    str_line += path[i][0] + ' ' + ptx + ' ' + pty + ' ';
                }
                else if (path[i][0] === 'C') {
                    let pt1: number = +path[i][1], pt2: number = +path[i][2], pt3: number = +path[i][3], pt4: number = +path[i][4], pt5: number = +path[i][5], pt6: number = +path[i][6];
                    pt1 = (pt1 * (en.x - st.x + 1) / selectedShape.width);
                    pt2 = (pt2 * (en.y - st.y + 1) / selectedShape.height);
                    pt3 = (pt3 * (en.x - st.x + 1) / selectedShape.width);
                    pt4 = (pt4 * (en.y - st.y + 1) / selectedShape.height);
                    pt5 = (pt5 * (en.x - st.x + 1) / selectedShape.width);
                    pt6 = (pt6 * (en.y - st.y + 1) / selectedShape.height);
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
                left: st.x,
                top: st.y,
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
                myImg.set({ left: st.x, top: st.y, scaleX: (en.x - st.x + 1) / myImg.width, scaleY: (en.y - st.y + 1) / myImg.height});
                currentlines.addWithUpdate(myImg); 
                editor?.canvas.add(currentlines);
            });
        }
        else if (selectedDrawingTools === SHAPE_IMAGE) {
            fabric.Image.fromURL(selectedShape.preview, (myImg:any) => {
                //i create an extra var for to change some image properties
                myImg.set({ left: st.x, top: st.y, scaleX: (en.x - st.x + 1) / myImg.width, scaleY: (en.y - st.y + 1) / myImg.height});
                currentlines.addWithUpdate(myImg); 
                editor?.canvas.add(currentlines);
            });
        }
    }

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
                top: canvas_w * 3,
                left: canvas_h * 3,
                width:canvas_w * canvas_count, 
                height:canvas_h * canvas_count, 
                stroke:'black', 
                fill: background?.color,
                selectable: false, 
                hoverCursor: "normal"
            }));
        }
        else if (selectedwBackgroundType === "roofStyle") {
            const myImg:any = await fabricImageFromURL(background?.image);
            myImg.set({ 
                top: canvas_w * 3,
                left: canvas_h * 3,
                scaleX: canvas_w * canvas_count / myImg.width * scaleX, 
                scaleY: canvas_h * canvas_count / myImg.height * scaleY, 
                selectable: false, 
                hoverCursor: "normal"
            });
            group.addWithUpdate(myImg);
        }
        else if (selectedwBackgroundType === "cellStyle") {
            const myImg:any = await fabricImageFromURL(background?.image);
            myImg.set({ 
                top: canvas_w * 3,
                left: canvas_h * 3,
                scaleX: canvas_w * canvas_count / myImg.width * scaleX, 
                scaleY: canvas_h * canvas_count / myImg.height * scaleY, 
                selectable: false, 
                hoverCursor: "normal"
            });
            group.addWithUpdate(myImg);
        }
        else if (selectedwBackgroundType === "abstract") {
            group.addWithUpdate(new fabric.Rect({
                top: canvas_w * 3,
                left: canvas_h * 3,
                width:canvas_w * canvas_count, 
                height:canvas_h * canvas_count, 
                stroke:'black', 
                fill: '#ffffff08', 
                selectable: false, 
                hoverCursor: "normal"
            }));
        }
        for (let i=1;i<canvas_w_count;i++) {
            group.addWithUpdate(new fabric.Line([0, 0, 0, canvas_h * canvas_count], {
                left: i * canvas_w / 3 + canvas_count * canvas_w,
                top: canvas_count * canvas_h,
                selectable: false, 
                stroke: '#d2d2d2', 
                hoverCursor: "normal"
            }));
            group.addWithUpdate(new fabric.Line([0, 0, canvas_w * canvas_count, 0], {
                left: canvas_count * canvas_w,
                top: i * canvas_h / 3 + canvas_count * canvas_h,
                selectable: false, 
                stroke: '#d2d2d2',
                hoverCursor: "normal"
            }));
        }
        editor?.canvas.add(group);
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

    const onPreview = () => {
        // const str: any = editor?.canvas.toSVG({viewBox:{x: canvas_w*3, y: canvas_h*3, width: canvas_w*3, height:canvas_w*3}});
        // console.log('data:image/svg+xml;utf8,'+encodeURIComponent(str));
        props?.setShowPreview(true);
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
                                    onClick={onPreview}>
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Container 2nd */}
                    <div className="sm:w-full overflow-hidden shadow-lg bg-white rounded-lg px-6 mb-5"
                        style={{height: 'fit-content'}}
                    >
                        {/* Step2 Component */}
                        {/* Add BackGround */}
                        <div className="max-w-initial rounded overflow-hidden shadow-lg p-2">
                        <div className="font-bold text-sm mb-2 text-left">Background Type</div>
                        <div className="flex justify-around row">
                            {
                                bg_type.map((type: any, index: number) => (
                                    <>
                                        <BackgroundType key={
                                                type._id
                                            }
                                            type={type}
                                            selectedwBackgroundType={selectedwBackgroundType}
                                            setShowBackgroundTypeMenu={setShowBackgroundTypeMenu}
                                            setSelectedwBackgroundType={setSelectedwBackgroundType}
                                        />
                                            
                                    </>
                                ))
                            } 
                        </div>
                        <> 
                            {SelectedBackgroundTypeComponent()} 
                        </>
                        </div>
                        {/* Saved Background */}
                        <SavedBackground/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawingStepThree;
