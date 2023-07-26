const express = require("express");
const MensajesRouter = express.Router();

const {getMensajes, postMensajes, deleteMensajes}  = require ('../controllers/mensajes.controllers')

MensajesRouter.get("/", getMensajes)
MensajesRouter.post("/", postMensajes)
MensajesRouter.delete("/:id", deleteMensajes)

module.exports = MensajesRouter