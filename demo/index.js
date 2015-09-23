define(function (require, exports, module) {
	var Mditor = require("../client/js/main");

	var editor = document.getElementById("editor");
	var mditor = new Mditor(editor, {
		width: 500,
		height: 260,
		fixedHeight: true
	});

	window.mditor = mditor;
});