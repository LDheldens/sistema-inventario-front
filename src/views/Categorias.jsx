import useCategorias from "../hooks/useCategorias"
import useGlobalApp from "../hooks/useGlobalApp"
import Titulo from "../components/Titulo"
import CategoriaRow from '../components/categorias/CategoriaRow'
import ModalCategoria from "../components/categorias/ModalCategoria"
import Modal from 'react-modal'
import CerrarModalButon from "../components/CerrarModalButon"
import { Stack,Pagination } from "@mui/material"

const Categorias = () => {

    const {categorias,modalCategoria,handleModalCategoria,setTipoModal,paginaActual,setPaginaActual,}=useCategorias()
    const {customStyles} = useGlobalApp();
    
    
    Modal.setAppElement('#root');

    return (
        <>
            <div className="max-w-3xl w-full mx-auto">
                <Titulo titulo='Categorias'/>
                <button 
                    onClick={()=>{
                        handleModalCategoria()
                        setTipoModal('1')
                    }} 
                    type="button" 
                    className="my-5 bg-violet-500 rounded p-2 text-white font-bold transition-colors duration-300 hover:bg-violet-700"
                >
                    Agregar Categoria
                </button>
                <table className="text-center w-full bg-white rounded-lg shadow">
                    <thead className="text-center ">
                        <tr className="shadow bg-gray-200">
                            <th className="p-2 lg:p-4" >NOMBRE</th>
                            <th className="hidden sm:table-cell p-2 lg:p-4" >DESCRIPCIÓN</th>
                            <th className="p-2 lg:p-4">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        { categorias?.isLoading && (
                            <tr>
                                <td className="p-5" colSpan='6'>Cargando data...</td>
                            </tr>
                        )}
                        {categorias?.data?.map((categoria) => (
                            <CategoriaRow 
                                key={categoria.id} 
                                categoria={categoria}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center my-5">
                <Stack spacing={2}>
                    <Pagination
                        count={categorias.numeroPaginas}
                        page={paginaActual}
                        color="secondary"
                        onChange={(event, value) => {
                            setPaginaActual(value);
                        }}
                    />
                </Stack>
            </div>
            </div>
            <Modal style={customStyles} isOpen={modalCategoria}>
                <CerrarModalButon handleModal={handleModalCategoria}/>
                <ModalCategoria/>
            </Modal>
        </>
    )
}

export default Categorias
