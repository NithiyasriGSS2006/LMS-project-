import React from 'react'
import { assets } from '../../assets/assets'
const CallToAction = () => {
  return (
    <div>
      
    <button className='px-10 py-3 rounded-md text-white bg-blue-600'></button>
    <button className='flex items-center gap-2'>Get Started
    <img src={assets.arrow_icon} alt="arrow_icon" /></button>
    </div>

  )
}

export default CallToAction
