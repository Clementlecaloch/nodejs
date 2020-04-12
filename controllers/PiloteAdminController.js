let db = require('../configDb');
let model = require('../models/piloteAdmin.js');
let async = require('async');




module.exports.Index = function (request, response) {
    response.title = "Gestion des pilotes";
    model.getListePilote( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePilote = result;
    response.render('pilote', response);
    });
};

module.exports.Ajouter = function (request, response) {
    response.title = "Ajouter un pilote";
    async.parallel ([
            function (callback) {
                model.getNationalitePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getNomEcurie(function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.nationalite = result[0];
            response.ecurie = result[1];
            response.render('ajouterPilote', response);
        }
    );
};

module.exports.ajouterPilote = function (req, response) {

    data = req.body;

    if (data["ECUNUM"] == 'NULL') {
        delete data["ECUNUM"];
    }

    file = req.files.foo;
    name = ''.concat('pil',data["PILNOM"].substring(0,40),'.png');
    file.mv("./public/image/pilote/"+name, function (err,res){});

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async.parallel ([
            function (callback) {
                model.ajouterPilote(data, function (err, res) {callback(null,res)});
            },
            function (callback) {
                sleep(100).then(() => {
                    model.ajouterPhoto(name,function (err, res) {callback(null,res)});
                });
            },
        ],

        function (err, res) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }

            response.status(301).redirect(req.baseUrl+'/ajouterPilote');
        }
    );
};

module.exports.Modifier = function (request, response) {
    response.title = "Modifier un pilote";

    let data = request.params.num;


    async.parallel ([
            function (callback) {
                model.getNationalitePilote(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getNomEcurie(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getInfoPilote(data, function (err, result) {callback(null,result)});
            },
        ],

        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.nationalite = result[0];
            response.ecurie = result[1];
            response.pilote = result[2][0];
            response.render('modifierPilote', response);
        }
    );
};


module.exports.modifierPilote = function (req, response) {
    let num = req.params.num;
    data = req.body;


    data["PILNOM"] = data["PILNOM"].split("'").join("\\\'");
    data["PILPRENOM"] = data["PILPRENOM"].split("'").join("\\\'");
    data["PILTEXTE"] = data["PILTEXTE"].split("'").join("\\\'");


    async.parallel ([
            function (callback) {
                model.modifierPilote(data,num, function (err, res) {callback(null,res)});
            },
            function (callback) {
              if (req.files) {
                file = req.files.foo;
                name = ''.concat('pil',num,'.png')
                file.mv("./public/image/pilote/"+name, function (err,res){});
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


            response.status(301).redirect(req.baseUrl+'/piloteAdmin');
        }
    );
};

module.exports.Supprimer = function (request, response) {
    response.title = "Supprimer un pilote";
    let data = request.params.num;
    model.getInfoPilote( data,function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.pilote = result[0];
    response.render('supprimmerPilote', response);
    });
};

module.exports.supprimmerPilote = function (req, response) {
    let num = req.params.num;

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async.parallel ([
            function (callback) {
                model.supprimerPhoto(num,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.supprimerPiloteFromSponsorise(num,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.supprimerPiloteFromCourse(num,function (err, res) {callback(null,res)});
            },
            function (callback) {
                model.supprimerPiloteFromEssais(num,function (err, res) {callback(null,res)});
            },
            function (callback) {
              sleep(100).then(() => {
                model.supprimerPilote(num, function (err, res) {callback(null,res)});
              });
            },
        ],

        function (err, res) {
          response.status(301).redirect(req.baseUrl+'/piloteAdmin');
        }
    );
};
