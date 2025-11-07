const express = require('express');
const { getUserProfileAndRepo } = require('../controllers/userController');
const router = express.Router();

router.get('/profile/:username',getUserProfileAndRepo);

module.exports = router;
