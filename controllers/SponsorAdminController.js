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
    response.title = "Gestion des Sponsors";
    data = req.body;


    data["SPONOM"] = data["SPONOM"].split("'").join("\\\'");
    data["SPOSECTACTIVITE"] = data["SPOSECTACTIVITE"].split("'").join("\\\'");

    ecurie = data["ECUNUM"];
    delete data["ECUNUM"];

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    console.log(data);


    async.parallel ([
            function (callback) {
                model.getListeEcurie(function (err, res) {callback(null,res)});
            },
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

            response.listeEcurie = res[0];
            response.render('ajouterSponsor', response);
        }
    );
};


module.exports.Modifier = function (request, response) {
    response.title = "Modifier un sponsor";

    let data = request.params.num;


    async.parallel ([
            function (callback) {
                model.getListeEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getFinance(data,function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoSponsor(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listeEcurie = result[0];
            response.sponsor = result[1][0];
            response.render('modifierSponsor', response);
        }
    );
};

module.exports.modifierEcurie = function (req, response) {
    response.title = "Gestion des Ecuries";
    data = req.body;

    data["ECUNOM"] = data["ECUNOM"].split("'").join("\\\'");
    data["ECUNOMDIR"] = data["ECUNOMDIR"].split("'").join("\\\'");
    data["ECUADRSIEGE"] = data["ECUADRSIEGE"].split("'").join("\\\'");


    async.parallel ([
            function (callback) {
                model.modifierEcurie(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
              if (!req.files || Object.keys(req.files).length === 0) {
                callback(null,null);
              }else {
                let file = req.files.foo;
                model.modifierPhoto(file.name,data["id"],function (err, res) {callback(null,res)});
              }
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            if (!req.files || Object.keys(req.files).length === 0) {

            }else {
              file = req.files.foo;
              file.mv("./public/image/ecurie/"+file.name, function (err,res){
                if (err) {
                  console.log(err);
                } else {
                  console.log('Upload');
                }
              });
            }

            response.status(301).redirect('http://localhost:6900/ecurieAdmin');
        }
    );
};

module.exports.Supprimer = function (request, response) {
    response.title = "Supprimer un ecurie";
    let data = request.params.num;
    model.getInfoEcurie( data,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.ecurie = result[0];
    response.render('supprimerEcurie', response);
    });
};


module.exports.supprimerEcurie = function (req, response) {
    response.title = "Gestion des Ecuries";
    data = req.body;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    async.parallel ([
            function (callback) {
                model.supprimerEcurie(data["id"], function (err, res) {callback(null,res)});
            },
            function (callback) {
              sleep(100).then(() => {
                  model.getListeEcurie(function (err, res) {callback(null,res)});
              });
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

response.status(301).redirect('http://localhost:6900/circuitAdmin');
        }
    );
};
