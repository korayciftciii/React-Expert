import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
const router = createBrowserRouter([
  {
    path: '/', element: <MainLayout />, children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      {
        path: 'products', children: [
          { index: true, element: <ProductsPage /> },
          { path: ':productId', element: <ProductDetailsPage /> },
        ]
      },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> }
    ]
  },
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
