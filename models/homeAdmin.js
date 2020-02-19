let db = require('../configDb');

module.exports.Connexion = function (callback) {
    db.getConnection( function (err,connexion) {
        if(!err) {
            let sql = "select login, passwd from login";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
