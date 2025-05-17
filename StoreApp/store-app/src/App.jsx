import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ErrorPage from './pages/Errors/ErrorPage'
import ServerErrorPage from './pages/Errors/ServerErrorPage'
import NotFoundPage from './pages/Errors/NotFoundPage'
import { useEffect } from 'react'
import requests from './Api/ApiClient'
export const router = createBrowserRouter([
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
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'error', children: [
          { index: true, element: <ErrorPage /> },
          { path: 'server-error', element: <ServerErrorPage /> },
          { path: 'not-found', element: <NotFoundPage /> },
        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
])
function App() {
  useEffect(() => {
    requests.cart.get().then((cart) => console.log(cart)).catch((error) => console.log(error));
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
