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

module.exports.getInfoGrandPrix = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select gpnom, gpdate,gpcommentaire from grandprix where gpnum =" + num;
						connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getInfoResultatPrix = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select row_number, pilnom, pilprenom, tempscourse, ptnbpointsplace from ";
						sql = sql + "(SELECT @row_number:=@row_number+1 AS row_number ,pilnom, pilprenom, tempscourse from course c join pilote p on c.pilnum = p.pilnum ";
						sql = sql + "JOIN (SELECT @row_number := 0 FROM DUAL) as sub "
						sql = sql + "where c.gpnum =" + num +" order by tempscourse asc) t left join points p on p.PTPLACE=t.row_number ";
						connexion.query(sql,callback);
            connexion.release();
        }
    });
};
