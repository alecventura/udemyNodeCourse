module.exports.cadastro = function(application, req, res){
    
    
    res.render('cadastro', {validacao: [], formData: {}});
}

module.exports.cadastrar = function(application, req, res){
    var formData = req.body;

    req.assert('nome', "Campo nome é obrigatório!").notEmpty();
    req.assert('usuario', "Campo usuário é obrigatório!").notEmpty();
    req.assert('senha', "Campo senha é obrigatório!").notEmpty();
    req.assert('casa', "Campo casa é obrigatório!").notEmpty();

    req.getValidationResult().then(function(result) {
        // console.log(result.array());

        if (!result.isEmpty()) {
            res.render('cadastro', {validacao: result.array(), formData: formData})
            return;
        }

        var connection = application.config.dbConnection;

        var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
        UsuariosDAO.inserirUsuario(formData);

        res.send('Ok!')
    });
}