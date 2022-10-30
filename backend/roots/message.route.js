const { CreateMessage, getMessage } = require("../controllers/message.controller");
const router = require("express").Router();

router.post("/message",CreateMessage);
router.get("/getmessages/:id",getMessage);

module.exports = router ;  