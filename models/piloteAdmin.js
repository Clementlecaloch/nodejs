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
            let sql = "select phoadresse, pilnom, pilprenom, pildatenais, pilpoids, piltaille, ecunom, paynom, piltexte from pilote p " +
                "left join ecurie e on p.ecunum = e.ecunum join photo ph on p.pilnum = ph.pilnum join pays pa " +
                " on pa.paynum = p.paynum where ph.phonum = 1 and p.pilnum = " + num;
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
