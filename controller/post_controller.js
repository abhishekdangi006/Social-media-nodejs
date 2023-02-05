const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


// Creating the user post
module.exports.create = async function(req , res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post has been uploaded');
        return res.redirect('back');
    }catch(err){
        console.log("Error in post controller create method", err);
    }
}


// Deleting the user post
module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            req.flash('success', 'Post has been deleted');
            await Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in post controller destroy method ', err);
    }
    
}