let db = require('../configDb');

module.exports.getListePilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT pilnum, pilnom, pilprenom, pildatenais FROM pilote";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNationalitePilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT paynum, paynat FROM pays";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNomEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT ecunum, ecunom FROM ecurie";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getInfoPilote = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select p.pilnum, phoadresse, pilnom, pilprenom, pildatenais,pilpoints, pilpoids, piltaille, ecunom, p.paynum, piltexte from pilote p " +
                "left join ecurie e on p.ecunum = e.ecunum join photo ph on p.pilnum = ph.pilnum " +
                "where ph.phonum = 1 and p.pilnum = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.ajouterPilote = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          connexion.query('insert into pilote SET ?',data,callback);
          connexion.release();
        }
    });
};

module.exports.ajouterPhoto = function (photo, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "insert into photo (PHONUM,PILNUM,PHOADRESSE) SELECT 1,MAX(PILNUM),'"+photo+"' from pilote";
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPilote = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update pilote SET pilnom = '" + data["PILNOM"] +"',  pilprenom = '" + data["PILPRENOM"] +"', pildatenais = '" + data["PILDATENAIS"] +"', " +
            " piltexte = '" + data["PILTEXTE"] +"', pilpoids = " + data["PILPOIDS"] +", piltaille = " + data["PILTAILLE"] +", pilpoints = " + data["PILPOINTS"] +", ecunum = " + data["ECUNUM"] +" "+
            "where pilnum = " + data["id"]

          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update  photo SET PHOADRESSE = '"+photo+"' where pilnum = " + id ;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerPilote = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM pilote where PILNUM = " + id;
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerPhoto = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM photo where PILNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};
