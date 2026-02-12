const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override')
const { engine } = require('express-handlebars');

const sortMiddleware = require('./app/middlewares/sortMiddleware')

const port = 3001;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride('_method'))
app.use(sortMiddleware)

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: require('./helpers/handlebars'),
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
