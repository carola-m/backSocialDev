const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const perfilesSchema = new Schema(
    {
        id: {type: String, require:true},
        idUser:{type: Schema.Types.ObjectId, ref:"user"},
        name: {type: String, require:true},
        lastname: {type:String, require:true},
        imagen: {type:String},
        email: {type:String},
        addnews: {type:Boolean},
        description: {type:String},
        enlaceGit: {type:String},
        enlaceLinkedin: {type:String},
   },{
      timestamps: true 
   }
)

const perfilUsuario = mongoose.model("perfilUsuario", perfilesSchema);

module.exports = perfilUsuario;