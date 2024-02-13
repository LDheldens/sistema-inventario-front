import useProductos from "../hooks/useProductos"
import useGlobalApp from "../hooks/useGlobalApp";
import { useEffect, useState } from "react";
import Titulo from "../components/Titulo";
import ProductoRow from "../components/productos/ProductoRow";
import Modal from 'react-modal'
import { CgSearch,CgCloseO  } from "react-icons/cg";
import { ToastContainer } from "react-toastify";
import CerrarModalButon from "../components/CerrarModalButon";
import ModalProducto from "../components/productos/ModalProducto";
import { Stack, Pagination } from "@mui/material";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ProductosPDF from "../components/ProductosPDF";

const Productos = () => {

    const {productos,modalProducto,handleModalProducto,setTipoModal,paginaActual,setPaginaActual,busqueda,setBusqueda} = useProductos()

    const [verPDF,setVerPDF]=useState(false)

    const {customStyles} = useGlobalApp();
    

    Modal.setAppElement('#root');
    return (
        <>
        <div className="max-w-5xl w-full mx-auto">
            <Titulo titulo='Productos'/>
            <button 
                className="bg-green-400 p-3 rounded uppercase text-white font-bold mr-3 mb-3" 
                type="button" 
                onClick={()=>setVerPDF(!verPDF)}
            >
                {
                    verPDF ? 'cerrar PDF' : 'ver PDF'
                }
            </button>
            <PDFDownloadLink 
                document={<ProductosPDF productos={productos?.data} />}
                fileName="reporte-productos"
            >
                 <button 
                    className="bg-green-400 p-3 rounded uppercase text-white font-bold" 
                    type="button" 
                >
                    Descargar pdf
                </button>
            </PDFDownloadLink>
            {
                verPDF && (
                    <div className="h-screen">
                        <PDFViewer style={{width:'100%',height:'90%'}}>
                            <ProductosPDF productos={productos?.data} />
                        </PDFViewer>
                    </div>
                )
            }

            
            <div 
                className="mb-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center"
            >
                <button 
                    className="relative w-40 md:w-auto px-3 py-2 rounded-md bg-white isolation-auto border-2 border-violet-500 transition-colors duration-500 hover:text-white hover:bg-violet-500"
                    onClick={()=>{
                        handleModalProducto()
                        setTipoModal('1')
                    }}
                >
                    Agregar Producto
                </button>
                <form className="flex gap-2 justify-between">
                    
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={(e)=>setBusqueda(e.target.value)}
                            className="p-2 border rounded-lg w-full"
                        />
                        {
                            busqueda && (
                                <button 
                                    type="button" 
                                    className="absolute right-1 top-3 text-xl text-gray-500"
                                    onClick={()=>{
                                        setBusqueda('')
                                    }}
                                >
                                    <CgCloseO/>
                                </button>
                            )
                        }
                        
                    </div>
                    <button type="submit" className="bg-cyan-500 px-2 rounded font-bold flex justify-center items-center text-white transition-colors duration-300 hover:bg-cyan-700">
                        <CgSearch className="inline-block text-xl"/> <p className="hidden sm:inline-block">Buscar</p>
                    </button>
                </form>
            </div>
            <table className="text-center w-full bg-white rounded-lg shadow">
                <thead className="text-center ">
                    <tr className="shadow bg-gray-200">
                        <th className="p-2 lg:p-4" >NOMBRE</th>
                        <th className="handle-row p-2 lg:p-4" >STOCK</th>
                        <th className="handle-row p-2 lg:p-4" >PRECIO</th>
                        <th className="handle-row p-2 lg:p-4" >CATEGORIA</th>
                        <th className="handle-row p-2 lg:p-4" >IMAGEN</th>
                        <th className="p-2 lg:p-4">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    { productos?.isLoading ? (
                        <tr>
                            <td className="p-5" colSpan='6'>Cargando data...</td>
                        </tr>
                        ) : 
                            productos?.data?.length == 0 ? (
                                <tr>
                                    <td className="p-5" colSpan='6'>No hay resultados..</td>
                                </tr>
                            ) :
                                productos?.data?.map((producto) => (
                                    <ProductoRow 
                                        producto={producto} 
                                        key={producto.id}
                                    />
                                ))
                    }

                </tbody>
            </table>
            <div className="flex justify-center my-5">
                <Stack spacing={2}>
                    <Pagination
                        count={productos?.numeroPaginas}
                        page={paginaActual}
                        color="secondary"
                        onChange={(event, value) => {
                            setPaginaActual(value);
                        }}
                    />
                </Stack>
            </div>
            
        </div>
        
        <Modal style={customStyles} isOpen={modalProducto}>
            <CerrarModalButon handleModal={handleModalProducto}/>
            <ModalProducto/>
        </Modal>
        <ToastContainer/>
        </>
    )
}

export default Productos
