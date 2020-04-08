let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT ECUNUM, ECUNOM, ECUNOMDIR, ECUPOINTS FROM ecurie order by ECUNOM asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getPaysEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT PAYNUM, PAYNOM FROM pays order by PAYNOM asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ajouterEcurie = function (data,file, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "INSERT into ecurie (PAYNUM,ECUNOM,ECUNOMDIR,ECUADRSIEGE,ECUADRESSEIMAGE,ECUPOINTS) VALUES ("+ data["PAYNUM"] +",'"+ data["ECUNOM"] +"' ,'"+ data["ECUNOMDIR"] +"' ,  '"+ data["ECUADRSIEGE"] +"','"+ file +"' ,"+ data["ECUPOINTS"] +")"
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.getInfoEcurie = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select ECUNOM,PAYNUM, ECUNUM, ECUNOMDIR, ECUADRSIEGE,ECUPOINTS from ecurie WHERE ECUNUM =" + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.modifierEcurie = function (data,num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update ecurie SET ECUNOM = '" + data["ECUNOM"] +"',  PAYNUM = " + data["PAYNUM"] +", ECUPOINTS = " + data["ECUPOINTS"] +", " +
            " ECUADRSIEGE = '" + data["ECUADRSIEGE"] +"', ECUNOMDIR = '" + data["ECUNOMDIR"] + "' where ECUNUM = " + num;
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update ecurie SET ECUADRESSEIMAGE = '"+photo+"' where ECUNUM = " + id ;
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
