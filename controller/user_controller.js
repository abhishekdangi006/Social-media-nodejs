const User = require('../models/user');

//render the profile page
module.exports.profile = function(req,res){
    return res.render('profile',{
        title: 'profile page'
    });
}


//render the signup page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup',{
        title: "Codial | signup"
    });
}


//render the signin page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('signin',{
        title: "Codial | signin"
    });
}

// get the signup data
module.exports.create = function(req,res){
    // checking password and confirm password match or not 
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    //checking user is already exist
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
    return res.redirect('/');
}

//signOut handling
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error while logout");
        }
    });
    return res.redirect('/');
} 