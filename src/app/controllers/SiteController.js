const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // lean() returns a JS obj instead of a Mongoose docs
        BlogPost.find({}).lean()
        .then(blogs => res.render('home', {blogs}))
        .catch(next)
    }
    // index(req, res, next) {
    //     BlogPost.find({})
    //         .then(blogs => {
    //         blogs = blogs.map(blog => blog.toObject())
    //         res.render('home', {blogs})})
    //         .catch(next);
    // }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
