import axios from 'axios'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'

import { Layout } from '../../components'
import { Notes } from '../../interfaces'
import { IconButton } from '@mui/material'

interface Column {
  id: 'math' | 'science' | 'language' | 'social' | 'art' | 'name' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  {
    id: 'math',
    label: 'math'
    // minWidth: 670
  },
  {
    id: 'science',
    label: 'science'
    // minWidth: 670
  },
  {
    id: 'language',
    label: 'language'
    // minWidth: 670
  },
  {
    id: 'social',
    label: 'social'
    // minWidth: 670
  },
  {
    id: 'art',
    label: 'art'
    // minWidth: 670
  },
  {
    id: 'name',
    label: 'name'
    // minWidth: 670
  },
  {
    id: 'actions',
    label: 'actions'
    // minWidth: 670
  }
]

export const NotesPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [notes, setNotes] = useState<Notes[]>([])

  useEffect(() => {
    getStudents()
  }, [])

  const getStudents = async (): Promise<void> => {
    const { data } = await axios.get<Notes[]>('http://localhost:3000/notes')

    setNotes(data)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangeDelete = (uuid: string) => {
    try {
      const response = axios.delete(`http://localhost:3000/notes/${uuid}`)

      getStudents()
      alert('Estudiante eliminado')
      console.log(response)
    } catch (e) {
      alert('Error al eliminar estudiante')
    }
  }

  return (
    <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((note, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={note.id}>
                    {columns.map(column => {
                      if (column.id === 'actions')
                        return (
                          <TableCell key={index}>
                            <Link to={'/students'}>
                              <IconButton aria-label="delete">
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton aria-label="delete" onClick={() => handleChangeDelete(note.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        )

                      const value: string | number = column.id === 'name' ? note.students[column.id] : note[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={notes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  )
}
