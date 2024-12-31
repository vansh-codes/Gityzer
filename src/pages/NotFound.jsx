import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-b bg-transparent flex items-center justify-center px-4'>
      <div className='max-w-4xl w-full flex flex-col md:flex-row items-center text-center md:text-left'>
        {/* Left side image */}
        <div className='md:w-1/2 mb-8 md:mb-0 md:mr-8 flex justify-center items-center'>
          <Image
            src='/Githuberror404.png'
            alt='Not Found Illustration'
            className='rounded-lg'
            height={312}
            width={312}
          />
        </div>

        {/* Right side content */}
        <div className='md:w-1/2'>
          <h1 className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-widest'>
            Oops!
          </h1>

          <h2 className='text-2xl font-semibold text-white mb-4'>
            The page you're looking for doesn't exist.
          </h2>

          <p className='text-lg text-white mb-6'>
            Looks like you've wandered into unknown acount. Let's get you back to home!
          </p>

          <div>
            <Link href='/'>
              <button className='bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300'>
                Go back to homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
