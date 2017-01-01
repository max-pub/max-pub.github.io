

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