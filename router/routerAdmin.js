let HomeAdminController = require('./../controllers/HomeAdminController');
let AuthentificationController = require('./../controllers/AuthentificationController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');
let CircuitAdminController = require('./../controllers/CircuitAdminController');
let EcurieAdminController = require('./../controllers/EcurieAdminController');



// Routes
module.exports = function(app){


  // Main Routes
  app.get('/', HomeAdminController.Index);
  app.post('/', HomeAdminController.Connexion);

  // Routes PILOTES
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
  app.get('/supprimerCircuit/:num', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.Supprimer);
  app.post('/supprimerCircuit/:num', AuthentificationController.VerifierUtilisateurEstConnecte,CircuitAdminController.supprimerCircuit);

  //Routes ECURIES
  app.get('/ecurieAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.Index);
  app.get('/ajouterEcurie', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.Ajouter);
  app.post('/ajouterEcurie', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.ajouterEcurie);
  app.get('/modifierEcurie/:num', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.Modifier);
  app.post('/modifierEcurie/:num', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.modifierEcurie);
  app.get('/supprimerEcurie/:num', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.Supprimer);
  app.post('/supprimerEcurie/:num', AuthentificationController.VerifierUtilisateurEstConnecte,EcurieAdminController.supprimerEcurie);


  // tout le reste
  app.get('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);
  app.post('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);



  };
