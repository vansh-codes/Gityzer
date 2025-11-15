import React from 'react'

const Loader = ({ message = 'Loading...' }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none z-50'>
            <div className='flex flex-col items-center gap-4'>
                <div className='h-12 w-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin' />
                <p className='text-sm md:text-base text-gray-200 font-medium text-center animate-pulse'>{message}</p>
            </div>
        </div>
    )
}

export default Loader