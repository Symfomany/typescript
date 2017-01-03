import { Person } from './Person';

export const phrase = "Je suis une phrase";

export class Demo {


    public name: String;
    public version: Number;

    constructor(name: String, private person?: Person) {
        this.name = name
        this.version = 2;
        if (!person) {
            this.person.email = "No"
        }
    }

    out(): String {
        return `This is ${this.name} with ${this.person.email} in version ${this.version}`;
    }



}
