var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    Comment:{
        type:  String,
        require: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },

});
var UserComment = mongoose.model("UserComment", CommentSchema);

module.exports = UserComment;