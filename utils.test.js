import test from 'ava'

import { retrieveEnv, parseCourses, coursesDiff, formatCoursesList } from './utils'

test('it finds the new element from a second array of object', (t) => {
  const a = [{ course: 'COMP 311', grade: '' },
             { course: 'COMP 011', grade: 'A-' },
             { course: 'COMP 111', grade: 'A+' },
             { course: 'COMP 211', grade: 'B' }]
  const b = [{ course: 'COMP 111', grade: 'A+' },
             { course: 'COMP 211', grade: 'B' },
             { course: 'COMP 311', grade: 'A' },
             { course: 'COMP 411', grade: 'A-' }]
  coursesDiff(a, b)
  t.pass()
})

test('it throws an error if environment variable not set', (t) => {
  t.throws(() => {
    retrieveEnv('PUSHBULLET_TOKEN')
  }, Error)
})

test('it parses courses', (t) => {
  parseCourses([])
  t.pass()
})

test('it formats the list of courses', (t) => {
  formatCoursesList([])
  t.pass()
})
