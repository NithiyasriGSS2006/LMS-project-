import { createContext,useEffect,useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from "@clerk/clerk-react"



export const AppContext=createContext()

export const AppContextProvider=(props)=> {
      const currency = import.meta.env.VITE_CURRENCY
    const [allCourses,setAllCourses] =useState([]);
    const [isEducator,setIsEducator] =useState(true);
    const [enrolledCourses,setEnrolledCourses] =useState([]);
   
     const {getToken}= useAuth()
     const {user} = useUser()
   
   
   
   
    const fetchAllCourses = async () =>{
        setAllCourses(dummyCourses);
    }
    const calculateRating =(course)=>
    {
        if(!course.courseRatings ||course.courseRatings.length ===0)
            return 0;
        let totalRating =0;
        course.courseRatings.forEach(rating =>{
            totalRating +=rating.rating
        })
        return totalRating/course.courseRatings.length
    }

 const calculateChapterTime =(chapter)=>{
    let time=0;
    chapter.chapterContent.map((lecture)=>{
        time+=lecture.lectureDuration

    })
    return humanizeDuration(time*60*1000,{units:["h","m"]})

 }

 const calculateCourseTime=(course)=>{
    let time=0;
    course.courseContent.map((chapter)=>
        chapter.chapterContent.map((lecture) => time+=lecture.lectureDuration)
    );
     return humanizeDuration(time*60*1000,{units:["h","m"]})

 }

 const calculateTotalLecture=(course)=>{
    let totalLecture=0;
       course.courseContent.forEach((chapter)=>{
        if(Array.isArray(chapter.chapterContent))
            totalLecture+=chapter.chapterContent.length
 });
 return totalLecture;
 }

const fetchEnrollCourses = async()=>{
    setEnrolledCourses(dummyCourses);
}

    useEffect(()=>{
        fetchAllCourses();
        fetchEnrollCourses();
    },[]);

    const  logToken = async ()=>{
        console.log(await getToken());
    }

    useEffect(()=>{
        if(user)
        {
            logToken()
        }}
    ,[user])



      const value={currency,allCourses, calculateRating,isEducator,
        setIsEducator,calculateChapterTime, calculateCourseTime,calculateTotalLecture,enrolledCourses,setEnrolledCourses,fetchEnrollCourses}

return(
 <AppContext.Provider value={value}>
    {props.children}

 </AppContext.Provider>

);


}