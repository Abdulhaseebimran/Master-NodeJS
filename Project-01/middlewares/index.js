const fs = require("fs");
async function logReqRes (){
    return (req, res, next) => {
      fs.appendFile("log.txt", `URL: ${req.url} \nMETHOD: ${req.method} \n`, (err, data) => {
        next();
      })
    }
}

module.exports = {logReqRes};