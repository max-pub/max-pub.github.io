

// https://api.github.com/repos/max-pub/MarkDownBooks/contents/
// https://raw.githubusercontent.com/max-pub/MarkDownBooks/master/authors/Johann%20Wolfgang%20von%20Goethe/1774%20Die%20Leiden%20des%20jungen%20Werther.md
// https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/1749%20Johann%20Wolfgang%20von%20Goethe/1774%20Die%20Leiden%20des%20jungen%20Werther.md



// loadBook = function(hash) {
// 	fetch('https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/' + hash + '.md')
// 		.then((response) => response.text())
// 		.then((text) => {
// 			makeBookPage({
// 				author: hash.split('/')[0].substr(5),
// 				title: hash.split('/')[1].substr(5),
// 				text: text
// 			});
// 		});

// }

// pathInfo = () => {
// 	var tmp = HASH.split('/');
// 	var parts = {};
// 	switch (tmp.length) {
// 		case 4:
// 			parts.book = tmp[3];
// 		case 3:
// 			parts.author = tmp[2];
// 		case 2:
// 			parts.type = tmp[1];
// 		case 1:
// 			parts.language = tmp[0];
// 	}
// 	return parts;
// }


// update = () => {
// 	console.log('hash', HASH, HASH.split('/').length);
// 	switch (HASH.split('/').length) {
// 		case 1:
// 			return showLanguages();
// 		case 2:
// 			return showAuthors();
// 		case 4:
// 			return showBooks();
// 		case 5:
// 			return showBook();
// 	}
// }


// makeAuthorList = function(lst) {
// 	// console.log(lst)
// 	var HTML = '<main class="authors">';
// 	HTML += `<h1>Autoren</h1>
// 			 <h2>urheberrechtsfreier B&uuml;cher</h2>`;
// 	lst.forEach((item) => {
// 		HTML += `
// 		<a class='li' href="#${item.year+' '+item.name}"> 
// 		<span class='year'>${item.year}</span> 
// 		<span class='name'>${item.name}</span>
// 		</a>`;
// 	});
// 	HTML += '</main>';
// 	document.body.innerHTML = HTML;
// }



// makeBookList = function(lst) {
// 	// console.log(lst);
// 	var HTML = '<main class="books">';
// 	var authorYear = document.location.hash.substr(1, 4);
// 	var authorName = document.location.hash.substr(6);
// 	var hash = document.location.hash.substr(1);
// 	var pic = 'https://raw.githubusercontent.com/OpenDataCollection/Books/master/' + hash + '/pic.jpg';
// 	HTML += `
// 		<h1>${authorName}</h1>
// 		<img class='pic' src='${pic}'/>
// 		<p class='bio'></p>
// 		<h2>B&uuml;cher</h2>`;
// 	lst.forEach((item) => {
// 		HTML += `
// 		<a class='li' href="#${authorYear+' '+authorName+'/'+item.year+' '+item.name}"> 
// 		<span class='year'>${item.year}</span> 
// 		<span class='name'>${item.name}</span>
// 		</a>`;
// 	});
// 	HTML += '</main>';
// 	document.body.innerHTML = HTML;
// 	loadBio();
// }


// loadBio = function() {
// 	var hash = document.location.hash.substr(1);
// 	fetch('https://raw.githubusercontent.com/OpenDataCollection/Books/master/' + hash + '/bio.txt')
// 		.then((response) => response.text())
// 		.then((text) => {
// 			document.querySelector('.bio').innerHTML = text;
// 		});

// }