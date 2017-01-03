import { Person } from './Person';

export const phrase = "Je suis une phrase";

export class Demo {


    public name: String;
    public version: Number;

    constructor(name: String, person?: Person) {
        this.name = name
        this.version = 2;
    }

    out(): String {
        return `This is ${this.name} in version ${this.version}`;
    }

}
