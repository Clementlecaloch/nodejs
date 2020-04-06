let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT GPNUM, PAYADRDRAP, GPNOM FROM grandprix g INNER JOIN circuit c ON c.CIRNUM=g.CIRNUM INNER JOIN pays p ON p.PAYNUM=c.PAYNUM ORDER BY GPNOM";
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
            let sql = "select GPNOM, GPDATE,GPCOMMENTAIRE from grandprix where GPNUM =" + num;
						connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getInfoResultatPrix = function (num, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select row_number, PILNOM, PILPRENOM, TEMPSCOURSE, PTNBPOINTSPLACE from ";
						sql = sql + "(SELECT @row_number:=@row_number+1 AS row_number ,PILNOM, PILPRENOM, TEMPSCOURSE from course c join pilote p on c.PILNUM = p.PILNUM ";
						sql = sql + "JOIN (SELECT @row_number := 0 FROM DUAL) as sub ";
						sql = sql + "where c.GPNUM =" + num +" order by TEMPSCOURSE asc) t left join points p on p.PTPLACE=t.row_number ";
						connexion.query(sql,callback);
            connexion.release();
        }
    });
};
