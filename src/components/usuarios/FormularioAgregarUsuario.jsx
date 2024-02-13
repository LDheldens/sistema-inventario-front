import { createRef,useState } from "react";
import useUser from "../../hooks/useUser";
import Error from "../Error";
const FormularioAgregarUsuario = () => {

    const {agregarUsuario}=useUser()

    const nombreRef = createRef()
    const apellidosRef = createRef()
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const datos = {
            nombre: nombreRef.current.value,
            apellidos: apellidosRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        await agregarUsuario(datos,setErrores)
    }

    return (
        <div>
            {
                errores ?
                    errores.map((error)=>(
                        <Error
                            key={error}
                            error={error}
                        />
                    )): null
            }
            <form className="flex flex-col gap-3" onSubmit={handleSubmit} >
                <div className="sm:flex gap-2"> 
                    <div className='w-full'>
                        <label htmlFor="nombre" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Nombre:</label>
                        <input type="text" id="nombre" name='nombre' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={nombreRef}/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="apellidos" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Apellidos:</label>
                        <input type="text" id="apellidos" name='apellidos' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={apellidosRef}/>
                    </div>
                </div>
                <div className="block "> 
                    <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email:</label>
                    <input type="email" id="email" name='email' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={emailRef}/>
                    
                </div>
                <div className="block "> 
                    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Contraseña:</label>
                    <input type="password" id="password" name='password' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" ref={passwordRef}/>
                </div>
                <div className="block "> 
                    <label htmlFor="password_confirmation" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirmar Contraseña:</label>
                    <input type="password" id="password_confirmation" name='password_confirmation' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" ref={passwordConfirmationRef}/>
                </div>
                <input type="submit" value='Registrar Usuario' className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal transition-colors duration-300 hover:bg-[#6532ef]" />
            </form>
        </div>
    )
}

export default FormularioAgregarUsuario
