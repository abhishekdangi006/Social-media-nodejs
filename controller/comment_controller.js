const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post
                
            },function(err,comment){
                if(err){
                    console.log("error in comment");
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            });

        }
    });
    
}