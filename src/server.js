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
        helpers: {
            sum: (a,b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'cil-elevator',
                    asc: 'cil-sort-ascending',
                    desc: 'cil-sort-descending'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]    
                return ` <a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`
                
            }
        },
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
