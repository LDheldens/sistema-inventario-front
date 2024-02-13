import React from 'react'

const Error = ({error}) => {
    return (
        <div 
            className='p-1 bg-red-500 mb-[2px] text-white text-center rounded-md text-sm'
        >
            {error}
        </div>
    )
}

export default Error
