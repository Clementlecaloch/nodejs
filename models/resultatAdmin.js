let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gpnum, gpnom FROM grandprix ORDER BY gpnom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfoResultatPrix = function (data, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select row_number,pilnum, pilnom, pilprenom, tempscourse, ptnbpointsplace,gpnum	 from ";
						sql = sql + "(SELECT @row_number:=@row_number+1 AS row_number ,p.pilnum,pilnom, pilprenom, tempscourse,gpnum from course c join pilote p on c.pilnum = p.pilnum ";
						sql = sql + "JOIN (SELECT @row_number := 0 FROM DUAL) as sub "
						sql = sql + "where c.gpnum =" + data +" order by tempscourse asc) t LEFT join points p on p.PTPLACE=t.row_number ";
						connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getListePilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT pilnum, pilnom, pilprenom FROM pilote";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.getNomGP = function (data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " SELECT gpnom from grandprix where gpnum = "+data;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ajouterTemps = function (data, callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " INSERT INTO course VALUES ("+data["id"]+","+data["PILNUM"]+",'"+data["heures"]+":"+data["minutes"]+":"+data["secondes"]+"')";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



module.exports.supprimerTemps = function (pilnum,gpnum, callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "DELETE FROM course where PILNUM = "+pilnum+" and gpnum = "+gpnum+" ";
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
