let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT cirnum, payadrdrap, cirnom FROM circuit c INNER JOIN pays p ON p.paynum=c.paynum ORDER BY cirnom";
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

      let sql = "SELECT cirnom, cirlongueur, cirnbspectateurs, paynom, cirtext, ciradresseimage FROM circuit c INNER JOIN pays p ON p.paynum=c.paynum where cirnum = " + num ;

      connexion.query(sql, callback);

      // la connexion retourne dans le pool
      connexion.release();
    }
  });

}
