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
}

module.exports = new CourseController();
