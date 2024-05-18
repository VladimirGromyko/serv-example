import {NextFunction, Request} from "express";
import {ResponseWithMiddleware} from "../types";

export const userMiddleware = (req: Request, res: ResponseWithMiddleware<{user: string, totalReq: number}>, next: NextFunction)=> {
    res.locals.user = "User"
    next()
}