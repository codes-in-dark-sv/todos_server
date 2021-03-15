const winston = require('winston');
const Transporter = winston.transports.File
module.exports.logger = winston.createLogger({
      transports:[
            new Transporter({
                  level:"info",
                  filename:"todo-success-logs.log",
                  json:true,
                  format:winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                  )
            }),
            new Transporter({
                  level:"error",
                  filename:"todo-error-logs.log",
                  json:true,
                  format:winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                  )
            })
      ]
})