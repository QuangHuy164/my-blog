const BlogPost = require('../models/BlogPost');

class CourseController {
    // [GET] /courses/:slug

    show(req, res, next) {
        BlogPost.findOne({ slug: req.params.slug }).lean()
            .then(blogs => {
                res.render('courses/show', {blogs})
            })
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }
    // [POST] /courses/store
    store(req, res, next) {
        
    }
}

module.exports = new CourseController();
