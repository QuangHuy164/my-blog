const BlogPost = require('../models/BlogPost');

class CourseController {
    // [GET] /courses/:slug

    show(req, res) {
        res.send('Course detail');
    }
}

module.exports = new CourseController();
