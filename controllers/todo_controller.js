const { response } = require("express");
const Todo = require("../models/todo_model");
module.exports.get_all_todos = (req, res) => {
     return  Todo.find({}).then((response)=>{
                   res.status(200).json(response)
             }).catch((err)=>
                   res.status(404).json(err)
             )
 }
 


 module.exports.submit_todo = (req, res) => {
       console.log("todo sumbitted,", req.body)
      const {
        title,
        text
      } = req.body;
      const myTodo = new Todo({title:title, text:text})
      myTodo.save((err, result) => {
            console.log(err)
       if(err){
              return res.status(400).json({
              error: "error"
              })
        } else{
            res.status(200).json({msg:"success"})
      }})
      // Todo.findOneAndUpdate({title}, {title, text},(err, result) => {
      //   if(result){
      //      res.status(200).json({msg:"success"})
      //    }
      //    else{
      //     const addTodo = new Todo({
      //         title,
      //         text
      //     })
          
      //    }
  
      // })
  
  }


  module.exports.get_todo = (req, res) =>{
        const {id} = req.params;
        Todo.findById(id, (err, result)=>{
              if(err) return res.status(400).json({
                  error: "error"
              })
              else{
                  res.status(200).json(result)
              }
        })
  }

  module.exports.update_todo_details = (req, res)=>{
        
  }