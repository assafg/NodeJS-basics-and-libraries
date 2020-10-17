"use strict";
function printLabel(labeledObj) {
    console.log(labeledObj.label);
}
function printSize(labeledObj) {
    console.log(labeledObj.size);
}
var myObj = { label: "Size 10 Object", print: function () { return console.log('stam'); } };
printLabel(myObj);
printSize(myObj);
var Book = /** @class */ (function () {
    function Book(pages) {
        this.pages = pages;
    }
    Book.prototype.print = function (p) {
        console.log(this.pages);
    };
    return Book;
}());
var b = new Book(100);
b.print();
//# sourceMappingURL=hello.js.map