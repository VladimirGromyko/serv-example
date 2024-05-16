import express, {Request, Response} from "express";


const path = require('path');
export const fs = require('fs');
export const favicon = path.join('public', 'favicon.ico');
export const getMainRouter = () => {
    const router = express.Router()
    router.get('', (req: Request, res: Response) => {
        res.json('Hello User!!!')
    })

    router.get('favicon.ico', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(favicon).pipe(res);
    })
    return router
}