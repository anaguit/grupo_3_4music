// ************ Require's ************
const express = require ("express");
const session = require ("express-session");
const path = require ("path");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const userLoggedMiddleware = require ('./src/middlewares/userLoggedMiddleware');
const cookie = require("cookie-parser");

// Express
const app = express();


// ************ Middlewares  ************
let rutaCarpetaPublic = path.resolve(__dirname,"./public"); //genero ruta absoluta

app.use(express.static(rutaCarpetaPublic)); //indico los archivos estáticos publicos
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.json());
app.use(session({
    secret: "4 Music Secreto",
    resave: false,
    saveUninitialized: false
}));  // Session como Middleware Global
app.use(cookie());

app.use(userLoggedMiddleware); // Debe estar siempre despues del Middleware de Session


// ************ Template Engine ************
app.set("view engine", "ejs");
app.set('views', [path.join(__dirname, '/views'),
                      path.join(__dirname, '/views/products/'),  // Define la ubicación de la carpeta de las Vistas y Subcarpetas
                      path.join(__dirname, '/views/users/')]);



// Routers:
const mainRouter = require("./src/routes/mainRouter");
const usersRouter = require("./src/routes/userRouter");
const productsRouter = require("./src/routes/productRouter");
const cartRouter = require("./src/routes/cartRouter");


// ************ Puerto 3000 ************

app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor corriendo en Puerto 3000");
});


// ************ Rutas Globales ************

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);