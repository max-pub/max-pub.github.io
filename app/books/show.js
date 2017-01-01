MD = new showdown.Converter();
$ = (q) => document.querySelector(q);
$$ = (q) => document.querySelectorAll(q);




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
			HTML += `<a href="#/${item}">${item}</a>`;
		});
		$('#languages .list').innerHTML = HTML;
	});
}




showAuthors = (path) => {
	show('authors');
	loadList(path.string).then((types) => {
		types.forEach((typ,i)=>{
			$('#authors h2.typ'+i).innerHTML = typ;
			loadList(path.string+'/'+typ).then((lst) => {
				var HTML = '';
				lst.forEach((item)=>{
					var year = item.substr(0,4);
					var name = item.substr(5);
					HTML += `<a href="#${path.string}/${typ}/${item}"> 
								<span class='year'>${year}</span> 
								<span class='name'>${name}</span>
							</a>`;
				});
				$('#authors .list.typ'+i).innerHTML = HTML;
			});
		});
	});
}




showBooks = (path) => {
	show('books');

	$('#books .author').innerHTML = path.author.substr(5);
	$('#books .pic').setAttribute('src','https://raw.githubusercontent.com/OpenDataCollection/Books/master/'+path.string+'/pic.jpg');
	
	loadContent(path.string+'/bio.txt').then((text)=>{
		$('#books .bio').innerHTML = text;
	});
	
	loadList(path.string).then((lst) => {
		var HTML = '';
		lst.forEach((item)=>{
			var year = item.substr(0,4);
			var name = item.substr(5).replace('.md','');
			HTML += `<a href="#${path.string}/${year} ${name}"> 
						<span class='year'>${year}</span> 
						<span class='name'>${name}</span>
					</a>`;
		});
		$('#books .list').innerHTML = HTML;
	});

}





showBook = function(path) {
	show('book');
	$('#book .title').innerHTML = path.title.substr(5);
	$('#book .author').innerHTML = path.author.substr(5);
	loadContent(path.string+'.md').then((text)=>{
		var html = MD.makeHtml(text);
		$('#book .content').innerHTML = html;
	});
}




