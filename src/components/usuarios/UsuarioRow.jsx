import { BiSolidTrash, BiEdit } from "react-icons/bi";
import { CgEyeAlt } from "react-icons/cg";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";

const UsuarioRow = ({usuario}) => {

    const {user,handleUsuarioDetallado,handleModalUsuario,setTipoModal,eliminarUsuario,actualizarDataUsuarios} = useUser()

    const handleClickEliminarUsuario = () =>{
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el usuario de forma permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await eliminarUsuario(usuario.id)
                try {
                    if (response.ok) {
                        Swal.fire({
                        title: "Eliminado",
                        text: "Usuario eliminado de manera exitosa.",
                        icon: "success"
                        });
                        actualizarDataUsuarios()
                    } else {
                        Swal.fire({
                        title: "Error al eliminar el usuario",
                        text: 'Hubo un problema al intentar eliminar el usuario',
                        icon: 'error',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: 'Hubo un problema al intentar eliminar el usuario',
                        icon: 'error',
                    });
                }
            }
        });
    }

    return (
        <tr className="shadow ">
            <td className="p-2 lg:p-4">{usuario.nombre} {usuario.apellidos}</td>
            <td className="hidden lg:table-cell break-words max-w-[300px]  p-2 lg:p-4">
                {usuario.email}
            </td>
            <td className="hidden sm:table-cell p-2 lg:p-4">
                <span className={`p-1 rounded-md ${usuario.rol=='admin' ? 'bg-violet-100 text-violet-600':'bg-red-100 text-red-600'}`}>
                    {usuario.rol}
                </span>
            </td>
            <td className="hidden sm:table-cell p-2 lg:p-4">
                <span className={`p-1 rounded-md ${usuario.estado==1 ? 'bg-green-100 text-green-600':'bg-red-100 text-red-600'}`}>
                    {usuario.estado == 1 ? "Activo" : "Inactivo"}
                </span>
            </td>
            <td className="p-2 lg:p-4">
                <div className="flex justify-center gap-1 items-center">
                    <button 
                        type="button" 
                        onClick={()=>{
                            handleUsuarioDetallado(usuario)
                            handleModalUsuario()
                            setTipoModal('2')
                        }}
                    >
                        <CgEyeAlt className="text-2xl text-green-500 transition-colors duration-300 hover:text-green-700" />
                    </button>
                    {
                        user.rol=="admin" ? (
                            <>
                                <button 
                                    onClick={()=>{
                                        handleUsuarioDetallado(usuario)
                                        handleModalUsuario()
                                        setTipoModal('3')
                                    }} 
                                    type="button"
                                >
                                    <BiEdit className="text-2xl text-yellow-500 transition-colors duration-300 hover:text-yellow-700" />
                                </button>
                                <button onClick={handleClickEliminarUsuario} type="button">
                                    <BiSolidTrash className="text-2xl text-red-500 transition-colors duration-300 hover:text-red-700" />
                                </button>
                            </>
                        ) : null
                    }
                </div>
            </td>
        </tr>
    )
}

export default UsuarioRow
