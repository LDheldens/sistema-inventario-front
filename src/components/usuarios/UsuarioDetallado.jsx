import useUser from "../../hooks/useUser";

const UsuarioDetallado = () => {

    const {usuarioDetallado}=useUser()

    return (
        <article className="flex items-center">
            <div className="w-2/3">
                <p className="text-gray-500 font-bold mb-2">
                Nombre: <span className="font-normal">{usuarioDetallado.nombre}</span>
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Apellidos:
                <span className="font-normal">{usuarioDetallado.apellidos}</span>
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Email: <span className="font-normal">{usuarioDetallado.email}</span>
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Rol: <span className="font-normal">{usuarioDetallado.rol}</span>
                </p>
                <p className="text-gray-500 font-bold mb-2">
                Estado:
                <span className="font-normal">
                    {usuarioDetallado.estado == 1 ? " Activo" : " Inactivo"}
                </span>
                </p>
            </div>
            <div className="w-1/3">
                <img
                src={`http://127.0.0.1:8000/storage/images/usuarios/${usuarioDetallado.imagen}`}
                className="rounded-full"
                alt={`Imagen de perfil de ${usuarioDetallado.nombre} ${usuarioDetallado.apellidos}`}
                />
            </div>
        </article>
    );
};

export default UsuarioDetallado;
