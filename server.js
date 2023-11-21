import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import viewRouter from './routers/view_router.js';
import userRouter from './routers/user_router.js';
import reportRouter from './routers/report_router.js';
import workOrderRouter from './routers/workOrder_router.js';
import dashboardRouter from './routers/dashboard_router.js';
import { errorHandle, notFound} from './middlewares/ErrorMiddleware.js';

// config env file
dotenv.config();

// express app
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}


const __dirname = path.resolve()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/icon', express.static(__dirname + 'public/icon'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/lib', express.static(__dirname + 'public/lib'))


// ejs template 
app.set('view engine', 'ejs');


// router
app.use('/', viewRouter);
app.use('/v2/api', userRouter, reportRouter, workOrderRouter, dashboardRouter);


// error middleware
app.use(errorHandle)
app.use(notFound)


// Port
const PORT = process.env.PORT || 8080;

// listen port
app.listen(PORT, () => {
    console.log(`server is running...! ${PORT}`);
})