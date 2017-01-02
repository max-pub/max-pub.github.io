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
			HTML += '<p>\n';
			var lines = block.split('\n');
			lines.forEach((line, i) => {
				line = line.trim();
				line = line.split('(').join('<i>(').split(')').join(')</i>');
				if ((i == 0) && (line.substr(-1) == ':')) { // PERSON
					HTML += `<b>${line}</b>\n`;
					// line = line.split(':')[0].split('|');
					// HTML += `<b>${line[0]}`;
					// if (line[1]) HTML += `<i>${line[1]}</i>`;
					// HTML += ':</b>\n';
				} else if (line[0] == '|') { // NOTE
					HTML += `<i>${line.substr(1)}</i><br/>\n`;
				} else {
					HTML += `<span>${line}</span><br/>\n`;
				}
			});
			HTML += '</p>\n\n';
		}
	});
	return HTML;
}

// var pClass = '';
// if (lines[0][0] == '>') { // scene description
// 	pClass = ' class="scene"';
// 	lines[0] = lines[0].substr(1);
// }
// if (lines[0].substr(-1) == ':') { // person
// 	var newLine = `<b>${lines[0]}</b>\n` + lines[1];
// 	console.log('PERSON:', lines[0], newLine);
// 	lines.splice(0, 2, newLine);
// 	pClass = ' class="speech"';
// }
// HTML += `<p${pClass}>\n${lines.join('<br/>\n')}\n</p>\n\n`;