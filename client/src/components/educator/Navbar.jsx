import React from 'react'
import {assets,} from '../../assets/assets'
import {UserButton ,useUser} from '@clerk/clerk-react'
const Navbar = () => {
  
const {user} = useUser()


  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
     <div></div>
     <div className='flex items-center gap-5 text-gray-500 relative'>
       <p>welcome creaters</p>
       {user ? <UserButton/> : <img className='max-w-8' src={assets.profile_img} />}
       </div>
    </div>
  )
}

export default Navbar
