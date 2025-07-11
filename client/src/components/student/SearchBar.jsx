import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
const SearchBar = ({data}) => {
    const navigate=useNavigate();
     const [input ,setInput] =useState(data ? data : '');
    const handleSubmit=(e)=>{
       e.preventDefault()
        navigate('/course-list/'+input);
    }

    
  return (
    <div>             
          <form onSubmit={handleSubmit} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'> 
            <span role="img" aria-label="search" className='md:w-auto w-10 px-3'>🔍</span>
            <input type="text"  onChange={(e)=>{setInput(e.target.value)}}  value={input} placeholder='search courses'  classname='w-full h-full outline-none text-gray-500/80'  />
            <button type='submit' className='bg-blue-600 rounded-full text-white md:px-10 px-7 md:py-3 py-2 mx-1 '>Search</button>
          </form>
    </div>
  )
}

export default SearchBar
