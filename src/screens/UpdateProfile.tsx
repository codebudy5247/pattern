import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateProfile } from '../actions/auth';
import ChangeAvatarModal from '../components/section/ChangeAvatarModal';
import { RootState, store } from '../store';

function UpdateProfile() {
    const [isChangeAvatarModal, toggleChangeAvatarModal] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user:any = useSelector((state: RootState) => state.auth.user)
    console.log(user)

    useEffect(() => {
        if(user && user.username) setUsername(user.username)
        if(user && user.email) setEmail(user.email)
    }, [user])

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (e:any) => {
        e.preventDefault();        
        const formData = { username, email };
        store.dispatch(updateProfile(formData))
    }

    return (
        <div>
            <div className='n-container py-10'>
                <form onSubmit={onSubmit}>
                    <div>
                        <img src='/img/Maskgroup.png' alt='' className='z-10' />
                        <div className='flex justify-between items-end gap-6'>
                            <img
                                src={ user ? user.avatar ? user.avatar : "/img/avatar.png" : "/img/avatar.png" }
                                alt=""
                                className="-mt-16 ml-10 z-20 p-4 rounded-2xl h-32 w-32 cursor-pointer"
                                onClick={() => toggleChangeAvatarModal(true)}
                            />
                            
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <p className='primaryText text-lg font-medium'>Profile</p>
                                    <p className='secondaryText text-md'>Update Your Photo and personal details</p>
                                </div>
                                <button className='linear-4-bg text-white rounded-md px-6 py-2' type='submit'>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className='py-10 max-w-[800px] w-full m-auto'>
                        <div className='flex justify-start items-center gap-10'>
                            <p className='w-64 primaryText font-medium'>Username</p>
                            <input 
                                type={"text"} 
                                className="w-full border-[#BCBEC0] border px-4 py-2 bg-[#F7F7F7] rounded-md outline-0" 
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)}}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-10 mt-6'>
                            <p className='w-64 primaryText font-medium'>Email</p>
                            <input 
                                type={"email"} 
                                className="w-full border-[#BCBEC0] border px-4 py-2 bg-[#F7F7F7] rounded-md outline-0"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}} />
                        </div>
                        <div className='flex justify-start items-center gap-10 mt-6'>
                            <p className='w-64 primaryText font-medium'>Wallet Address</p>
                            <input 
                                type={"text"} 
                                className="w-full border-[#BCBEC0] border px-4 py-2 bg-[#BCBEC0] rounded-md outline-0"
                                value={user && user.address ? user.address : ""}
                                disabled={true} />
                        </div>

                    </div>
                </form>
            </div>

            {
                isChangeAvatarModal ? <ChangeAvatarModal toggleChangeAvatarModal={toggleChangeAvatarModal} /> : null
            }
            
        </div>
    );
}

export default UpdateProfile;