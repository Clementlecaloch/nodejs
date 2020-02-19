module.exports.VerifierUtilisateurEstConnecte = function(request, response, next){

  if (!request.session.admin) {
    response.redirect('/');
    return;
  }

  next();
};
