export const phrase = "Je suis une phrase";
export class Demo {


    public name: String;
    public version: Number;

    constructor(name: String) {
        this.name = name
        this.version = 2;
    }

    out(): String {
        return `This is ${this.name} in version ${this.version}`;
    }

}
