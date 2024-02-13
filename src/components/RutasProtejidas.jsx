import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
const RutasProtegidas = ({ user, children, redirectTo = '/auth/login' }) => {

    const {isAuth} = useUser()

    if (!user || !isAuth) {
        return <Navigate to={redirectTo} />;
    }

    return children ? children : <Outlet />;
};

export default RutasProtegidas;
