let db = require('../configDb');

module.exports.getListeSponsor = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT sponum,sponom, sposectactivite FROM sponsor order by sponom asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getListeEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT ecunum, ecunom FROM ecurie order by ecunom asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ajouterSponsor = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          connexion.query('insert into sponsor SET ?',data,callback);
          connexion.release();
        }
    });
};

module.exports.ajouterFinance = function (ecurie, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "insert into finance (SPONUM,ECUNUM) SELECT MAX(SPONUM),"+ecurie+" from sponsor";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getFiance = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT sponum,sponom, sposectactivite FROM sponsor order by sponom asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.modifierEcurie = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update ecurie SET ecunom = '" + data["ECUNOM"] +"',  paynum = " + data["PAYNUM"] +", ecupoints = " + data["ECUPOINTS"] +", " +
            " ECUADRSIEGE = '" + data["ECUADRSIEGE"] +"', ecunomdir = '" + data["ECUNOMDIR"] + "' where ecunum = " + data["id"];
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update ecurie SET ECUADRESSEIMAGE = '"+photo+"' where ecunum = " + id ;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerEcurie = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM ECURIE where ECUNUM = " + id;
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};
