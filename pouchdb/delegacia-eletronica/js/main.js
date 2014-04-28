;(function(window, document, undefined) {
	'use strict';

	var app = (function() {
		// variável privada
		var _private = {};
		// variável pública
		var exports = {};

		// Cria um novo banco de dados
		_private.db = new PouchDB('bd_delegacia');

		_private.nome = document.querySelector('#nome');
		_private.cpf = document.querySelector('#cpf');
		_private.natureza = document.querySelector('#natureza');
		_private.reivindicacao = document.querySelector('#reivindicacao');

		_private.btnCadastrar = document.querySelector('#cadastrar');

		_private.tableListaDenuncias = document.querySelector('#lista-denuncias');

		exports.addDenuncia = function() {
			var delegacia = {
					_id: _private.cpf.value,
					nome: _private.nome.value,
					natureza: _private.natureza.value,
					reivindicacao: _private.reivindicacao.value
				};

			_private.db.put(delegacia, function callback(err, result) {
				if (!err) {
					exports.limparCampos();
					alert('Denúncia cadastrada com sucesso!');
					document.location.reload();
				}
			});
		};

		exports.limparCampos = function() {
			_private.cpf.value = '';
			_private.nome.value = '';
			_private.natureza.value = '';
			_private.reivindicacao.value = '';
		};

		exports.showDenuncias = function() {
			_private.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
				if (!err) {
					exports.showTableDenuncias(doc.rows);
				}
			});
		};

		exports.showTableDenuncias = function(data) {
			for (var i = 0, len = data.length; i < len; i += 1) {
				if (data.length !== 0) {
					_private.tableListaDenuncias.tBodies.listar.innerHTML += '<tr><td>' + data[i].doc.nome +
					                                                         '</td><td>' + data[i].doc._id +
					                                                         '</td><td>' + data[i].doc.natureza +
					                                                         '</td><td>' + data[i].doc.reivindicacao + '</td></tr>';
				}
				else {
					_private.tableListaDenuncias.tBodies.listar.innerHTML = '<tr><td colspan="4">Nenhuma denúncia cadastrada :(</td></tr>';
				}
			}
		};

		// Eventos
		_private.btnCadastrar.addEventListener('click', exports.addDenuncia, false);

		return exports;
	})();

	// Global
	window.app = app;
})(window, document);