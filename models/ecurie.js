/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getEcurieByNumber = function (num, callback) {

    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT ecuadresseimage, ecunom, ecunomdir, ecuadrsiege, paynom FROM ecurie e join pays p on p.paynum = e.paynum where e.ecunum = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPiloteByEcu = function (num, callback) {

    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT pi.pilnum, pilnom, pilprenom, phoadresse, piltexte from pilote pi join photo ph on pi.pilnum = ph.pilnum join ecurie e on pi.ecunum = e.ecunum where phonum = 1 and e.ecunum = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoEcu = function (num, callback) {

    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT voiadresseimage, voinom, typelibelle from voiture v join ecurie e on v.ecunum = e.ecunum join type_voiture t on t.typnum = v.typnum where e.ecunum = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
