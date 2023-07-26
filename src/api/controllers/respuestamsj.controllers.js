const respuestaMsj = require('../models/respuestamsj.models');

const getRespuestasbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const allRespuestas = await respuestaMsj.find({'idMsj': id});

        if (!allRespuestas){
           return res.status(404).json({message: 'No hay respuestas informadas para el mensaje informado'}); 
        }

        return res.status(200).json(allRespuestas) ;
     } catch (error) {
        return res.status(500).json(error) ;
     }
     // res.send('listado movies')
}

const postRespuesta = async (req, res) => {
  try {
      const newRespuesta = new respuestaMsj(req.body);
      const createdRespuesta = await newMensaje.save();

      return res.status(201).json(createdRespuesta);        
  } catch (error) {
      return res.status(500).json(error);
  }
}
const deleteRespuesta = async (req, res) =>  {
    try {
        const {id} = req.params;
        const deleteRespuesta = await respuestaMsj.findByIdAndDelete(id);

        if(!deleteRespuesta){
            return res.status(404).json({message: 'No tenemos respuestas con ese ID'}); 
         }

        return res.status(200).json(deleteRespuesta);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {getRespuestasbyId, postRespuesta, deleteRespuesta} 