import { BiSolidTrash, BiEdit } from "react-icons/bi";
import useCategorias from "../../hooks/useCategorias";
import Swal from "sweetalert2";

const CategoriaRow = ({ categoria }) => {

    const {handleModalCategoria,setTipoModal,handleCategoriaDetallada,eliminarCategoria,actualizarDataCategorias} = useCategorias()


    const handleClickEliminarCategegoria = ()=>{
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la categoria de forma permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await eliminarCategoria(categoria.id)
                try {
                    if (response.ok) {
                        Swal.fire({
                        title: "Eliminado",
                        text: "Categoria eliminada de manera exitosa.",
                        icon: "success"
                        });
                        actualizarDataCategorias()
                    } else {
                        Swal.fire({
                        title: "Error al eliminar el producto",
                        text: 'Hubo un problema al intentar eliminar la categoria',
                        icon: 'error',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: 'Hubo un problema al intentar eliminar la categoria',
                        icon: 'error',
                    });
                }
            }
        });
    }
    return (
        <tr className="shadow">
            <td className="p-2 lg:p-4">{categoria.nombre}</td>
            <td className="hidden sm:table-cell break-words max-w-[200px] p-2 lg:p-4">
                {categoria.descripcion}
            </td>
            <td className="p-2 lg:p-4">
                <div className="flex justify-center gap-1 items-center">
                    <button 
                        onClick={()=>{
                            handleCategoriaDetallada(categoria)
                            handleModalCategoria()
                            setTipoModal('2')
                        }} 
                        type="button"
                    >
                        <BiEdit className="text-2xl text-yellow-500 transition-colors duration-300 hover:text-yellow-700" />
                    </button>
                    <button onClick={handleClickEliminarCategegoria} type="button">
                        <BiSolidTrash className="text-2xl text-red-500 transition-colors duration-300 hover:text-red-700" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CategoriaRow;
