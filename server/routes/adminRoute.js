const router = require('express').Router();
const {getAllSubscribers, getGroupedSubscriptions, manageSubscription, loginAmin} = require('../controllers/adminController');

router.post('/login', loginAmin);
router.get('/getAllSubscription', getGroupedSubscriptions)
router.post('/manageSubscription', manageSubscription);

module.exports = router