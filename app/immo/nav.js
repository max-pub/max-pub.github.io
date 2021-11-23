let $ = x => document.querySelector(x)
let $$ = x => document.querySelectorAll(x)

export let state = {}
export let oldState = {}
export let diffState = {}


export function getURL() {
	let p = new URLSearchParams(document.location.hash.slice(1));
	// console.log('hash', p, document.location.hash.slice(1))
	p = Object.fromEntries(p)
	for (let k in p)
		if (p[k] === '')
			p[k] = true
	// console.log('get', p)
	return p
}
function makeURL(p = state) {
	return Object.entries(p).map(x => {
		if (x[1] === true) return x[0]
		if (x[1] === false) return
		else return `${x[0]}=${x[1]}`
	}).join('&')
}
export function setURL(p = state) {
	document.location.hash = makeURL(p)
}

export function addURL(p = {}) {
	setURL({ ...getURL(), ...p })
}





// export function getDOM() {
// 	let output = {}
// 	for (let node of $$('[nav-key]')) {
// 		let key = node.getAttribute('nav-key')
// 		// console.log('getDOM key', key)
// 		if (node.tagName == 'INPUT') {
// 			if (node.getAttribute('type')?.toLowerCase() == 'checkbox')
// 				output[key] = node.checked
// 			else
// 				output[key] = node.value
// 		} else {
// 			output[key] = node.querySelector('.nav-selected')?.getAttribute('nav-val')
// 		}
// 	}
// 	return output
// }

export function setDOM(p={}) {
	for (let node of $$('[nav-key]')) {
		let key = node.getAttribute('nav-key')
		// console.log('key', key)
		if (node.tagName == 'INPUT') {
			if (node.getAttribute('type')?.toLowerCase() == 'checkbox')
				node.checked = key in p
			// console.log('checked', key in p)
			else{
				// console.log("ERROR",node,p,key)
				node.value = p[key] ?? ''
			}
		} else {
			// console.log('add selection for', key, p[key])
			node.querySelectorAll('[nav-val]').forEach(x => x.classList.remove('nav-selected'))
			node.querySelector(`[nav-val="${p[key]}"]`)?.classList.add('nav-selected')
		}
	}
}




export function empty() {
	return !Boolean(document.location.hash.slice(1))
}
export function init(p = {}) {
	if (empty())
		setURL(p)
	else hashChange()
}

let changeHandlers = []
export function onChange(f) {
	changeHandlers.push(f)
	// console.log('show handlers',changeHandlers)
	// f?.()
}



function watchInputChange(root = document) {
	root.addEventListener('change', e => {
		let node = e.target
		let key = node.getAttribute('nav-key')
		if (!key) return
		let type = node.getAttribute('type')?.toLowerCase()
		let value = type == 'checkbox' ? node.checked : node.value
		addURL({ [key]: value })
	})
}
function watchClickChange(root = document) {
	root.addEventListener('click', e => {
		let key = e.target?.closest('[nav-key]')?.getAttribute('nav-key')
		if (!key) return
		let value = e.target?.closest('[nav-val]')?.getAttribute('nav-val')
		if (!value) return
		addURL({ [key]: value })
	})
}

function hashChange(e) {
	// let temp = document.location.hash
	// console.log('1', document.location.hash.slice(1))
	let temp = getURL()
	// console.log('2', makeURL(temp))
	// console.log('comp',)
	if (makeURL(temp) != document.location.hash.slice(1))
		return setURL(temp)
	// console.log('3, laeuft')
	oldState = state
	state = getURL()
	diffState = {}
	for (let key in state)
		if (state[key] != oldState[key])
			diffState[key] = state[key]
	// console.log('hashchange', '\nold', oldState, '\nnew', state, '\ndiff', diffState)
	// console.log('current state', state)
	setDOM(state)
	// console.log('call handlers',changeHandlers)
	for(let f of changeHandlers) f?.()
}




window.addEventListener('hashchange', hashChange)
// hashChange()
watchInputChange()
watchClickChange()
