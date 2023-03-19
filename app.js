const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const postRoutes = require('./routes/postRoutes');

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
    res.redirect('/posts');
});

app.use('/posts', postRoutes);

app.use('/', (req, res) => {
    res.render('404', { title: 404 });
})