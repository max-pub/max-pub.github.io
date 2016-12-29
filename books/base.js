HASH = 0;
MD = new showdown.Converter();

$ = (q) => document.querySelector(q);
$$ = (q) => document.querySelectorAll(q);


setInterval(() => {
	if (window.location.hash.substr(1) === HASH) return;
	HASH = window.location.hash.substr(1);
	update(HASH);
}, 100);

pathInfo = () => {
	var tmp = HASH.split('/');
	var book = {};
	if(tmp[0]) book.language = tmp[0];
	if(tmp[1]) book.type = tmp[1];
	if(tmp[2]) book.author = tmp[2];
	if(tmp[3]) book.title = tmp[3];
	return book;
}


update = () => {
	var path = pathInfo();
	console.log('hash', HASH, path);
	if(path.title) return showBook();
	if(path.author) return showBooks();
	if(path.language) return showAuthors();
	showLanguages();
}

showMain = (name) => {
	console.log('SHOW',name);
	$$('main').forEach((item) => {
		item.hidden = true;
	})
	$('main#' + name).hidden = false;
}

loadList = (path) => {
	return new Promise((resolve, reject) => {
		fetch('https://api.github.com/repos/OpenDataCollection/Books/contents/' + path)
			.then((response) => response.json())
			.then((json) => {
				var lst = [];
				json.forEach((item) => {
					if (item.name.includes('bio.txt')) return;
					if (item.name.includes('pic.jpg')) return;
					if (item.name.includes('README')) return;
					lst.push(item.name);
				});
				resolve(lst);
			});
	});
}

loadContent = (path) => {
	return new Promise((resolve, reject) => {
		fetch('https://raw.githubusercontent.com/OpenDataCollection/Books/master/' + path)
			.then((response) => response.text())
			.then((text) => {
				resolve(text);
			});
	});
}