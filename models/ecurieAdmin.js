let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT ecunum, ecunom, ecunomdir, ecupoints FROM ecurie order by ecunom asc";
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
            let sql = "SELECT paynum, paynom FROM pays order by paynom asc";
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
            let sql = "select ECUNOM,PAYNUM, ECUNUM, ECUNOMDIR, ECUADRSIEGE,ECUPOINTS from ecurie WHERE ecunum =" + num;
            connexion.query(sql,callback);
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
