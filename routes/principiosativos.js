const express = require("express")
const router = express.Router()
const {} = require("../controllers/principiosativos")
const {getPrincipioById,deletePrincipio, updatePrincipio, createPrincipio, getPrincipio} = require("../controllers/principiosativos")

router.get("/", getPrincipio);
router.get("/:id", getPrincipioById);
router.delete("/:id", deletePrincipio)
router.patch("/:id", updatePrincipio)
router.post("/", createPrincipio)

module.exports = router
