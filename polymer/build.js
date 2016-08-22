#!/usr/local/bin/node

var fs = require('fs');
var vulcanize = require('vulcanize');
var crisper = require('crisper');
var minifyJS = require("uglify-js").minify;


new vulcanize({
	inlineScripts: true,
	inlineCss: true,
	stripComments: true,
	excludes: ['lib/']
}).process('bower_components/polymer/polymer.html', function(err, html) {
	if (err) return console.error('error', err);
	var output = crisper({
		source: html
	});
	var js = minifyJS(output.js, {
		fromString: true,
		mangle: {
			toplevel: true
		},
		// mangleProperties: true,
		compress: {
			// drop_console: true
		}
	}).code;
	fs.writeFile('polymer.js', js, 'utf-8');
});

fs.createReadStream('bower_components/webcomponentsjs/webcomponents.min.js').pipe(fs.createWriteStream('webcomponents.js'));