import {CourseType, db} from "../db/db";
import {CourseViewModel} from "../models/CourseViewModel";

export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => ({id: dbCourse.id, title: dbCourse.title})

export const coursesRepository= {
    findCourses(title: string | null | undefined) {
        const filteredCourse:CourseType[] = title
            ? db.courses.filter(getCourseViewModel => getCourseViewModel.title.indexOf(title) > -1)
            : db.courses
        return filteredCourse.map(getCourseViewModel)
    },
    findCourseById(id: number) {
        const course = db.courses.find((el) => el.id === id)
        if (!course) {
            return null
        }
        return getCourseViewModel(course)
    },
    createCourse(title: string) {
        const newCourse: CourseType = {
            id: +(new Date()),
            title: title ?? 'unknown',
            studentsCount: 0
        }
        db.courses.push(newCourse)
        return getCourseViewModel(newCourse)
    },
    updateCourse(id: number, title: string) {
        if (!title) {
            return null
        }
        const course = db.courses.find((el) => el.id === id)
        if (!course) {
            return '0'
        }
        course.title = title
        return '1'
    },
    deleteCourse(id: number) {
        const courses = db.courses.filter((el) => el.id !== id)
        if (courses.length === db.courses.length) {
            return false
        }
        db.courses = [...courses]
        return true
    },
}