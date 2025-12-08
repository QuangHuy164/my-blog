const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    name: { type: String, require: true},
    description: { type: String },
    image: { type: String, },
    videoId: {type: String, require: true},
    author: {type: String, },
    slug: {type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
});

module.exports = mongoose.model('BlogPost', BlogPost);
