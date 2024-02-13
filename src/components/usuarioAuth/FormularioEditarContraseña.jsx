import { createRef, useState } from "react"
import useUser from "../../hooks/useUser"
import useGlobalApp from "../../hooks/useGlobalApp"
import { toast } from 'react-toastify'
import Error from "../Error"

const FormularioEditarContraseña = () => {

    const {getUser} = useUser()
    const {handleModalUser} = useGlobalApp()

    const passwordRef = createRef()
    const newPasswordRef = createRef()
    const newPasswordConfirmationRef = createRef()

    const [errores, setErrores] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const datos = {
            password: passwordRef.current.value,
            newPassword: newPasswordRef.current.value,
            newPasswordConfirmation: newPasswordConfirmationRef.current.value,
        }
        try {
            const token = localStorage.getItem('AUTH_TOKEN_INVENTARIO')
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/user/update-password`,{
                method:'PUT',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(datos)

            })
            const resultado = await respuesta.json()
            if(resultado.errors){
                const erroresArray = Object.values(resultado.errors);
                setErrores(erroresArray)
                return;
            }
            toast.success('Información actualizada')
            getUser()
            handleModalUser()
            setErrores([])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <article>
            <form onSubmit={handleSubmit}>
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
                <div className="block mb-3"> 
                    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Contraseña Actual:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name='password' 
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
                        ref={passwordRef}
                    />
                </div>
                <div className='sm:flex mb-3 gap-3'>
                    <div className='mb-3 w-full'> 
                        <label htmlFor="new_password" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Nueva Contraseña:</label>
                        <input 
                            type="password" 
                            id="new_password"  
                            name='new_password' 
                            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
                            ref={newPasswordRef}
                        />
                    </div>
                    <div className='w-full'> 
                        <label htmlFor="new_passwordConfirmation" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Confirmar Contraseña:</label>
                        <input 
                            type="password" 
                            id="new_passwordConfirmation"  
                            name='new_passwordConfirmation' 
                            className="rounded border border-gray-200 text-sm w-full font-normal text-black appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
                            ref={newPasswordConfirmationRef}
                        />
                    </div>
                </div>
                <input 
                    type="submit" 
                    value='Guardar Cambios' 
                    className="bg-[#7747ff] font-bold w-full m-auto px-6 py-2 rounded text-white text-sm  transition-colors duration-300 hover:bg-[#6532ef]" 
                />
            </form>
        </article>
    )
}

export default FormularioEditarContraseña
