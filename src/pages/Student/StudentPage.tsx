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
import Button from '@mui/material/Button'

import { Layout } from '../../components'
import { Student } from '../../interfaces'
import { IconButton } from '@mui/material'

interface Column {
  id: 'name' | 'grade' | 'shift' | 'year' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Name'
    // minWidth: 670
  },
  {
    id: 'grade',
    label: 'grade'
    //  minWidth: 100
  },
  {
    id: 'shift',
    label: 'shift',
    // minWidth: 170,
    align: 'right'
  },
  {
    id: 'year',
    label: 'year',
    // minWidth: 170,
    align: 'right'
  },
  {
    id: 'actions',
    label: 'actions',
    // minWidth: 170,
    align: 'right'
  }
]

export const StudentPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    getStudents()
  }, [])

  const getStudents = async (): Promise<void> => {
    const { data } = await axios.get<Student[]>('http://localhost:3000/students')

    console.log(data)

    setStudents(data)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  //hace el llamdo d
  const handleChangeDelete = async (uuid: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/students/${uuid}`)

      getStudents()
      alert('Estudiante eliminado')
      console.log(response)
    } catch (e) {
      alert('Error al eliminar estudiante')
    }
  }

  return (
    <Layout>
      <Link to={`/students/add`}>
        <Button variant="contained" color="success" sx={{ marginBottom: 5 }}>
          Agregar estudiante
        </Button>
      </Link>

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
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                    {columns.map(column => {
                      if (column.id === 'actions')
                        return (
                          <TableCell key={index}>
                            <Link to={'/students'}>
                              <IconButton aria-label="delete">
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton aria-label="delete" onClick={() => handleChangeDelete(student.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        )

                      const value: string | number = student[column.id]
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
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  )
}
