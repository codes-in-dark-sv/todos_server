const express    = require('express'),
      bodyParser = require('body-parser');
      mongoose   = require('mongoose');
      morgan     = require('morgan');
      cors       = require('cors')
      app        = express();

      
const todoRouter = require('./routers/todo_router');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', todoRouter);

mongoose.connect(process.env.DATABASE, {
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

var PORT = 8000 || process.env.PORT
app.listen(PORT, (err)=>{
      if(err)
            console.log("Error in listening port : ", err);
      else 
            console.log("Server started succesfully");
})