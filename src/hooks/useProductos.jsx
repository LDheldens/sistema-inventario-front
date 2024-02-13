import { ProductosContext } from "../contexts/ProductosProvider"
import { useContext } from "react"
const useProductos = () => {
  return useContext(ProductosContext);
}

export default useProductos
