// Class with private fields
class Greeter {
    #name;
    constructor(name) {
        this.#name = name;
    }

    greet() {
        console.log('hello ' + this.#name);
    }
}

const greeter = new Greeter('assaf');
greeter.greet();

