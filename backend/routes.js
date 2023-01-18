const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const roomsController = require("./controllers/rooms-controller");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

router.post("/api/activate", authMiddleware, activateController.activate);
//this should be protected. allow this only for people who have valid access token

router.get("/api/refresh", authController.refresh);

router.post("/api/logout", authMiddleware, authController.logout);
//middleware bcz we wanted only the loged in user to log out.
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);
router.get("/api/rooms/:roomId", authMiddleware, roomsController.show);

module.exports = router;
