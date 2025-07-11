import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
const CourseSection = () => {
 const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
       <h2 className='text-3xl font-medium text-gray-800'>Explore Our Courses
           Browse top-rated courses designed by expert educators.</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-4'>Whether you're a beginner or an advanced learner, we have the right courses to help you grow your skills. Learn at your own pace, anytime, anywhere.</p>
      
      <div className='grid grid-cols-auto px-4 md:px-0 md:py-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course}   />)}
      </div>



      <Link to={'/course-list'}  onClick={()=>scrollTo(0,0)}  className='text-white border border-gray-500/30 px-10 py-2 rounded-full  bg-blue-600' >
      Show all courses</Link>
    </div>
  )
}

export default CourseSection
