const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const globalRouter = require('./routes/global');
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users');
const lessonRouter = require('./routes/lessons');
const chapterRouter = require('./routes/chapters');
const sectionRouter = require('./routes/sections');
const testRouter = require('./routes/test');
const commentsRouter = require('./routes/comments')

const app = express();

const Options = {
    origin: ["http://localhost:3000"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Allow-Origin-Control",
        "Access-Control-Request-Headers",
    ],
    credentials: true,
    enablePreflight: true,
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(Options));

// app.use('/auth', require('./auth'));

// app.use(require('./middleware/auth'));

app.use('/', indexRouter);
app.use('/global', globalRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/lessons', lessonRouter);
app.use('/chapters', chapterRouter);
app.use('/sections', sectionRouter);
app.use('/test', testRouter);
app.use('/comment', commentsRouter)

module.exports = app;
