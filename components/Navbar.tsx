import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import Logo from '../utils/tiktik-logo.png'

const Navbar = () => {

    const user = false;

    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-[100px] md:w-[129px]'>
                    <Image className='cursor-pointer' src={Logo} alt='Tiktik' layout='responsive' />
                </div>
            </Link>
            <div>SEARCH</div>
            <div>
                {user ? ( <div>Logged in</div> ) : ( <GoogleLogin onSuccess={(response)=>  console.log(response)} onError={()=> console.log('error')}/> ) }

            </div>
        </div>
    )
}

export default Navbar