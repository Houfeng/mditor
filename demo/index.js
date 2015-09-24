define(function (require, exports, module) {
	var Mditor = require("../client/js/main");

	var editor = document.getElementById("editor");
	var mditor = new Mditor(editor);
	//mditor.openPreview();

	window.mditor = mditor;
});