const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const Post = require('./dbModels/post.js');

const app = express();

const dbInfo = fs.readFileSync('./dbinfo.json');
const dbCredentials = JSON.parse(dbInfo);

const dbURI = `mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@simplepost.pmhjdyy.mongodb.net/website?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(dbURI)
    .then((result) => app.listen(80))
    .catch((err) => console.log(err));

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