import { createBrowserRouter } from 'react-router-dom'
import { HomePage, StudentAddForm, NotesPage } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/students',
    element: <StudentAddForm />
  },
  {
    path: '/notes',
    element: <NotesPage />
  }
])
