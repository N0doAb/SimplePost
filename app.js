const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
app.listen(80);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/posts')
});

app.get('/posts', (req, res) => {
    res.render('posts/index', { title: 'Posts'});
});

app.get('/posts/create', (req, res) => {
    res.render('posts/create', { title: 'Create Post'});
});

app.use('/', (req, res) => {
    res.render('404', { title: 404 });
})