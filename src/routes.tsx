import { createBrowserRouter } from 'react-router-dom'
import { HomePage, StudentAddForm, StudentPage, NotesAddForm, NotesEditForm, NotesPage } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/students',
    element: <StudentPage />
  },
  {
    path: '/students/add',
    element: <StudentAddForm />
  },
  {
    path: '/notes',
    element: <NotesPage />
  },
  {
    path: '/notes/add',
    element: <NotesAddForm />
  },
  {
    path: '/notes/edit/:id',
    element: <NotesEditForm />
  }
])
