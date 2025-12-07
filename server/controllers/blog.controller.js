let posts=[
  {id:"1",title:"Welcome to Astra",img:"/assets/images/hero-1.jpg",category:"updates",body:"Astra has launched a new next-gen commerce experience."},
  {id:"2",title:"API Guide Basics",img:"/assets/images/hero-2.jpg",category:"guides",body:"Learn how to integrate with the Astra API in minutes."}
]

exports.list=(req,res)=>{
  res.json({ok:true,posts})
}

exports.view=(req,res)=>{
  const p=posts.find(x=>x.id===req.params.id)
  if(!p)return res.json({ok:false})
  res.json({ok:true,post:p})
}

exports.add=(req,res)=>{
  const b=req.body||{}
  const p={id:String(Date.now()),title:b.title,img:b.img,category:b.category,body:b.body}
  posts.push(p)
  res.json({ok:true,post:p})
}

