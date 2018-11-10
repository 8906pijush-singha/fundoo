const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/fundoo');

module.exports={
    mongoose
}