import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import formatAddress from '../../utils/formatAddress';
import { RootState } from './../../store';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { AiOutlineDown } from 'react-icons/ai';
import { logout } from '../../actions/auth'

function AccountSelector() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user:any = useSelector((state: RootState) => state.auth.user)

    return (
      <div>
          {isAuthenticated ? 
          
            <Menu>
              <MenuHandler>
                <Button variant="gradient" className='p-0'>
                  <div className="flex justify-end items-center gap-3">
                    <img
                      src={ user ? user.avatar ? user.avatar : "/img/avatar.png" : "/img/avatar.png" }
                      alt=""
                      className="rounded-full overflow-hidden h-11 w-11 cursor-pointer"
                    />
                    <p className='primaryText'>{ user ? user.username ? user.username : formatAddress( user.address ) : null }</p>
                    <AiOutlineDown className='text-black' />
                  </div>
                </Button>
              </MenuHandler>
              <MenuList className='ml-8'>
                <Link to={'/udpate-profile'}><MenuItem className='py-2 px-2 text-end'>Profile</MenuItem></Link>
                <MenuItem className='py-2 px-2 text-end' onClick={() => {
                  dispatch(logout())
                }}>Log out</MenuItem>
              </MenuList>
            </Menu>
          : 
            <div>
              <Link to={"/signin"}>
                <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex gap-2 items-center">
                  Sign In
                </button>
              </Link>
            </div>
          }
      </div>
    );
}

export default AccountSelector;