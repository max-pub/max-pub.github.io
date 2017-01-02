// MD = new showdown.Converter();
// MD = new LitMD();
$ = (q) => document.querySelector(q);
$$ = (q) => document.querySelectorAll(q);


makeRow = (hash, year, title) => {
	return `<tr onclick="document.location.hash='#${hash}'"> 
				<td>${year}</td> 
				<td>${title}</td>
			</tr>`;
}


show = (ID) => {
	$$('main').forEach((item) => {
		item.hidden = true;
	})
	$('main#' + ID).hidden = false;
}


showLanguages = (path) => {
	show('languages');
	loadList('').then((lst) => {
		var HTML = '';
		lst.forEach((item) => {
			// HTML += `<a href="#/${item}">${item}</a>`;
			HTML += makeRow('/' + item, `<img src="//max.pub/lib/flags/${item.substr(0,2)}.png"/>`, item.substr(3));
		});
		$('#languages .list').innerHTML = HTML;
	});
}



showAuthors = (path) => {
	show('authors');
	loadList(path.string).then((types) => {
		types.forEach((typ, i) => {
			$('#authors h2.typ' + i).innerHTML = typ;
			loadList(path.string + '/' + typ).then((lst) => {
				var HTML = '';
				lst.forEach((item) => {
					var year = item.substr(0, 4);
					var name = item.substr(5);
					HTML += makeRow(path.string + '/' + typ + '/' + item, year, name);
					// HTML += `<a href="#${path.string}/${typ}/${item}"> 
					// 			<span class='year'>${year}</span> 
					// 			<span class='name'>${name}</span>
					// 		</a>`;
				});
				$('#authors .list.typ' + i).innerHTML = HTML;
			});
		});
	});
}



showBooks = (path) => {
	show('books');

	$('#books .author').innerHTML = path.author.substr(5);
	$('#books .pic').onerror = () => {
		$('#books .pic').hidden = true;
	}
	$('#books .pic').setAttribute('src', 'https://raw.githubusercontent.com/OpenDataCollection/Books/master/' + path.string + '/pic.jpg');

	loadContent(path.string + '/bio.txt').then((text) => {
		if (text.substr(0, 3) === '404') return;
		var HTML = '';
		text.split('\n\n').forEach((block) => {
			block = block.trim();
			if (new RegExp(/^[0-9]{4}/).test(block.substr(0, 4))) { //lebenslauf
				HTML += "<h2>Lebenslauf</h2><table class='cv'>";
				block.split('\n').forEach((line) => {
					HTML += `<tr><td>${line.substr(0,4)}</td><td>${line.substr(5)}</td></tr>\n`;
				});
				HTML += "</table>\n\n";
			} else {
				HTML += `<p>${block}</p>\n\n`;
			}
		});
		$('#books .bio').innerHTML = HTML;
		//text.split('\n').join('<br/>\n');
	});

	loadList(path.string).then((types) => {
		types.forEach((typ, i) => {
			$('#books h2.typ' + i).innerHTML = typ;
			loadList(path.string + '/' + typ).then((lst) => {
				var HTML = '';
				lst.forEach((item) => {
					var year = item.substr(0, 4);
					var name = item.substr(5).replace('.md', '');
					HTML += makeRow(path.string + '/' + typ + '/' + year + ' ' + name, year, name);
					// HTML += `<a href="#${path.string}/${year} ${name}"> 
					// 			<span class='year'>${year}</span> 
					// 			<span class='name'>${name}</span>
					// 		</a>`;
				});
				$('#books .list.typ' + i).innerHTML = HTML;
			});
		});
	});

}



showBook = function(path) {
	show('book');
	$('#book .title').innerHTML = path.title.substr(5);
	$('#book .author').innerHTML = path.author.substr(5);
	$('#book .download').setAttribute('href', 'https://raw.githubusercontent.com/OpenDataCollection/Books/master/' + path.string + '.md');
	loadContent(path.string + '.md').then((text) => {
		bookText = text;
		// var html = MD.makeHtml(text);
		var html = LitMD(text);
		$('#book .content').innerHTML = html;
	});
}