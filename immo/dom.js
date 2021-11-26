const $ = x => document.querySelector(x)

export class Node {
	static default = 0
	constructor(node) {
		this.node = node
		// return new Proxy(this,{
		// 	get(target,key){
		// 		console.log('get attr', target, key)
		// 		return target[key]
		// 	},
		// 	set(target,key,value){
		// 		console.log('get attr', target, key,value)
		// 		target[key] = value
		// 	}
		// })
	}
	get number() {
		let out = this.string * 1
		if ([NaN, null, undefined].includes(out)) return Node.default
		else return out
	}
	get bool() {
		return this.string ? true : false
	}
	get date() {
		return new Date(Date.parse(this.string))
	}
	get string() {
		if (['input', 'output'].includes(this.type))
			return this.node.value
		else return this.node.innerText
	}
	set string(v) {
		if (['input', 'output'].includes(this.type))
			this.node.value = v
		else this.node.innerText = v
	}
	get type() {
		return this.node.tagName.toLowerCase()
	}
	get(a) {
		return this.node.getAttribute(a)
	}
	set(a, v) {
		this.node.setAttribute(a, v)
	}
	// attr(name){
	// 	return new Proxy({},{
	// 		get: (target, key) => {
	// 			console.log('get attr', target, key)
	// 			// return new Node($('#' + key))

	// 		},	
	// 		set: (target, key,value) => {
	// 			console.log('set attr', target, key)
	// 			// return new Node($('#' + key))

	// 		}
	// 	})
	// }
}
// function NodeProxy(node){
// 	return new Proxy(new Node(node),{
// 		get: (target, key) => {
// 			console.log('get attr', target, key)
// 			// return new Node($('#' + key))

// 		},	
// 		set: (target, key,value) => {
// 			console.log('set attr', target, key,value)
// 			// return new Node($('#' + key))

// 		}
// 	})
// }
let X = new Proxy({}, {
	// deleteProperty(target, key) {
	// 	return IDB().then(DB => DO(DB, 'delete', [key]))

	// },
	// set: (target, key, value) => {
	// 	return IDB().then(DB => DO(DB, 'put', [value, key]))
	// },
	get: (target, key) => {
		// console.log('get', target, key)
		return new Node($('#' + key))

	}
})
export default X;