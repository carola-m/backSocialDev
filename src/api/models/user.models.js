const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const userSchema = new Schema(
    {
        name: {type:String, require:true},
        lastname: {type:String, require:true},
        email: {type:String, require:true},
        password: {type:String, require:true},
        addnews: {type:Boolean},
        role: {type:String, default:"user", enum:["admin", "user"]}
},{
   timestamps: true 
})

const User = mongoose.model("user", userSchema);

module.exports = User