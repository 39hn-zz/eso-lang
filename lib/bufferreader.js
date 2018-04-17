const Reader = module.exports = function(buf) {
  this.offset = 0;
  this.buffer = buf;
};

Reader.prototype.readInt32 = function(isLE) {
  let result = 0;
  
  if(isLE) result = this.buffer.readInt32LE(this.offset);
  else result = this.buffer.readInt32BE(this.offset);

  this.offset += 4;
  return result;
};

Reader.prototype.readString = function(offset) {
  const len = this.buffer.length;

  let result = "";
  if(offset >= len) return result;

  let i;
  for(i = 0; this.buffer[offset + i] && i + offset < len; i++) {}

  result = this.buffer.slice(offset, offset + i).toString();
  return result;
};
