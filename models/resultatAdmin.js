let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT GPNUM, GPNOM FROM grandprix ORDER BY GPNOM";
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
						let sql = "select row_number, PILNOM,PILNUM, PILPRENOM, TEMPSCOURSE, PTNBPOINTSPLACE,GPNUM from ";
						sql = sql + "(SELECT @row_number:=@row_number+1 AS row_number ,PILNOM, p.PILNUM, PILPRENOM, TEMPSCOURSE,GPNUM from course c join pilote p on c.PILNUM = p.PILNUM ";
						sql = sql + "JOIN (SELECT @row_number := 0 FROM DUAL) as sub ";
						sql = sql + "where c.GPNUM =" + data +" order by TEMPSCOURSE asc) t left join points p on p.PTPLACE=t.row_number ";
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
            let sql = " SELECT PILNUM, PILNOM, PILPRENOM FROM pilote order by PILNOM asc";
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
            let sql = " SELECT GPNOM from grandprix where GPNUM = "+data;
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

module.exports.modifierMAJ = function (data, callback) {
    // connection à la base
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = " update grandprix set GPDATEMAJ ='" + dateTime + "' where GPNUM = "+ data;
            console.log (sql);
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
            let sql = "DELETE FROM course where PILNUM = "+pilnum+" and GPNUM = "+gpnum+" ";
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
