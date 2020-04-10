let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT CIRNUM, CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS FROM circuit order by CIRNOM asc";
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
            let sql = "SELECT PAYNUM, PAYNOM FROM pays order by PAYNOM asc";
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
            let sql = "select CIRNOM,PAYNUM, CIRNUM, CIRLONGUEUR, CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT from circuit WHERE CIRNUM =" + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.modifierCircuit = function (data,num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update circuit SET CIRNOM = '" + data["CIRNOM"] +"',  PAYNUM = " + data["PAYNUM"] +", CIRLONGUEUR = " + data["CIRLONGUEUR"] +", " +
            " CIRTEXT = '" + data["CIRTEXT"] +"', CIRNBSPECTATEURS = " + data["CIRNBSPECTATEURS"] + " where CIRNUM = " +num;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.modifierPhoto = function (photo,id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "update circuit SET CIRADRESSEIMAGE = '"+photo+"' where CIRNUM = " + id ;

          console.log(sql);
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerCircuit = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM circuit where CIRNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerCircuitFromGP = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM grandprix where CIRNUM = " + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};

module.exports.supprimerGPFromCourse = function (id, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
          let sql = "DELETE FROM course where GPNUM = (select GPNUM )" + id;
          connexion.query(sql,callback);
          connexion.release();
        }
    });
};
