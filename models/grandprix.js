let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gpnum, payadrdrap, gpnom FROM grandprix g INNER JOIN circuit c ON c.cirnum=g.cirnum INNER JOIN pays p ON p.paynum=c.paynum ORDER BY gpnom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
