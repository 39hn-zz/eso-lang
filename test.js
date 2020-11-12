const esolang = require('./index');
const fs = require('fs');

const { parse, compile } = esolang;

const testRecords = [{ Id: 3427285, Unknown: 0, Index: 3, Offset: 0, Text: 'TEST1' },
  { Id: 3427285, Unknown: 0, Index: 7, Offset: 5, Text: 'TEST2' },
  { Id: 3427285, Unknown: 0, Index: 8, Offset: 0, Text: '테스트3' },
  { Id: 3427285, Unknown: 0, Index: 9, Offset: 11, Text: '테스트4' }];

console.log('Now Compiling following records...');
console.log(testRecords);
const compiledBuffer = compile(testRecords);
console.log('Done!');

console.log('Now Writing compiled records as "test.lang"...');
fs.writeFileSync('./test.lang', compiledBuffer);
console.log('Done!')

console.log('Now Reading records from "test.lang"...');
const langBuffer = fs.readFileSync('./test.lang');
console.log('Done!');

console.log('The results are...');
const records = parse(langBuffer);
console.log(records);
