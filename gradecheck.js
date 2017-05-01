const path = require('path')
const fs = require('fs')

const Nightmare = require('nightmare')

const PushBullet = require('pushbullet')

const utils = require('./utils')

const PUSHBULLET_TOKEN = utils.retrieveEnv('PUSHBULLET_TOKEN')
const CONCORDIA_USERNAME = utils.retrieveEnv('CONCORDIA_USERNAME')
const CONCORDIA_PASSWORD = utils.retrieveEnv('CONCORDIA_PASSWORD')

const nightmare = Nightmare({
  show: false,
  switches: {
    'ignore-certificate-errors': true
  }
})

const TEMP_DIR = path.join(__dirname, 'temp')
const COURSES_FILE = path.join(TEMP_DIR, 'courses.json')
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR)
  if (!fs.existsSync(COURSES_FILE)) {
    fs.writeFileSync(COURSES_FILE, JSON.stringify([{}]), 'utf8')
  }
}

function sendNotification (newCourses) {
  const pusher = new PushBullet(PUSHBULLET_TOKEN)
  pusher.devices((err, resp) => {
    if (err) {
      throw err
    }
    resp.devices.filter((device) => {
      return device.active === true
    }).forEach((device) => {
      const newCoursesString = utils.formatCoursesList(newCourses)
      console.log(newCoursesString)
      pusher.note(device.iden, 'New Concordia grade!', newCoursesString, (error, response) => {
        if (error) {
          throw error
        }
      })
    })
  })
}

console.log('running job')
nightmare
    .goto('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
    .click('#userid')
    .type('#userid', CONCORDIA_USERNAME)
    .click('#pwd')
    .type('#pwd', CONCORDIA_PASSWORD)
    .click('#login > table > tbody > tr:nth-child(4) > td:nth-child(2) > input')
    .wait(12000) // allow time to login
    .click('#btnGrade')
    .wait(9000) // allow time to load the grades
    .click('#btnAllGrades')
    .wait(9000) // allow time to load all the grades
    .evaluate((classname) => {
      const elements = document.getElementsByClassName(classname)
      return Object.keys(elements).map((element) => {
        return elements[element].innerText
      })
    }, 'mainsec')
    .end()
    .then((result) => {
      const previousCourses = require(COURSES_FILE)
      const currentCourses = utils.parseCourses(result)
      const newCourses = utils.coursesDiff(previousCourses, currentCourses)
      if (newCourses.length !== 0) {
        sendNotification(newCourses)
        fs.writeFile(COURSES_FILE, JSON.stringify(currentCourses), 'utf8', (err) => { if (err) { throw err } })
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
