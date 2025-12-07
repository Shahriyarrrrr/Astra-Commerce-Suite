let wishlist=[]

exports.list=(req,res)=>{
  res.json({ok:true,wishlist})
}

exports.add=(req,res)=>{
  const b=req.body||{}
  const item={id:String(Date.now()),title:b.title,img:b.img,price:b.price}
  wishlist.push(item)
  res.json({ok:true,item})
}

exports.remove=(req,res)=>{
  const id=req.body.id
  wishlist=wishlist.filter(x=>x.id!==id)
  res.json({ok:true})
}
