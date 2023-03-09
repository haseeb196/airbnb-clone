import React from 'react'
import Search from '@mui/icons-material/Search';
const Header = () => {
  return (
   <header className='p-4 flex'>
      <a href="" className='flex flex-row gap-1 items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 -rotate-90">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
       <span className='font-bold text-xl'>airbnb</span>
      </a>
      <div className='flex'>
         <div>Anywhere</div>
         <div>Any week</div>
         <div>Add guests</div>
         <button>
            <Search />
         </button>
      </div>
   </header>
  )
}

export default Header