import { createContext,useState, useEffect } from "react"
import useSWR from "swr";
import Swal from "sweetalert2";


const CategoriasContext = createContext()

const CategoriasProvider = ({children}) => {

    const [paginaActual,setPaginaActual] = useState(1)
    const [modalCategoria, setModalCategoria] = useState(false)
    const [tipoModal, setTipoModal] = useState('1')
    const [categoriaDetallada,setCategoriaDetallada]=useState({})
    

    const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO');

    const getCategorias = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias?page=${paginaActual}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json(); // Parsear la respuesta como JSON

        return data
    }

    const {data,isLoading,mutate} = useSWR(
        `${import.meta.env.VITE_API_URL}/categorias?page=${paginaActual}`,
        getCategorias,
        {
            revalidateOnFocus:false,
        }
    )
    const getDistribucionProductos = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias/distribucion-productos`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      
        const data = await response.json();

        return data;
      };
      
      const { data: DataDistribucionProductos, isLoading: isLoadingDistribucionProductos,mutate:actualizarDataDistribucion } = useSWR(
        `${import.meta.env.VITE_API_URL}/categorias/distribucion-productos`,
        getDistribucionProductos,
        {
          revalidateOnFocus: false,
        }
      );
      
    const agregarCategoria= async (datos,setErrores) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias`,{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(datos)
            })

            const data = await response.json();
            if(data.errors){
                const erroresArray = data.errors
                setErrores(Object.values(erroresArray))
                
            }else {
                Swal.fire({
                    title: "Registrado",
                    text: "Categoria registrada de manera exitosa.",
                    icon: "success"
                });
                setErrores([]);
                handleModalCategoria()
                actualizarDataCategorias()
                setUpdateTrigger(1)
            }

            
        } catch (error) {
            console.error(error)
        }
    }
    const editarCategoria = async (datos,setErrores) =>{

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias/${categoriaDetallada.id}`,{
                method:'PUT',
                headers:{
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(datos)
            })

            const data = await response.json();
            
            
            if(data.errors){
                const erroresArray = data.errors
                setErrores(Object.values(erroresArray))
            }else{
                Swal.fire({
                    title: "Guardado",
                    text: "Categoria editada exitosamente.",
                    icon: "success"
                });
                handleModalCategoria()
                actualizarDataCategorias()
            }

        }catch (error) {
            console.error(error)
        }
    }
    const eliminarCategoria = async (categoriaId) =>{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias/${categoriaId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    const actualizarDataCategorias=()=>{
        mutate()
    }
    const handleModalCategoria = () =>{
        setModalCategoria(!modalCategoria)
    }
    const handleCategoriaDetallada = (categoria)=>{
        setCategoriaDetallada(categoria)
    }

    return (
        <CategoriasContext.Provider
            value={{
                categorias:{
                    data:data?.categorias?.data,
                    isLoading,
                    numeroPaginas:data?.categorias?.last_page || 1
                },
                modalCategoria,
                handleModalCategoria,
                tipoModal,
                setTipoModal,
                handleCategoriaDetallada,
                agregarCategoria,
                editarCategoria,
                eliminarCategoria,
                actualizarDataCategorias,
                paginaActual,
                setPaginaActual,
                categoriaDetallada,
                distribucionProductos:{
                    data:DataDistribucionProductos?.distribucion,
                    isLoading:isLoadingDistribucionProductos,
                    actualizarData:actualizarDataDistribucion
                },
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export  {CategoriasContext,CategoriasProvider }