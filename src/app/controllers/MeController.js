const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /me/stored/blogs in header.hbs 
    storedBlogs(req, res, next) {
        BlogPost.find({}).lean()
            .then(blogs => res.render('me/stored-blog', {blogs}))
            .catch(next)
    }
}

module.exports = new SiteController();
