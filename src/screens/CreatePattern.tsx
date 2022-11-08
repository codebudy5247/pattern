import { useState, useEffect } from "react";

import DrawingStepOne from "./CreatePattern/DrawingStepOne";
import DrawingStepTwo from "./CreatePattern/DrawingStepTwo";
import DrawingStepThree from "./CreatePattern/DrawingStepThree";
import { default_stepthree } from "../mock/drawing_tools_stepthree";

import { STEP_ONE, STEP_TWO, STEP_THREE } from "../mock/common_variable";
import { default_background } from "../mock/bg_type";
import Preview from './CreatePattern/Preview';

const CreatePattern = () => {
    //Step
    const [patternstep, setPatternStep] = useState(STEP_ONE);

    //Render Objects
    const [renderobjects, setRenderObjects] = useState <any[]> ([]);
    const [background, setBackground] = useState (default_stepthree);

    const [selectedShape, setSelectedShape] = useState < any > (default_background);
    const [showpreview, setShowPreview] = useState(false);

    useEffect(() => {
        console.log("Background:", background);
    }, [patternstep]);

    return (
        <div className="min-h-[600px]"> {/* Parent Container */}
            {
                (patternstep === STEP_ONE && showpreview === false) ?
                    (<DrawingStepOne key={STEP_ONE} setPatternStep={setPatternStep} renderobjects={renderobjects} setRenderObjects={setRenderObjects} setShowPreview={setShowPreview}
                    />):(<></>)
            }
            {
                (patternstep === STEP_TWO && showpreview === false) ?
                    (<DrawingStepTwo key={STEP_TWO} setPatternStep={setPatternStep} renderobjects={renderobjects} setRenderObjects={setRenderObjects} setShowPreview={setShowPreview}
                    />):(<></>)
            }
            {
                (patternstep === STEP_THREE && showpreview === false) ?
                    (<DrawingStepThree key={STEP_THREE} background={background} setBackground={setBackground} setPatternStep={setPatternStep} renderobjects={renderobjects} selectedShape={selectedShape} setSelectedShape={setSelectedShape} setShowPreview={setShowPreview}
                    />):(<></>)
            } 
            {
                (showpreview === true) ? 
                    (<Preview key={showpreview} background={background} renderobjects={renderobjects} setShowPreview={setShowPreview}
                    />):(<></>)
            }
        </div>
    );
};

export default CreatePattern;
