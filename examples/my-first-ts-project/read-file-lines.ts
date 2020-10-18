import fs from 'fs';
import readline from 'readline';

// Reading the content sync
// const content = fs.readFileSync('/Users/assafgannon/data/property_tax_report_csv2016.csv', 'utf-8');
// console.log(content)

// Read entire file
// fs.readFile('/Users/assafgannon/data/property_tax_report_csv2016.csv', 'utf-8', (err, data: string) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('read ', data.length);
// })

// var buffer = Buffer.alloc(1024);

// console.log('Open existing file');
// fs.open(
//   '/Users/assafgannon/data/property_tax_report_csv2016.csv',
//   'r+',
//   (err, fd: number) => {
//     if (err) {
//       return console.error(err);
//     }

//     console.log('Reading the file');

//     fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
//       if (err) {
//         console.log(err);
//       }

//       if (bytes > 0) {
//         console.log(buffer.slice(0, bytes).toString());
//       }
//       console.log(bytes + ' bytes read');

//       // Close the opened file.
//       fs.close(fd, (err) => {
//         if (err) {
//           console.log(err);
//         }

//         console.log('File closed successfully');
//       });
//     });
//   }
// );

const readInterface = readline.createInterface({
  input: fs.createReadStream(
    '/Users/assafgannon/data/property_tax_report_csv2016.csv'
  ),
});

let lines = 0
readInterface.on('line', function(line) {
    lines++
});

readInterface.on('close', () => {
    console.log(lines);
});


