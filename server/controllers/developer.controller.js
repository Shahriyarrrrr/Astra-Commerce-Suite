let logs=[]

exports.demo=(req,res)=>{
  const t={time:Date.now(),body:req.body||{}}
  logs.push(t)
  res.json({ok:true,echo:t})
}

exports.logs=(req,res)=>{
  res.json({ok:true,logs})
}
