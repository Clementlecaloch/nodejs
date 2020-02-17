let model = require('../models/ecurie.js');
let async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
};

module.exports.InfoEcurie = function(request, response){
    let data = request.params.num;
    response.title = 'Écurie n°' + data;

    async.parallel ([
            function (callback) {
                model.getListeEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getEcurieByNumber(data, function (err, result) {callback(null,result)});
            },
            function(callback) {
                model.getPiloteByEcu(data, function (err, result) {callback(null,result)});
            },
            function(callback) {
                model.getPhotoEcu(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.listeEcurie = result[0];
            response.infoEcu = result[1][0];
            response.pilotes = result[2];
            response.photo = result[3];
            response.render('ecurieParNum', response);
        }
    );
};


