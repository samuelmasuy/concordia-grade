[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[Docker Hub](https://hub.docker.com/r/samuelmasuy/gradecheck-concordia/)

# concordia-grade

Check Concordia grades and send notification to [Pushbullet](https://docs.pushbullet.com/) devices if any new grade comes in 💯.

## Prerequisites

Get API token for [Pushbullet](https://docs.pushbullet.com/)

Fill `env.list.todo` and rename it with `env.list`.

## Run

### Locally (Node)

```bash
$ npm install --production # install only production dependencies
$ PUSHBULLET_TOKEN=<> CONCORDIA_USERNAME=<> CONCORDIA_PASSWORD=<> INTERVAL_CHECK_M=<> npm start
```

### Locally (Docker)

```bash
$ docker build -t gradecheck .
$ docker tag gradecheck:latest <TAG>
$ docker run -d --env-file ./env.list <TAG>
```

Or,

```bash
$ docker pull samuelmasuy/gradecheck-concordia # pull image from docker hub
$ docker run -d --env-file ./env.list samuelmasuy/gradecheck-concordia:latest
```

### AWS (Docker)

Run with [AWS EC2 Container Service](https://aws.amazon.com/ecs/),
see `gradecheck-task.ecs.aws.json` for a task definition example.

## Development

```bash
$ npm install # install all dependencies including dev dependencies
```

### Test (AVA)

```bash
$ npm run test
$ npm run watch:test # watch mode
```

### Lint (Standard)

```bash
$ npm run lint
```

## License (MIT)

See LICENCE
