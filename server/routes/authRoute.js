const { subScribe } = require('../controllers/authController');

const router = require('express').Router();

router.post('/users', subScribe);

module.exports = router;