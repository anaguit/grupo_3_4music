const express = require ("express");
const app = express();
const path = require ("path");

let rutaCarpetaPublic = path.resolve(__dirname,"./public"); //genero ruta absoluta
app.use(express.static(rutaCarpetaPublic)); //indico los archivos estáticos publicos


app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor corriendo en Puerto 3000");
});

app.get("/", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"./views/index.html"));
});
app.get("/login", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"./views/login.html"));
});
app.get("/register", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"./views/register.html"));
});
app.get("/cart", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"./views/cart.html"));
});
app.get("/item-detail", (req,res)=> {
    res.sendFile(path.resolve(__dirname,"./views/item-detail.html"));
});
