const express = require("express");
const perfilesRouter = express.Router();

const {getPerfil, getPerfilbyId,getPerfilbyId2, getPerfilesNews, postPerfil, putPerfil, deletePerfil} = require ('../controllers/perfiles.controllers')

const {isAuth} = require("../../middlewares/auth")
const upload = require("../../middlewares/upload.file");

perfilesRouter.get("/lista", getPerfil)
perfilesRouter.get("/novedad", getPerfilesNews)
perfilesRouter.get("/perfil/:id",getPerfilbyId)
perfilesRouter.get("/perfil2/:id",getPerfilbyId2)
perfilesRouter.get("/novedad", getPerfilesNews)
perfilesRouter.post("/", upload.single('imagen'), postPerfil)
perfilesRouter.put("/:id", upload.single('imagen'), putPerfil)
perfilesRouter.delete("/:id", deletePerfil)

module.exports = perfilesRouter