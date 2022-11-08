import React, { Fragment, useState } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
 
  
function Faqs() {
    const [open, setOpen] = useState(1);
 
    const handleOpen = (value:number) => {
      setOpen(open === value ? 0 : value);
    };
   
    return (
        <div className='py-10 bg-white dark:bg-dark_color1'>
            <div className='n-container'>
                <p className='text-4xl sm:text-5xl text-center font-medium primaryText'>FAQs</p>
                <div className='mt-8'>
                    <Fragment>
                        <Accordion open={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="py-4 sm:py-8 border-b-2 border-[#E4E4E4] primaryText font-bold text-xl sm:text-2xl">
                            What is generative art?
                            </AccordionHeader>
                            <AccordionBody className="text-[#3c3c43] dark:text-white text-md sm:text-lg">
                                Usually generative art is created by algorithm based system and can independently decide the feature of artwork through the randomness input functions. Customized generative art is where instead of using randomness through algorithm, the user will decide the features of artwork.
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="py-4 sm:py-8 border-b-2 border-[#E4E4E4] primaryText font-bold text-xl sm:text-2xl">
                            What is customized generative art?
                            </AccordionHeader>
                            <AccordionBody className="text-[#3c3c43] dark:text-white text-md sm:text-lg">
                                Usually generative art is created by algorithm based system and can independently decide the feature of artwork through the randomness input functions. Customized generative art is where instead of using randomness through algorithm, the user will decide the features of artwork.
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)} className="py-4 sm:py-8 border-b-2 border-[#E4E4E4] primaryText font-bold text-xl sm:text-2xl">
                            Our thought process?
                            </AccordionHeader>
                            <AccordionBody className="text-[#3c3c43] dark:text-white text-md sm:text-lg">
                                Usually generative art is created by algorithm based system and can independently decide the feature of artwork through the randomness input functions. Customized generative art is where instead of using randomness through algorithm, the user will decide the features of artwork.
                            </AccordionBody>
                        </Accordion>
                    </Fragment>
                </div>
            </div>
        </div>
    );
}

export default Faqs;