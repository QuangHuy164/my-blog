const BlogPost = require('../models/BlogPost');

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
        const blog = new BlogPost(formData)
        blog.save()
            .then(() => res.redirect('/'))
            .catch(next => {})

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

    // [DELETE] /blogs/:id
    delete(req, res, next) {
        BlogPost.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    restore(req, res, next) {
         BlogPost.restore({_id: req.params.id})
            .then(() => res.redirect('/me/trash/blogs'))
            .catch(next)
    }
}

module.exports = new CourseController();
