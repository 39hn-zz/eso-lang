const esoLang = require('../index');
const fs = require('fs');
const path = require('path');
const { parse, compile } = esoLang;

const testPath = path.resolve(__dirname, './test.lang');
const testRecords = [
  { Id: 3427285, Unknown: 0, Index: 3, Offset: 0, Text: 'TEST1' },
  { Id: 3427285, Unknown: 0, Index: 7, Offset: 5, Text: 'TEST2' },
  { Id: 3427285, Unknown: 0, Index: 8, Offset: 0, Text: '테스트3' },
  { Id: 3427285, Unknown: 0, Index: 9, Offset: 11, Text: '테스트4' },
];

describe('eso-lang compile/parse test', () => {
  test('Wrting compiled records as "test.lang"', () => {
    const compiledBuffer = compile(testRecords);
    fs.writeFileSync(testPath, compiledBuffer);

    expect(fs.existsSync(testPath)).toBe(true);
  });

  test('Reading records from compiled "test.lang"', () => {
    const langBuffer = fs.readFileSync(testPath);
    const records = parse(langBuffer);

    expect(records).toMatchObject(testRecords);
  });
});

afterAll(() => {
  fs.unlinkSync(testPath);
});
