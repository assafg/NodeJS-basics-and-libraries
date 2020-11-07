import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
app.use(logOriginMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
});

app.listen(3001, () => {
    console.log('app started and listenenig at http://localhost:3001');
});

function logOriginMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`Got request for ${req.path} from ${req.ip}`);
    next();
}
