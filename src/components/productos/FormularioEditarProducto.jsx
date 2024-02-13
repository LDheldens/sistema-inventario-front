import useProductos from "../../hooks/useProductos"
import { useState, createRef } from "react";
import useCategorias from "../../hooks/useCategorias";
import Error from "../Error";

const FormularioEditarProducto = () => {

    const {productoDetallado,actualizarProducto} = useProductos()
    const {categorias} = useCategorias()
    const [errores, setErrores] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const imagenRef = createRef();
    const [datosEditarProducto, setDatosEditarProducto] = useState({
        nombre: productoDetallado?.nombre,
        stock: productoDetallado?.stock,
        precio: productoDetallado?.precio,
        categoria: productoDetallado?.categoria?.id,
    });

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
    const handleSubmitEditarProducto = async (e) =>{
        e.preventDefault();

        const datos = new FormData();
        datos.append('nombre', datosEditarProducto.nombre);
        datos.append('stock', datosEditarProducto.stock);
        datos.append('precio', datosEditarProducto.precio);
        datos.append('categoria', datosEditarProducto.categoria);
        datos.append('imagen', imagenRef.current.files[0]);

        await actualizarProducto(datos,setErrores)
    }

    return (
        <article>
            <form 
                className="flex flex-col gap-3" 
                onSubmit={handleSubmitEditarProducto}
            >
                {errores
                    ? errores.map((error, index) => <Error key={index} error={error} />)
                    : null}
                <div className="w-full">
                    <label
                        htmlFor="nombre"
                        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                    >
                        Nombre Producto:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                        value={datosEditarProducto.nombre}
                        onChange={(e) =>
                            setDatosEditarProducto({
                            ...datosEditarProducto,
                            nombre: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="sm:flex gap-2">
                    <div className="sm:w-1/2">
                    <label
                        htmlFor="stock"
                        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                    >
                        Stock:
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                        value={datosEditarProducto.stock}
                        onChange={(e) =>
                        setDatosEditarProducto({
                            ...datosEditarProducto,
                            stock: e.target.value,
                        })
                        }
                    />
                    </div>
                    <div className="sm:w-1/2">
                    <label
                        htmlFor="precio"
                        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                    >
                        Precio:
                    </label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                        value={datosEditarProducto.precio}
                        onChange={(e) =>
                        setDatosEditarProducto({
                            ...datosEditarProducto,
                            precio: e.target.value,
                        })
                        }
                    />
                    </div>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="categoria"
                        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                        >
                        Categoria:
                    </label>
                    <select
                        name="categoria"
                        id="categoria"
                        className="w-full rounded border border-gray-200 p-2 text-center"
                        value={datosEditarProducto.categoria}
                        onChange={(e) =>
                            setDatosEditarProducto({
                            ...datosEditarProducto,
                            categoria: e.target.value,
                            })
                        }
                    >
                        <option value="">-- Seleccione una categoria --</option>
                        {categorias?.data
                            ? categorias?.data?.map((categoria) => (
                                <option 
                                    value={categoria.id} 
                                    key={categoria.id}
                                >
                                    {categoria?.nombre}
                                </option>
                            ))
                            : null}
                    </select>
                </div>
                <div className="sm:flex items-center gap-2">
                    <div className="sm:w-3/4 mb-2 sm:mb-0 ">
                    <label
                        htmlFor="imagenProducto"
                        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                    >
                        Imagen Producto:
                    </label>
                    <input
                        type="file"
                        id="imagenProducto"
                        name="imagenProducto"
                        accept="image/*"
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black  ring-gray-900 outline-0"
                        onChange={handleImageChange}
                        ref={imagenRef}
                    />
                    </div>
                    <div className="sm:w-1/4">
                    {imagePreview ? (
                        <img
                        className="w-24 shadow-md object-cover rounded mx-auto border border-gray-400 p-2"
                        src={imagePreview}
                        alt="Vista previa de la imagen"
                        />
                    ) : (
                        <img
                        className="w-24 shadow-md object-cover rounded mx-auto border border-gray-400 p-2"
                        src={`http://127.0.0.1:8000/storage/images/productos/${productoDetallado.imagen}`}
                        alt="Vista previa de la imagen"
                        />
                    )}
                    </div>
                </div>

                <input
                    type="submit"
                    value="Guardar cambios"
                    className="bg-[#7747ff] w-max m-auto px-6 py-2 my-2 rounded text-white text-sm font-normal transition-colors duration-300 hover:bg-[#6532ef]"
                />
            </form>
        </article>
    )
}

export default FormularioEditarProducto
