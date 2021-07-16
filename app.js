const express = require ("express");
const app = express();
const path = require ("path");
const router = require("./src/routes/routes");
const usersRouter = require("./src/routes/routesUsers");
const productRouter = require("./src/routes/productsRouter");

let rutaCarpetaPublic = path.resolve(__dirname,"./public"); //genero ruta absoluta
app.use(express.static(rutaCarpetaPublic)); //indico los archivos estáticos publicos


app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor corriendo en Puerto 3000");
});

app.use("/", router);

app.set("view engine", "ejs");

app.use("/products", productRouter);

app.use("/users", usersRouter);