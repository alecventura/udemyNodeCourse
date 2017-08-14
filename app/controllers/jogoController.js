module.exports.jogo = function(application, req, res){
    
    if (req.session.authorized) {
        res.render('jogo');
    } else {
        res.render("index", {validacao: [{msg: 'Usuário não logado'}], formData: {}});
    }
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}, formData: {}})
    });
    
}