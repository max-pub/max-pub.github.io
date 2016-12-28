MD = new showdown.Converter();
HASH = 0;


setInterval(() => {
	if (window.location.hash === HASH) return;
	HASH = window.location.hash;
	update(HASH.substr(1));
}, 100);


update = function(hash) {
	console.log('hash', hash);
	if (hash.includes('/')) loadBook(hash);
	else loadList(hash);
}