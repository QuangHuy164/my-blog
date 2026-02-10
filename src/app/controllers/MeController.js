const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /me/stored/blogs in header.hbs 
    storedBlogs(req, res, next) {
        let blogQuery = BlogPost.find({}).lean()

        if (req.query._sort && req.query.column) {
            const sortType = req.query.type === 'desc' ? -1 : 1
            blogQuery = blogQuery.sort({
                [req.query.column]: sortType
            })    
        }

        Promise.all([blogQuery, BlogPost.countDocumentsDeleted() ])
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
