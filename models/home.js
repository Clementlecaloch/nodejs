let db = require('../configDb');

module.exports.getDernierResultat = function (callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select gpnum, cirnom, gpdate, gpdatemaj from grandprix g join circuit c on g.cirnum = c.cirnum order by gpdatemaj desc limit 1";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
