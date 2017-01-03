import { Person } from './Person';
import { Group } from './Group';

export const phrase = "Je suis une phrase";

function stability(name: string) {
    return function (targetClass) {
        let ver = new targetClass().version;
        if (ver > 1) {
            return "Version Deja stabilisé";
        } else if (ver > 0.5 && ver < 1) {
            return "Beta";
        } else {
            return "alpha ou nighly"
        }
    }
}

@stability("Beta")
export class Demo implements Group {


    public name: String;
    public version: Number;
    public people: Person[];

    constructor(name: String, private person?: Person) {
        this.name = name
        this.version = 2;
        this.people = [
            {
                name: 'Boyer',
                email: 'julien@meetserious.com',
                age: 28
            },
            {
                name: 'Toto',
                email: 'toto@gmail.com',
                age: 25
            }
        ]
    }

    out(): String {
        return `This is ${this.name} with ${this.person.email} and nb is ${this.people.length} in version ${this.version} `;
    }



}
