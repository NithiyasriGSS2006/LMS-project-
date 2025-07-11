import React,{useContext,useState} from 'react'
import {useNavigate} from  'react-router-dom'
import { AppContext } from '../../context/AppContext';
import {Line} from 'rc-progress'

const MyEnrollments = () => {
const navigate=useNavigate();
const {enrolledCourses,calculateCourseTime }=useContext(AppContext);
const [progressList,setProgressList] =useState([
 { lectureCompleted:1 ,totalLecture:4},
 {   lectureCompleted :5, totalLecture:5 },
  {   lectureCompleted :2, totalLecture:5 },
]);

  return (
    <div className='md:px-36 px-8 pt-10'>
      <h1  className='text-2xl font-semibold'>MyEnrollments</h1>
      <table className='md:table-auto  table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Time</th>
            <th className='px-4 py-3 font-semibold truncate'>finished</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody>
              {enrolledCourses.map(
                (course,index)=>(
                  <tr key={index} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                    <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
                     <div className='flex-1'>
                      <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                      <Line strokeWidth={2} percent={progressList[index] ? ((progressList[index].lectureCompleted)*100)/(progressList[index].totalLecture) : 0} ></Line>

                     </div>
                  </td>
                  <td className='px-4 py-3 max-sm:hidden'>
                    {calculateCourseTime(course)}
                  </td>
                  <td  className='px-4 py-3 max-sm:hidden'>
                   {progressList[index] && `${progressList[index].lectureCompleted}/ ${progressList[index].totalLecture}`}
                   <span> lectures</span>
                  </td>
                  <td className='px-4 py-3 max-sm:text-right'> 
                      <button onClick={()=>{navigate('/player/'+course._id)}}>{progressList[index] && progressList[index].lectureCompleted ==progressList[index].totalLecture ? 'completed' : 'on going'}</button>
              
                      </td> 
                  </tr>
                )

                
              )

              }

        </tbody>
      </table>
    </div>
  )
}

export default MyEnrollments
