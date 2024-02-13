import { useState } from "react";
import useUser from "../../hooks/useUser";
const FormularioEditarUsuario = () => {

    const { usuarioDetallado,editarUsuario } = useUser();

    const [datos, setDatos] = useState({
        rol: usuarioDetallado.rol,
        estado: usuarioDetallado.estado,
    });

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await editarUsuario(datos)
    }
    return (
        <article>
            <p className="text-gray-500 font-bold mb-2">
                Usuario: {" "}
                <span className="font-normal">
                    {usuarioDetallado.nombre} {usuarioDetallado.apellidos}
                </span>
            </p>

            <form onSubmit={handleSubmit}>
                <label className="text-gray-500 font-bold w-full mb-2" htmlFor="rol">
                    Seleccione su rol y actividad:
                </label>
                <div className="flex justify-evenly items-center">
                    <select
                        name="rol"
                        className="border border-gray-200 rounded text-gray-500 w-1/3 text-center"
                        value={datos.rol}
                        onChange={(e) => setDatos({ ...datos, rol: e.target.value })}
                    >
                        <option value="admin">Admin</option>
                        <option value="trabajador">Trabajador</option>
                    </select>
                    <label className="relative scale-[.6] inline-flex items-center cursor-pointer">
                        
                        <input 
                            type="checkbox" 
                            name="activo" 
                            className="sr-only peer"
                            checked={datos.estado == 1}
                                onChange={(e) => setDatos({ ...datos, estado: e.target.checked })}
                        />
                        <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-24 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
                        </div>
                    </label>
                </div>
                <input
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-[#7747ff] block my-5 w-1/2 m-auto px-6 py-2 rounded text-white text-sm font-normal transition-colors duration-300 hover:bg-[#6532ef]"
                />
            </form>
        </article>
    );
};

export default FormularioEditarUsuario;
