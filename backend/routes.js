const router = require('express').Router();
const authController = require('./controllers/auth-controller');
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);

router.post('/api/activate', authMiddleware, activateController.activate);
//this should be protected. allow this only for people who have valid access token

router. get('/api/refresh', authController.refresh);

router.post('/api/logout', authMiddleware, authController.logout);
//middle ward bcz we wanted only the loged in user to log out.

module.exports = router;