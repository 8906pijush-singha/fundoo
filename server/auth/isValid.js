

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

  function valid(req,res,next){
    let responseResult = {};
    if(req.body === null){
        responseResult.status = false;
        responseResult.message = 'field empty';
        res.status(404).send(responseResult);
    }
    next();
  }


  module.exports=valid;