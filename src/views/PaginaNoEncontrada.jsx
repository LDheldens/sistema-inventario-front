import React from 'react'
import useUser from '../hooks/useUser'
import { Link } from 'react-router-dom'

const PaginaNoEncontrada = () => {
    const {isAuth} = useUser()
    return (
        <div className='flex h-screen flex-col justify-center items-center gap-2'>
            <img src="/src/assets/404.svg" alt="" />
            <p className='text-gray-500 font-bold text-4xl text-center'>Pagína no encontrada</p>
            {
                isAuth ? (
                    <Link className='bg-violet-600 text-white p-2 rounded-md font-bold transition-colors duration-300 ease-in-out hover:bg-violet-800' to={-1}>Volver a la pagina principal</Link>
                ):(
                    <Link className='bg-violet-600 text-white p-2 rounded-md font-bold transition-colors duration-300 ease-in-out hover:bg-violet-800' to='/auth/login'>Ir a login</Link>
                )
            }
        </div>
    )
}

export default PaginaNoEncontrada
