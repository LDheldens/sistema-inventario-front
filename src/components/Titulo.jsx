import React from 'react'

const Titulo = ({titulo}) => {
    return (
        <h1 
            className='text-gray-500 dark:text-white text-xl md:text-2xl lg:text-3xl text-center font-bold my-10'>
            {titulo}
        </h1>
    )
}

export default Titulo
