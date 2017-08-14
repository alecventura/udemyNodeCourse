'use strict';
module.exports.index = function(application, req, res){
    
    
    res.render('index', {validacao: {}, formData: {}});
}

module.exports.autenticar = function(application, req, res){
    
    var formData = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();

    req.getValidationResult().then(function(result) {
        // console.log(result.array());

        if (!result.isEmpty()) {
            res.render('index', {validacao: result.array(), formData: formData})
            return;
        }

        var connection = application.config.dbConnection;

        var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
        UsuariosDAO.autenticarUsuario(formData, function(authorized, user){
            if (authorized) {       
                req.session.authorized = true;         
                req.session.usuario = user.usuario;
                req.session.casa = user.casa;   
                res.redirect("jogo");
            } else {
                req.session.authorized = false;
                res.render("index", {validacao: [{msg: 'Usuário ou Senha incorreta.'}], formData: {}});
            }
        });


    });
}
