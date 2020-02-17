let HomeAdminController = require('./../controllers/HomeAdminController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeAdminController.Index);
    app.post('/', HomeAdminController.Connexion);

// tout le reste
app.get('*', HomeAdminController.NotFound);
app.post('*', HomeAdminController.NotFound);

};
