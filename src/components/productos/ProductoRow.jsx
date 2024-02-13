import useProductos from "../../hooks/useProductos";
import { BiSolidTrash, BiEdit } from "react-icons/bi";
import { CgEyeAlt } from "react-icons/cg";
import Swal from "sweetalert2";

const ProductoRow = ({ producto }) => {
    const {actualizarDataProductos,eliminarProducto,handleModalProducto,setTipoModal,handleProductoDetallado} = useProductos()


    const handleClickEliminarProducto = async () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el producto de forma permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await eliminarProducto(producto.id)
                try {
                    if (response.ok) {
                        Swal.fire({
                        title: "Eliminado",
                        text: "Producto eliminado de manera exitosa.",
                        icon: "success"
                        });
                        actualizarDataProductos()
                    } else {
                        Swal.fire({
                        title: "Error al eliminar el producto",
                        text: 'Hubo un problema al intentar eliminar el producto.',
                        icon: 'error',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: 'Hubo un problema al intentar eliminar el producto.',
                        icon: 'error',
                    });
                }
            }
        });
    };
      
    return (
        <tr className="shadow">
            <td className="p-2 lg:p-4">{producto.nombre}</td>
            <td className="handle-row p-2 lg:p-4">
                {producto.stock}
            </td>
            <td className="handle-row p-2 lg:p-4">
                {producto.precio}
            </td>
            <td className="handle-row p-2 lg:p-4">
                {producto.categoria.nombre}
            </td>
            <td className="handle-row p-2 lg:p-4">
                <img
                    className="w-12 mx-auto"
                    src={`${import.meta.env.VITE_IMG_URL}/productos/${producto.imagen}`}
                    alt=""
                />
            </td>
            <td className="p-2 lg:p-4">
                <div className="flex justify-center gap-1 items-center">
                    <button type="button" onClick={()=>{
                        handleProductoDetallado(producto)
                        handleModalProducto()
                        setTipoModal('2')
                    }}>
                        <CgEyeAlt className="text-2xl text-green-500 transition-colors duration-300 hover:text-green-700" />
                    </button>
                    <button type="button" onClick={()=>{
                        handleProductoDetallado(producto)
                        handleModalProducto()
                        setTipoModal('3')
                    }}>
                        <BiEdit className="text-2xl text-yellow-500 transition-colors duration-300 hover:text-yellow-700" />
                    </button>
                    <button type="button" onClick={()=>{
                        handleClickEliminarProducto()
                    }}>
                        <BiSolidTrash className="text-2xl text-red-500 transition-colors duration-300 hover:text-red-700" />
                    </button>

                </div>
            </td>
        </tr>
    );
};

export default ProductoRow;
