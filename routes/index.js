const express = require('express');
const router = express.Router();

const staticRoutes = require('./staticRoutes');
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const submitRoutes = require('./submitRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/submit', submitRoutes);
router.use(express.static(__dirname + '/jsTxTest'));
router.use(staticRoutes);

module.exports = router;
