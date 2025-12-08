const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /me/stored/blogs in header.hbs 
    storedBlogs(req, res, next) {
        BlogPost
        res.render('me/stored-blog');
    }
}

module.exports = new SiteController();
