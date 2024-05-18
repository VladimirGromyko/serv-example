import {NextFunction, Request, Response} from "express";
import HTTP_STATUSES from "../utils/httpStatuses";

export const getFavicon = (req: Request, res: Response, next: NextFunction)=> {
    if (req.originalUrl.includes('favicon.ico')) {
        const path = require('path');
        const fs = require('fs');
        const favicon = path.join('public', 'favicon.ico');
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(favicon).pipe(res);
        res.sendStatus(HTTP_STATUSES.OK_200).end()
    } else {
        next()
    }

}