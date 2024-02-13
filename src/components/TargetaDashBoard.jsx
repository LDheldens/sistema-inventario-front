import { Link } from "react-router-dom";

const TargetaDashBoard = ({ numero, titulo, icon, style='', url }) => {
  return (
        <Link to={url} className={`bg-white transition-transform duration-300 hover:scale-105 flex justify-between items-center grow max-w-[400px] shadow-md p-3 rounded ${style}`}>
            <div className='font-bold text-gray-600'>
                <p className='text-xl '>{numero}</p>
                <span className='text-lg'>{titulo}</span>
            </div>
            <div>{icon}</div>
        </Link>
    );
};

export default TargetaDashBoard;
