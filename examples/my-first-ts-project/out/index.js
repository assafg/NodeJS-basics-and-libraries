"use strict";
var Greeter = /** @class */ (function () {
    function Greeter(name) {
        this.name = name;
    }
    Greeter.prototype.sayHi = function () {
        console.log('Hi ' + this.name);
    };
    return Greeter;
}());
var g = new Greeter('John');
g.sayHi();
//# sourceMappingURL=index.js.map