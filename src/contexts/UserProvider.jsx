import { createContext,useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom'
import useSWR from "swr";
import Swal from "sweetalert2";

const UserContext = createContext()


const UserProvider = ({children}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    const [usuarioDetallado, setUsuarioDetallado] = useState({});
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem('AUTH_TOKEN_INVENTARIO') ? true : false
    );
    const [modalUsuario,setModalUsuario] = useState(false)
    const [tipoModal,setTipoModal]=useState('1')
    const [cargandoData, setCargandoData] = useState(false)
    const [paginaActual,setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState('');

    const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO');
        
    const getUsuarios = async ()=>{
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/workers?page=${paginaActual}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json(); 
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const {data,isLoading,mutate} = useSWR(
        `${import.meta.env.VITE_API_URL}/workers?page=${paginaActual}`,
        getUsuarios,
        {
            revalidateOnFocus:false
        }
    )
    const actualizarDataUsuarios = () =>{
        mutate()
    }
    const obtenerUsuarioDetallado = (usuario) =>{
        setUsuarioDetallado(usuario)
    }

    const login = async (datos,setErrores)=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // body: datos
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            
            if (data.errors) {
                setErrores(Object.values(data.errors));
            } else {
                setErrores([]);
                // setLocalStorage(data.token, data.user)
                localStorage.setItem('AUTH_TOKEN_INVENTARIO', data.token);
                // setToken(data.token)
                setUser(data.user)
                setIsAuth(true)
                navigate('/')
            }
        }catch(error) {
            console.log(error);
        }
    }

    const logout = async ()=>{
        const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO')
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`,{
                method:'POST',
                headers:{
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            localStorage.removeItem('AUTH_TOKEN_INVENTARIO')
            const data = await response.json()
            console.log(data)
            if(data){
                navigate('/auth/login')
                setUser(null)
                setIsAuth(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const cambiarImagenPerfil = async (imagen) =>{
        try {
            const formData = new FormData();
            formData.append('imagen', imagen);
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}/imagen-perfil`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            console.log(data)
            // Puedes hacer algo con 'data' si es necesario
            await getUser(); // Llama a getUser después de subir la imagen
        } catch (error) {
            console.error('Error al subir la imagen: ', error.message);
        }
    }

    const getUser = async () => {
        setCargandoData(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error(`Error al obtener el usuario: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error(error.message || 'Something went wrong');
        } finally {
            setCargandoData(false);
        }
    };

    const handleUsuarioDetallado = (usuario)=>{
        setUsuarioDetallado(usuario)
    }
    const handleModalUsuario = ()=>{
        setModalUsuario(!modalUsuario)
    }
    const agregarUsuario = async (datos,setErrores) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/registro`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            if (data.errors) {
                let objetoErrores = data.errors;
  
                // Extrae los errores del password
                const erroresPassword = objetoErrores.password || [];
                delete objetoErrores.password;
              
                // Convierte el objeto de errores a un array
                const erroresGenerales = Object.values(objetoErrores);
              
                // Combina los errores generales y los errores del password
                const erroresTotales = [...erroresGenerales, ...erroresPassword];
              
                setErrores(erroresTotales);
                console.log(errores);
            } else {
                setErrores([]);
                handleModalUsuario()
                Swal.fire({
                    title: "Registrado",
                    text: "Usuario registrado de manera exitosa.",
                    icon: "success"
                });
                actualizarDataUsuarios()
            }
        }catch(error) {
            Swal.fire({
                title: "Error",
                text: 'Hubo un problema al intentar registrar el usuario.',
                icon: 'error',
            });
        }
    }
    const editarUsuario= async (datos) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/workers/${usuarioDetallado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(datos)
            });
            const data = await response.json(); // Parsear la respuesta como JSON
            if(data.errors){
                Swal.fire({
                    title: "Error",
                    text: `${data.errors}`,
                    icon: "error"
                });
            }else{
                Swal.fire({
                    title: "Guardado",
                    text: "Usuario editado exitosamente.",
                    icon: "success"
                });
                actualizarDataUsuarios()
                handleModalUsuario()
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: 'Hubo un problema al intentar registrar el usuario.',
                icon: 'error',
            });
        }

    }
    const eliminarUsuario = async (usuarioId) =>{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/workers/${usuarioId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    useEffect(()=>{
        getUser()
    },[])
    
    return (
        <UserContext.Provider
            value={{
                user,
                isAuth,
                cargandoData,
                getUser,
                login,
                logout,
                obtenerUsuarioDetallado,
                cambiarImagenPerfil,
                usuarioDetallado,
                usuarios:{
                    data:data?.data,
                    isLoading,
                    numeroPaginas:data?.meta?.last_page
                },
                paginaActual,
                setPaginaActual,
                usuarioDetallado,
                handleUsuarioDetallado,
                modalUsuario,
                handleModalUsuario,
                tipoModal,
                setTipoModal,
                agregarUsuario,
                editarUsuario,
                eliminarUsuario,
                actualizarDataUsuarios
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}
