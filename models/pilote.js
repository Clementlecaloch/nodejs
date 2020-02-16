let db = require('../configDb');

module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT distinct substring(pilnom,1,1) as lettre FROM pilote order by lettre asc";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPiloteByLetter = function (lettre, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT p.pilnum, pilnom, pilprenom, phoadresse from pilote p join photo ph on p.PILNUM = ph.PILNUM where substring(pilnom,1,1) like '"
                + lettre  + "' and phonum = 1";

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

module.exports.getSponsorByPilote = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select sponom, sposectactivite from sponsor s join sponsorise sp on s.sponum = sp.sponum where pilnum = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoByPilote = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select phoadresse, phocommentaire from photo p join pilote pi on p.pilnum = pi.pilnum where phonum != 1 and p.pilnum = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
