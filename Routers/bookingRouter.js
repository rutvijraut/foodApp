const { protectRoute } = require("../controller/authController");

bookingRouter
.post('/createSession',protectRoute)