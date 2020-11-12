const fs = require('fs');
const Reader = require('./bufferreader');

const INT_MAX = 2147483647;
const TEXT_RECORD_SIZE = 0x10;

module.exports = (buffer) => {

  const len = buffer.length;

  if(!buffer || len <= 0) throw "Error: Invalid input received to langparser:parse()";

  if(len < 8) throw "Error: Language file too small (< 8 bytes)!";
  if(len > INT_MAX) throw "Error: Language file too big!";

  const reader = new Reader(buffer);

  let fileId = reader.readInt32();
  let recordCount = reader.readInt32();

  if(recordCount > INT_MAX/TEXT_RECORD_SIZE - 100) throw "Error: Too many records found in language file!";

  const records = [];

  let StartTextOffset = recordCount*TEXT_RECORD_SIZE + 8;

  for(let i = 0; i < recordCount; i++) {
    const record = {};

    record.Id = reader.readInt32();
    record.Unknown = reader.readInt32();
    record.Index = reader.readInt32();
    record.Offset = reader.readInt32();

    let textOffset = record.Offset + StartTextOffset;

    if(textOffset < len)
      record.Text = reader.readString(textOffset);
    else console.warn(`Warning: Read passed end of file (offset ${textOffset}) in text record #${i}`);

    records.push(record);
  }

  return records;
};
