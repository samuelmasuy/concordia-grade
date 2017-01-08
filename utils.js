module.exports.retrieveEnv = function (env) {
  const setting = process.env[env]
  if (!setting) {
    throw new Error(`The environmental variable ${env} must be set`)
  }
  return setting
}

module.exports.parseCourses = function (result) {
  return result.map((s) => {
    return s.replace(/(\r\n|\n|\r)/gm, ' ')
  }).filter((s) => {
    return s !== ''
  }).map((s) => {
    const course = s.split(' ').slice(0, 2).join(' ')
    const gradeSplit = s.split('Grade:')
    if (gradeSplit.length === 2) {
      return {course: course, grade: gradeSplit[1].trim()}
    }
    return {course: course, grade: ''}
  })
}

module.exports.coursesDiff = function (coursesPrevious, coursesCurrent) {
  return coursesCurrent.filter((courseCurrent) => {
    return coursesPrevious.filter((coursePrevious) => {
      return coursePrevious.course === courseCurrent.course && coursePrevious.grade === courseCurrent.grade
    }).length === 0
  })
}

module.exports.formatCoursesList = function (courses) {
  return courses.map((c) => {
    return `Course: ${c.course}, Grade: ${c.grade}`
  }).join('\n') + '\nCongratulations!'
}

module.exports.interval = function (func, wait) {
  let interv = (function (w) {
    return () => {
      setTimeout(interv, w)
      try {
        func()
      } catch (e) {
        throw e.toString()
      }
    }
  }(wait))

  setTimeout(interv)
}
