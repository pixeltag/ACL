const express = require('express');
const app = express();
const path = require('path');

app.set('views' , path.join(__dirname , 'src/views'));
app.set('view engine' , 'pug');

app.get('/' , function(request , resolve) {
    let articles = [
        {
            id: 0,
            title : 'Article One',
            body : 'Article one body is here '
        },
        {
            id: 1,
            title : 'Article two',
            body : 'Article two body is here '
        },
        {
            id: 2,
            title : 'Article three',
            body : 'Article three body is here '
        },
    ];
    resolve.render('index' , {
        title : "Knowledge Base title" ,
        articles: articles
    });
});

app.get('/article/add' ,  function(request , resolve) {
    resolve.render('add_article' , {
        title : 'Add Article'
    })
});

app.listen(3000);