import React,{useEffect,useState} from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'

const StudentsEnrolled = () => {

  const [enrolledStudents,setEnrolledStudents]=useState(null);

  const fetchEducatorCourses = async() =>{
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(
  ()=>{
    fetchEducatorCourses()
  },[]
  )

  return enrolledStudents ?(
    <div>
        <div className='flex flex-col items-center'>
           <table  className=''>
             <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Course Title</th>
                    <th>Date</th>
                  </tr>
             </thead>
             <tbody>
              {enrolledStudents.map((item,index)=>(
                   <tr key={index}>
                    <td>{index+1}</td>
                    <td><img src={item.student.imageUrl} alt="" />
                    <span>{item.student.name}</span>
                    </td>
                    <td>  
                      {item.courseTitle}
                    </td>
                    <td>{new Date(item.purchasedate).toLocaleDateString()}</td>
                   </tr>
              ))}
             </tbody>
           </table>      
        </div>
    </div>
  ): <p>students enrolled</p>
}

export default StudentsEnrolled
