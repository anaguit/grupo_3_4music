const controladorMain = require ("../controllers/mainControler");

const express = require ("express");
const router = express.Router();

router.get("/", controladorMain.index);



module.exports = router;