const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const projectsSchema = new Schema(
    {
        id: {type: String, require:true},
        idUser:{type: Schema.Types.ObjectId, ref:"perfilUsuario"},
        name: {type: String, require:true},
        imagen: {type:String},
        html: {type:String},
        css: {type:String},
        react: {type:String},
        angular: {type:String},
        php: {type:String},
        jscript: {type:String},
        python: {type:String},
        java: {type:String},
        otros: {type:String},
        otherText: {type:String},
        description: {type:String},
        enlaceGit: {type:String},
        enlaceProyecto: {type:String}
   },{
      timestamps: true 
   }
)

const projectsUsuario = mongoose.model("projectsUsuario", projectsSchema);

module.exports = projectsUsuario;