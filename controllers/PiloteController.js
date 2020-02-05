let model = require('../models/pilote.js');
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

    model.getPiloteByLetter(data, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePilote = result;
        //console.log(result);
        response.render('piloteParLettre', response);
    });
}


