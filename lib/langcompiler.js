const fs = require('fs');
const Writer = require('./bufferwriter');

const FILE_ID = 0x02;

module.exports = (records) => {
  const writer = new Writer();

  writer.writeInt32(FILE_ID);
  writer.writeInt32(records.length);

  let textOffset = 0;

  for(let i = 0; i < records.length; i++) {
    const record = records[i];
    record.Offset = textOffset;

    writer.writeInt32(record.Id);
    writer.writeInt32(record.Unknown);
    writer.writeInt32(record.Index);
    writer.writeInt32(record.Offset);

    textOffset += Buffer.byteLength(record.Text) + 1;
  }

  for(let i = 0; i < records.length; i++) {
    const record = records[i];

    writer.writeCString(record.Text);
  }

  return writer.buffer;
};
