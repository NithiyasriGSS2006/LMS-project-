import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { currency } = useContext(AppContext)
  const [DashboardData, setDashboardData] = useState(null);

  const fetchData = () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchData();
    console.log(DashboardData);
  }, []);


  return DashboardData ? (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
          <img src={assets.patients_icon} alt="patient icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{DashboardData.enrolledStudentsData.length}</p>
            <p className="text-gray-600">Total Enrolments</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
          <img src={assets.appointments_icon} alt="appointments icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{DashboardData.totalCourses}</p>
            <p className="text-gray-600">Total Courses</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
          <img src={assets.earning_icon} alt="earning icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-bold">{currency}{DashboardData.totalEarnings}</p>
            <p className="text-gray-600">Total Earnings</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Latest Enrollments</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Enrolled Course</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {DashboardData.enrolledStudentsData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span>{item.student.name}</span>
                </td>
                <td className="px-6 py-4">{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>

  ) : <p>dashboard</p>
};

export default Dashboard;
