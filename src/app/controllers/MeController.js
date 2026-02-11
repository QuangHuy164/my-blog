const BlogPost = require('../models/BlogPost');

class SiteController {
    // [GET] /me/stored/blogs in header.hbs 
    storedBlogs(req, res, next) {
         let blogQuery = BlogPost.find({})

  if (req.query._sort !== undefined) {
    blogQuery = blogQuery.sort({ [req.query.column]: req.query.type })
  }

  Promise.all([
    blogQuery.lean().exec(),
    BlogPost.countDocumentsDeleted()
  ])
    .then(([blogs, deletedCount]) =>
      res.render('me/stored-blog', {
        blogs,
        deletedCount,
      })
    )
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
