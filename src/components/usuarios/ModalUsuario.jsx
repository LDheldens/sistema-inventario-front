import FormularioEditarUsuario from "./FormularioEditarUsuario"
import FormularioAgregarUsuario from './FormularioAgregarUsuario'
import UsuarioDetallado from "./UsuarioDetallado"
import useUser from "../../hooks/useUser"

const ModalUsuario = () => {
    const {tipoModal}=useUser()
    return (
        <>
            {tipoModal =='1' && <FormularioAgregarUsuario/>}
            {tipoModal =='2' && <UsuarioDetallado/>}
            {tipoModal =='3' && <FormularioEditarUsuario/>}
        </>
    )
}

export default ModalUsuario
