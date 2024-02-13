import { CiCircleRemove } from "react-icons/ci";
import useGlobalApp from "../hooks/useGlobalApp";
const CerrarModalButon = ({handleModal}) => {

    return (
        <div className="flex justify-end">
            <button className="w-10" onClick={handleModal}>
                <CiCircleRemove 
                    className="h-full w-full text-gray-400 font-bold"
                />
            </button>
        </div>
    )
}

export default CerrarModalButon
