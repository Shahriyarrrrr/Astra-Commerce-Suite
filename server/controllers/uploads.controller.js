const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

exports.upload = (req,res)=>{
  const f = req.files && req.files.file
  if(!f) return res.json({ok:false,message:"no_file"})
  const ext = String(f.name).split(".").pop()
  const fname = "up_" + crypto.randomBytes(6).toString("hex") + "." + ext
  const dest = path.join(process.cwd(),"client","assets","images",fname)
  f.mv(dest,(e)=>{
    if(e) return res.json({ok:false})
    res.json({ok:true,file:"/assets/images/"+fname})
  })
}
