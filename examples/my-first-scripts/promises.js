function getSomethingAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 1000);
    });
}

async function work() {
    const value1 = await getSomethingAsync();
    console.log(value1);
    const value2 = await getSomethingAsync();
    console.log(value2);
    const value3 = await getSomethingAsync();
    console.log(value3);
    const value4 = await getSomethingAsync();
    console.log(value4);
}

work()
