const { response } = require("express");
const {logger}  = require("../helpers/logger");
const Todo = require("../models/todo_model");



module.exports.get_all_todos = (req, res) => {
     return  Todo.find({}).then((response)=>{
                   logger.info(response)
                   res.status(200).json(response)
             }).catch((err)=>{
                   logger.error(err)
                   res.status(404).json(err)
             })
 }
 
 module.exports.submit_todo = (req, res) => {
      const {
        title,
        text
      } = req.body;
      const myTodo = new Todo({title:title, text:text})
      myTodo.save((err, result) => {
       if(err){
               logger.error(err);
              return res.status(400).json({
              error: "error"
              })
        } else{
            logger.info(result)
            res.status(200).json({msg:"success"})
      }})
  
 }


  module.exports.get_todo = (req, res) =>{
        const {id} = req.params;
        Todo.findById(id, (err, result)=>{
              if(err){ 
                    
                  logger.error(err);
                  return res.status(400).json({
                        error: "error"
                  })
            }
              else{
                  logger.info(result)
                  res.status(200).json(result)
              }
        })
  }

  module.exports.update_todo_details = (req, res)=>{
        const{
              text,
              status, 
              _id,
              title
        }=req.body;
        Todo.findByIdAndUpdate(_id, {title, text, status} , (err, result)=>{
            if(err) {
                  logger.error(err);
                  return res.status(400).json({
                  error: "error"
              })
            }
              else{
                  logger.info(result)
                  res.status(200).json({msg:"success"})
              }

        })
  }

  module.exports.remove_todo=(req, res)=>{
        const {id}=req.body;
        Todo.findById(id, (err, result)=>{
            if(err)
            {      logger.error(err);
                  return res.status(400).json({
                  error: "error"
                  })
            } 
            else
            {  
                  if(result.status=="INCOMPLETE"){
                        logger.error("STATUS IS INCOMPLETE not able to delete");
                        res.status(200).json({msg:"impossible"}) 
                  }
                  else
                  {
                        Todo.deleteOne({_id:id}, (err, result)=>{
                              if(err){
                                    logger.error(err);
                                    return res.status(400).json({
                                    error: "error"
                                    })
                              } 
                              else{ 
                                    res.status(200).json({msg:"success"}) 
                              }
                        })
                  }
            }
      })
      
  }