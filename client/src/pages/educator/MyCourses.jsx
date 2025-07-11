import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm uppercase">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Earnings</th>
                <th className="px-4 py-2">Students</th>
                <th className="px-4 py-2">Published On</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {courses.map((course) => (
                <tr key={course._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <img
                      src={course.courseThumbnail}
                      alt="Course"
                      className="w-16 h-10 object-cover rounded"
                    />
                    <span>{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-2">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-2">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-2">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading courses...</p>
  );
};

export default MyCourses;
 