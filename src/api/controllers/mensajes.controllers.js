const Mensaje = require('../models/mensajes.models');

const getMensajes = async (req, res) => {
    try {
        const allMensajes = await Mensaje.find();
        
        if (allMensajes.length == 0)
           return res.status(404).json({message:"No hay mensajes informados."});   
      
        return res.status(200).json(allMensajes);   
     } catch (error) {
       return res.status(500).json(error);
     }
}

const postMensajes = async (req, res) => {
  try {
      const newMensaje = new Mensaje(req.body);
      const createdMensaje = await newMensaje.save();

      return res.status(201).json(createdMensaje);        
  } catch (error) {
      return res.status(500).json(error);
  }
}
const deleteMensajes = async (req, res) =>  {
    try {
        const {id} = req.params;
        const deleteMensaje = await Mensaje.findByIdAndDelete(id);

        if(!deleteMensaje){
            return res.status(404).json({message: 'No tenemos mensajes con ese ID'}); 
         }
        return res.status(200).json(deleteMensaje);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {getMensajes, postMensajes, deleteMensajes} 