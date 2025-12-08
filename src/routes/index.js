const meRouter = require('./me');
const newsRouter = require('./news');
const blogsRouter = require('./blogs');
const siteRouter = require('./site');

const route = (app) => {
    app.use('/news', newsRouter);
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter)
    app.use('/', siteRouter);
};

module.exports = route;
