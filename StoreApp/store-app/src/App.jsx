import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import CartPage from './pages/cart/CartPage'
import LoginPage from './pages/account/LoginPage'
import RegisterPage from './pages/account/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ErrorPage from './pages/Errors/ErrorPage'
import ServerErrorPage from './pages/Errors/ServerErrorPage'
import NotFoundPage from './pages/Errors/NotFoundPage'
import { useEffect } from 'react'
import requests from './Api/ApiClient'
import { useDispatch } from 'react-redux'
import { setCart } from './pages/cart/cartSlice'
import { logout, setUser } from './pages/account/accountSlice'
import MainLayout from './layouts/MainLayout'
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
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser)));
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("user");
        dispatch(logout());
      }
    }

    requests.account
      .getUser()
      .then((user) => {
        dispatch(setUser(user)); // Eksik olan dispatch ekledim
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Error fetching user from API:", error);
        dispatch(logout());
      });

    requests.cart
      .get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  return <RouterProvider router={router} />;
}


export default App
