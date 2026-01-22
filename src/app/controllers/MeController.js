const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /me/stored/blogs in header.hbs 
    storedBlogs(req, res, next) {
        Promise.all([BlogPost.find({}).lean(), BlogPost.countDocumentsDeleted() ])
        .then(([blogs, deletedCount]) => res.render('me/stored-blog', {blogs, deletedCount}))
        .catch(next)
    }

    // [GET] /me/trash/blogs
    trashBlogs(req, res, next) {
         BlogPost.findDeleted({}).lean()
            .then(blogs => res.render('me/trash-blog', {blogs}))
            .catch(next)
    }
}

module.exports = new SiteController();
