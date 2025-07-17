import Course from "../models/Course.js"

export const getAllCourse = async(req,res)=>{
      try{
          const course = await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'});
          res.json({success:true,course});
      }catch(error)
      {
          res.json({success:false,message:error.message})
      }

}


export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate({ path: 'educator' });

    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    course.courseContent.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData: course });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

