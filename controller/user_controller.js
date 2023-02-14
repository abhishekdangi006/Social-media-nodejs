const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//render the profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            title: 'profile page',
            profile_user:user
        });
    })
    
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
                req.flash('success', 'Profile created successfully');
                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign In and go to session
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

//signOut handling
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error while logout");
        }   
    });
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
} 

//updating users profile
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                }

                if (req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


       
    }else{
        return res.status(401).send('Unauthorized');
    }
}