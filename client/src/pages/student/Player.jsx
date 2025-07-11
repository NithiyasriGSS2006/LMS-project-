import React from 'react'
import { useContext,useEffect,useState} from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
const {courseId}=useParams();
const {enrolledCourses,calculateChapterTime} = useContext(AppContext);
const [courseDetail,setCourseDetail]= useState({});
const [openLecture,setOpenLecture]=useState({});
const [videoPlay,setVideoPlay] = useState(null);

const toggleLecture=(index)=>{
   setOpenLecture(
    (prev) =>({
      ...prev,[index]: !prev[index]
    })
   )

}


useEffect(
  ()=>{
      const course = enrolledCourses.find(course => course._id === courseId);
  if (course) setCourseDetail(course);
  },[courseId,enrolledCourses]
);

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course structure</h2>
          <div className="space-y-4">
            {Array.isArray(courseDetail.courseContent) && courseDetail.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-200 shadow-sm bg-white rounded-xl">

                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer select-none bg-gray-50 hover:bg-gray-100 rounded-t-xl"
                  onClick={() => toggleLecture(index)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                      className={`w-4 h-4 transform transition-transform duration-300 ${openLecture[index] ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                    <p className="font-medium text-gray-800 text-base">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>


                <div
                  className={`${openLecture[index] ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden transition-all duration-300 bg-white`}
                >
                  <ul className="px-6 py-3 space-y-2">
                    {chapter.chapterContent.map((lecture, lecIndex) => (
                      <li key={lecIndex} className="flex gap-3 items-start">
                        <img src={assets.play_icon} alt="play icon" className="w-5 h-5 mt-1" />
                        <div className="text-sm">
                          <p className="font-medium">{lecture.lectureTitle}</p>
                          {lecture.lectureUrl && (
                            <p className="text-xs text-green-500" onClick={() => 
                              setVideoPlay(
                                { ...lecture, chapter : index+1,lecture:lecIndex+1}
                              )
                            }>Watch</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

           <div className='flex items-center gap-2 py-3 mt-10'>
                 <h1 className='text-xl font-bold'> Rate this Course</h1>
                 <Rating initialRating={0} />
           </div>

        </div>
        
      
      <div className='md:mt-10 w-full'>
           {videoPlay ? (
            <div className='w-full'>
              <YouTube videoId={videoPlay.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
              <div className='flex justify-between items-center mt-1'>
                <p>{videoPlay.chapter}.{videoPlay.lecture} {videoPlay.lectureTitle}</p>
                <button className='text-blue-600'>{ false ? 'completed' :'mark complete' }</button>
              </div>    
            </div>
           ): <img src={courseDetail ? courseDetail.courseThumbnail : ' '} alt=""   />
           }

           </div>
      </div>
      <Footer/>
    </>
  )
}

export default Player
