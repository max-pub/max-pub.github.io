loadList = function(hash) {
	fetch('https://api.github.com/repos/OpenDataCollection/Books/contents/deutsch/' + hash)
		.then((response) => response.json())
		.then((json) => {
			var lst = [];
			json.forEach((item) => {
				if (item.name.includes('bio.txt')) return;
				if (item.name.includes('pic.jpg')) return;
				var year = item.name.substr(0, 4);
				var name = item.name.substr(5).replace('.md', '');
				lst.push({
					year: year,
					name: name
				});
			});
			if (hash) makeBookList(lst);
			else makeAuthorList(lst);
		});

}
makeAuthorList = function(lst) {
	// console.log(lst)
	var HTML = '<main class="authors">';
	HTML += `<h1>Autoren</h1>
			 <h2>mit abgelaufenem Urheberrecht</h2>`;
	lst.forEach((item) => {
		HTML += `
		<a class='li' href="#${item.year+' '+item.name}"> 
		<span class='year'>${item.year}</span> 
		<span class='name'>${item.name}</span>
		</a>`;
	});
	HTML += '</main>';
	document.body.innerHTML = HTML;
}
makeBookList = function(lst) {
	// console.log(lst);
	var HTML = '<main class="books">';
	var authorYear = document.location.hash.substr(1, 4);
	var authorName = document.location.hash.substr(6);
	var hash = document.location.hash.substr(1);
	var pic = 'https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/' + hash + '/pic.jpg';
	HTML += `
		<h1>${authorName}</h1>
		<img class='pic' src='${pic}'/>
		<p class='bio'></p>
		<h2>B&uuml;cher</h2>`;
	lst.forEach((item) => {
		HTML += `
		<a class='li' href="#${authorYear+' '+authorName+'/'+item.year+' '+item.name}"> 
		<span class='year'>${item.year}</span> 
		<span class='name'>${item.name}</span>
		</a>`;
	});
	HTML += '</main>';
	document.body.innerHTML = HTML;
	loadBio();
}


loadBio = function() {
	var hash = document.location.hash.substr(1);
	fetch('https://raw.githubusercontent.com/OpenDataCollection/Books/master/deutsch/' + hash + '/bio.txt')
		.then((response) => response.text())
		.then((text) => {
			document.querySelector('.bio').innerHTML = text;
		});

}