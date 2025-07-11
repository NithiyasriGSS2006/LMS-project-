import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center  w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-home-heading-large text-home-heading-small relative text-gray-800 font-bold max-w-3xl mx-auto'>

        Upstill your self with courses desingned to<span className='text-blue-600'> help you grow.</span>
      </h1>
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>"Learn Anytime, Anywhere with Our Smart Learning Platform."
        Join courses, connect with instructors, and grow your skills at your own pace.
      </p>
      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>"Digital Learning Made Easy."
        Manage courses, access materials, and track growth – all from your dashboard.
      </p>
       <SearchBar/>
    </div>
  )
}

export default Hero

