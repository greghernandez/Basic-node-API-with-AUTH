const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("./middleware/cors.js");
const app = express();

const camiones = require('./routes/camiones.js');
const usuarios = require('./routes/usuarios.js');

//tokens
const jwt = require('jsonwebtoken');
const auth = require("./middleware/authHeader.js");
//router.use(auth);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors);

//http://rutas
app.get("/", (req, res, next) => {
    res.send("Bienvenido al API de rutas de camión");
});

app.use('/camiones',camiones, auth);
app.use('/usuarios', usuarios);

module.exports = app;