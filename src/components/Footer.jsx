import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='p-4 text-center text-gray-400 flex justify-center items-center gap-2'>
      <span
        className='hover:text-gray-200 hover:animate-bounce'
      >
        Open source ❤️
      </span>

      <span>|</span>

      <Link
        href='/contributors'
        className='focus:outline-none hover:text-gray-200 hover:animate-bounce'
      >
        Contributors
      </Link>

      <span>|</span>

      <a
        href='https://github.com/vansh-codes/Gityzer'
        target='_blank'
        rel='noreferrer noopener'
        className='focus:outline-none hover:text-gray-200 hover:animate-bounce'
      >
        Gityzer
      </a>
    </footer>
  )
}

export default Footer