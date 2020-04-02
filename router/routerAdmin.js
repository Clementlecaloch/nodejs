let HomeAdminController = require('./../controllers/HomeAdminController');
let AuthentificationController = require('./../controllers/AuthentificationController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');
let CircuitAdminController = require('./../controllers/CircuitAdminController');
let EcurieAdminController = require('./../controllers/EcurieAdminController');
let SponsorAdminController = require('./../controllers/SponsorAdminController');
let ResultatAdminController = require('./../controllers/ResultatAdminController');


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

  //Routes SPONSORS
  app.get('/sponsorAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,SponsorAdminController.Index);
  app.get('/ajouterSponsor', AuthentificationController.VerifierUtilisateurEstConnecte,SponsorAdminController.Ajouter);
  app.post('/ajouterSponsor', AuthentificationController.VerifierUtilisateurEstConnecte,SponsorAdminController.ajouterSponsor);
  app.get('/modifierSponsor/:num', AuthentificationController.VerifierUtilisateurEstConnecte,SponsorAdminController.Modifier);
  app.post('/modifierSponsor/:num', AuthentificationController.VerifierUtilisateurEstConnecte,SponsorAdminController.modifierSponsor);

  //Routes RESULTAT
    app.get('/resultatAdmin', AuthentificationController.VerifierUtilisateurEstConnecte,ResultatAdminController.Index);
    app.get('/resultatTemps', AuthentificationController.VerifierUtilisateurEstConnecte,ResultatAdminController.Temps);
    app.post('/resultatTemps', AuthentificationController.VerifierUtilisateurEstConnecte,ResultatAdminController.ajouterTemps);
    app.get('/supprimerTemps/:num', AuthentificationController.VerifierUtilisateurEstConnecte,ResultatAdminController.supprimerTemps);


  //Routes Vers le site
  app.get('/site', AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.Site);

  // tout le reste
  app.get('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);
  app.post('*',AuthentificationController.VerifierUtilisateurEstConnecte,HomeAdminController.NotFound);



  };
