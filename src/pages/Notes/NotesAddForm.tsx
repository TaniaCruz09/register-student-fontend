import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useFormik } from 'formik'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { Layout } from '../../components'
import { NotesAddBody, Student } from '../../interfaces'

const initialValues: NotesAddBody = {
  math: 0,
  science: 0,
  language: 0,
  social: 0,
  art: 0,
  studentsId: ''
}

export const NotesAddForm = () => {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    getStudents()
  }, [])

  const getStudents = async (): Promise<void> => {
    const { data } = await axios.get<Student[]>('http://localhost:3000/students')

    setStudents(data)
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        const response = await axios.post('http://localhost:3000/notes', values)
        console.log(response)

        alert('DATO GUARDADO')
      } catch (e) {
        alert('ALGO SALIO MAL :(')
      }
    }
  })

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>Agrega un nuevo estudiante</h1>
        <InputLabel id="demo-simple-select-label">Student</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="studentsId"
          name="studentsId"
          value={values.studentsId}
          label="Age"
          onChange={handleChange}
        >
          {students.map(student => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ marginBottom: 15 }}
          id="math"
          name="math"
          label="math"
          variant="outlined"
          value={values.math}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="science"
          name="science"
          label="science"
          variant="outlined"
          value={values.science}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="language"
          name="language"
          label="language"
          variant="outlined"
          value={values.language}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="social"
          name="social"
          label="social"
          variant="outlined"
          value={values.social}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="art"
          name="art"
          label="art"
          variant="outlined"
          value={values.art}
          onChange={handleChange}
        />

        <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleSubmit()}>
          Send
        </Button>
      </div>
    </Layout>
  )
}
