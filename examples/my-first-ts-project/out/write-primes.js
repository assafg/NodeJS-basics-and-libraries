"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function isPrime(n) {
    if (n <= 1)
        return false;
    // Check from 2 to n/2
    for (var i = 2; i <= n / 2; i++)
        if (n % i == 0)
            return false;
    return true;
}
console.log(process.argv);
for (var i = 0; i < 100; i++) {
    if (isPrime(i)) {
        fs_1.default.appendFileSync('./primes.txt', i + '\n');
    }
}
