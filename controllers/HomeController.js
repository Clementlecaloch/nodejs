let model = require('../models/home.js');
  // ////////////////////////////////////////////// A C C U E I L

module.exports.Index = 	function(request, response){
    response.title = 'Répertoire des pilotes';
    model.getDernierResultat( function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.dernierRes = result[0];
        console.log(result);
        response.render('home', response);
    });

};

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
