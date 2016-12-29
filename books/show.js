showLanguages = () => {
	showMain('languages');
	loadList('').then((lst) => {
		var HTML = '';
		lst.forEach((item) => {
			HTML += `<a href="#${item}">${item}</a>`;
		});
		$('#languages .list').innerHTML = HTML;
	});
}




showAuthors = () => {
	showMain('authors');
	var book = pathInfo();
	var basePath = book.language;
	loadList(basePath).then((types) => {
		types.forEach((typ,i)=>{
			$('#authors h2.typ'+i).innerHTML = typ;
			loadList(basePath+'/'+typ).then((lst) => {
				var HTML = '';
				lst.forEach((item)=>{
					var year = item.substr(0,4);
					var name = item.substr(5);
					// var newhash = HASH + typ + '/' + item;
					HTML += `<a href="#${basePath}/${typ}/${item}"> 
								<span class='year'>${year}</span> 
								<span class='name'>${name}</span>
							</a>`;
				});
				$('#authors .list.typ'+i).innerHTML = HTML;
			});
		});
	});
}




showBooks = () => {
	showMain('books');
	var book = pathInfo();
	var basePath = book.language+'/'+book.type+'/'+book.author;

	$('#books .author').innerHTML = pathInfo().author.substr(5);
	$('#books .pic').setAttribute('src','https://raw.githubusercontent.com/OpenDataCollection/Books/master/'+basePath+'/pic.jpg');
	
	loadContent(basePath+'/bio.txt').then((text)=>{
		$('#books .bio').innerHTML = text;
	});
	loadList(basePath).then((lst) => {
		var HTML = '';
		lst.forEach((item)=>{
			var year = item.substr(0,4);
			var name = item.substr(5).replace('.md','');
			HTML += `<a href="#${basePath}/${year} ${name}"> 
						<span class='year'>${year}</span> 
						<span class='name'>${name}</span>
					</a>`;
		});
		$('#books .list').innerHTML = HTML;
	});

}





showBook = function() {
	showMain('book');
	var book = pathInfo();
	$('#book .title').innerHTML = book.title.substr(5);
	$('#book .author').innerHTML = book.author.substr(5);
	loadContent(book.language+'/'+book.type+'/'+book.author+'/'+book.title+'.md').then((text)=>{
		var html = MD.makeHtml(text);
		$('#book .content').innerHTML = html;
	});
}




