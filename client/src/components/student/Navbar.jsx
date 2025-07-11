import React, { useContext } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
// import {assets} 
const Navbar = () => {
    const location=useLocation();
   const  isCourseListPage=location.pathname.includes('/course-list');
  const {openSignIn}= useClerk();
  const {isEducator}=useContext(AppContext);
  const navigate=useNavigate();
  const user=useUser();
  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
        {/* <img src={} alt="logo" className='w-28 lg:w-32 cursor-pointer'/>  */}
        <div></div>
        <div className='hidden md:flex items-center gap-5 text-gray-500'>
                <div className='flex items-center gap-5'>
                  {user &&
                  <>
                  <button  onClick={()=>navigate('/educator')}  >{isEducator ? 'Educator dashboard' :'Become Educator' }</button>|
                  <Link to="/my-enrollments">
                      My Enrollments
                  </Link>
                  </>
                  }
                </div> 
                 {user.isSignedIn ? <UserButton/> :
                  <button onClick= {()=> openSignIn()}   className='bg-blue-600 rounded-full text-white px-5 py-2' >
                  Create Account
                  </button>}

        </div>
   
       <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
           
               <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                  {user &&
                  <>
                  <button  onClick={()=>navigate('/educator')}  >{isEducator ? 'Educator dashboard' :'Become Educator' }</button>|
                  <Link to="/my-enrollments">
                      My Enrollments
                  </Link>
                  </>
                  }
               </div> 
                 {user ? <UserButton/> :
                  <button onClick= {()=> openSignIn()}   className='bg-blue-600 rounded-full text-white px-5 py-2' >
                  Create Account
                  </button>}

           


       </div>
        
   
    </div>
  )
}

export default Navbar
