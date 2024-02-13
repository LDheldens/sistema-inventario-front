import useProductos from "../../hooks/useProductos"
import ProductoDetallado from "./ProductoDetallado"
import FormularioEditarProducto from "./FormularioEditarProducto"
import FormularioAgregarProducto from "./FormularioAgregarProducto"

const ModalProducto = () => {
    const {tipoModal} = useProductos()
    return (
        <>
            {tipoModal =='1' && <FormularioAgregarProducto/>}
            {tipoModal =='2' && <ProductoDetallado/>}
            {tipoModal =='3' && <FormularioEditarProducto/>}
        </>
    )
}

export default ModalProducto
