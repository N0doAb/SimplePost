const Post = require('../models/post');

const post_index = (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then((posts) => res.render('posts/index', { title: 'Posts', posts}))
        .catch((err) => console.log(err));
}

const post_create_get = (req, res) => {
    res.render('posts/create', { title: 'Create Post'});
}

const post_create_post = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((result) => res.json({ redirect: '/posts' }))
        .catch((err) => console.log(err));
}

const post_delete = (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(() => res.redirect('/posts'))
        .catch((err) => console.log(err));
}

module.exports = {
    post_index,
    post_create_get,
    post_create_post,
    post_delete
}