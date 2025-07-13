import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEducatorCourses = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return enrolledStudents ? (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Students Enrolled</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border text-left">Student Name</th>
              <th className="px-4 py-2 border text-left">Course Title</th>
              <th className="px-4 py-2 border text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <img
                    src={item.student.imageUrl}
                    alt={item.student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{item.student.name}</span>
                </td>
                <td className="px-4 py-2 border">{item.courseTitle}</td>
                <td className="px-4 py-2 border">{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="text-center mt-4 text-gray-600">No students enrolled yet.</p>
  );
};

export default StudentsEnrolled;
