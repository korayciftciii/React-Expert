import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import CoursesPage, { courseDeleteAction, coursesLoader } from './pages/Courses'
import MainLayout from './layouts/MainLayout'
import ContactPage from './pages/help/ContactPage'
import FAQPage from './pages/help/FAQPage'
import HelpLayout from './layouts/HelpLayout'
import CourseDetail, { courseDetailsLoader } from './pages/CourseDetail'
import CourseEdit from './pages/CourseEdit'
import CourseCreate from './pages/CourseCreate'
import { courseCreateAction } from './pages/CourseForm'
import NotFoundPage from './pages/error/NotFoundPage'
import ErrorPage from './pages/error/ErrorPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'courses',
        children: [
          { index: true, element: <CoursesPage />, loader: coursesLoader },
          {
            id: 'course-details',
            path: ':courseId',
            errorElement: <ErrorPage />,
            loader: courseDetailsLoader,
            children: [
              { index: true, element: <CourseDetail /> },
              { path: 'editCourse', element: <CourseEdit />, action: courseCreateAction },
              { path: 'delete', action: courseDeleteAction }
            ]
          },
          { path: 'newCourse', element: <CourseCreate />, action: courseCreateAction }
        ]
      },

      {
        path: 'help',
        element: <HelpLayout />,
        children: [
          { path: 'contact', element: <ContactPage /> },
          { path: 'faqs', element: <FAQPage /> }

        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
