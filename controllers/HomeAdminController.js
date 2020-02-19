let db = require('../configDb');
let model = require('../models/homeAdmin.js');
let Cryptr = require('cryptr')
  // ////////////////////////////////////////////// A C C U E I L


module.exports.Index = function (request, response) {
    response.title = "Bienvenue du côté administrateur sur le site de SIXVOIX (IUT du Limousin).";
    if (request.session.admin) {
      request.session.admin = true;
    } else {
      request.session.admin = false;
    }
    response.render('home', response);
};

module.exports.Connexion = function (request, response) {
  let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');
  model.Connexion(function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
      let decryptedString = cryptr.decrypt(result[0].passwd);
      if (result[0].login == request.body.login && decryptedString == request.body.mpd) {
        request.session.admin = true;
      } else {
        request.session.admin = false;
      }
      response.title = "Bienvenue du côté administrateur sur le site de SIXVOIX (IUT du Limousin).";
      response.render('home', response);
  });

};


module.exports.NotFound = function(request, response){
    response.title = "Bienvenue du côté administrateur sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
