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
    data = req.body;

    data["CIRNOM"] = data["CIRNOM"].split("'").join("\\\'");
    data["CIRTEXT"] = data["CIRTEXT"].split("'").join("\\\'");

    if (!req.files || Object.keys(req.files).length === 0) {
      name = 'null';
    }else {
      file = req.files.foo;
      if (file.name.length > 20) {
        name = ''.concat('cir',data["CIRNOM"].substring(0,10),'.png')
      }else {
        name = file.name
      }

      file.mv("./public/image/circuit/"+name, function (err,res){
        if (err) {
          console.log(err);
        } else {
          console.log('Upload');
        }
      });

    }

    model.ajouterCircuit(data,name, function (err, res) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }

        response.status(301).redirect(req.baseUrl+'/ajouterCircuit');
    });
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
    let num = req.params.num;
    data = req.body;

    data["CIRNOM"] = data["CIRNOM"].split("'").join("\\\'");
    data["CIRTEXT"] = data["CIRTEXT"].split("'").join("\\\'");

    async.parallel ([
            function (callback) {
                model.modifierCircuit(data,num, function (err, res) {callback(null,res)});
            },
            function (callback) {
              if (!req.files || Object.keys(req.files).length === 0) {
                callback(null,null);
              }else {
                let file = req.files.foo;
                if (file.name.length > 20) {
                  name = ''.concat('cir',num,'.png')
                }else {
                  name = file.name
                }
                model.modifierPhoto(name,num,function (err, res) {callback(null,res)});
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
              file.mv("./public/image/circuit/"+name, function (err,res){
                if (err) {
                  console.log(err);
                } else {
                  console.log('Upload');
                }
              });
            }

            response.status(301).redirect(req.baseUrl+'/circuitAdmin');
        }
    );
};

module.exports.Supprimer = function (request, response) {
    response.title = "Supprimer un circuit";
    let data = request.params.num;
    model.getInfoCircuit( data,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.circuit = result[0];
    response.render('supprimerCircuit', response);
    });
};


module.exports.supprimerCircuit = function (req, response) {
    let num = req.params.num;

    model.supprimerCircuit(num, function (err, res) {
            response.status(301).redirect(req.baseUrl+'/circuitAdmin');
        });
};
