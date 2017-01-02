LitMD = (text) => {
	var HTML = '';
	var blocks = text.split('\n\n');
	blocks.forEach((block) => {
		block = block.trim();
		if (block[0] == '#') { // heading
			var N = block.split('#').length - 1;
			console.log('HEADING', N, block);
			HTML += `<H${N}>${block.replace(/#/g,'').trim()}</H${N}>\n\n`;
		} else { // paragraph
			if (block.trim() == '') return;
			var lines = block.split('\n');
			var pClass = '';
			if (lines[0][0] == '>') { // scene description
				pClass = ' class="scene"';
				lines[0] = lines[0].substr(1);
			}
			if (lines[0].substr(-1) == ':') { // person
				var newLine = `<b>${lines[0]}</b>\n` + lines[1];
				console.log('PERSON:', lines[0], newLine);
				lines.splice(0, 2, newLine);
				pClass = ' class="speech"';
			}
			HTML += `<p${pClass}>\n${lines.join('<br/>\n')}\n</p>\n\n`;
		}
	});
	return HTML;
}