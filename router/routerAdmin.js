let HomeAdminController = require('./../controllers/HomeAdminController');
let AuthentificationController = require('./../controllers/AuthentificationController');

// Routes
module.exports = function(app){

  // Main Routes
  app.get('/', HomeAdminController.Index);
  app.post('/', HomeAdminController.Connexion);

  // tout le reste
  app.get('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);
  app.post('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);


};
