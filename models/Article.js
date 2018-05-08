var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    Headline: {
        type: String,
        require: true
    },
    Summary: {
        type: String,
    },
    URL: {
        type: String,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "UserComment"
    },
    isSaved: {
        type: Boolean,
        default: true
    }

});
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;