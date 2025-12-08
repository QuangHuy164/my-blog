const express = require('express');
const router = express.Router();

const blogController = require('../app/controllers/BlogController');

router.get('/create', blogController.create)
router.post('/store', blogController.store)
router.get('/:slug', blogController.show);

module.exports = router;
