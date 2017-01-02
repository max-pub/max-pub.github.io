HASH = 0;


setInterval(() => {
	if (window.location.hash.substr(1) === HASH) return;
	HASH = window.location.hash.substr(1);
	update(HASH);
}, 100);


pathInfo = () => {
	var tmp = HASH.split('/');
	if ((tmp.length > 1) && (!tmp[0])) tmp = tmp.slice(1);
	var path = {};
	if (tmp[0]) path.language = tmp[0];
	if (tmp[1]) path.type = tmp[1];
	if (tmp[2]) path.author = tmp[2];
	if (tmp[3]) path.genre = tmp[3];
	if (tmp[4]) path.title = tmp[4];
	path.string = (path.language ? '/' + path.language : '/') + (path.type ? '/' + path.type : '') + (path.author ? '/' + path.author : '') + (path.genre ? '/' + path.genre : '') + (path.title ? '/' + path.title : '');
	return path;
}


update = () => {
	var path = pathInfo();
	// console.log('hash', HASH, path);
	if (path.title) return showBook(path);
	if (path.author) return showBooks(path);
	if (path.language) return showAuthors(path);
	showLanguages(path);
}