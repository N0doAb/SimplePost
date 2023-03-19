const express = require('express');
const postController = require('../controllers/postController')

const router = express.Router();

router.get('/', postController.post_index);
router.get('/create', postController.post_create_get);
router.delete('/:id', postController.post_create_post);
router.post('/', postController.post_delete);

module.exports = router;