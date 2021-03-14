const express    = require('express'),
      bodyParser = require('body-parser');
      mongoose   = require('mongoose');
      morgan     = require('morgan');
      cors       = require('cors')
      app        = express();

// for config file
require('dotenv').config();
      
const todoRouter = require('./routers/todo_router');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', todoRouter);

mongoose.connect("mongodb://piyush_lazag:black_window@lazag-shard-00-00.rhhex.mongodb.net:27017,lazag-shard-00-01.rhhex.mongodb.net:27017,lazag-shard-00-02.rhhex.mongodb.net:27017/todoStore?ssl=true&replicaSet=atlas-dfi78d-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
  }, (err, database)=>{
      if(err){
          console.log("Can't connect",err)
      }
      else{
          console.log("Connected to database");
      }
})

app.listen(8000, (err)=>{
      if(err)
            console.log("Error in listening port : ", err);
      else 
            console.log("Server started succesfully");
})