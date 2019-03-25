const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/nodekb');

var db = mongoose.connection;


let Articles = require('./src/models/articles'); 

db.on('error' , function(err) {
    console.log(err);
});

db.once('open' , function() {
    console.log("DB Connected Successfully ..");
})


app.set('views' , path.join(__dirname , 'src/views'));
app.set('view engine' , 'pug');
app.use(express.static(path.join(__dirname , 'public')));


app.get('/' , function(request , resolve) {
    Articles.find({} , function(err , articles) {
        if(err) {
            console.log(err);
        } else {
            resolve.render('index' , {
                title : "Knowledge Base title" ,
                articles: articles
            });
        }
    })
});

app.get('/article/add' ,  function(request , resolve) {
    resolve.render('add_article' , {
        title : 'Add Article'
    })
});


// show article by ID

app.get('/article/:id' , function(request , response) {
    Articles.findById(request.params.id , function(err , res) {
        if(err) {
            console.log(err);
            return
        } else {
            response.render('article' , {
                article : res
            })
        }
    })
})

app.post('/articles/add' , function(request , response) {
    let article = new Articles;
    console.log(request.body.title);
    article.title = request.body.title;
    article.author = request.body.author;
    article.body = request.body.body;

    article.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            response.redirect('/');
        }
    })

})

app.listen(3000);