import { useState, useEffect } from "react";
import Titulo from "../components/Titulo";
import useCategorias from "../hooks/useCategorias";
import useUser from "../hooks/useUser";
import useProductos from "../hooks/useProductos";
import { BiLogoProductHunt, BiCategory, BiSolidUser } from "react-icons/bi";
import TargetaDashBoard from "../components/TargetaDashBoard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Inicio = () => {
    const {productos} = useProductos();
    const {categorias, distribucionProductos} = useCategorias();
    const {usuarios} = useUser();

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
    });


    useEffect(() => {
        if (distribucionProductos && distribucionProductos.data) {
            const categorias = distribucionProductos.data;
            const labels = categorias.map((categoria) => categoria.nombre);
            const productosCount = categorias.map((categoria) => categoria.productos_count);
            const backgroundColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50","blue"]; // Puedes personalizar los colores
    
            setData({
                labels,
                datasets: [
                    {
                        data: productosCount,
                        label:'Productos',
                        backgroundColor: backgroundColors,
                    },
                ],
            });
        }
    }, [distribucionProductos]);

    useEffect(()=>{
        distribucionProductos.actualizarData()
    },[categorias,productos])

    return (
        <>
            <div className="max-w-3xl w-full mx-auto">
                <Titulo titulo='DashBoard'/>
                <section className="flex gap-5 flex-wrap">
                    
                    <TargetaDashBoard 
                        numero={usuarios?.data?.length} 
                        titulo='Usuarios' 
                        url='/usuarios'
                        style="shadow-red-500"
                        icon={<BiSolidUser className="text-[40px] text-red-500"/>}
                    />
                    <TargetaDashBoard 
                        numero={productos?.data?.length} 
                        titulo='Productos' 
                        url='/productos'
                        style="shadow-green-500"
                        icon={<BiLogoProductHunt className="text-[40px] text-green-500"/>}
                        
                    />
                    <TargetaDashBoard 
                        numero={categorias?.data?.length} 
                        titulo='Categorias' 
                        url='/categorias'
                        icon={<BiCategory className="text-[40px] text-cyan-500"/>}
                        style='shadow-cyan-500'
                    />
                </section>
                <section className="my-10">
                    {data?.labels?.length > 0 ? (
                        <Doughnut 
                            className="w-full" 
                            data={data} 
                            options={{ maintainAspectRatio: false, responsive:true }}
                        />
                    ) : (
                        <p className="text-center font-bold">Cargando....</p>
                    )}
                </section>
            </div>
        </>
    );
}

export default Inicio;
