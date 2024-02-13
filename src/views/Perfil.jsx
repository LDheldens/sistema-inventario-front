import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import Modal from 'react-modal';
import useGlobalApp from "../hooks/useGlobalApp";
import CerrarModalButon from "../components/CerrarModalButon";
import ModalPerfil from "../components/usuarioAuth/ModalPerfil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Perfil = () => {

    const [imagenPreview, setImagePreview] = useState(null);
    const [imagen, setImagen] = useState(null)
    const [editar, setEditar] = useState(false);
    const [tipoModal, setTipoModal] = useState('1')
    const {user,cambiarImagenPerfil} = useUser()
    
    const {customStyles,modalPerfil,handleModalPerfil} = useGlobalApp();


    const handleImageChange = (e) => {
        setImagen(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            //La clase FileReader se utiliza para leer contenido de archivos de manera asíncrona.
            const reader = new FileReader();
            //readAsDataURL genera una URL de datos (data URL) en formato base64 para la imagen seleccionada. Esta URL de datos se puede usar directamente en el atributo src de una etiqueta <img>
            reader.readAsDataURL(file);
            //onload se refiere a un evento que se dispara cuando la operación de lectura de archivos se completa con éxito.
            reader.onload = (e) => {
                //Se está actualizando el estado de imagePreview con el resultado de la carga de la imagen. El e.target.result contiene los datos de la imagen leída
                setImagePreview(e.target.result);
            };

        } else {
            setImagePreview(null);
        }
    };
    const handleSubmitImage = async (e) => {
        e.preventDefault();
      
        if (textoButon() === 'editar') {
            await cambiarImagenPerfil(imagen)
        }
      };

    const textoButon = () => { return editar ? 'guardar' : 'editar' }


    Modal.setAppElement('#root');
    return (
        <>
        
            <section className="max-w-4xl mx-auto  my-10 p-2 md:p-10">
                <div className="flex flex-col items-center gap-2">
                    {imagenPreview ? (
                        <img
                            className="w-40 rounded-full"
                            src={imagenPreview}
                            alt="Vista previa de la imagen"
                        />
                    ) : !user?.imagen ? (
                        <h1>cargando...</h1>
                    ) : (
                        <img
                            className="object-cover w-40 h-40 rounded-full mx-auto"
                            src={`http://127.0.0.1:8000/storage/images/usuarios/${user?.imagen}?v=timestamp`}
                            alt="Imagen de perfil"
                        />
                    )}
                    <form
                    // encType='multipart/form-data'
                        onSubmit={handleSubmitImage} 
                    >
                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="bg-violet-500 rounded uppercase p-1 text-white text-sm font-bold  transition-colors duration-300 hover:bg-violet-700"
                                type="submit"
                                onClick={() => setEditar(!editar)}
                            >
                                {textoButon()}
                            </button>
                            {editar && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="imagen"
                                    onChange={handleImageChange}
                                    className="file:border file:border-violet-600 file:rounded file:bg-gray-200"
                                />
                            )}
                        </div>
                    </form>
                </div>
                <div 
                    className='my-10 md:w-2/3 mx-auto p-2 md:p-5 bg-white rounded-md shadow-lg'
                >
                    <h2 className='text-2xl text-center my-5 text-gray-400 font-bold'>Información Personal</h2>
                    <p className='mb-2'>
                        <span className='font-semibold text-gray-500'>Nombre: </span>
                        {user?.nombre}
                    </p>              
                    <p className='mb-2'>
                        <span className='font-semibold text-gray-500'>Apellidos: </span>
                        {user?.apellidos}
                    </p>              
                    <p className='mb-2  break-words'>
                        <span className='font-semibold text-gray-500'>Email: </span>
                        {user?.email}
                    </p>       
                    <div className='flex flex-col sm:flex-row gap-2 justify-between p-2'>
                        <button 
                            type='button' 
                            className='bg-cyan-400 rounded shadow p-1 text-white font-bold transition-colors duration-300 ease-linear hover:bg-cyan-600'
                            onClick={()=>{
                                handleModalPerfil()
                                setTipoModal('1')
                            }}
                        >
                            Editar información
                        </button>  
                        <button 
                            type='button' 
                            className='bg-cyan-400 rounded shadow p-1 text-white font-bold transition-colors duration-300 ease-linear hover:bg-cyan-600'
                            onClick={()=>{
                                handleModalPerfil()
                                setTipoModal('2')
                            }}
                        >
                            Cambiar contraseña
                        </button>  
                    </div>     
                </div>
                
            </section>
            <Modal style={customStyles} isOpen={modalPerfil}>
                <CerrarModalButon handleModal={handleModalPerfil}/>
                <ModalPerfil tipoModal={tipoModal}/>
            </Modal>
            <ToastContainer autoClose={2000} position="top-center"/>
        </>
    );
};

export default Perfil;
