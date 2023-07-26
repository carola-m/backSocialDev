const Perfil = require('../models/perfiles.models');
const { deleteFile } = require("../../middlewares/delete.file");

const getPerfil = async (req, res) => {
   try {
      //Recoger querys de numero de pagina(page) y limite por pagina(limit)
      let {page, limit} = req.query;
      
      //Contar el numero de elementos en mi coleccion
      const numPerfiles = await Perfil.countDocuments();
      
      //Si no está seteado seteo el limite a 5
      limit = limit ? parseInt(limit) || 20 : 20;

      //Comprobar el numero máximo de paginas dependiendo de mi limite
      let numPages = numPerfiles%limit > 0 ? numPerfiles/limit + 1 : numPerfiles/limit;

      //Si no está seteado seteo el numero de pagina a 1
      page = page > numPages ? numPages : page < 1 ? 1 :  parseInt(page) || 1;

      // Calculo el salto(skip) que tengo que dar a mi find para empezar a partir del elemento que quiero
      const skip = (page - 1) * limit;

      const allPerfiles = await Perfil.find().skip(skip).limit(limit);

      const response = {
          info: {
              numPerfiles: numPerfiles,
              page: page,
              limit: limit,
              nextPage: numPages >= page + 1 ? `lista?page=${page + 1}&limit=${limit}` : null,
              previousPage: page != 1 ? `lista?page=${page - 1}&limit=${limit}` : null
          },
          results: allPerfiles
      }
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).json(error)
  }
}

const getPerfilbyId = async (req, res) => {
    try {
        const {id} = req.params;
        
        const findPerfil = await Perfil.find({ 'idUser': id });
        if (!findPerfil)
         {
           return res.status(404).json({message:"No hay perfiles de usuario con el id indicado"});
         }
        return res.status(200).json(findPerfil);
     } catch (error) {
       return res.status(500).json(error);
     }
  }
  const getPerfilbyId2 = async (req, res) => {
    try {
        const {id} = req.params;
        const findPerfil = await Perfil.findById(id);
        if (!findPerfil)
         {
           return res.status(404).json({message:"No hay perfiles de usuario con el id indicado"});
         }
        return res.status(200).json(findPerfil);
     } catch (error) {
       return res.status(500).json(error);
     }
  }
  const getPerfilesNews = async (req, res) => {
    try {
        const allPerfilNews = await Perfil.find().limit(8);
        if (allPerfilNews.length == 0)
           return res.status(404).json({message: "No hay perfiles nuevos informados"})
            
        return res.status(200).json(allPerfilNews);
    } catch (error) { 
      return res.status(500).json(error)
    }
 } 

const postPerfil = async (req, res) => {
    try {
      const newPerfil = new Perfil(req.body);
      if (req.file)
      {
         newPerfil.imagen = req.file.path;
      }
      
      //el metodo save nos sirve para guardar un elemento en BBDD
      const createdPerfil = await newPerfil.save();  

      return res.status(201).json(createdPerfil);

   } catch (error) {
       return res.status(500).json(error);
   }
}; 

const putPerfil = async (req, res) =>  {
   try {
       const {id} = req.params;
       const putPerfil = new Perfil(req.body);
       putPerfil._id = id;
       
       if (req.file)
       {
          putPerfil.imagen = req.file.path;
       }

       const updatedPerfil = await Perfil.findByIdAndUpdate(id, putPerfil, {new: true});

       if(!updatedPerfil){
           return res.status(404).json({message: 'No tenemos perfiles de usuario con ese ID'}); 
        }
       if(updatedPerfil.imagen !== putPerfil.imagen){
            deleteFile(updatedPerfil.imagen);
        }

       return res.status(200).json(updatedPerfil);
   } catch (error) {
       return res.status(500).json(error);
   }
};

const deletePerfil = async (req, res) =>  {
   try {
       const {id} = req.params;
       const deletedPerfil = await Perfil.findByIdAndDelete(id);

       if(!deletedPerfil){
           return res.status(404).json({message: 'No tenemos perfiles de usuario con ese ID'}); 
        }

       if (deletedPerfil.imagen)
           deleteFile(deletedPerfil.imagen)

       return res.status(200).json(deletePerfil);
   } catch (error) {
       return res.status(500).json(error);
   }
};

module.exports = {getPerfil, getPerfilbyId,getPerfilbyId2, getPerfilesNews, postPerfil, putPerfil, deletePerfil} 