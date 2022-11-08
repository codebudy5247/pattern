import React, {useEffect, useState} from 'react';
import api from '../../utils/api';
import ArtItem from './ArtItem';

function SubmittedArtsPart() {

    const [arts, setArts] = useState([]);

    useEffect(() => {
        getArts()
    }, [arts])

    async function getArts () {
        const res = await api.get('/arts');
        setArts(res.data)
    }

    return (
        <div className='bg-white dark:bg-[#3F387A]/50 shadow dark:border-2 border-[#8726B7]/10 rounded-lg'>
            <div className='p-6'>
                <div className='flex justify-between'>
                    <p className='primaryText text-xl font-semibold'>Submitted Art</p>
                    <button className='bg-color3 dark:bg-color4 text-white px-4 py-1 rounded'>view all</button>
                </div>
                <div className='mt-5 flex jusitfy-between gap-5'>
                    {
                        arts.map((row, key) => {
                            return (
                                <ArtItem row={row} key={key} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SubmittedArtsPart;