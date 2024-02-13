
import AppRouter from './routers/AppRouter'
import { GlobalProvider } from './contexts/GlobalProvider'
import { UserProvider } from './contexts/UserProvider'
import { ProductosProvider } from './contexts/ProductosProvider'
import { CategoriasProvider } from './contexts/CategoriasProvider'
function App() {

    return (
        <>
            <GlobalProvider>
                <UserProvider>
                    <ProductosProvider>
                        <CategoriasProvider>
                            <AppRouter/>
                        </CategoriasProvider>
                    </ProductosProvider>
                </UserProvider>
            </GlobalProvider>
        </>
    )
}

export default App
