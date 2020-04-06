let db = require('../configDb');

module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT distinct substring(PILNOM,1,1) as lettre FROM pilote order by lettre asc";
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
            let sql = "SELECT p.PILNUM, PILNOM, PILPRENOM, PHOADRESSE from pilote p left join photo ph on p.PILNUM = ph.PILNUM where substring(PILNOM,1,1) like '"
                + lettre  + "' and PHONUM = 1";

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
            let sql = "select PHOADRESSE, PILNOM, PILPRENOM, PILDATENAIS, PILPOIDS, PILTAILLE, ECUNOM, PAYNOM, PILTEXTE from pilote p " +
                "left join ecurie e on p.ECUNUM = e.ECUNUM join photo ph on p.PILNUM = ph.PILNUM join pays pa " +
                " on pa.PAYNUM = p.PAYNUM where ph.PHONUM = 1 and p.PILNUM = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getSponsorByPilote = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select SPONOM, SPOSECTACTIVITE from sponsor s join sponsorise sp on s.SPONUM = sp.SPONUM where PILNUM = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoByPilote = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select PHOADRESSE, PHOCOMMENTAIRE from photo p join pilote pi on p.PILNUM = pi.PILNUM where PHONUM != 1 and p.PILNUM = " + num;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
