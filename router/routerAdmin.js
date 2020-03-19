let HomeAdminController = require('./../controllers/HomeAdminController');
let AuthentificationController = require('./../controllers/AuthentificationController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');
let CircuitAdminController = require('./../controllers/CircuitAdminController');



// Routes
module.exports = function(app){


  // Main Routes
  app.get('/', HomeAdminController.Index);
  app.post('/', HomeAdminController.Connexion);

  // Routes Pilotes
  app.get('/piloteAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Index);
  app.get('/ajouterPilote', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Ajouter);
  app.post('/ajouterPilote', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.ajouterPilote);
  app.get('/modifierPilote/:num', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Modifier);
  app.post('/modifierPilote/:num', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.modifierPilote);
  app.get('/supprimmerPilote/:num', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.Supprimer);
  app.post('/supprimmerPilote/:num', AuthentificationController.VerifierUtilisateurEstConnecte,PiloteAdminController.supprimmerPilote);


  // Routes CIRCUITS
  app.get('/circuitAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.Index);
  app.get('/ajouterCircuit', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.Ajouter);
  app.post('/ajouterCircuit', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.ajouterCircuit);
  app.get('/modifierCircuit/:num', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.Modifier);
  app.post('/modifierCircuit/:num', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.modifierCircuit);



  // tout le reste
  app.get('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);
  app.post('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);



  };
