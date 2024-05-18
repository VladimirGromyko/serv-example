import express, {Request, Response} from "express";
import {userMiddleware} from "../inputСontrolMiddleware/getUser";


export const getMainRouter = () => {
    const router = express.Router()
    router.get('', userMiddleware, (req: Request, res: Response) => {
        const {user, totalReq}  = res.locals
        res.locals = {}
        res.json({greeting: `Hello ${user}!!!`, totalReq})
    })
    return router
}