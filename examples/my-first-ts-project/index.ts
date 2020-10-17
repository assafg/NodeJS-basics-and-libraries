class Greeter {
    constructor(private readonly name: string){}

    sayHi() {
        console.log('Hi ' + this.name);
    }
}

const g = new Greeter('John');
g.sayHi();