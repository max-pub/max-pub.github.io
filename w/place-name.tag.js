window.customElements.define('place-name', class extends HTMLElement {
	static get observedAttributes() {
		return ['lon', 'lat', 'format'];
	}
	attributeChangedCallback(attr, oldVal, newVal) {
		console.log(attr, newVal);
		this[attr] = newVal;
		this.update();
	}
	update() {
		// console.log(this.date, new Date(Date.parse(this.date)));
		if (this.lon && this.lat)
			fetch(`https://maps.google.com/maps/api/geocode/json?sensor=true&address=${this.lat},${this.lon}`)
			.then(resp => resp.json())
			.then(data => {
				var d = data.results[0].address_components[0].long_name;
				console.log('geo-json', d);
				this.innerHTML = d;
			});
	}
});