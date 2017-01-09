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
  const expected = [{ course: 'COMP 311', grade: 'A' },
                    { course: 'COMP 411', grade: 'A-' }]
  const diff = coursesDiff(a, b)
  t.deepEqual(diff, expected)
})

test('it throws an error if environment variable not set', (t) => {
  const error = t.throws(() => {
    retrieveEnv('PUSHBULLET_TOKEN')
  }, Error)
  t.is(error.message, 'The environment variable PUSHBULLET_TOKEN must be set')
})

test('it returns the value of the environment variable if it is set', (t) => {
  process.env['UNICORN'] = '🦄'
  let value
  t.notThrows(() => {
    value = retrieveEnv('UNICORN')
  }, Error)
  t.is(value, '🦄')
})

test('it parses courses', (t) => {
  parseCourses([])
  t.pass()
})

test('it formats the list of courses', (t) => {
  const courses = [{ course: 'COMP 511', grade: 'A+' },
                   { course: 'COMP 411', grade: 'A-' }]
  const formated = formatCoursesList(courses)
  const expected = `Course: ${courses[0].course}, Grade: ${courses[0].grade}
Course: ${courses[1].course}, Grade: ${courses[1].grade}
Congratulations! 👍`
  t.is(formated, expected)
})
