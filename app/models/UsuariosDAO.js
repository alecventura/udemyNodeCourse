'use strict'

var crypto = require('crypto');

function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuarios', function(err, collection){
            var password = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = password;
            collection.insert(usuario);

            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticarUsuario = function(usuario, callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuarios', function(err, collection){
            var password = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = password;
            collection.find(usuario).toArray(function(err, result){
                mongoclient.close();
                if(result && result.length > 0){
                    return callback(true, result[0]);
                }
                return callback(false);
            });            
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}