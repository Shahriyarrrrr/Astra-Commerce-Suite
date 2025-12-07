const express = require("express")
const path = require("path")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())

app.use("/assets", express.static(path.join(process.cwd(),"client","assets")))
app.use(express.static(path.join(process.cwd(),"client")))

const sampleProducts = [
  {id:"p001",title:"Astra Voyager Headphones",price:129.99,currency:"USD",rating:4.7,images:["/assets/images/hero-1.jpg"],stock:34,badges:["Bestseller"]},
  {id:"p002",title:"Nebula Smartwatch Series 5",price:219.99,currency:"USD",rating:4.5,images:["/assets/images/hero-2.jpg"],stock:21,badges:["New"]},
  {id:"p003",title:"Orbit Gaming Mouse Pro",price:59.5,currency:"USD",rating:4.4,images:["/assets/images/product-placeholder.png"],stock:140,badges:[]}
]

app.get("/api/products", (req,res)=>{
  const q = req.query.q || ""
  const filtered = sampleProducts.filter(p=>p.title.toLowerCase().includes(q.toLowerCase()))
  res.json({ok:true,products:filtered})
})

app.post("/api/auth/login",(req,res)=>{
  const {email,password} = req.body
  if(email==="admin@example.com"&&password==="admin123")
    return res.json({ok:true,token:"fake-jwt-admin",role:"admin",user:{name:"Admin"}})
  if(email==="dev@example.com"&&password==="dev123")
    return res.json({ok:true,token:"fake-jwt-dev",role:"developer",user:{name:"Developer"}})
  if(email&&password)
    return res.json({ok:true,token:"fake-jwt-user",role:"user",user:{name:"Customer"}})
  res.status(401).json({ok:false,message:"invalid credentials"})
})

const authJwt = require("./middleware/auth.jwt")

app.use(authJwt)

app.use("/api/register", require("./routes/api.register"))
app.use("/api/products", require("./routes/api.products"))
app.use("/api/cart", require("./routes/api.cart"))
app.use("/api/orders", require("./routes/api.orders"))
app.use("/api/profile", require("./routes/api.profile"))
app.use("/api/blog", require("./routes/api.blog"))
app.use("/api/wishlist", require("./routes/api.wishlist"))
app.use("/api/uploads", require("./routes/api.uploads"))
app.use("/api/admin", require("./routes/api.admin"))
app.use("/api/developer", require("./routes/api.developer"))
app.use("/api/confirmation", require("./routes/api.confirmation"))

app.use("/", require("./routes/web.pages"))

app.get("*",(req,res)=>{
  res.sendFile(path.join(process.cwd(),"client","pages","01-home.html"))
})

const port = process.env.PORT || 4000
app.listen(port)
