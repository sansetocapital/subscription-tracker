const router = require('express').Router();
const {getAllUsers, getGroupedSubscriptions, manageSubscription, loginAmin, getUserCounts} = require('../controllers/adminController');

router.post('/login', loginAmin);
router.get('/getAllSubscription', getGroupedSubscriptions);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserCounts', getUserCounts);
router.post('/manageSubscription', manageSubscription);

module.exports = router