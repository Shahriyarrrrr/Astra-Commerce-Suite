const fs = require("fs")
const path = require("path")

exports.save = (buffer,ext)=>{
  const name = "file_" + Date.now() + "." + ext
  const dest = path.join(process.cwd(),"client","assets","images",name)
  fs.writeFileSync(dest,buffer)
  return "/assets/images/" + name
}
