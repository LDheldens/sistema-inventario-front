import { Link, useLocation } from "react-router-dom";
import useGlobalApp from "../hooks/useGlobalApp"
import { BiChevronRight } from "react-icons/bi";
import { BiLogoProductHunt,BiCategory,BiSolidUser,BiHome,BiExit } from "react-icons/bi";
import Toogle from "./Toogle";
import useUser from "../hooks/useUser";
import { formatoUrl } from "../utils/funciones";


const Sidebar = () => {

    const {pathname:url}= useLocation()
    const {isOpen, handleSidebarState} = useGlobalApp()
    const {logout,user}=useUser()

    const handleClickLogout = async() =>{
        await logout()
    }
    
    return (
        <aside className=" rounded sticky shadow-lg h-screen transition-colors duration-300 ease-in-out dark:bg-slate-600 dark:text-white">
            <button 
                className="absolute hidden xs:block right-[-15px] top-10 rounded-full border border-gray-200 bg-gray-200 dark:bg-slate-600"
                onClick={handleSidebarState}
            >
                <BiChevronRight 
                    className={`text-[30px] transform transition-transform duration-200 ease-linear ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div className="my-5 flex justify-center items-center">
                <img   
                    src="/src/assets/react.svg"   
                    alt="Logo react" 
                    className={`${isOpen ? 'w-1/3':'w-1/2'} transition-[width] duration-300 ease-in-out`}
                />
                <h2 
                    className={`${isOpen ? 'block' : 'hidden'} font-bold text-gray-600 dark:text-white`}
                >
                    Trabajo
                </h2>
            </div>
            <div className="my-10">
                {
                    !user?.imagen ? (
                        <p className="text-center">Cargando...</p>
                    ) : (
                        <img 
                            src={`${import.meta.env.VITE_IMG_URL}/usuarios/${user?.imagen}`} 
                            alt={`Imagen de ${user?.nombre} ${user?.apellidos}`}
                            className={`${isOpen ? 'w-24 h-24':'w-[75px] h-[75px]'} object-cover rounded-full mx-auto `}
                        />
                    )
                }
                <Link 
                    className="bg-violet-500 px-1 rounded text-white block w-16 text-center my-2 mx-auto transition-colors duration-300 ease-out hover:bg-violet-700"
                    to={`/usuarios/${formatoUrl(user?.nombre, user?.apellidos)}`}
                >
                    PERFIL
                </Link>
            </div>
            <section className="flex flex-col items-center my-10">
                <Link to='/' className={`w-full p-3 hover:bg-gray-300 hover:bg-opacity-50 ${url==='/' ? 'bg-gray-300 bg-opacity-50 ':''}`}>
                    <article className={`flex gap-2 items-center ${!isOpen ? 'justify-center':'pl-4'}`}>
                        <BiHome className="text-[30px]"/>
                        <span className={`${!isOpen ? 'hidden':''}`}>Inicio</span>
                    </article>

                </Link>
                <Link to='/usuarios' className={`w-full p-3 hover:bg-gray-300 hover:bg-opacity-50 ${url==='/usuarios' ? 'bg-gray-300 bg-opacity-50 ':''}`}>
                    <article className={`flex gap-2 items-center ${!isOpen ? 'justify-center':'pl-4'}`}>
                        <BiSolidUser className="text-[30px]"/>
                        <span className={`${!isOpen ? 'hidden':''}`}>Usuarios</span>
                    </article>
                </Link>
                <Link to='/categorias' className={`w-full p-3 hover:bg-gray-300 hover:bg-opacity-50 ${url==='/categorias' ? 'bg-gray-300 bg-opacity-50 ':''}`}>
                    <article className={`flex gap-2 items-center ${!isOpen ? 'justify-center':'pl-4'}`}>
                        <BiCategory className="text-[30px]"/>
                        <span className={`${!isOpen ? 'hidden':''}`}>Categorias</span>
                    </article>
                </Link>
                <Link to='/productos' className={`w-full p-3 hover:bg-gray-300 hover:bg-opacity-50 ${url==='/productos' ? 'bg-gray-300 bg-opacity-50 ':''}`}>
                    <article className={`flex gap-2 items-center ${!isOpen ? 'justify-center':'pl-4'}`}>
                        <BiLogoProductHunt className="text-[30px]"/>
                        <span className={`${!isOpen ? 'hidden':''}`}>Productos</span>
                    </article>
                </Link>
            </section>
            <hr />
            <section className="flex flex-col my-5">
                <button 
                    type="button" 
                    className="p-3 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                    onClick={handleClickLogout}
                >
                    <article 
                        className={`flex gap-2 items-center justify-center`}
                    >
                        <BiExit className="text-[30px] "/>
                        <span 
                            className={`${!isOpen ? 'hidden':''}`}
                        >
                            Salir
                        </span>
                    </article>
                </button>
            </section>
            <hr />
            <section className="my-10 flex justify-center">
        	    <div>
                    <Toogle/>
                </div>
            </section>
        </aside>
    )
}

export default Sidebar
