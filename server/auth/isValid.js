

// router.post('/login', function(req, res) {
//     User.findOne({ email: req.body.email }, function (err, user) {
//       if (err) return res.status(500).send('Error on the server.');
//       if (!user) return res.status(404).send('No user found.');
//       var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//       if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//       var token = jwt.sign({ id: user._id }, config.secret, {
//         expiresIn: 86400 // expires in 24 hours
//       });
//       res.status(200).send({ auth: true, token: token });
//     });
//   });

  exports.loginValid=(req,res,next)=>{
    
    if(req.body === null||req.body ==={}){
      let responseResult = {};
        responseResult.status = false;
        responseResult.message = 'field empty';
        console.log("jhvhv")
        res.status(404).send(responseResult);
    }
    next();
  }

  exports.registrationValid=(req,res,next)=>{
    
    if(req.body === null||req.body ==={}){
      let responseResult = {};
        responseResult.status = false;
        responseResult.message = 'field empty';
        console.log("jhvhv")
        res.status(404).send(responseResult);
    }
    next();
  }


  exports.tokenValid=(req,res,next)=>{
    const token=req.headers['access-token'];
    console.log("token ",token);
    
    if(token == 'null' || token == undefined || token ==""){
      console.log('if', token);
      
      let responseResult = {};
        responseResult.status = false;
        responseResult.msg = 'auth';
        res.status(200).send(responseResult);
    } else {
      console.log('else ', token);
      next()
    }
  }

  exports.forgotEmailValid=(req,res,next)=>{
    
    if(req.body === "null"||req.body ==={}){
      let responseResult = {};
        responseResult.status = false;
        responseResult.message = 'field empty';
        console.log("jhvhv")
        res.status(404).send(responseResult);
    }
    next();
  }