import {NextFunction, Request, Response} from "express";
import {ResponseWithMiddleware} from "../types";

let countReq = 0
export const totalRequest = (req: Request, res: ResponseWithMiddleware<{totalReq: number}>, next: NextFunction) => {
    countReq++
    res.locals.totalReq = countReq
    next()
}
