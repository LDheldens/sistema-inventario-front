import { createRef, useState } from "react"
import useCategorias from "../../hooks/useCategorias"
import Error from "../Error"

const FormularioAgregarCategoria = () => {

    const {agregarCategoria}=useCategorias()

    const nombreRef = createRef()
    const descripcionRef = createRef()

    const [errores,setErrores]=useState([])

    const handleSubmit = async (e) =>{

        const datosRegistroCategoria = {
            nombre: nombreRef.current.value,
            descripcion: descripcionRef.current.value,
        }

        e.preventDefault()
        await agregarCategoria(datosRegistroCategoria,setErrores)
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
                <div className='mb-3 w-full'>
                    <label htmlFor="nombre" className="block text-gray-600 cursor-text text-sm font-normal mb-2">Nombre Categoria:</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name='nombre' 
                        ref={nombreRef}
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
                    />
                </div>
                <div className='w-full mb-3'>
                    <label htmlFor="descripcion" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Descripción:</label>
                    <textarea id="descripcion" name='descripcion ' className="rounded border min-h-[100px] border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={descripcionRef}></textarea>
                   
                </div>
            
                <input 
                    type="submit" 
                    value='Agregar Categoria' 
                    className="bg-[#7747ff] font-bold w-full m-auto px-6 py-2 rounded text-white text-sm transition-colors duration-300 hover:bg-[#6532ef]" 
                />
            </form>
        </div>
    )
}

export default FormularioAgregarCategoria
