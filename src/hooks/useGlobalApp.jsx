import { GlobalContext } from "../contexts/GlobalProvider"
import { useContext } from "react"

const useGlobalApp = () => {
    return useContext(GlobalContext);
}

export default useGlobalApp
