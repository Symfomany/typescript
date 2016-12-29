export default class Demo {

	public name: String;
	public version: Number;

	constructor(name: String) {
		this.name = name
		this.version = 1;
	}

	out(): String {
		return `This is ${this.name} in version ${this.version}`;
	}

}
