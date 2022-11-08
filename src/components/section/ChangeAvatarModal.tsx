import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { RootState } from './../../store'


type Props = {
  toggleChangeAvatarModal: (b: boolean) => void
}

export default function ChangeAvatarModal({ toggleChangeAvatarModal }: Props) {
  const {  updateUserAvatar } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user:any = useSelector((state: RootState) => state.auth.user)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [preImg, setPreImg] = useState<any>(user.avatar)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [file, setFile] = useState<any>()
  const [isAvatarLoading, setAvatarLoading] = useState<boolean>(false)

  // Create a reference to the hidden file input element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hiddenFileInput = React.useRef<any>(null)

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
  }
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    // Assuming only image
    const file = event.target.files[0]
    setFile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      setPreImg(reader.result)
    }
  }

  async function changeAvatar() {
    setAvatarLoading(true)
    try {
      await updateUserAvatar(file)
      toggleChangeAvatarModal(false)
    } catch (error) {
      setAvatarLoading(false)
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative max-w-[400px]  w-[80%] m-auto my-6 mx-auto">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">Change User Avatar</p>
                <p
                  className="font-bold text-2xl mb-3 cursor-pointer"
                  onClick={() => toggleChangeAvatarModal(false)}
                >
                  ×
                </p>
              </div>
              <div>
                <div
                  className="border-[#949494] w-full border-2 mt-3 rounded-lg p-2 border-dashed cursor-pointer"
                  onClick={handleClick}
                >
                  <input
                    type={'file'}
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                  />
                  <img
                    src={preImg}
                    alt=""
                    className="m-auto max-h-64 max-w-1/2"
                  />
                  <div className={`${preImg ? 'hidden' : ''} p-10`}>
                    <img src="/img/upload_nft.png" alt="" className="m-auto " />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <p
                    className="border border-dark_text mt-2 text-center px-4 py-2 cursor-pointer w-full flex justify-center  items-center"
                    onClick={() => {
                      toggleChangeAvatarModal(false)
                    }}
                  >
                    Cancel
                  </p>
                  <div className="border border-dark_text text-center px-4 py-2 cursor-pointer  mt-2 w-full">
                    {isAvatarLoading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                      </div>
                    ) : (
                      <p
                        className="w-full"
                        onClick={() => {
                          changeAvatar()
                        }}
                      >
                        Change
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
