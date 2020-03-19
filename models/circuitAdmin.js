let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit order by cirnom asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getPaysCircuit = function (callback) {
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

module.exports.ajouterCircuit = function (data,file, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "INSERT into circuit (PAYNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT) VALUES ("+ data["PAYNUM"] +",'"+ data["CIRNOM"] +"' ,"+ data["CIRLONGUEUR"] +" , "+ data["CIRNBSPECTATEURS"] +",'"+ file +"' ,'"+ data["CIRTEXT"] +"')"
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.getInfoCircuit = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select CIRNOM,PAYNUM, CIRNUM, CIRLONGUEUR, CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT from circuit WHERE cirnum =" + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.modifierCircuit = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update circuit SET cirnom = '" + data["CIRNOM"] +"',  paynum = " + data["PAYNUM"] +", cirlongueur = " + data["CIRLONGUEUR"] +", " +
            " cirtext = '" + data["CIRTEXT"] +"', cirnbspectateurs = " + data["CIRNBSPECTATEURS"] + " where cirnum = " + data["id"];
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update circuit SET CIRADRESSEIMAGE = '"+photo+"' where cirnum = " + id ;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerCircuit = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM CIRCUIT where CIRNUM = " + id;
          connexion.query(sql,data,callback);
          connexion.release();
        }
    });
};
