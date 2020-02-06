let model = require('../models/pilote.js');
let async = require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getListePilote( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listePilote = result;
       //console.log(result);
  response.render('repertoirePilotes', response);
  });
}

module.exports.PiloteParLettre = function(request, response){
    response.title = 'Répertoire des pilotes';

    let data = request.params.lettre;
    async.parallel ([
      function (callback) {
        model.getListePilote(function (err, result) {callback(null,result)});
      },
      function (callback) {
        model.getPiloteByLetter(data, function (err, result) {callback(null,result)});
      },
    ],

      function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
      }
      response.listePilote = result[0];
      response.phoPilote = result[1];
      response.render('piloteParLettre', response);
      }
    );
};

module.exports.InfoPilote = function(request, response){
    let data = request.params.num;
    response.title = 'Détail du pilote n°' + data;

    async.parallel ([
            function (callback) {
                model.getListePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoPilote(data, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getSponsorByPilote(data, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getPhotoByPilote(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listePilote = result[0];
            response.infoPilote = result[1];
            response.sponsorPilote = result[2];
            response.photoPilote = result[3];
            response.render('detailPilote', response);
        }
    );
};

