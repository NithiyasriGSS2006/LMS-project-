import React from 'react'
import microsoft from '../../assests2/microsoft.png';
 import google from '../../assests2/google.png';
 import amazon from '../../assests2/amazon.png';
import apple from '../../assests2/apple.png';
const Companies = () => {
  return (
    <div classname='pt-16'>
          <p className='mt-16 text-base text-gray-500'>Collaborted companies</p>
          <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        <img src={microsoft} alt="Microsoft" className="w-2 h-10 md:w-28" />
        <img src={google} alt="Google" className="w-20 md:w-28" />
        <img src={amazon} alt="Amazon" className="w-20 md:w-28" />
        <img src={apple} alt="Apple" className="w-0 h-10 md:w-28" />
          </div>
    </div>
  )
}

export default Companies
