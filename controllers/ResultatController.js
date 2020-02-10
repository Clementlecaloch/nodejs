let model = require('../models/grandprix.js');
let async = require('async');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){

	response.title = 'Liste des résulats des grands prix';
	model.getListeGrandPrix( function (err, result) {
			if (err) {
					// gestion de l'erreur
					console.log(err);
					return;
			}
			response.listeGrandPrix = result;
	response.render('listerResultat', response);
	});
};

module.exports.ResumerGP = function(request, response){
		let data = request.params.num;
    response.title = 'Résumé du Grand Prix';


    async.parallel ([
      function (callback) {
        model.getInfoResultatPrix(data, function (err, result) {callback(null,result)});
      },
			function (callback) {
        model.getInfoGrandPrix(data, function (err, result) {callback(null,result)});
      },
			function (callback) {
        model.getListeGrandPrix( function (err, result) {callback(null,result)});
      },
    ],

      function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
      }
      response.score = result[0];
      response.infoGP = result[1][0];
			response.listeGrandPrix = result[2];
      response.render('detailGrandPrix', response);
      }
    );
};
