import axios from 'axios'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useFormik } from 'formik'

import { Layout } from '../../components'
import { StudentAddBody } from '../../interfaces'

const initialValues: any = {
  name: '',
  grade: '',
  shift: ''
  // notes: Number[]
}

export const StudentAddForm = () => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        const response = await axios.post('http://localhost:3000/students', values)
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
