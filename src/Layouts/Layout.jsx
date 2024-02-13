import { Outlet,useNavigate} from "react-router-dom"
import { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import styled from 'styled-components'
import useGlobalApp from "../hooks/useGlobalApp"
import { rutaProtegida } from "../utils/funciones"
import useUser from "../hooks/useUser"

const Contenedor = styled.section`
    display: grid;
    transition: grid-template-columns 0.3s ease-in-out;
    grid-template-columns: 80px auto ;

    &.activo{
        grid-template-columns: 180px auto ;
    }

`

const Layout = () => {

    const navigate = useNavigate()

    const {isOpen} = useGlobalApp()
    const {user,isAuth} = useUser()

    useEffect(()=>{
        rutaProtegida(navigate, user, isAuth)
    },[])

    return (
        <>
            <Contenedor className={`sidebar ${isOpen ? 'activo': ''}`}>
                <Sidebar/>
                <main className='p-2 md:p-5 w-full overflow-y-auto h-screen bg-gray-100 dark:bg-gray-400'>
                    <Outlet/>
                </main>
            </Contenedor>
        </>
    )
}

export default Layout
