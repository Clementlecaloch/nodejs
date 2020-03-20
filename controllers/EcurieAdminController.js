let db = require('../configDb');
let model = require('../models/ecurieAdmin.js');
let async = require('async');

module.exports.Index = function (request, response) {
    response.title = "Gestion des Ecuries";
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
    response.render('ecurie', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un circuit";
    model.getPaysEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePays = result;
    response.render('ajouterEcurie', response);
    });
};


module.exports.ajouterEcurie = function (req, response) {
    response.title = "Gestion des Ecuries";
    data = req.body;

    data["ECUNOM"] = data["ECUNOM"].split("'").join("\\\'");
    data["ECUNOMDIR"] = data["ECUNOMDIR"].split("'").join("\\\'");
    data["ECUADRSIEGE"] = data["ECUADRSIEGE"].split("'").join("\\\'");

    if (!req.files || Object.keys(req.files).length === 0) {
      file.name = 'null.png';
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

    async.parallel ([
            function (callback) {
                model.getPaysEcurie(function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.ajouterEcurie(data,file.name, function (err, res) {callback(null,res)});
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.listePays = res[0];
            response.render('ajouterEcurie', response);
        }
    );
};


module.exports.Modifier = function (request, response) {
    response.title = "Modifier un ecurie";

    let data = request.params.num;


    async.parallel ([
            function (callback) {
                model.getPaysEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoEcurie(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.listePays = result[0];
            response.ecurie = result[1][0];
            response.render('modifierEcurie', response);
        }
    );
};

module.exports.modifierEcurie = function (req, response) {
    response.title = "Gestion des Ecuries";
    data = req.body;

    data["ECUNOM"] = data["ECUNOM"].split("'").join("\\\'");
    data["ECUNOMDIR"] = data["ECUNOMDIR"].split("'").join("\\\'");
    data["ECUADRSIEGE"] = data["ECUADRSIEGE"].split("'").join("\\\'");


    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


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

            function (callback) {
              sleep(100).then(() => {
                  model.getListeEcurie( function (err, res) {callback(null,res)});
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
              file.mv("./public/image/ecurie/"+file.name, function (err,res){
                if (err) {
                  console.log(err);
                } else {
                  console.log('Upload');
                }
              });
            }

            response.listeEcurie = res[2];
            response.render('ecurie', response);
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
    response.render('supprimerCircuit', response);
    });
};


module.exports.supprimerCircuit = function (req, response) {
    response.title = "Gestion des pilotes";
    data = req.body;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    async.parallel ([
            function (callback) {
                model.supprimerCircuit(data["id"], function (err, res) {callback(null,res)});
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

            response.listeCircuit = res[1];
            response.render('circuits', response);
        }
    );
};
