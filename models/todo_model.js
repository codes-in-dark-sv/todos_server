
const mongoose = require('mongoose');

const todoSchema  = mongoose.Schema({
      title:{
            type:String,
            trim:true,
            unique:true
      },
      text:{
            type:String,
            default:null  
      },
      status:{
            type:String,
            enum:[
                  'INCOMPLETE',
                  'COMPLETED',
            ],
            default:'INCOMPLETE'
      }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Todo", todoSchema);