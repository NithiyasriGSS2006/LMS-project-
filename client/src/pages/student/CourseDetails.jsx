import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import Youtube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, calculateRating, calculateChapterTime, currency, calculateCourseTime, calculateTotalLecture } = useContext(AppContext);
  const [courseDetail, setCourseDetail] = useState(null);
  const [openLecture, setOpenLecture] = useState({});
  const [videoPlay,setVideoPlay] = useState(null);


  useEffect(() => {
    const tempCourse = allCourses.find((item) => item._id === id);
    setCourseDetail(tempCourse);
  }, [allCourses, id]);

  const toggleLecture = (index) => {
    setOpenLecture((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return courseDetail ? (
    <div className="p-6 max-w-7xl mx-auto">

      <div className="flex flex-col md:flex-row gap-6">

        <div className="md:w-2/3 w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseDetail.courseTitle}</h1>
          <p
            className="text-gray-700 text-sm mb-4"
            dangerouslySetInnerHTML={{ __html: courseDetail.courseDescription.slice(0, 200) + '...' }}
          ></p>

          <div className="w-full border border-gray-200 shadow-md bg-white rounded-xl p-4 my-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Summary</h3>


            <p className="text-yellow-600 font-bold text-2xl">
              {calculateRating(courseDetail).toFixed(1)}
            </p>


            <div className="flex mb-1">
              {[...Array(5)].map((_, i) => {
                const rating = calculateRating(courseDetail);
                return (
                  <span key={i}>{i < Math.floor(rating) ? '⭐' : '☆'}</span>
                );
              })}
            </div>


            <p className="text-gray-500 text-sm">
              {courseDetail.courseRatings.length}{' '}
              {courseDetail.courseRatings.length > 1 ? 'ratings' : 'rating'}
            </p>
          </div>


          <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Structure</h2>

          <div className="space-y-4">
            {courseDetail.courseContent.map((chapter, index) => (
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
                          {lecture.isPreviewFree && (
                            <p className="text-xs text-green-500" onClick={()=>{setVideoPlay(
                              {videoId : lecture.lectureUrl.split('/').pop()}
                            )}}>Preview Available</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="border border-gray-300 rounded-xl shadow-md p-4 w-full md:w-1/3 bg-white sticky top-20">
           { videoPlay  ? <Youtube videoId={videoPlay.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-video'></Youtube>            :
          <img
            src={courseDetail.courseThumbnail}
            alt="course thumbnail"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />}


          <div className="flex items-center gap-3 mb-4">
            <img src={assets.time_left_clock_icon} alt="time left clock icon" className="w-5 h-5" />
            <p className="text-gray-500 text-sm">
              <span className="font-medium text-red-600">5 days</span> left at this price!
            </p>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-semibold text-green-700">
              {currency}
              {(courseDetail.coursePrice - courseDetail.discount * courseDetail.coursePrice / 100).toFixed(2)}
            </p>
            <p className="line-through text-sm text-gray-500">
              {currency}
              {courseDetail.coursePrice}
            </p>
            <p className="text-sm text-red-600 font-semibold">{courseDetail.discount}% off</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={assets.time_clock_icon} alt="clock" className="w-5 h-5" />
              <p className="text-sm text-gray-700">Duration: {calculateCourseTime(courseDetail)}</p>
            </div>

            <div className="flex items-center gap-3">
              <img src={assets.time_clock_icon} alt="clock" className="w-5 h-5" />
              <p className="text-sm text-gray-700">Lectures: {calculateTotalLecture(courseDetail)}</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
