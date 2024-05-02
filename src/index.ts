import express, {Request, Response} from 'express'
import HTTP_STATUSES from "./utils/httpStatuses";

const app = express()
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3005

const path = require('path');
const fs = require('fs');
const favicon = path.join('', 'public', 'favicon.ico');
const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation qa'},
        {id: 4, title: 'devops'}
    ]
}

app.get('/', (req: Request, res: Response) => {
    res.json('Hello User!!!')
})
app.get('/courses', (req: Request, res: Response) => {
    let foundCourse = db.courses
    if (req.query.title) {
        foundCourse = foundCourse.filter(el => el.title.indexOf(req.query.title as string) > -1)
    }
    res.json(foundCourse)
})
app.get('/courses/:id', (req: Request, res: Response) => {
    const course = db.courses.find((el) => el.id === +req.params.id)
    if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.json(course)
})
app.post('/courses', (req: Request, res: Response) => {
    if (!req.body?.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const newCourse = {
        id: +(new Date()),
        title: req.body?.title ?? 'unknown'
    }
    db.courses.push(newCourse)
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newCourse)
})
app.delete('/courses/:id', (req: Request, res: Response) => {
    db.courses = db.courses.filter((el) => el.id !== +req.params.id)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.put('/courses/:id', (req: Request, res: Response) => {
    if (!req.body?.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    const course = db.courses.find((el) => el.id === +req.params.id)
    if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    course.title = req.body?.title
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(course)
})

app.get('/favicon.ico', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream(favicon).pipe(res);
    res.status(HTTP_STATUSES.OK_200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
