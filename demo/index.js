define(function (require, exports, module) {
	var Mditor = require("../client/js/main");

	var editor = document.getElementById("editor");
	var mditor = new Mditor(editor);

	var preview = document.getElementById("preview");
	mditor.on('input', function (event) {
		preview.innerHTML = this.getHTML();
	});
});