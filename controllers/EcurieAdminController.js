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
    data = req.body;

    data["ECUNOM"] = data["ECUNOM"].split("'").join("\\\'");
    data["ECUNOMDIR"] = data["ECUNOMDIR"].split("'").join("\\\'");
    data["ECUADRSIEGE"] = data["ECUADRSIEGE"].split("'").join("\\\'");

    file = req.files.foo;
    name = ''.concat('ecu',data["ECUNOM"].substring(0,10),'.png');
    file.mv("./public/image/ecurie/"+name, function (err,res){});

    model.ajouterEcurie(data,name, function (err, res) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.status(301).redirect(req.baseUrl+'/ajouterEcurie');

    });

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

    let num = req.params.num;
    data = req.body;

    data["ECUNOM"] = data["ECUNOM"].split("'").join("\\\'");
    data["ECUNOMDIR"] = data["ECUNOMDIR"].split("'").join("\\\'");
    data["ECUADRSIEGE"] = data["ECUADRSIEGE"].split("'").join("\\\'");

    async.parallel ([
            function (callback) {
                model.modifierEcurie(data,num, function (err, res) {callback(null,res)});
            },
            function (callback) {
              if (req.files) {
                file = req.files.foo;
                name = ''.concat('cir',num,'.png');
                file.mv("./public/image/ecurie/"+name, function (err,res){});
                model.modifierPhoto(name,num,function (err, res) {callback(null,res)});
              }
              else {
                callback();
              }
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.status(301).redirect(req.baseUrl+'/ecurieAdmin');
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
    let num = req.params.num;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async.parallel ([
            function (callback) {
                model.modifierEcurieFromPilote(num, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.supprimerEcurieFromVoiture(num, function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.supprimerEcurieFromFinance(num, function (err, result) {callback(null,result)});
            },
            function (callback) {
              sleep(100).then(() => {
                model.supprimerEcurie(num,function (err, result) {callback(null,result)});
              });
            },

        ],

   function (err, res) {
      response.status(301).redirect(req.baseUrl+'/ecurieAdmin');
    });
};
