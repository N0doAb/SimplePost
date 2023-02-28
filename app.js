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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/posts')
});

app.get('/posts', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then((posts) => res.render('posts/index', { title: 'Posts', posts}))
        .catch((err) => console.log(err));
});

app.get('/posts/create', (req, res) => {
    res.render('posts/create', { title: 'Create Post'});
});

app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((result) => res.json({ redirect: '/posts' }))
        .catch((err) => console.log(err));
})

app.post('/posts', (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(() => res.redirect('/posts'))
        .catch((err) => console.log(err));
})

app.use('/', (req, res) => {
    res.render('404', { title: 404 });
})