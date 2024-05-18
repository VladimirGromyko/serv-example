import {NextFunction, Request, Response} from "express";
import HTTP_STATUSES from "../utils/httpStatuses";

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
    }
}