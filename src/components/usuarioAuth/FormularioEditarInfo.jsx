import useUser from "../../hooks/useUser"
import { useState } from "react";
import useGlobalApp from "../../hooks/useGlobalApp";
import Error from "../Error";
import { toast } from 'react-toastify'

const FormularioEditarInfo = () => {
    const {user, getUser} = useUser()
    const {nombre, apellidos, email} = user;

    const {handleModalUser} = useGlobalApp()

    const [errores, setErrores] = useState([])
    const [datosUsuario, setDatosUsuario] = useState(
        {
            nombre,
            apellidos,
            email
        }
    );

    const handleSubmit =async (e) =>{
        e.preventDefault()
        try {
            const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO');
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/user/update-info`,{
                method:'PUT',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(datosUsuario)
            })
            const resultado = await respuesta.json()
            if(resultado.errors){
                const erroresArray = Object.values(resultado.errors);
                setErrores(erroresArray)
                return
            }
            toast.success('Información actualizada')
            handleModalUser()
            setErrores([])
            getUser()
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div>
            <form className='w-full' onSubmit={handleSubmit}>
                    {
                        errores ? (
                            errores.map((error,key)=>(
                                <Error
                                    error={error}
                                    key={key}
                                />
                            ))
                        ) : null
                    }
                    <div className="sm:flex gap-2 mb-3 w-full "> 
                        <div className='mb-3 w-full'>
                            <label htmlFor="nombre" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Nombre:</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name='nombre' 
                                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
                                
                                value={datosUsuario.nombre}
                                onChange={(e) => setDatosUsuario({ ...datosUsuario, nombre: e.target.value })}

                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="apellidos" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Apellidos:</label>
                            <input 
                                type="text" 
                                id="apellidos" 
                                name='apellidos' 
                                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                                value={datosUsuario.apellidos}
                                onChange={(e) => setDatosUsuario({ ...datosUsuario, apellidos: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="block mb-3"> 
                        <label htmlFor="email" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name='email' 
                            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
                            value={datosUsuario.email}
                            onChange={(e) => setDatosUsuario({ ...datosUsuario, email: e.target.value })}
                        />
                        
                    </div>
                    <input 
                        type="submit" 
                        value='Guardar Cambios' 
                        className="bg-[#7747ff] font-bold w-full m-auto px-6 py-2 rounded text-white text-sm transition-colors duration-300 hover:bg-[#6532ef]" 
                    />
                </form>
        </div>
    )
}

export default FormularioEditarInfo
