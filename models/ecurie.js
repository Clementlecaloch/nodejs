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
						let sql ="SELECT ECUNUM, PAYADRDRAP, ECUNOM FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.PAYNUM=e.PAYNUM ORDER BY ECUNOM";
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
            let sql = "SELECT ECUADRESSEIMAGE, ECUNOM, ECUNOMDIR, ECUADRSIEGE, PAYNOM FROM ecurie e join pays p on p.PAYNUM = e.PAYNUM where e.ECUNUM = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPiloteByEcu = function (num, callback) {

    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT pi.PILNUM, PILNOM, PILPRENOM, PHOADRESSE, substring(PILTEXTE, 1, 200) as PILTEXTE from pilote pi join photo ph on pi.PILNUM = ph.PILNUM join ecurie e on pi.ECUNUM = e.ECUNUM where PHONUM = 1 and e.ECUNUM = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoEcu = function (num, callback) {

    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT VOIADRESSEIMAGE, VOINUM, TYPELIBELLE from voiture v join ecurie e on v.ECUNUM = e.ECUNUM join type_voiture t on t.TYPNUM = v.TYPNUM where e.ECUNUM = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
