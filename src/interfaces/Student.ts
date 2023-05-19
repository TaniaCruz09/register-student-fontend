import { Image } from './Image'

export interface Student {
  id: string
  name: string
  grade: string
  year: number
  shift: string
  imageStudent: Image
}

export interface StudentAddBody {
  name: string
  grade: string
  year: number
  shift: string
}
