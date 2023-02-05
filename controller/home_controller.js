const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log("error in home controller while showing posts");
    //     }
    //     return res.render('home',{
    //         title: 'Home page',
    //         posts: posts
    //     });
    // });

    // populate the user of each post 
    Post.find({}).populate('user').populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    }).exec(function(err,posts){
        User.find({},function(err,users){
        return res.render('home',{
        title: 'Home page',
        posts: posts,
        all_users:users
    });
});     
    });
    
}