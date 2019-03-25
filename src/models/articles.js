const mongoose = require('mongoose');

var ArticlesSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    body : {
        type : String,
        require : true
    }
});

let Articles = module.exports = mongoose.model('Articles' , ArticlesSchema);