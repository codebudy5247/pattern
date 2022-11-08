import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

import { RootState } from './../store'

function Signin() {
    
    const {loginWithWallet} = useAuth()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    const connectWithWallet = async () => {
        await loginWithWallet();
        await loginWithWallet()
    }

    return (
        <div className="linear-3-bg fixed top-0 z-20 h-screen w-screen flex justify-center items-center">
            <div className='max-w-[500px] w-11/12 m-auto border-2 border-white/40 rounded-3xl p-10'>
                <p className='text-white font-medium text-3xl'>Login</p>

                <div className='mt-5'>
                    <p className='text-white'>Email</p>
                    <input 
                        type={"text"} 
                        className="mt-2 p-2 outline-0 w-full rounded-lg bg-white text-[#BCBEC0]" 
                        placeholder='username@gmail.com'
                    />
                </div>
                <div className='mt-5'>
                    <p className='text-white'>Password</p>
                    <input 
                        type={"password"} 
                        className="mt-2 p-2 outline-0 w-full rounded-lg bg-white text-[#BCBEC0]" 
                        placeholder='Password'
                    />
                </div>
                <div className='mt-5'>
                    <input 
                        type={"submit"} 
                        className="mt-2 p-2 outline-0 w-full font-medium rounded-lg bg-white text-[#0F51E0]" 
                        value={"Sign In"}
                    />
                    <p className='text-center text-white mt-5'>or continue with</p>
                    <button 
                        onClick={() => { connectWithWallet() }}
                        className="mt-5 p-2 outline-0 w-full font-medium rounded-lg bg-white text-[#3C3C3C] flex justify-center items-center gap-3">
                        <img src='https://metamask.io/icons/icon-48x48.png?v=48400a28770e10dd52a8c0e539aeb282' alt='' className='h-8' />
                        Metamask
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signin;