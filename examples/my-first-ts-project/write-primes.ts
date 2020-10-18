import fs from "fs";

function isPrime(n: number) {
    if (n <= 1)
        return false;
 
    // Check from 2 to n/2
    for (let i = 2; i <= n/2; i++)
        if (n % i == 0)
            return false;
 
    return true;
}

console.log(process.argv)

for (let i=0; i< 100; i++) {
    if(isPrime(i)) {
       fs.appendFileSync('./primes.txt',i + '\n');
    }
}