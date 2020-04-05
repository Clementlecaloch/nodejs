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

module.exports.ajouterFinance2 = function (ecurie,num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "insert into finance (SPONUM,ECUNUM) values ("+num+","+ecurie+")";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getInfoSponsor = function (sponsor, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "Select SPONOM, SPOSECTACTIVITE from sponsor where SPONUM = "+sponsor;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getInfoSponsor = function (sponsor, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "Select SPONOM, SPOSECTACTIVITE from sponsor where SPONUM = "+sponsor;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getInfoFinance = function (sponsor, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "Select ECUNUM from finance where SPONUM = "+sponsor;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.supprimerFinance = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "delete from finance where SPONUM =" +num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.modifierSponsor = function (data,num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "update sponsor set SPONOM = '"+data["SPONOM"]+"', SPOSECTACTIVITE = '"+data["SPOSECTACTIVITE"]+"' WHERE SPONUM ="+num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.supprimerSponsor = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "delete from sponsor where SPONUM =" +num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.supprimerSponsorise = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "delete from sponsorise where SPONUM =" +num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
