const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const respuestasSchema = new Schema(
    {
        id: {type: String, require:true},
        idMsj:{type: Schema.Types.ObjectId, ref:"mensajes"},
        idUser:{type: Schema.Types.ObjectId, ref:"perfilUsuario"},
        textomsj: {type: String, require:true},
   },{
      timestamps: true 
   }
)

const respuestaMsj = mongoose.model("respuestas", respuestasSchema);

module.exports = respuestaMsj;