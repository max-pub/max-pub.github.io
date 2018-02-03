window.customElements.define('line-chart', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: 'open'
		});
	}

	static get observedAttributes() {
		return ['values', 'aspect-ratio', 'y-min', 'y-max', 'y-min-pad', 'y-max-pad'];
	}

	attributeChangedCallback(attr, oldVal, newVal) {
		if (attr == 'curve') this.curve = newVal;
		else this[attr] = JSON.parse(newVal);
		clearTimeout(this.timer);
		this.timer = setTimeout(this.build.bind(this), 10);
		// this.build();
	}

	build() {
		let width = 1000;
		let height = Math.round(width / (this['aspect-ratio'] || 1.5));

		let step = width / (this.values.length - 1);

		let yMin = this['y-min'] || Math.min(...this.values);
		let yMax = this['y-max'] || Math.max(...this.values);
		yMin -= this['y-min-pad'] || 0;
		yMax += this['y-max-pad'] || Math.round((yMax - yMin) * 0.1);
		let values = this.values.map((value, index) => height - ((value - yMin) / (yMax - yMin) * height));
		if (this.hasAttribute('inverse')) values = values.map((value) => height - value);
		let y0 = this.hasAttribute('inverse') ? 0 : height;

		if (this.hasAttribute('smooth')) {
			let Svalues = values.map((value, index) => index ? (value + values[index - 1]) / 2 : value).slice(1);
			let points = values.slice(1).map((value, index) => Math.round((index + 0.5) * step) + ' ' + Svalues[index] + ' ' + Math.round((index + 1) * step) + ' ' + value);
			var path = `<path class='line' d="M 0 ${values[0]} S ${points.join('   ')}"/>`;
			if (this.hasAttribute('fill'))
				var path = `<path class='fill' d="M 0 ${y0} L 0 ${values[0]} S ${points.join('   ')}   L ${width} ${y0} Z"/>`;
		} else {
			let points = values.slice(1).map((value, index) => Math.round((index + 1) * step) + ' ' + value);
			if (this.hasAttribute('fill'))
				var path = `<path class='fill' d="M 0 ${y0} L 0 ${values[0]} ${points.join('   ')} ${width} ${y0} Z"/>`;
			else
				var path = `<path class='line' d="M 0 ${values[0]} L ${points.join('   ')}"/>`;
		}
		if (this.hasAttribute('points'))
			var path = values.map((value, index) => `<circle cx="${index*step}" cy="${value}" r="1" />`).join('\n');
		// console.log('smooth', this.hasAttribute('smooth'), 'fill', this.hasAttribute('fill'));
		this.shadowRoot.innerHTML = `<svg viewBox='0 0 ${width} ${height}' preserveAspectRatio="xMinYMin">${path}</svg>`;
	}

	svg(values, line = 'S', dimensions = [1000, 666], yRange = [0, 100], yPad = [null, null]) {

	}


});