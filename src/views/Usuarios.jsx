import React from 'react'
import Titulo from '../components/Titulo'
import useUser from '../hooks/useUser'
import useGlobalApp from '../hooks/useGlobalApp'
import { Stack, Pagination } from '@mui/material'
import Modal from 'react-modal'
import UsuarioRow from '../components/usuarios/UsuarioRow'
import ModalUsuario from '../components/usuarios/ModalUsuario'
import CerrarModalButon from '../components/CerrarModalButon'
const Usuarios = () => {

    const {usuarios,paginaActual,setPaginaActual,modalUsuario,handleModalUsuario,setTipoModal}=useUser()

    const {customStyles} = useGlobalApp();


    Modal.setAppElement('#root');
    return (
        <>
            <div className="max-w-3xl w-full mx-auto">
                <Titulo titulo='Usuarios'/>
                <button 
                    onClick={()=>{
                        handleModalUsuario()
                        setTipoModal('1')
                    }} 
                    type="button" 
                    className="my-5 bg-violet-500 rounded p-2 text-white font-bold transition-colors duration-300 hover:bg-violet-700"
                >
                    Agregar Usuario
                </button>
                <table className="text-center w-full bg-white rounded-lg shadow">
                    <thead className="text-center">
                        <tr className="shadow bg-gray-200">
                            <th className="p-2 lg:p-4 rounded-tl-lg" >USUARIO</th>
                            <th className="hidden lg:table-cell  p-2 lg:p-4" >EMAIL</th>
                            <th className="p-2 lg:p-4 hidden sm:table-cell">ROL</th>
                            <th className="p-2 lg:p-4 hidden sm:table-cell">ESTADO</th>
                            <th className="p-2 lg:p-4 rounded-tr-lg">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody >
                        { usuarios?.isLoading && (
                            <tr>
                                <td className="p-5" colSpan='6'>Cargando data...</td>
                            </tr>
                        )}
                        {usuarios?.data?.map((usuario) => (
                            <UsuarioRow
                                key={usuario.id}
                                usuario={usuario}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center my-5">
                    <Stack spacing={2}>
                        <Pagination
                            count={usuarios.numeroPaginas}
                            page={paginaActual}
                            color="secondary"
                            onChange={(event, value) => {
                                setPaginaActual(value);
                            }}
                        />
                    </Stack>
                </div>
            </div>
            <Modal style={customStyles} isOpen={modalUsuario}>
                <CerrarModalButon handleModal={handleModalUsuario}/>
                <ModalUsuario/>
            </Modal>
        </>
    )
}

export default Usuarios
