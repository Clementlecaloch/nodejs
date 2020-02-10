
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/piloteParLettre/:lettre', PiloteController.PiloteParLettre);
    app.get('/detailPilote/:num', PiloteController.InfoPilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/detailCircuit/:num', CircuitController.DetailCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/ecurieParNum/:num', EcurieController.InfoEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailGrandPrix/:num', ResultatController.ResumerGP);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
