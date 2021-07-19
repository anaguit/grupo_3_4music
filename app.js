const express = require ("express");
const app = express();
const path = require ("path");

// Routers:
const mainRouter = require("./src/routes/mainRouter");
const usersRouter = require("./src/routes/userRouter");
const productsRouter = require("./src/routes/productRouter");
const cartRouter = require("./src/routes/cartRouter");


let rutaCarpetaPublic = path.resolve(__dirname,"./public"); //genero ruta absoluta
app.use(express.static(rutaCarpetaPublic)); //indico los archivos estáticos publicos

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor corriendo en Puerto 3000");
});


// Rutas Globales:

app.use("/", mainRouter);

app.use("/products", productsRouter);

app.use("/users", usersRouter);

app.use("/cart", cartRouter);