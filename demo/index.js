define(function (require, exports, module) {
	var Mditor = require("../client/js/main");

	var editor = document.getElementById("editor");
	var mditor = new Mditor(editor, {
		width: 700,
		height: 300,
		fixedHeight: true
	});
	//mditor.openPreview();

	window.mditor = mditor;
});