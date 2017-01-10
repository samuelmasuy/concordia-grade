[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[Docker Hub](https://hub.docker.com/r/samuelmasuy/gradecheck-concordia/)

# concordia-grade

Check Concordia grades and send notification to [Pushbullet](https://docs.pushbullet.com/) devices if any new grade comes in 💯.

## Prerequisites

Get API token for [Pushbullet](https://docs.pushbullet.com/)

## Run

### Locally (Node)

```bash
$ npm install --production
$ PUSHBULLET_TOKEN=<token> CONCORDIA_USERNAME=<uname> INTERVAL_CHECK_M=<in min> CONCORDIA_PASSWORD=<password> npm start
```

### Locally (Docker)

```bash
$ docker build -t gradecheck .
$ docker tag gradecheck:latest <TAG>
$ docker run -d --env-file ./env.list <TAG>
# or
$ docker pull samuelmasuy/gradecheck-concordia
$ docker run -d --env-file ./env.list samuelmasuy/gradecheck-concordia:latest
```

### AWS (Docker)

Run with **AWS EC2 Container Service**, see `gradecheck-task.ecs.aws.json`
for the task definition.

## Test (AVA)

```bash
$ npm install
$ npm run test
# or
$ npm run watch:test
```

## Lint (Standard)

```bash
$ npm run lint
```
## License (MIT)

See LICENCE
