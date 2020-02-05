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
            let sql = "SELECT pilnom, pilprenom, phoadresse from pilote p join photo ph on p.PILNUM = ph.PILNUM where substring(pilnom,1,1) like '"
                + lettre  + "' and phonum = 1";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


