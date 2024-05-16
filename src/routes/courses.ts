import express, {Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import {QueryCoursesModel} from "../models/QueryCoursesModel";
import {CourseViewModel} from "../models/CourseViewModel";
import {URIParamsCourseIdModel} from "../models/URIParamsCourseIdModel";
import HTTP_STATUSES from "../utils/httpStatuses";
import {CreateCourseModel} from "../models/CreateCourseModel";
import {UpdateCourseModel} from "../models/UpdateCourseModel";
import {DBType} from "../db/db";
import {coursesRepository, getCourseViewModel} from "../repositories/coursesRepository";


export const getCoursesRouter = (db: DBType) => {
    const router = express.Router()
    router.get('/', (req: RequestWithQuery<QueryCoursesModel>,
                         res: Response<CourseViewModel[]>) => {
        const foundCourse = coursesRepository.findCourses(req.query.title)
        res.json(foundCourse)
    })
    router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
        const course = coursesRepository.findCourseById(+req.params.id)
        if (!course) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res.json(course)
    })
    router.post('/', (req: RequestWithBody<CreateCourseModel>,
                          res: Response<CourseViewModel>) => {
        if (!req.body?.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }
        const newCourse = coursesRepository.createCourse(req.body.title)
        res
            .status(HTTP_STATUSES.CREATED_201)
            .json(newCourse)
    })
    router.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
        const isDeleted = coursesRepository.deleteCourse(+req.params.id)
        if (isDeleted) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }

    })
    router.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res: Response) => {
        const updatedCourse = coursesRepository.updateCourse(+req.params.id, req.body?.title)
        if (!updatedCourse) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }

        if (updatedCourse === '0') {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res
            .sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    return router
}

export const getInterestingRouter = (db: DBType) => {
    const router = express.Router()

    router.get('/books', (req: RequestWithQuery<QueryCoursesModel>, res: Response) => {
        res.json({title: 'books'})
    })
    router.get('/:id([0-9]+)', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
        res.json({title: 'data by id: '+ req.params.id})
    })
    return router
}