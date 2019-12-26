DTS = {
	Y4y9: 'ABCDEFGHIJKLMNOPQRSTUVWXY01234abcdefghijklmnopqrstuvwxy56789'.split(''),
	enc60: v => {
		v = Math.floor(v);
		console.log('enc', v);

		for (var tmp = []; v > 0; v = Math.floor(v / 60))
			tmp.unshift(Math.floor(v % 60));
		return tmp.map(x => DTS.Y4y9[x]).join('');
	},
	pad0: v => v < 10 ? '0' + v : '' + v,

	space: {
		enc: {
			lon: lon => lon < 0 ? lon + 360 : lon,
			lat: lat => lat < 0 ? -lat + 180 : Math.abs(90 - lat),
			enc: (val) => {
				let out = DTS.enc60(val * 10);
				while (out.length < 2) out = 'A' + out;
				let decimals = (val + 0.000000001 + '').split('.')[1].slice(1, -3) * 1; // after the comma + 1
				out += DTS.enc60(decimals).slice(0, 2);
				return out;
			}
		},
		encode: (lon, lat) => {
			if (lon.includes(',')) {
				let tmp = lon.split(',');
				lon = tmp[0];
				lat = tmp[1];
			}
			lon = DTS.space.enc.lon(lon * 1);
			lat = DTS.space.enc.lat(lat * 1);
			console.log('scale', lon, lat);
			return DTS.space.enc.enc(lon) + ':' + DTS.space.enc.enc(lat);
		}
	},

	time: {
		d: v => DTS.pad0(DTS.Y4y9.indexOf(v)),
		encode: t => {
			let p = t.split(':');
			return DTS.Y4y9[p[0] * 1] + DTS.Y4y9[p[1] * 1] + DTS.Y4y9[p[2] * 1];
		},
		decode: c => {
			return DTS.time.d(c[0]) + ':' + DTS.time.d(c[1]) + ':' + DTS.time.d(c[2]);
		}
	},

	date: {
		baseYear: 16300,
		encode: (d, l = 0) => {
			let date = new Date(Date.parse(d));
			let decade = Math.floor((16300 + date.getFullYear()) / 10);
			let out = DTS.enc60(decade);
			out += DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // one year takes 6 AN chars... 2 months take 1
			if (date.getMonth() % 2 == 0) out += DTS.Y4y9.slice(0, 30).concat('Z')[date.getDate() - 1];
			if (date.getMonth() % 2 == 1) out += DTS.Y4y9.slice(30).concat('z')[date.getDate() - 1];
			return out;

		},
		decode: c => {
			let y = -DTS.date.baseYear;
			y += DTS.Y4y9.indexOf(c[0]) * 600;
			y += DTS.Y4y9.indexOf(c[1]) * 10;
			y += Math.floor(DTS.Y4y9.indexOf(c[2]) / 6);
			let m = DTS.Y4y9.indexOf(c[2]) % 6 * 2 + 1;
			let m1 = DTS.Y4y9.slice(0, 30).concat('Z').indexOf(c[3])
			let m2 = DTS.Y4y9.slice(30).concat('z').indexOf(c[3]);
			if (m2 > -1) m++;
			if (m1 > -1) var d = m1 + 1;
			if (m2 > -1) var d = m2 + 1;
			return `${y}-${DTS.pad0(m)}-${DTS.pad0(d)}`;
		}
	}


}



// decade: d => {
// 	let dek = Math.floor((16300 + (d.split('-')[0] * 1)) / 10);
// 	var out = [];
// 	for (; dek > 0; dek = Math.floor(dek / 60))
// 		out.push(dek % 60);
// 	return out.reverse().map(x => DTS.Y4y9[x]).join('');
// },
// day: d => {
// 	let date = new Date(Date.parse(d));
// 	let out = DTS.Y4y9[(date.getFullYear() % 10 * 6) + Math.floor(date.getMonth() / 2)]; // one year takes 6 AN chars... 2 months take 1
// 	console.log('month', date.getMonth(), date.getMonth() % 2, date.getDate(), date.getDate() - 1, out);
// 	if (date.getMonth() % 2 == 0) out += DTS.Y4y9.slice(0, 30).concat('Z')[date.getDate() - 1];
// 	if (date.getMonth() % 2 == 1) out += DTS.Y4y9.slice(30).concat('z')[date.getDate() - 1];
// 	return out;
// },
// encode2: (d, l = 0) => (DTS.date.decade(d) + DTS.date.day(d)).slice(l),

// console.log('month', date.getMonth(), date.getMonth() % 2, date.getDate(), date.getDate() - 1, out);


// return (((DTS.Y4y9.indexOf(c[0]) * 60) + (DTS.Y4y9.indexOf(c[1]) * 1)) * 10) - DTS.date.baseYear;

// AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
// az = AZ.map(x => x.toLowerCase());
// N = '0123456789'.split('');
// NaA = N.concat(az).concat(AZ);

// sixty = NaA.slice(0,60);
// while (dek > 0) {
// 	out.push(dek % 60);
// 	dek = Math.floor(dek / 60);
// }
// let diff = date - new Date(date.getFullYear(), 0, 0);
// out += NaA[(d.split('-')[0].slice(-1) * 6) + Math.floor(days / 61)]; // one year takes 6 AN chars...

// console.log('dek', dek);
// console.log(out);

// let diff = date - new Date(date.getFullYear(), Math.floor(date.getMonth() / 2) * 2, 0);
// return out + Y4y9[Math.floor(diff / 24 / 60 / 60 / 1000)];
// return out + DTS.Y4y9[Math.floor(diff / 24 / 60 / 60 / 1000)];

// enc3: d => date.encode(d).slice(1),
// console.log(NaA.indexOf(c[0]), NaA.indexOf(c[1]));