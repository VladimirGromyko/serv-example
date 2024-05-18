import express from "express";
import {getCoursesRouter, getInterestingRouter} from "./routes/courses";
import {getTestsRouter} from "./routes/tests";
import {db} from "./db/db";
import {getMainRouter} from "./routes/main";
import {totalRequest} from "./inputСontrolMiddleware/requestCounter";
import {authGuardMiddleware} from "./inputСontrolMiddleware/authGuard";
import {getFavicon} from "./inputСontrolMiddleware/getFavicon";

export const app = express()
export const jsonBodyMiddleware = express.json()

app.use(getFavicon);
app.use(totalRequest);
app.use(authGuardMiddleware);
app.use(jsonBodyMiddleware)

app.use('/', getMainRouter())
app.use('/courses', getCoursesRouter(db))
app.use('/interesting', getInterestingRouter(db))
app.use('/__test__', getTestsRouter(db))
