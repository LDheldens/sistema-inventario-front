import { useEffect } from 'react';
import { createContext, useState} from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [tema, setTema] = useState('light');
    const [isOpen, setIsOpen] = useState(false);
    const [modalPerfil, setModalPerfil] = useState(false)

    const manejarCambioDeAncho = () => {
        if (window.innerWidth < 450 && isOpen) {
            handleSidebarState();
        }
    };
    
    useEffect(() => {
        // Agregar un listener para el evento resize
        window.addEventListener('resize', manejarCambioDeAncho);
    
        // Limpiar el listener cuando el componente se desmonta
        return () => {
          window.removeEventListener('resize', manejarCambioDeAncho);
        };
    }, [isOpen]); // Asegura que el efecto se vuelva a ejecutar si isOpen cambia

    const handleSidebarState = () =>{
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
        if(tema==='dark'){
            document.querySelector('html').classList.add('dark')
            // document.querySelector('html').classList.remove('light')
        }else{
            // document.querySelector('html').classList.add('light')
            document.querySelector('html').classList.remove('dark')
        }
    },[tema])

    const toggleTheme = () => {
        setTema((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    //estilos para el modal 
    const customStyles = {
        content: {
            position:'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth:'450px',
            width: '90%',
            zIndex: 10
        },
    };
    
    const handleModalPerfil = () =>{
        setModalPerfil(!modalPerfil)
    }

    return (
        <GlobalContext.Provider 
            value={{
                tema,
                toggleTheme,
                isOpen,
                handleSidebarState,
                customStyles,
                modalPerfil,
                handleModalPerfil
            }}
        >
        {   children}
        </GlobalContext.Provider>
    );
};


export {GlobalContext, GlobalProvider}
