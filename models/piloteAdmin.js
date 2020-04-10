let db = require('../configDb');

module.exports.getListePilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT PILNUM, PILNOM, PILPRENOM, PILDATENAIS FROM pilote order by PILNOM asc";
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
            let sql = "SELECT PAYNUM, PAYNAT FROM pays order by PAYNAT asc";
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
            let sql = "SELECT ECUNUM, ECUNOM FROM ecurie order by ECUNOM asc";
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
            let sql = "select p.PILNUM, PILNOM, PILPRENOM, PILDATENAIS,PILPOINTS, PILPOIDS, PILTAILLE, p.ECUNUM, p.PAYNUM, PILTEXTE from pilote p " +
                "left join ecurie e on p.ECUNUM = e.ECUNUM " +
                "where p.PILNUM = " + num;
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

module.exports.modifierPilote = function (data,num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update pilote SET PILNOM = '" + data["PILNOM"] +"',  PILPRENOM = '" + data["PILPRENOM"] +"', PILDATENAIS = '" + data["PILDATENAIS"] +"', " +
            " PILTEXTE = '" + data["PILTEXTE"] +"', PILPOIDS = " + data["PILPOIDS"] +", PILTAILLE = " + data["PILTAILLE"] +", PILPOINTS = " + data["PILPOINTS"] +", ECUNUM = " + data["ECUNUM"] +" "+
            ", PAYNUM = "+ data["PAYNUM"]+" where PILNUM = " + num
          console.log(sql);
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update  photo SET PHOADRESSE = '"+photo+"' where PHONUM = 1 and PILNUM = " + id ;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerPilote = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM pilote where PILNUM = " + id;
          connexion.query(sql,callback);
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

module.exports.supprimerPiloteFromCourse = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM course where PILNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerPiloteFromEssais = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM essais where PILNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerPiloteFromSponsorise = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM sponsorise where PILNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};
