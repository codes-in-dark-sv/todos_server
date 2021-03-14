const express = require("express");
const {get_all_todos, 
      submit_todo, 
      get_todo,
      update_todo_details,
      remove_todo} = require("../controllers/todo_controller");
const router = express.Router();

router.get("/hi", (req, res)=>{
      res.send("Hi ther")
})

router.get("/todo/all", get_all_todos)
router.post("/todo/create", submit_todo);
router.get("/todo/:id", get_todo);
router.post("/todo/update", update_todo_details);
router.post("/todo/remove",remove_todo);

module.exports = router;