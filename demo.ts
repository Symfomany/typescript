// target est la class qui va se faire décorer
function Component (target) {
	console.log(target)
}

// interface utiliser dans le constructeur pour obliger
interface demoOption {
	autoplay: boolean
	x?: number
	success: (data: string) => void
}

export default class Demo {

	protected _element: string

	constructor (option: demoOption) {
		
	}

	set element (value:string) {
		this._element = value
	}

	get element (): string {
		return this._element
	}

	public demo() {

	}
}

class Demo2 extends Demo {

}