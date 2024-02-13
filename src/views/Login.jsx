import { createRef, useState, useEffect } from "react";
import Error from "../components/Error";
import useUser from "../hooks/useUser";
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const {login, user, isAuth} = useUser()
    const [errores, setErrores] = useState();

    const emailRef = createRef();
    const passwordRef = createRef();

    const handleLoginSubmit = async (e) =>{
        e.preventDefault()
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        await login(datos, setErrores)
        
    }
    useEffect(()=>{
        if(isAuth){
            return navigate('/')
        }
    },[])
    return (
        <>  
            <section className='flex justify-center items-center h-screen bg-gray-100'>
                <div className="max-w-full w-11/12">

                    <article 
                        className=" flex mx-auto flex-grow max-w-[350px] flex-col p-6 shadow rounded-md text-black bg-white"
                    >
                        {
                            errores ?
                                errores.map((error)=>(
                                    <Error
                                        key={error}
                                        error={error}
                                    />
                                )): null
                        }
                        <div className="text-2xl font-bold my-3 text-violet-600 text-center">Bienvenido</div>
                        <form 
                            action='' 
                            noValidate 
                            className="flex flex-col gap-3" 
                            onSubmit={handleLoginSubmit}
                        >
                            <div className="block "> 
                                <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email:</label>
                                <input type="email" id="email" name='email' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={emailRef}/>
                                
                            </div>
                            <div className="block "> 
                                <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Contraseña:</label>
                                <input type="password" id="password" name='password' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" ref={passwordRef}/>
                            </div>
                            
                            <input type="submit" value='Iniciar Sesión' className="bg-[#7747ff] w-max uppercase m-auto px-6 py-2 rounded text-white text-sm font-normal transition-colors duration-300 hover:bg-[#6532ef]" />

                        </form>
                    </article>
                </div>
            </section>
        </>
    )
}

export default Login
