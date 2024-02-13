import FormularioEditarInfo from "./FormularioEditarInfo"
import FormularioEditarContraseña from "./FormularioEditarContraseña"
const ModalPerfil = ({tipoModal}) => {
    return (
        <>
            {tipoModal =='1' && <FormularioEditarInfo/>}   
            {tipoModal=='2' && <FormularioEditarContraseña/>}   
        </>
    )
}

export default ModalPerfil
