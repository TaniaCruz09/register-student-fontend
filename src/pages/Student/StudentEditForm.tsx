import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import { StudentAddBody, Students } from '../../interfaces'
import { Layout } from '../../components'

const initialValues: StudentAddBody = {
  name: '',
  grade: '',
  shift: '',
  year: 0
}

export const StudentAddForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [student, setStudent] = useState<Students>()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  let { id } = useParams()

  useEffect(() => {
    if (id !== undefined) getStudent(id)
  }, [])

  const getStudent = async (uuid: string): Promise<void> => {
    const { data } = await axios.get<Students>(`http://localhost:3000/students/${uuid}`)

    setFieldValue('name', data.math)
    setFieldValue('grade', data.math)
    setFieldValue('shift', data.language)
    setFieldValue('year', data.social)

    setStudent(data)
  }

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        if (selectedFile) {
          const formData = new FormData()
          formData.append('name', values.name)
          formData.append('grade', values.grade)
          formData.append('shift', values.shift)
          formData.append('year', String(values.year))
          formData.append('imageStudent', selectedFile)

          console.log({ values, selectedFile })

          const response = await axios.post('http://localhost:3000/students', formData)
          console.log(response)

          alert('DATO GUARDADO')
        } else {
          const formData = new FormData()
          formData.append('name', values.name)
          formData.append('grade', values.grade)
          formData.append('shift', values.shift)
          formData.append('year', String(values.year))

          const response = await axios.post('http://localhost:3000/students', formData)
          console.log(response)

          alert('DATO ACTUALIZADO')
        }
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
        <TextField
          style={{ marginBottom: 15 }}
          id="name"
          name="name"
          label="name"
          variant="outlined"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="grade"
          name="grade"
          label="grade"
          variant="outlined"
          value={values.grade}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="shift"
          name="shift"
          label="shift"
          variant="outlined"
          value={values.shift}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: 15 }}
          id="year"
          name="year"
          label="year"
          variant="outlined"
          value={values.year}
          onChange={handleChange}
        />

        <Button variant="contained" component="label" color="primary" sx={{ marginBottom: 3 }}>
          Upload a file
          <input type="file" onChange={handleFileChange} hidden />
        </Button>

        <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleSubmit()}>
          Send
        </Button>
      </div>
    </Layout>
  )
}
