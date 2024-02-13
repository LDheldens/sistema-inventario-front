import { useNavigate } from "react-router-dom";
const formatoUrl = (nombre,apellidos)=>{
    const nombreCompleto = `${nombre} ${apellidos}`;

    // Reemplazar espacios con guiones bajos y convertir a minúsculas
    const formatoURL = nombreCompleto.replace(/\s+/g, '-').toLowerCase();
  
    return formatoURL;
}

const setLocalStorage = (token, user) => {
    if (token !== undefined && token !== null && token !== '') {
        localStorage.setItem('AUTH_TOKEN_INVENTARIO', token);
    }
    if (user) {
        localStorage.setItem('AUTH_USER_INVENTARIO', JSON.stringify(user));
    }
}



const rutaProtegida = (navigate, user, isAuth, rutaLogin = '/auth/login') => {
    if (!user && !isAuth) {
      navigate(rutaLogin);
    }
};
  



export {formatoUrl,setLocalStorage,rutaProtegida}