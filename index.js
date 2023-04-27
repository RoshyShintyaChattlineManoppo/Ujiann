const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
const client = require("./connection");
const app = express();
const port = 3000;

const url = 'mongodb://localhost:3000';

const dbName = backend;

const client = new MongoClient(url);

client.connect(function(err) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('student');
    const newStudent = {nim: '0038573485', nama: 'Chattline', fakultas: 'Informatika', alamat: 'Asrama Edelweiss'};
    res.json({
        status: "sukses",
        message: "data user berhasil ditambahkan",
        data:[],
    });
    collection.insertOne(newStudent, function(err, result) {
        if (err) throw err;
        console.log("New student added");
        client.close();

    
    //----------------------------
    //Middleware untuk error handling
    const errorHandling = (err, req, res, next) => {
        res.json({
            status: "error",
            message: "terjadi kesalahan pada server",
        });
    };
    app.use(errorHandling);

    //Middleware untuk 404
    const notFound = (req, res, next) => {
        res.json({
            status: "error",
            message: "resource tidak ditemukan",
        });
    };
    app.use(notFound);

    app.listen(port, () =>
        console.log(`server running at http://localhost:${port}`)
    );
    });
});