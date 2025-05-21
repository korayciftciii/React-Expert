import { createBrowserRouter } from 'react-router'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/cart/CartPage'
import LoginPage from '../pages/account/LoginPage'
import RegisterPage from '../pages/account/RegisterPage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ErrorPage from '../pages/Errors/ErrorPage'
import ServerErrorPage from '../pages/Errors/ServerErrorPage'
import NotFoundPage from '../pages/Errors/NotFoundPage'
import MainLayout from '../layouts/MainLayout'
import AuthGuard from "../Auth/AuthGuard"
import CheckoutPage from '../pages/checkout/CheckoutPage'
import OrdersPage from '../pages/orders/OrdersPage'
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
            { path: 'register', element: <RegisterPage /> },
            {
                element: <AuthGuard />, children: [
                    { path: 'checkout', element: <CheckoutPage /> },
                    { path: 'orders', element: <OrdersPage /> },
                ]
            },
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

export { router };