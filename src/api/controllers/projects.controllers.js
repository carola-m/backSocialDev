const Project = require('../models/projects.models');
const { deleteFile } = require("../../middlewares/delete.file");

const getProjects = async (req, res) => {
    try {
        //Recoger querys de numero de pagina(page) y limite por pagina(limit)
        let {page, limit} = req.query;
        
        //Contar el numero de elementos en mi coleccion
        const numProjects = await Project.countDocuments();
        
        //Si no está seteado seteo el limite a 5
        limit = limit ? parseInt(limit) || 20 : 20;
  
        //Comprobar el numero máximo de paginas dependiendo de mi limite
        let numPages = numProjects%limit > 0 ? numProjects/limit + 1 : numProjects/limit;
  
        //Si no está seteado seteo el numero de pagina a 1
        page = page > numPages ? numPages : page < 1 ? 1 :  parseInt(page) || 1;
  
        // Calculo el salto(skip) que tengo que dar a mi find para empezar a partir del elemento que quiero
        const skip = (page - 1) * limit;
        const allProject = await Project.find().skip(skip).limit(limit);
  
        const response = {
            info: {
                numProyectos: numProjects,
                page: page,
                limit: limit,
                nextPage: numPages >= page + 1 ? `lista?page=${page + 1}&limit=${limit}` : null,
                previousPage: page != 1 ? `lista?page=${page - 1}&limit=${limit}` : null
            },
            results: allProject
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error)
    }
 }
 
 const getProjectsNews = async (req, res) => {
    try {
        const allProjectNews = await Project.find().limit(8).sort({createdAt:-1});
        if (allProjectNews.length == 0)
           return res.status(404).json({message: "No hay projectos nuevos informados"})
            
        return res.status(200).json(allProjectNews);
    } catch (error) { 
      return res.status(500).json(error)
    }
 }

 const getProjectsbyUser = async (req, res) => {
    try {
        const {id} = req.params;

        const allProjectNews = await Project.find({idUser:id});

        if (allProjectNews.length == 0)
           return res.status(404).json({message: "No hay projectos nuevos informados"})
            
        return res.status(200).json(allProjectNews);
    } catch (error) { 
      return res.status(500).json(error)
    }
 }

 const getProjectbyId = async (req, res) => {
     try {
         const {id} = req.params;
         const findProject = await Project.findById(id);

         if (!findProject)
          {
            return res.status(404).json({message:"No hay proyectos de usuario con el id indicado"});
          }

         return res.status(200).json(findProject);
      } catch (error) {
        return res.status(500).json(error);
      }
   }
 
const postProject = async (req, res) => {
    try {
       const newProject = new Project(req.body);
 
       if (req.file)
       {
          newProject.imagen = req.file.path;
       }
       
       //el metodo save nos sirve para guardar un elemento en BBDD
       const createdProject = await newProject.save();  
 
       return res.status(201).json(createdProject);
 
    } catch (error) {
        return res.status(500).json(error);
    }
 }; 
 
 const putProject = async (req, res) =>  {
    try {
        const {id} = req.params;
        const putProject = new Project(req.body);
        putProject._id = id;
 
        if (req.file)
        {
            putProject.imagen = req.file.path;
        }
        const updatedProject = await Pais.findByIdAndUpdate(id, putProject, {new: true});
        if(!updatedProject){
            return res.status(404).json({message: 'No tenemos proyectos de usuario con ese ID'}); 
         }
        if(updatedProject.imagen !== putProject.imagen){
             deleteFile(updatedProject.imagen);
         }
 
 
        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(500).json(error);
    }
 };
 
 const deleteProject = async (req, res) =>  {
    try {
        const {id} = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
 
        if(!deletedProject){
            return res.status(404).json({message: 'No tenemos proyecto de usuario con ese ID'}); 
         }
 
        if (deletedProject.imagen)
            deleteFile(deletedProject.imagen)
 
        return res.status(200).json(deletedProject);
    } catch (error) {
        return res.status(500).json(error);
    }
 };
 
 module.exports = {getProjects, getProjectbyId, getProjectsNews, getProjectsbyUser, postProject, putProject, deleteProject} 
