import { Request, Response } from "express";
import { paginate } from "../pagination";
import { logsFilter } from "../filter";
const fs = require('fs');
const path = require('path');


export const getlogs = (req:Request, res:Response) => {
  fs.readFile(path.join(__dirname, '../../../logs/backend.log'), 'utf-8', async(err:NodeJS.ErrnoException, logs:string) => {
    if (err) {
        console.log(err);
        return res.status(500).send({ error: 'Failed to load logs' });
    }

    
    // Process logs and send response
    let parsedLogs = logs.split('\n').filter(Boolean).map((line)=>JSON.parse(line));   
    
    const method = req.query.method as string || null;
    const date = req.query.date as string || null;
    
    if(date || method){
      parsedLogs =  logsFilter(parsedLogs, date, method) as any;

    }
    const currentPage = parseInt(req.query.page as string) || 1;
    const paginatedLogs = await paginate(parsedLogs,currentPage);
    
    return res.status(200).json(paginatedLogs);
});
};