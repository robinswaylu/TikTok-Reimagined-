import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import Logo from '../utils/tiktik-logo.png'
import { create } from 'domain'
import { createOrGetUser } from '../utils'

import useAuthStore from '../store/authStore'

const Navbar = () => {

    const { userProfile, addUser, removeUser} = useAuthStore();
    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-[100px] md:w-[129px]'>
                    <Image className='cursor-pointer' src={Logo} alt='Tiktik' layout='responsive' />
                </div>
            </Link>
            <div>SEARCH</div>
            <div>
                {userProfile ? (

                    <div className='flex gap-5 md:gap-10'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                                <IoMdAdd className='text-xl' />{' '}
                                <span className='hidden md:block'>Upload </span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href={`/profile/${userProfile._id}`}>
                                <div>
                                    <Image
                                        className='rounded-full cursor-pointer'
                                        src={userProfile.image}
                                        alt='user'
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </Link>
                        )}
                        <button
                            type='button'
                            className='   px-2  '
                            onClick={() => {
                                googleLogout();
                                //remove user from local storage
                                removeUser();
                            }}
                        >
                            <AiOutlineLogout color='red' fontSize={21} />
                        </button>
                    </div>

                ) : (

                    <GoogleLogin onSuccess={(response) => createOrGetUser(response, addUser)} onError={() => console.log('error')} />

                )}

            </div>
        </div>
    )
}

export default Navbar