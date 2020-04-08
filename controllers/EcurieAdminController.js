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

    if (!req.files || Object.keys(req.files).length === 0) {
      file.name = 'null';
    }else {
      file = req.files.foo;
      if (file.name.length > 20) {
        name = ''.concat('ecu',data["ECUNOM"].substring(0,10),'.png')
      }else {
        name = file.name
      }
      file.mv("./public/image/ecurie/"+name, function (err,res){
        if (err) {
          console.log(err);
        } else {
          console.log('Upload');
        }
      });
    }

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
              if (!req.files || Object.keys(req.files).length === 0) {
                callback(null,null);
              }else {
                let file = req.files.foo;
                if (file.name.length > 20) {
                  name = ''.concat('cir',num.substring(0,10),'.png')
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
              if (file.name.length > 20) {
                name = ''.concat('cir',num.substring(0,10),'.png')
              }else {
                name = file.name
              }
              file.mv("./public/image/ecurie/"+name, function (err,res){
                if (err) {
                  console.log(err);
                } else {
                  console.log('Upload');
                }
              });
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

    model.supprimerEcurie(num, function (err, res) {
      response.status(301).redirect(req.baseUrl+'/ecurieAdmin');
    });
};
