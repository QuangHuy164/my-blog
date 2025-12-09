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

    // [GET] /blogs/:id/edit
    edit(req, res, next) {
        BlogPost.findById(req.params.id).lean()
            .then(blogs => res.render('blogs/edit', {blogs}))
            .catch(next)
    }

    // [PUT] /blogs/:id
    update(req, res, next) {
        BlogPost.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/blogs'))
            .catch(next)
    }
}

module.exports = new CourseController();
