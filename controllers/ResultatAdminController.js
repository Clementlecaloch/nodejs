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
            console.log(response.gpnum);
            response.render('resultatTemps', response);
        }
    );
};

module.exports.ajouterTemps = function (req, response) {
    response.title = "Gestion des resultats";
    data = req.body;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    async.parallel ([
          function (callback) {
              sleep(100).then(() => {
                model.getInfoResultatPrix(data["id"], function (err, res) {callback(null,res)});
              })
          },
          function (callback) {
              model.getListePilote(function (err, res) {callback(null,res)});
          },
          function (callback){
              model.ajouterTemps(data, function (err, res) {callback(null,res)});
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
          response.gpnum = data["id"];
          response.render('resultatTemps', response);
        }
    );
};

module.exports.supprimerTemps = function (req, response) {
    response.title = "Gestion des resultats";
    let data = req.params.num;

    let pilnum = data.split('_')[0];
    let gpnum = data.split('_')[1];

      model.supprimerTemps(pilnum,gpnum,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.status(301).redirect(req.baseUrl+'/resultatTemps?gpnum='+gpnum);
    });
};
