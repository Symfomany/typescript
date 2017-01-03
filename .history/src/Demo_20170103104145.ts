import { Person } from './Person';
import { Group } from './Group';

export const phrase = "Je suis une phrase";

function stability(name: String) {
    return function (targetClass) {

        let ver: number = new targetClass().version;
        let stable: String = "Pas encore defini";

        if (ver > 1) {
            stable = "Version Deja stabilisé";
        } else if (ver > 0.5 && ver < 1) {
            stable = "Beta";
        } else {
            stable = "alpha ou nighly"
        }

        return class {
            name = new targetClass().name;
            ver = new targetClass().version;
            people = new targetClass().people;
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
