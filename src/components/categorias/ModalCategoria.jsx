import useCategorias from "../../hooks/useCategorias"
import FormularioAgregarCategoria from "./FormularioAgregarCategoria"
import FormularioEditarCategoria from "./FormularioEditarCategoria"

const ModalCategoria = () => {

    const {tipoModal} = useCategorias()

    return (
        <>
            {tipoModal =='1' && <FormularioAgregarCategoria/>}
            {tipoModal =='2' && <FormularioEditarCategoria/>}
        </>
    )
}

export default ModalCategoria
