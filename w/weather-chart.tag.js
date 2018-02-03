document.head.insertAdjacentHTML('beforeend', `<template id="weather-chart"><style>
	:host{display: block; position: relative; }
	line-chart{position:absolute; width:100%;}
	#clouds{ fill: #fff; opacity: 0.5;}
	#rain{ fill: cornflowerblue; opacity: 0.9;}
	#wind{ fill: transparent; stroke: #fff; stroke-width: 5; stroke-dasharray: 20,20; stroke-linecap: round; opacity: 0.9;}
	#temp{ stroke: #FF8F00; stroke-width:10; opacity: 0.9; fill: transparent;}
</style>
	<line-chart id="clouds" aspect-ratio="3" y-min="1" y-max="100" smooth="" fill=""></line-chart>
	<line-chart id="rain" aspect-ratio="3" y-min="0.01" y-max="100" smooth="" fill="" inverse=""></line-chart>
	<line-chart id="wind" aspect-ratio="3" y-min="1" y-max="30" smooth=""></line-chart>
	<line-chart id="temp" aspect-ratio="3" y-min-pad="1" y-max-pad="1" smooth=""></line-chart>
</template>`);
window.customElements.define('weather-chart', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'}).appendChild(document.querySelector('#weather-chart').content.cloneNode(true));
	}
 	
	setData(data){
		this.data = {temp:[],clouds:[],rain:[],wind:[]};
		for(var i=0; i<data.length; i++){
			let hour = data[i];
			// if(!hour) continue;
			this.data.temp.push(hour ? hour.temperature.real : 0);
			this.data.rain.push(hour ? hour.precipitation.probability*100 : 0);
			this.data.wind.push(hour ? hour.wind.speed*3.6 : 0);
			this.data.clouds.push(hour ? hour.cloudCover*100 : 0)
		}
		this.setChart('temp');
		this.setChart('clouds');
		this.setChart('rain');
		this.setChart('wind');
	}

	setChart(typ) {
		// console.log(typ,this.data[typ],this.shadowRoot.querySelector('#temp'));
		this.shadowRoot.querySelector('#'+typ).setAttribute('values',JSON.stringify(this.data[typ])); 
	}


});