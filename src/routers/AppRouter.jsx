import {Route, Routes } from "react-router-dom";
import Inicio from "../views/Inicio";
import Categorias from "../views/Categorias";
import Login from "../views/Login";
import Productos from '../views/Productos'
import Usuarios from '../views/Usuarios'
import Layout from "../Layouts/Layout";
import RutasProtejidas from "../components/RutasProtejidas";
import useUser from "../hooks/useUser";
import PantallaDeCarga from "../components/PantallaDeCarga";
import Perfil from "../views/Perfil";
import PaginaNoEncontrada from "../views/PaginaNoEncontrada";

const AppRouter = () => {
    
    const {user, cargandoData} = useUser()

    return (
            <>
            {/* {cargandoData && <PantallaDeCarga/>} */}
            <Routes>
                {/* <Route path="/" element={<Layout/>}>
                    <Route 
                        element={<RutasProtejidas user={user} /> } 
                        >
                        <Route 
                            index
                            element={<Inicio/>}
                        />
                        <Route 
                            path="/usuarios"
                            element={<Usuarios/>}
                        />
                        <Route 
                            path="/categorias"
                            element={<Categorias/>}
                        />
                        <Route 
                            path="/productos"
                            element={<Productos/>}
                        />
                        <Route 
                            path="/usuarios/:usuario"
                            element={<Perfil/>}
                        />
                    </Route>
                </Route> */}
                <Route path="/" element={<Layout/>}>
                    <Route 
                        index
                        element={<Inicio/>}
                    />
                    <Route 
                        path="/usuarios"
                        element={<Usuarios/>}
                    />
                    <Route 
                        path="/categorias"
                        element={<Categorias/>}
                    />
                    <Route 
                        path="/productos"
                        element={<Productos/>}
                    />
                    <Route 
                        path="/usuarios/:usuario"
                        element={<Perfil/>}
                    />

                </Route>
                <Route 
                    path="/auth/login"
                    element={<Login/>}
                />
                <Route path="*" element={<PaginaNoEncontrada />} />
            </Routes>
            </>
            
    )
}

export default AppRouter
