const User = require('../models/user');

//render the profile page
module.exports.profile = function(req,res){
    return res.render('profile',{
        title: 'profile page'
    });
}

//render the post page
module.exports.post = function(req,res){
    return res.render('post',{
        title: 'Post page'
    });
}

//render the signup page
module.exports.signup = function(req,res){
    return res.render('signup',{
        title: "Codial | signup"
    });
}


//render the signin page
module.exports.signin = function(req,res){
    return res.render('signin',{
        title: "Codial | signin"
    });
}

// get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up');return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign In and go to session
module.exports.createSession = function(req,res){
    //TODO later
}