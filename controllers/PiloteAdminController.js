let db = require('../configDb');
let model = require('../models/piloteAdmin.js');
let async = require('async');


module.exports.Index = function (request, response) {
    response.title = "Gestion des pilotes";
    model.getListePilote( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePilote = result;
    response.render('pilote', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un pilote";
    async.parallel ([
            function (callback) {
                model.getNationalitePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getNomEcurie(function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.nationalite = result[0];
            response.ecurie = result[1];
            response.render('ajouterPilote', response);
        }
    );
};

module.exports.ajouterPilote = function (request, response) {
    response.title = "Ajouter un pilote";
    data = request.body;
    if (data["ECUNUM"] == 'NULL') {
        delete data["ECUNUM"];
    }
    photo = data["PHOADRESSE"];
    delete data["PHOADRESSE"];
    async.parallel ([
            function (callback) {
                model.getNationalitePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getNomEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.ajouterPilote(data, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.ajouterPhoto(photo,function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.nationalite = result[0];
            response.ecurie = result[1];
            response.render('ajouterPilote', response);
        }
    );
};

module.exports.Modifier = function (request, response) {
    response.title = "Ajouter un pilote";

    let data = request.params.num;

    async.parallel ([
            function (callback) {
                model.getNationalitePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getNomEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoPilote(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.nationalite = result[0];
            response.ecurie = result[1];
            response.pilote = result[2][0];
            response.render('modifierPilote', response);
        }
    );
};
