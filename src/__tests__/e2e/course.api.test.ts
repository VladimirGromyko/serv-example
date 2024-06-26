import request from 'supertest'
import HTTP_STATUSES from "../../utils/httpStatuses";
import {CreateCourseModel} from "../../models/CreateCourseModel";
import {UpdateCourseModel} from "../../models/UpdateCourseModel";
import {app} from "../../app";

const getRequest = () => {
    return request(app)
}
describe('/course', () => {
    beforeAll(async () => {
        await getRequest().delete('/__test__/data')
    })

    it('should return 200 and empty array', async () => {
        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 not existing course', async () => {
        await getRequest()
            .get('/courses/99999999')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create course with incorrect input data`, async () => {
        const data: CreateCourseModel = {title: ''}

        await getRequest()
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse1: any = null
    it(`should create course with correct input data`, async () => {
        const data: CreateCourseModel = {title: 'new course'}

        const createResponse = await getRequest()
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createdCourse1 = createResponse.body

        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'new course',
        })
        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1])
    })

    let createdCourse2: any = null
    it(`create one more course`, async () => {
        const data: CreateCourseModel = {title: 'new course 2'}

        const createResponse = await getRequest()
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createdCourse2 = createResponse.body

        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: data.title,
        })
        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1, createdCourse2])
    })

    it(`shouldn't update course with incorrect input data`, async () => {
        const data: UpdateCourseModel = {title: ''}

        await getRequest()
            .put(`/courses/${createdCourse1.id}`)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await getRequest()
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.OK_200, createdCourse1)
    })

    it(`shouldn't update course that not exist`, async () => {
        const data: UpdateCourseModel = {title: 'good title'}

        await getRequest()
            .put(`/courses/${-100}`)
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

    })

    it(`should update course with correct input data`, async () => {
        const data: UpdateCourseModel = {title: 'good new title'}
        await getRequest()
            .put(`/courses/${createdCourse1.id}`)
            .send(data)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await getRequest()
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdCourse1, title: data.title
            })
        await getRequest()
            .get(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.OK_200, createdCourse2)
    })

    it(`should delete both courses`, async () => {
        await getRequest()
            .delete(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await getRequest()
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await getRequest()
            .delete(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await getRequest()
            .get(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await getRequest()
            .get(`/courses`)
            .expect(HTTP_STATUSES.OK_200, [])
    })
    afterAll(done => done())
})