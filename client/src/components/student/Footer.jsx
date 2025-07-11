import React from 'react'

const Footer = () => {
  return (
 <footer class="w-full bg-gray-900 text-gray-300 pt-10 pb-6 mt-12">
  <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

   
    <div>
      <h3 class="text-xl font-semibold text-white mb-3">Learnify LMS</h3>
      <p class="text-sm leading-relaxed">
        Learnify is a modern Learning Management System designed to help educators and students manage courses, track progress, and collaborate efficiently.
      </p>
    </div>

    
    <div>
      <h4 class="text-white font-semibold mb-3">Quick Links</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-white transition">Home</a></li>
        <li><a href="#" class="hover:text-white transition">Courses</a></li>
        <li><a href="#" class="hover:text-white transition">About Us</a></li>
        <li><a href="#" class="hover:text-white transition">Contact</a></li>
      </ul>
    </div>

   
    <div>
      <h4 class="text-white font-semibold mb-3">Connect with us</h4>
      <div class="flex space-x-4">
        <a href="#" class="hover:text-white" aria-label="Twitter">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.6c-.9.4-1.8.6-2.8.8..."/></svg>
        </a>
        <a href="#" class="hover:text-white" aria-label="LinkedIn">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.4 20.4h-3.6v-5.4..."/></svg>
        </a>
        <a href="#" class="hover:text-white" aria-label="GitHub">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37..."/></svg>
        </a>
      </div>
    </div>

  </div>

 
  <div class="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
    &copy; 2025 Learnify LMS. All rights reserved.
  </div>
</footer>


  )
}

export default Footer
