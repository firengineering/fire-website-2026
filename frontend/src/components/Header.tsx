import React from 'react'
import Link from 'next/link'




const Header = () => {

  return (
    <div className="text-white">
        <div className="flex bg-blue-950 p-2 items-center">
          
          <div className="">
            <Link href="/" className='flex items-center'>
              <img src={'/favicon.png'} className="w-10 h10"/>
              <h1 className="font-bold p-3 text-xl">Venue Vendors</h1>
            </Link>
          </div>

          <ul className='flex'>
            <div className='flex items-center mr-auto ml-3'>
              <Link href="/search" className="hover:underline">
                <li className={ "rounded-3xl px-5 p-2  "}>Search</li>
              </Link>
            </div>
          </ul>
          
 
          <nav className="ml-auto">
            <ul className="flex">
            
            </ul>
          </nav>
            

        </div>
      
    </div>
  )
}

export default Header
