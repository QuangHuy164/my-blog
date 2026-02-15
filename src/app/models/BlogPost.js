const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    _id: {type: Number},
    name: { type: String, require: true},
    description: { type: String },
    image: { type: String, },
    videoId: {type: String, require: true},
    author: {type: String },
    slug: {type: String, slug: 'name', unique: true}
}, {
    _id: false,
    timestamps: true,
});

// custom query helpers
BlogPostSchema.query.sortable = function (req) {
     if (req.query._sort !== undefined) {
    const isValidType = ['asc', 'desc'].includes(req.query.type)
    return this.sort({ [req.query.column]: isValidType ? req.query.type : 'desc' })
  }
  return this;
}

// Add plugins
mongoose.plugin(slug)

BlogPostSchema.plugin(AutoIncrement)
BlogPostSchema.plugin(mongooseDelete,  { 
    deletedAt : true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);
