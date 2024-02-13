import { useState, createRef } from "react";
import useProductos from "../../hooks/useProductos";
import useCategorias from "../../hooks/useCategorias";
import Error from "../Error";
import Swal from "sweetalert2";

const FormularioAgregarProducto = () => {

    const {agregarProducto} = useProductos()
    const {categorias} = useCategorias()

    const [errores, setErrores] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const nombreRef = createRef()
    const precioRef = createRef()
    const stockRef = createRef();
    const categoriaRef = createRef();
    const imagenRef = createRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //La clase FileReader se utiliza para leer contenido de archivos de manera asíncrona.
            const reader = new FileReader();
            //readAsDataURL genera una URL de datos (data URL) en formato base64 para la imagen seleccionada. Esta URL de datos se puede usar directamente en el atributo src de una etiqueta <img>
            reader.readAsDataURL(file);
            //onload se refiere a un evento que se dispara cuando la operación de lectura de archivos se completa con éxito.
            reader.onload = (e) => {
                //Se está actualizando el estado de imagePreview con el resultado de la carga de la imagen. El e.target.result contiene los datos de la imagen leída
                setImagePreview(e.target.result);
            };

        } else {
            setImagePreview(null);
        }
    };
    const handleSubmitAgregarProducto = async (e) =>{
        e.preventDefault();
        const datos = new FormData();

        datos.append('nombre', nombreRef.current.value);
        datos.append('stock', stockRef.current.value);
        datos.append('precio', precioRef.current.value);
        datos.append('categoria', categoriaRef.current.value);
        datos.append('imagen', imagenRef.current.files[0]);

        await agregarProducto(datos,setErrores)
    }
  return (
    <form 
        className="flex flex-col gap-3" 
        onSubmit={handleSubmitAgregarProducto}
    >
            {
                errores ? (
                    errores.map((error,index)=>(
                        <Error
                            key={index}
                            error={error}
                        />

                    ))
                ) : null
            }
            <div className='w-full'>
                <label htmlFor="nombre" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Nombre Producto:</label>
                <input type="text" id="nombre" name='nombre' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={nombreRef}/>
            </div>
            <div className="sm:flex gap-2"> 
                <div className='sm:w-1/2'>
                    <label htmlFor="stock" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Stock:</label>
                    <input type="number" id="stock" name='stock' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={stockRef}/>
                </div>
                <div className="sm:w-1/2"> 
                    <label htmlFor="precio" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Precio:</label>
                    <input type="number" id="precio" name='precio' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" ref={precioRef}/>
                </div>
            </div>
            <div className="w-full"> 
                    <label htmlFor="categoria" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Categoria:</label>
                    <select 
                        name="categoria" 
                        id="categoria"
                        className='w-full rounded border border-gray-200 p-2 text-center'
                        ref={categoriaRef}
                    >
                        <option value="">-- Seleccione una categoria --</option>
                        {
                            categorias?.data?.map(categoria =>(
                                <option 
                                    key={categoria.id} 
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </option>
                            ))
                        }
                    </select>
                </div>
            <div className="sm:flex items-center gap-2">
                <div className="sm:w-3/4 mb-2 sm:mb-0 " > 
                    <label htmlFor="imagenProducto" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Imagen Producto:</label>
                    <input 
                        type="file" 
                        id="imagenProducto" 
                        name='imagenProducto' 
                        accept="image/*" 
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black  ring-gray-900 outline-0" 
                        onChange={handleImageChange}
                        ref={imagenRef}
                    />
                </div>
                <div className='sm:w-1/4'>
                    {
                        imagePreview ? (
                            <img 
                                className='w-24 shadow-md object-cover rounded mx-auto border border-gray-400 p-2' 
                                src={imagePreview} alt="Vista previa de la imagen" 
                            />
                        ) : null
                    }
                </div>
            </div>

            <input type="submit" value='Registrar Producto' className="bg-[#7747ff] w-max m-auto px-6 py-2 my-2 rounded text-white text-sm font-normal transition-colors duration-300 hover:bg-[#6532ef]" />
        </form>
  )
}

export default FormularioAgregarProducto
