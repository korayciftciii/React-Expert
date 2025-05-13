import { Children, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage, { coursesLoader } from './pages/CoursesPage'
import MainLayout from './layouts/MainLayout'
import ContactPage from './pages/help/ContactPage'
import FAQPage from './pages/help/FAQPage'
import HelpLayout from './layouts/HelpLayout'

// const routes_1 = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<HomePage />} />
//     <Route path='/home' element={<HomePage />} />
//     <Route path='/about' element={<AboutPage />} />
//     <Route path='/courses' element={<CoursesPage />} />
//   </Route>
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'courses', element: <CoursesPage />, loader: coursesLoader },
      {
        path: 'help',
        element: <HelpLayout />,
        children: [
          { path: 'contact', element: <ContactPage /> },
          { path: 'faqs', element: <FAQPage /> }

        ]
      }
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
