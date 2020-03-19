let db = require('../configDb');
let model = require('../models/circuitAdmin.js');
let async = require('async');

module.exports.Index = function (request, response) {
    response.title = "Gestion des Circuits";
    model.getListeCircuit( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuit = result;
    response.render('circuits', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un circuit";
    model.getPaysCircuit( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePays = result;
    response.render('ajouterCircuit', response);
    });
};


module.exports.ajouterCircuit = function (req, response) {
    response.title = "Gestion des Circuits";
    data = req.body;

    data["CIRNOM"] = data["CIRNOM"].split("'").join("\\\'");
    data["CIRTEXT"] = data["CIRTEXT"].split("'").join("\\\'");

    if (!req.files || Object.keys(req.files).length === 0) {
      file.name = 'null.png';
    }else {
      file = req.files.foo;
      file.mv("./public/image/circuit/"+file.name, function (err,res){
        if (err) {
          console.log(err);
        } else {
          console.log('Upload');
        }
      });

    }

    async.parallel ([
            function (callback) {
                model.getPaysCircuit(function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.ajouterCircuit(data,file.name, function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.listePays = res[0];
            response.render('ajouterCircuit', response);
        }
    );
};


module.exports.Modifier = function (request, response) {
    response.title = "Modifier un circuit";

    let data = request.params.num;


    async.parallel ([
            function (callback) {
                model.getPaysCircuit(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoCircuit(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listePays = result[0];
            response.circuit = result[1][0];
            response.render('modifierCircuit', response);
        }
    );
};

module.exports.modifierCircuit = function (req, response) {
    response.title = "Gestion des circuits";
    data = req.body;

    data["CIRNOM"] = data["CIRNOM"].split("'").join("\\\'");
    data["CIRTEXT"] = data["CIRTEXT"].split("'").join("\\\'");


    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    async.parallel ([
            function (callback) {
                model.modifierCircuit(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
              if (!req.files || Object.keys(req.files).length === 0) {
                callback(null,null);
              }else {
                let file = req.files.foo;
                model.modifierPhoto(file.name,data["id"],function (err, res) {callback(null,res)});
              }
            },

            function (callback) {
              sleep(100).then(() => {
                  model.getListeCircuit( function (err, res) {callback(null,res)});
              });
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
              file.mv("./public/image/circuit/"+file.name, function (err,res){
                if (err) {
                  console.log(err);
                } else {
                  console.log('Upload');
                }
              });
            }

            response.listeCircuit = res[2];
            response.render('circuits', response);
        }
    );
};
