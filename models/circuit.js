let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT CIRNUM, PAYADRDRAP, CIRNOM FROM circuit c INNER JOIN pays p ON p.PAYNUM=c.PAYNUM ORDER BY CIRNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfoCircuit = function (num, callback) {

  db.getConnection(function(err, connexion){
    if(!err){

      let sql = "SELECT CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, PAYNOM, CIRTEXT, CIRADRESSEIMAGE FROM circuit c INNER JOIN pays p ON p.PAYNUM=c.PAYNUM where CIRNUM = " + num ;

      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });

}
