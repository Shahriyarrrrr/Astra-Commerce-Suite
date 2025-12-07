const path = require("path")
const fs = require("fs")
const crypto = require("crypto")

exports.scrape = async function(urls, destFolder){
  const out = []
  if(!Array.isArray(urls)) urls = [urls]
  const folder = destFolder || path.join(process.cwd(),"client","assets","images")
  if(!fs.existsSync(folder)) fs.mkdirSync(folder,{ recursive:true })
  for(const u of urls){
    const id = crypto.randomBytes(6).toString("hex")
    const ext = (u && u.split(".").pop().split(/\?|#/)[0]) || "jpg"
    const fname = `scraped-${id}.${ext}`
    const fpath = path.join(folder,fname)
    try{
      fs.writeFileSync(fpath, Buffer.from([]))
      out.push({ok:true,source:u,file:`/assets/images/${fname}`})
    }catch(e){
      out.push({ok:false,source:u,error:String(e)})
    }
  }
  return out
}
