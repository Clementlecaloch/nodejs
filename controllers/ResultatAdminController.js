let db = require('../configDb');
let model = require('../models/resultatAdmin.js');
let async = require('async');




module.exports.Index = function (request, response) {
    response.title = "Gestion des resultats";
    model.getListeGrandPrix( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeGrandPrix = result;
    response.render('resultat', response);
    });
};

module.exports.Temps = function (req, response) {
    response.title = "Gestion des resultats";
    data = req.query.gpnum;

    async.parallel ([
            function (callback) {
                model.getInfoResultatPrix(data,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.getListePilote(function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.getNomGP(data,function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.resultat = res[0];
            response.pilote = res[1];
            response.gpnum = data;
            response.gpnom = res[2][0];
            response.render('resultatTemps', response);
        }
    );
};

module.exports.ajouterTemps = function (req, response) {
    data = req.body;

    async.parallel ([
            function (callback) {
                model.ajouterTemps(data,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.modifierMAJ(data["id"],function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
        response.status(301).redirect(req.baseUrl+'/resultatTemps?gpnum='+data["id"]);
    });
};

module.exports.supprimerTemps = function (req, response) {
    let data = req.params.num;
    let pilnum = data.split('_')[0];
    let gpnum = data.split('_')[1];

    async.parallel ([
            function (callback) {
               model.supprimerTemps(pilnum,gpnum,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.modifierMAJ(gpnum,function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
        response.status(301).redirect(req.baseUrl+'/resultatTemps?gpnum='+gpnum);
    });

};
