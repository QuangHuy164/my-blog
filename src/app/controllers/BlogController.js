const BlogPost = require('../models/BlogPost');
const slug = require('mongoose-slug-generator');

class CourseController {
    // [GET] /blogs/:slug
    show(req, res, next) {
        BlogPost.findOne({ slug: req.params.slug }).lean()
            .then(blogs => {
                res.render('blogs/show', {blogs})
            })
            .catch(next)
    }

    // [GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create')
    }

    // [POST] /blogs/store
    store(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new BlogPost(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {})
    }
}

module.exports = new CourseController();
