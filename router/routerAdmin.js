let HomeAdminController = require('./../controllers/HomeAdminController');
let AuthentificationController = require('./../controllers/AuthentificationController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');

// Routes
module.exports = function(app){

  // Main Routes
  app.get('/', HomeAdminController.Index);
  app.post('/', HomeAdminController.Connexion);

  // tout le reste
  app.get('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);
  app.post('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);

    // Routes Pilotes
    app.get('/piloteAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Index);
    app.get('/ajouterPilote', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Ajouter);
    app.get('/modifierPilote/:num', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Modifier);

  };
