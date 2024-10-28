import { Request, Response } from "express";
import { paginate } from "../pagination";
const fs = require('fs');
const path = require('path');



// const filepath = path.join(__dirname, '../logs/backend.log')

export const getlogs = (req:Request, res:Response) => {
  fs.readFile(path.join(__dirname, '../../../logs/backend.log'), 'utf-8', async(err:NodeJS.ErrnoException, logs:string) => {
    if (err) {
        console.log(err);
        return res.status(500).send({ error: 'Failed to load logs' });
    }

    
    // Process logs and send response
    const parsedLogs = logs.split('\n').filter(Boolean).map((line)=>JSON.parse(line));
    const currentPage = parseInt(req.query.page as string) || 1;
    const paginatedLogs = await paginate(parsedLogs,currentPage);
    return res.status(200).json(paginatedLogs);
});
};