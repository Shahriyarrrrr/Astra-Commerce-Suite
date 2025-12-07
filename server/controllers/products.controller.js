const sample = [
  {
    id:"p001",
    title:"Astra Voyager Headphones",
    price:129.99,
    currency:"USD",
    rating:4.7,
    stock:34,
    categories:["audio"],
    images:["/assets/images/hero-1.jpg","/assets/images/product-placeholder.png"],
    description:"Wireless immersive over-ear headphones built for clarity and comfort.",
    variants:["Black","Silver","Graphite"],
    highlights:["40h battery life","Fast charging","Noise isolation","Premium materials"],
    reviews:[
      {author:"Liam",rating:5,text:"Amazing sound clarity."},
      {author:"Emma",rating:4,text:"Comfortable but slightly warm after long use."}
    ]
  },
  {
    id:"p002",
    title:"Nebula Smartwatch Series 5",
    price:219.99,
    currency:"USD",
    rating:4.5,
    stock:21,
    categories:["wearables"],
    images:["/assets/images/hero-2.jpg","/assets/images/product-placeholder.png"],
    description:"Next-gen smartwatch with dynamic health metrics and smooth performance.",
    variants:["Sport Black","Astra Blue"],
    highlights:["AMOLED display","Sleep tracking","Fast sync","Water resistant"],
    reviews:[
      {author:"Sophia",rating:5,text:"Perfect for fitness."},
      {author:"Mason",rating:4,text:"Battery could be better."}
    ]
  },
  {
    id:"p003",
    title:"Orbit Gaming Mouse Pro",
    price:59.5,
    currency:"USD",
    rating:4.4,
    stock:140,
    categories:["peripherals"],
    images:["/assets/images/product-placeholder.png"],
    description:"High precision gaming mouse with configurable RGB and macros.",
    variants:["Black","White"],
    highlights:["16k DPI sensor","RGB lighting","Macro buttons"],
    reviews:[
      {author:"Noah",rating:5,text:"Extremely accurate."}
    ]
  }
]

exports.getProducts = (req,res)=>{
  const q = req.query.q ? req.query.q.toLowerCase() : ""
  const pid = req.query.pid
  if(pid){
    const p = sample.find(x=>x.id===pid)
    if(!p) return res.json({ok:false})
    return res.json({ok:true,product:p})
  }
  let out = sample
  if(q) out = sample.filter(p=>p.title.toLowerCase().includes(q))
  res.json({ok:true,products:out})
}

exports.getProductById = (req,res)=>{
  const id = req.params.id
  const p = sample.find(x=>x.id===id)
  if(!p) return res.json({ok:false})
  res.json({ok:true,product:p})
}
