const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const BlogPost = new Schema({
    _id: String,
    name: { type: String, require: true},
    description: { type: String },
    image: { type: String, },
    videoId: {type: String, require: true},
    author: {type: String },
    slug: {type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug)
BlogPost.plugin(mongooseDelete,  { 
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('BlogPost', BlogPost);
