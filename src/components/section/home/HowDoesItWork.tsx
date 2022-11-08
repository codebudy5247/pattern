import React from 'react'
import Immg from "../../../assets/images/hdw.png"
const HowDoesItWork = () => {
  return (
    <div className='py-10'>
    <div className='n-container'>
    <div className='text-center items-center'>
        <p className='text-4xl sm:text-5xl font-medium primaryText mb-4'>How does it work?</p>
        {/* <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex gap-2 items-center">
        Art
        </button> */}
    </div>
    
        <div className='flex flex-col-reverse sm:flex-row justify-between items-center'>
            <div className='sm:w-1/2 mt-5 sm:mt-0'>
                <img src={Immg} alt='' className='w-10/12 m-auto' />
            </div>
            <div className='sm:w-1/2'>
                <p className='mt-2 text-4xl sm:text-3xl font-medium primaryText'>Create Customized Generative Art</p>
                <p className='secondaryText text-lg sm:text-xl'>Every art is different and so is the creation of them. Here, you can upload your assets and let the community take care of final art work creation. We will be releasing the templatized version of various artforms which the creators can explore and apply for launching their own art collection. All the coding, technology setup, will be taken care by the platform. </p>
                <p className='mt-2 text-4xl sm:text-3xl font-medium primaryText'>Give the power in the hands of the collector</p>
                <p className='secondaryText text-lg sm:text-xl'>All the collections will be highly interactive and collaborative where the creators are providing the assets, features and the collector tries their hand in giving the final shape to the art work through our customization functions. This will allow in the creation of highly unique pieces of art after various iterations of individual end users</p>
                <p className='mt-2 text-4xl sm:text-3xl font-medium primaryText'>Community engagement</p>
                <p className='secondaryText text-lg sm:text-xl'>Build outstanding collaborative collections and start engaging with your NFT Holders. Create and share exclusive content, run contests, games and setup reward, private shop and much more with upcoming series of tools and applications.</p>
                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex gap-2 items-center mt-1">
                Know More {'>'}
                </button>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default HowDoesItWork