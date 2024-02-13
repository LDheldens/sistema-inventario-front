import useProductos from "../../hooks/useProductos"
const ProductoDetallado = () => {

    const {productoDetallado} = useProductos()

    return (
        <article className='flex items-center'>
            <div className="w-2/3">
                <p className="text-gray-500 font-bold mb-2">
                Nombre:{" "}
                <span className="font-normal">{productoDetallado.nombre}</span>{" "}
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Stock: <span className="font-normal">{productoDetallado.stock}</span>{" "}
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Precio:{" "}
                <span className="font-normal">S/. {productoDetallado.precio}</span>{" "}
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Categoria:{" "}
                <span className="font-normal">
                    {productoDetallado?.categoria?.nombre}
                </span>{" "}
                </p>
            </div>
            <div className="w-1/3 m-auto">
                <img
                src={`http://127.0.0.1:8000/storage/images/productos/${productoDetallado.imagen}`}
                className="rounded"
                alt={`Imagen del producto ${productoDetallado.nombre}`}
                />
            </div>
        </article>
    )
}

export default ProductoDetallado
