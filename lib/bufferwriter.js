const Writer = module.exports = function() {
  this.offset = 0;
  this.buffer = Buffer.allocUnsafe(0);
};

Writer.prototype._ensure = function(size) {
  const remaining = this.buffer.length - this.offset;
  if(remaining < size) {
    const oldBuffer = this.buffer;
    let newSize = oldBuffer.length + size;
    this.buffer = Buffer.allocUnsafe(newSize);
    oldBuffer.copy(this.buffer);
  }
};

Writer.prototype.writeInt32 = function(num, isLE) {
  this._ensure(4);

  if(isLE) this.buffer.writeInt32LE(num, this.offset);
  else this.buffer.writeInt32BE(num, this.offset);

  this.offset += 4;
};

Writer.prototype.writeCString = function(str) {
  if(str) this.writeString(str);

  this._ensure(1);
  this.buffer[this.offset++] = 0;
};

Writer.prototype.writeString = function(str) {
  const len = Buffer.byteLength(str);
  this._ensure(len);

  this.buffer.write(str, this.offset);
  this.offset += len;
};
