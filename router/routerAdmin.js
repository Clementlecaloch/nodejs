let HomeAdminController = require('./../controllers/HomeAdminController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeAdminController.Index);
    app.post('/', HomeAdminController.Connexion);

    // Routes Pilotes
    app.get('/piloteAdmin', PiloteAdminController.Index);
    app.get('/ajouterPilote', PiloteAdminController.Ajouter);
    app.get('/modifierPilote/:num', PiloteAdminController.Modifier);


// tout le reste
app.get('*', HomeAdminController.NotFound);
app.post('*', HomeAdminController.NotFound);

};
