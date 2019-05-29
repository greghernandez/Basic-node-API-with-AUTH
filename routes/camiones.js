const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');

//tokens
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authHeader.js");
router.use(auth);

// const fs = require('mysql');
// let routes = fs.readFileSync('../config/database');
// routes = JSON.parse(routes);

// GET de todos los camiones
router.get("/", (req,res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM camiones"
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        console.log(result);
        res.status(200);
        res.json({ code: 1, message: result})
        db.end((err) => { console.log("Closed")})  
    })
    //res.send(routes);<
});

// Seleccionar camión por id
router.get("/:id", (req,res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM camiones WHERE idCamion = ${req.params.id}`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        console.log(result);
        res.status(200);
        res.json({ code: 1, message: result})
        db.end((err) => { console.log("Closed")})
    })
});

//Agregar nuevo camión
router.post("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO camiones(nombre, puntoPartida, puntoLLegada) 
                   VALUES ('${req.body.nombre}', '${req.body.puntoPartida}', '${req.body.puntoLLegada}')`;
    db.query(query, (err, result, fields) => {
        console.log(err)
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" });
        }
        res.status(201);
        res.json({ code: 1, message: "Camión añadido correctamente" });
        db.end((err) => { console.log("closed") });
    });
});

// Update camiones
router.put("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const qry = `SELECT COUNT(*) as total FROM camiones WHERE idCamion = ${req.body.idCamion}`;
    console.log(qry);
    query = `UPDATE camiones SET `;
    if(req.body.nombre){
        query += `nombre = '${req.body.nombre}', `;
    }

    if(req.body.puntoPartida){
        query += `puntoPartida = '${req.body.puntoPartida}', `;
    }

    if(req.body.puntoLLegada){
        query += `puntoLLegada = '${req.body.puntoLLegada}' `;
    }

    query += `WHERE idCamion = ${req.body.idCamion} `; 
    console.log(query);

    db.query(qry, (err, result, fields) => {
        console.log('error: ' + err)
        console.log(result)
        if (err) {
            console.log('Error existencia: ' + err);
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" });
        }else if(result[0].total == 1){
            console.log(result[0].total);
            db.query(query, (err, result, fields) => {
                console.log(err)
                if (err) {
                    console.log('Error de cambio: ' + err);
                    res.status(500);
                    res.json({ code: 0, message: "Algo salió mal" });
                }
                res.status(201);
                res.json({ code: 1, message: "Camión editado correctamente" });
                db.end((err) => { console.log("closed") });
            });
        }else{
            res.status(500);
            res.json({ code: 0, message: "El idCamion no existe" });
        }   
    });
});

// Eliminar un camión por id
router.delete("/", (req,res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM camiones WHERE idCamion = ${req.body.idCamion}`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        res.status(200);
        res.json({ code: 1, message: "Camión eliminado correctamente"})
        db.end((err) => { console.log("Closed")})
    })
});

module.exports = router;