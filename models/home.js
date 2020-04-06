let db = require('../configDb');

module.exports.getDernierResultat = function (callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "select GPNUM, g.CIRNUM, GPDATE, GPDATEMAJ from grandprix g join circuit c on g.CIRNUM = c.CIRNUM order by GPDATEMAJ desc limit 1";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
