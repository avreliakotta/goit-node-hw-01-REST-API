
const express = require("express");
const { validateBody, isValidId, authenticate } = require("../../middleware");
const schemas = require("../../schemas/contacts");
const ctrl = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate,isValidId, ctrl.getById);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.post("/",authenticate,  validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
