const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      morgan     = require('morgan'),
      cors       = require('cors'),
      {logger}   = require('./helpers/logger'),
      app        = express();

      
const todoRouter = require('./routers/todo_router');

app.use((error, req, res, next)=>{
    res.json({message:error.message});
    next();
})


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/api', todoRouter);

const database = process.env.MONGO_URI
mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
  }, (err, database)=>{
      if(err){
          logger.error("Can't connect",err)
      }
      else{
          logger.info("Connected to database");
      }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, (err)=>{
      if(err)
            logger.info("Error in listening port : ", err);
      else 
            logger.info("Server started succesfully");
})
