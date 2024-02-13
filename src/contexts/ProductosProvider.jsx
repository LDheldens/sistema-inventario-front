import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";

const ProductosContext = createContext()

const ProductosProvider = ({children}) => {
    
    const [modalProducto, setModalProducto] = useState(false)

    const [tipoModal, setTipoModal] = useState('1')
    const [productoDetallado,setProductoDetallado] = useState({})
    const [paginaActual,setPaginaActual] = useState(1)
    const [busqueda, setBusqueda] = useState('');

    const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO');

    const getProductos = async (busqueda='',paginaActual) => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/productos?s=${busqueda}&page=${paginaActual}`, {
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
        `${import.meta.env.VITE_API_URL}/productos?s=${busqueda}&page=${paginaActual}`, 
        ()=> getProductos(busqueda,paginaActual),
        {
            revalidateOnFocus:false,
        }
        
    )

    const actualizarDataProductos=()=>{
        mutate()
    }

    const eliminarProducto = async (productoId) =>{
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/${productoId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    const agregarProducto = async (datos,setErrores) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/productos`, {
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: datos
            });

            const data = await response.json();
            
            if (data.errors) {
                setErrores(Object.values(data.errors))
            } else {
                Swal.fire({
                    title: "Registrado",
                    text: "Producto registrado de manera exitosa.",
                    icon: "success"
                });
                setErrores([]);
                actualizarDataProductos()
                handleModalProducto()
            }
        }catch(error) {
            console.log('Ocurrió un error')
            console.log(error);
        }
    }
    const actualizarProducto = async (datos,setErrores) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/${productoDetallado.id}/actualizar-producto`, {
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: datos
            });

            const data = await response.json();
            console.log(data)
            if (data.errors) {
                setErrores(Object.values(data.errors))
            } else {
                setErrores([]);
                toast.success(data.message)
                handleModalProducto()
                actualizarDataProductos()
            }
        }catch(error) {
            console.log('Ocurrió un error')
            console.log(error);
        }
    }
    const handleModalProducto = () =>{
        setModalProducto(!modalProducto)
    }

    const handleProductoDetallado = (producto)=>{
        setProductoDetallado(producto)
    }

    return (
        <ProductosContext.Provider
            value={{
                productos:{
                    data:data?.data,
                    isLoading,
                    numeroPaginas:data?.meta?.last_page || 1
                },
                actualizarDataProductos,
                eliminarProducto,
                agregarProducto,
                actualizarProducto,
                modalProducto,
                handleModalProducto,
                tipoModal,
                setTipoModal,
                busqueda,
                setBusqueda,
                productoDetallado,
                setProductoDetallado,
                handleProductoDetallado,
                setPaginaActual,
            }}
        >
            {children}
        </ProductosContext.Provider>
    )
}

export {ProductosContext, ProductosProvider}
