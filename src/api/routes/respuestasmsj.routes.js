const express = require("express");
const respuestasRouter = express.Router();

const  {getRespuestasbyId, postRespuesta, deleteRespuesta} = require ('../controllers/respuestamsj.controllers')

respuestasRouter.get("/:id", getRespuestasbyId)
respuestasRouter.post("/", postRespuesta)
respuestasRouter.delete("/:id", deleteRespuesta)

module.exports = respuestasRouter