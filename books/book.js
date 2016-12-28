loadBook = function(hash) {
	fetch('https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/' + hash + '.md')
		.then((response) => response.text())
		.then((text) => {
			makeBookPage({
				author: hash.split('/')[0].substr(5),
				title: hash.split('/')[1].substr(5),
				text: text
			});
		});

}
makeBookPage = function(book) {
	var html = MD.makeHtml(book.text);
	document.body.innerHTML = `
		<main class='book'>
		<h1>${book.title}</h1>
		<h2>${book.author}</h2>
		<article>${html}</article>
		</main>
		`;
}



// https://api.github.com/repos/max-pub/MarkDownBooks/contents/
// https://raw.githubusercontent.com/max-pub/MarkDownBooks/master/authors/Johann%20Wolfgang%20von%20Goethe/1774%20Die%20Leiden%20des%20jungen%20Werther.md
// https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/1749%20Johann%20Wolfgang%20von%20Goethe/1774%20Die%20Leiden%20des%20jungen%20Werther.md