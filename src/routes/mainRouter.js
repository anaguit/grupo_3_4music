const controladorMain = require ("../controllers/mainControler");

const express = require ("express");
const router = express.Router();

router.get("/", controladorMain.index);

router.get("/about",controladorMain.aboutUs);

router.get("/contact",controladorMain.contact);

module.exports = router;