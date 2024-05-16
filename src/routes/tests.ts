import express, {Express, Request, Response} from "express";
import HTTP_STATUSES from "../utils/httpStatuses";
import {DBType} from "../db/db";

export const getTestsRouter = (db: DBType) => {
    const router = express.Router()
    router.delete('/data', (req: Request, res: Response) =>{
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    return router
}
