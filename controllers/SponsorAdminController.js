let db = require('../configDb');
let model = require('../models/sponsorAdmin.js');
let async = require('async');

module.exports.Index = function (request, response) {
    response.title = "Gestion des Sponsors";
    model.getListeSponsor( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeSponsor = result;
    response.render('sponsor', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un sponsor";
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
    response.render('ajouterSponsor', response);
    });
};


module.exports.ajouterSponsor = function (req, response) {
    response.title = "Gestion des Sponsors";
    data = req.body;


    data["SPONOM"] = data["SPONOM"].split("'").join("\\\'");
    data["SPOSECTACTIVITE"] = data["SPOSECTACTIVITE"].split("'").join("\\\'");

    ecurie = data["ECUNUM"];
    delete data["ECUNUM"];

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    console.log(data);


    async.parallel ([
            function (callback) {
                model.getListeEcurie(function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.ajouterSponsor(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
              sleep(100).then(() => {
                  model.ajouterFinance(ecurie, function (err, res) {callback(null,res)});
              });
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.listeEcurie = res[0];
            response.render('ajouterSponsor', response);
        }
    );
};
