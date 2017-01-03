import { Person } from './Person';
import { Group } from './Group';

export const phrase = "Je suis une phrase";

export class Demo implements Group {


    public name: String;
    public version: Number;

    constructor(name: String, private person?: Person) {
        this.name = name
        this.version = 2;
    }

    out(): String {
        return `This is ${this.name} with ${this.person.email} in version ${this.version}`;
    }



}
