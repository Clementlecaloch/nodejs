let db = require('../configDb');
let model = require('../models/sponsorAdmin.js');
let async = require('async');

module.exports.Index = function (request, response) {
    response.title = "Gestion des Sponsors";
    model.getListeSponsor( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeSponsor = result;
    response.render('sponsor', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un sponsor";
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
    response.render('ajouterSponsor', response);
    });
};


module.exports.ajouterSponsor = function (req, response) {
    data = req.body;


    data["SPONOM"] = data["SPONOM"].split("'").join("\\\'");
    data["SPOSECTACTIVITE"] = data["SPOSECTACTIVITE"].split("'").join("\\\'");

    ecurie = data["ECUNUM"];
    delete data["ECUNUM"];

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }



    async.parallel ([
            function (callback) {
                model.ajouterSponsor(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
              sleep(100).then(() => {
                  model.ajouterFinance(ecurie, function (err, res) {callback(null,res)});
              });
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.status(301).redirect(req.baseUrl+'/ajouterSponsor');
        }
    );
};

module.exports.Modifier = function (request, response) {
    response.title = "Modifier un Sponsor";

    let data = request.params.num;


    async.parallel ([
            function (callback) {
                model.getInfoSponsor(data, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getListeEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoFinance(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.sponsor = result[0][0];
            response.listeEcurie = result[1];
            response.finance = result[2][0];
            response.render('modifierSponsor', response);
        }
    );
};


module.exports.modifierSponsor = function (req, response) {
    data = req.body;
    num = req.params.num;

    data["SPONOM"] = data["SPONOM"].split("'").join("\\\'");
    data["SPOSECTACTIVITE"] = data["SPOSECTACTIVITE"].split("'").join("\\\'");

    ecurie = data["ECUNUM"];
    delete data["ECUNUM"];

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }



    async.parallel ([
            function (callback) {
                model.modifierSponsor(data,num, function (err, res) {callback(null,res)});
            },
            function (callback) {
                  model.supprimerFinance(num, function (err, res) {callback(null,res)});
            },
            function (callback) {
              sleep(100).then(() => {
                  model.ajouterFinance2(ecurie,num, function (err, res) {callback(null,res)});
              });
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.status(301).redirect(req.baseUrl+'/sponsorAdmin');
        }
    );
};

module.exports.Supprimer = function (request, response) {
    response.title = "Supprimer un sponsor";
    let data = request.params.num;
    model.getInfoSponsor( data,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.sponsor = result[0];
    response.render('supprimerSponsor', response);
    });
};


module.exports.supprimerSponsor= function (req, response) {
    let data = req.params.num;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    async.parallel ([
            function (callback) {
              sleep(100).then(() => {
                model.supprimerSponsor(data, function (err, res) {callback(null,res)});
              });
            },
            function (callback) {
                  model.supprimerFinance(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
                  model.supprimerSponsorise(data, function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
            response.status(301).redirect(req.baseUrl+'/sponsorAdmin');
        }
    );
};
