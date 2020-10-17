function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);

}

function printSize(labeledObj: LabeledValue) {
    console.log(labeledObj.size);

}

interface LabeledValue {
    label: string;
    size?: number;
}

let myObj = { label: "Size 10 Object", print: () => console.log('stam')};
printLabel(myObj);
printSize(myObj);

class Book {
    constructor(private readonly pages: number){}

    print(p: string) {
        console.log(this.pages);
        
    }
}

const b = new Book(100);
b.print()

