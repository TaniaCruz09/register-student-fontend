import { Student } from './Student'

export interface Notes {
  id: string
  math: number
  science: number
  language: number
  social: number
  art: number
  students: Student
}

export interface NotesAddBody {
  math: number
  science: number
  language: number
  social: number
  art: number
  studentsId: string
}
